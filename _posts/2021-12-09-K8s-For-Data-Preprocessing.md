---
layout: post
title: "Preprocessing Data Science Experiments on K8s"
draft: true
categories: Tutorials
---

K8s allows one to define and spin up hardware to suit whatever pecuilar needs an experiment might have and destroy it as soon as we're done using it. Additionally, if we want to perform multiple independent preprocessing steps, we can just spin up multiple K8s [pods](https://cloud.google.com/kubernetes-engine/docs/concepts/pod). Long gone the days of FOLVR (fear of leaving VM running)!

As there's no free lunch, the computational flexibility of K8s comes at some cost. The setup is more elaborate than running a script on a VM and reruning experiments with modified code involves re-copying the code onto the pod.

# Create a Docker Image

![Docker in a nutshell](/assets/k8s-experiments/docker.png)

A Docker image defines all the software that your experiment needs to run. If you think of the machine (or a K8s pod) as a ship, then the Docker image is a, well, uh, a container.

1. Install Docker ([instructions](https://docs.docker.com/get-docker/)).

    If you get the following error message on Mac:

    ```
    docker: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?.
    ```

    Make sure that the Docker desktop client is running.

2. Find a base image on [Docker Hub](https://hub.docker.com/search?type=image&image_filter=official). To avoid installing the boilerplate stuff, select a Docker image that already has the main software your experiment will need. In this example, we'll use the [`python:3.8-buster`](https://hub.docker.com/_/python) image. `python:` indicates a namespace of all Python images, `3.8` the Python version, and `buster` the Debian version.

    Now there are two ways of defining our own Docker image: programmatic and interactive. The former requires specifying all of our desired commands up front in a [Dockerfile](https://docs.docker.com/engine/reference/builder/) and then just running the Dockerfile to create a container with our desired software. The latter involves us attaching to the base image and installing the necessary dependencies for our experiments using bash terminal.

    The programmatic approach is better suited for production deployments, as the Dockerfile can be easily modified in the future in light of changing requirements. 

    On the other hand, the interactive approach is more intuitive as you just write the same commands you would otherwise in a different virtual environment.

3. Attach to the Docker image:

    _Will need `sudo` if you haven't [added your user to the `docker` group](https://docs.docker.com/engine/install/linux-postinstall/)_

    `docker run -it python:3.8-buster bash`


    Replace `python:3.8-buster` with the base image of your choice (see previous step), the `-it` flag is used to run the container in the foreground, `bash` at the end of the command tells to Docker to run bash on our specified image.

    If Docker can't find the specified image locally (as could be expected), it will just pull (i.e. download) it from Docker Hub.

4. Copy the experiment source code into the Docker image:

    You should see something like `root@bdf325ef533c:/#` before your cursor in the terminal, obviously, with a different hash instead of `bdf325ef533c`.

    Now open up another terminal window (outside of the Docker image) and copy over the source files for the experiment you want to perform.

    _Replace `bdf325ef533c` with whatever shows up in your other terminal window.`

    `docker cp local/path/to/code bdf325ef533c:/`

    This copied your experiment code into the root of the Docker image.

5. Install the necessary dependencies:

    Presumably running your code requires something more than just a vanilla Python installation. Switch to the terminal window with the Docker image open and run the commands you'd run on any other machine to ensure you can run your experiment.

# Push the Docker Image to the Artefact Registry

![Shipping docker](/assets/k8s-experiments/ship.jpg)

Before a K8s pod can use our newly created Docker image, we need to make it available to the pod by uploading it to the Artefact Registry. 

1. [Install Google Cloud SDK](https://cloud.google.com/sdk/docs/install) (i.e. make sure you can run `gcloud` command).

1. Create a Docker repository:

    `gcloud artifacts repositories create docker-repo-name --repository-format=docker \
    --location=us-central1 --description="Replace this with an appropriate description!"`

    `us-central1` should be set to whatever location you use for your GCP project.

    `docker-repo-name` should be replaced with the name you want to use for the repository.

    Verify that the previous command was successful with `gcloud artifacts repositories list`.

1. Configure Docker to use `gcloud` authentication:

    _Replace `us-central1` with the location you used in the previous step._

    `gcloud auth configure-docker us-central1-docker.pkg.dev`

1. Commit the changes to your local Docker image:

    `docker commit bdf325ef533c docker-repo-name/your-img-name:0.1`

    Replace `docker-repo-name` to be consistent with that used in previous steps.

    Replace `your-img-name` with whatever name you'd like to give to your Docker image.

    Replace `bdf325ef533c` with your local container ID.

    You're free to choose the version number (`0.1` above).

1. Push your Docker image to the Artefact Registry:

    `docker push us-central1-docker.pkg.dev/your-project-name/docker-repo-name/your-img-name:0.1`


# Deploy a K8s Pod

![SpaceX Falcon 9 Launch](/assets/k8s-experiments/takeoff.jpg)

1. Define the K8s pod in a `.yml` file:

    _We'll call it `pod.yml` but feel free to use any filename you like._

    Here's a [link to pod.yml gist](https://gist.github.com/ab-10/b43fcbefcd885fc1908bfae15bcd5081).

    It contains a lot of boilerplate configs, but there are a couple of details that are worth discussing.

    Lines 8-10 specify that the current pod should attach to persistent storage (defined at the bottom of the file). We need persistent storage, as by default all data on a pod disapears after the pod dies. I use it for large files that might be necessary for preprocessing and for the final output of my preprocessing scripts.

    You can access files that pod writes to persistent storage even after the pod has died, by reinstantiating the same pod or creating a new pod with access to the same volume.

    Line 22 defines the command that will be called on pod after instantiating, the pod will die after the command finishes. Calling `/bin/bash` allows to access the pod interactively. This can be replaced with a command to be exected directly, as long as it writes it's output to persistent storage.

    On line 24 `us-central1-docker.pkg.dev/your-project-name/docker-repo-name/your-img-name:0.1` should be the name you gave to the image in Artefact Registry.

    NB: when making changes to the image make sure to make changes to the version when pushing it to Artefact Registry and the `.yml` file.

1. [Install `kubectl`](https://kubernetes.io/docs/tasks/tools/):

1. Connect `kubectl` to your K8s cluster:
    
    `gcloud container clusters get-credentials cluster_name --region europe-west2 --project project_name`
    
    Replacing `cluster_name` and `project_name` with their actual values. If you can't find the actual values go to Google Cloud Console, from the left hand menu hover on "Kubernetes Engine", then select "clusters", click on one of the clusters in the list of clusters and in top menu chose "connect". 

1. Deploy the pod:
   `kubectl apply -n namespace -f pod.yml`
   Replace `namespace` and `pod.yml` with your actual namespace and location to `.yml` file defined in step 1. of this section.

1. Copy the dataset onto the pod:

    If you have the necessary dataset on your local machine copy it over, otherwise if it needs to be downloaded, you can `wget`-it after attaching to the pod (see next section).

    `kubectl cp local/path/to/dataset your-pod-name:/`

# Run The Experiment 

![Meme on ML Experiments](/assets/k8s-experiments/experiment.png)

1. [Install `k9s`](https://github.com/derailed/k9s#installation). It's a terminal UI for managing K8s pods, that will preserve your sanity.

1. Attach to your pod:

    Start k9s by typing `k9s` in your terminal.

    Type `:pods<enter>` to look for pods.

    Navigate to the relevant pod using arrow keys (or j,k) and press enter.

    Press `a` to attach to the selected pod.

    Be careful, if you press ctrl-d to exit the terminal, it will kill the pod.

1. Run your experiment: 

    Make sure the script outputs all files you'll want to save in the persistent directory.

1. Collect the results from the pod:

    `kubectl cp your-pod-name:/persistent/out local/path`

    If the pod died, check the logs to verify that the script had finished before the pod died and start the pod again with `kubectl apply pod.yml` before running the `cp` command above.

    To check K8s logs with K9s follow step 2. in this section but press `l` instead of `a`. If the pod is not listed at all on K9s (after running it) use Google Cloud Console to search for the relevant logs.
