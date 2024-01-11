---
layout: post
title: "Secure Voila"
categories: Tutorials
---

In this article I'll describe how to set up Nginx reverse proxy to provide authentication for Voila web app.

1. Install `nginx` and `apache2_utils`.
2. Setup up authentication
    https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-http-basic-authentication/
3. Run Voila with `voila Widget_API_Demo.ipynb --port 4200 --Voila.tornado_settings="{'allow_origin': '*'}"`
   TODO replace * with origin.
4.
    In `/etc/nginx/nginx.conf`
    (under `http`)
    ```
    map $http_upgrade $connection_upgrade {
        default upgrade;
        '' close;
    ```
    In `/etc/nginx/sites-enabled/default`:
    TODO remove unecessary headers and comments
    ```
            location / {
                    # First attempt to serve request as file, then
                    # as directory, then fall back to displaying a 404.
                    proxy_pass http://10.156.0.2:4200;
                    proxy_http_version 1.1;
                    proxy_set_header Upgrade $http_upgrade;
                    proxy_set_header Connection $connection_upgrade;
                    more_set_headers 'Access-Control-Allow-Origin:*';
                    more_set_headers 'Access-Control-Allow-Methods: GET,POST,OPTIONS';
                    more_set_headers 'Access-Control-Allow-Credentials:true';
                    more_set_headers 'Access-Control-Allow-Headers:DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';

                    # try_files $uri $uri/ =404;
            }
    ```
