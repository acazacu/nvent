## About this website
The project is a very simple [vue.js](https://vuejs.org) app created via [vue-cli](https://cli.vuejs.org/). I started working on it while training for the AWS Solutions Architect certificate, while deciding to take an exercise one step further by building a [serverless website](https://aws.amazon.com/serverless/) with a [Drone CI](https://drone.io) pipeline to handle its deployments. This work in this repo was done using [Git Flow](https://guides.github.com/introduction/flow/).

There are two parts to this project, the code that you can see in this repo and the CI / CD pipeline set up in AWS.

About the code, it is a vue.js SPA. I went with vue.js as a spike, a client asked me about it and I gave it a go as part of this project. So, this is also a demo.

The pipeline that I set up in AWS handles deploys to production and development. Production is an S3 bucket delivered publicly via Cloudfront. Development is a privately accessible (VPN only) S3 Bucket. Deployments are made in the following manner:
- on every tagged release to master, a deployment is made to production
- on every code push to feature branches, a deployment is made to development, 

Setting this pipeline up had me:
- set up a bastion instance
- set up an openvpn server
- set up a nat gateway for the private instances web access
- set up an ECS deployment for the DroneCI builder with persistance to AWS's RDS
- making all of this into templates, so that I can easily manage and replicate it

Some of these services are provided by AWS as well, however, they come at a cost. This definitely took a lot more time to set up, but it's a lot cheaper to run and it made me wiser. Hopefully :)

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
