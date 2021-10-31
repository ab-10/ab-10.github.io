---
layout: post
title: "Preprocessing Data Science Experiments on K8s"
categories: Tutorials
---

# Motivation

# Pros/Cons

+ Define hardware specifically for the experiment's needs.

+ Leave a long-running process without affecting your main machine and/or VM.

- Requires more setup than running a process on an existing machine.

- Modifications to the experiment's code require a couple of additional steps prior to running.

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

1. Define the K8s pod in a `.yml` file:

    _We'll call it `pod.yml` but feel free to use any filename you like._

1. Install `kubectl`:

1. Deploy the pod:

1. Copy the dataset onto the pod:

    If you have the necessary dataset on your local machine copy it over, otherwise if it needs to be downloaded, you can `wget`-it after attaching to the pod (see next section).

    `kubectl cp local/path/to/dataset your-pod-name:/`

# Run The Experiment 

1. [Install `k9s`](https://github.com/derailed/k9s#installation). It's a terminal UI for managing K8s pods, that will preserve your sanity.

1. Attach to your pod:



# (Optional) Attach a Persistent Volume to The Pod
