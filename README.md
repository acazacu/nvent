## About this website
The project is a very simple [vue.js](https://vuejs.org) app created via [vue-cli](https://cli.vuejs.org/). I started working
on it while training for the AWS Solutions Architect certificate, while deciding to take one exercise a step further by building
a [serverless website](https://aws.amazon.com/serverless/) with a CD pipeline.

There are two parts to this project: the code and the pipeline setup.

You can see the code in the repo and here's how the pipeline that I set up in AWS looks like:
- it has a private domain used to access S3 dev environment
- it has a private domain used to access the [Drone CI](https://drone.io) Builder that I set up with ECS
- it has a NAT Gateway that enables the builder to talk to this repo 
- it sets up an OpenVPN server that allows me connect to the AWS VPC to access the private resources and domains
- it sets up a [Drone CI](https://drone.io) pipeline to consume this repo's [Git Flow](https://guides.github.com/introduction/flow/). The pipeline:
- deploys tagged releases made in this repo to master into production env via Drone: S3 via Cloudfront, publicly accessible 
- deploys all feature branch pushes made in this repo into the dev environmentvia Drone : S3, privately accessible     

This setup is all custom, I didn't use AWS's service stack for NAT, VPN, code building and deploying.

Why Vue? A client asked me about it, so I set this up as a demo for them. Otherwise, for a mostly static website
like this one, plain HTML would do the trick :)

#### Setup
```
yarn install
```

#### Run the dev server locally
```
yarn run serve
```
The .env.development file is used to build the S3 development environment code. In an unfortunate
naming collision, vue-cli uses the same file to run its webpack dev server environment locally.
To fix this, I've added an .env.development.local config file containing the below listed configuration
options:

```
NODE_ENV=development
VUE_CONFIG_BASE_URL=/
VUE_CONFIG_PRODUCTION_SOURCE_MAP=true
VUE_CONFIG_CSS_EXTRACT=false
VUE_CONFIG_CSS_SOURCE_MAP=true
VUE_APP_ROUTER_MODE=history
VUE_APP_CLI_MODE=development
```
Add this to your project and `yarn run serve` should work fine and dandy.

#### Build for production
```
yarn run build --mode production
```

#### Build for development
```
yarn run build --mode development
```
All pushes to feature branches trigger a dev environment deployment. The dev environment is a
privately accesible S3 bucket that doesn't have a CloudFront distro in front of it. The code it
runs is compiled for production with a few differences:
 - it enables sourcemaps for both css and ts / vue
 - it switches the router history off, as that doesn't work properly without Cloudfront
 - it enables usage of Vue's Devtools in Chrome
 
This config can be found in .env.development.

#### Lints and fixes files
```
yarn run lint
```

#### Run your unit tests
```
yarn run test:unit
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### What's next?
A simple contact page.
