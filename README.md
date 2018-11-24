## About this website
The project is a very simple [vue.js](https://vuejs.org) app created via [vue-cli](https://cli.vuejs.org/). I started working on it while training for the AWS Solutions Architect certificate, while deciding to take an exercise one step further by building a [serverless website](https://aws.amazon.com/serverless/) and then automating its deployment with [Drone CI](https://drone.io). This work in this repo was done using [Git Flow](https://guides.github.com/introduction/flow/).

If it helps you to know how you should look at all this, here's a list of things that this repo is:
- an excercise for the AWS SAA certification
- a demo for whoever is interested in how I work
- my website (don't take this too seriously)

Now, about the code you see here, it is a [vue.js](https://vuejs.org) single page app. I went with vue.js as a spike, a client asked me about it around the time that I started working on this, so I gave it a go as part of this project. Hopefully, I'll get more creative and add something other than a 3 word homepage to it :-). In time....

The pipeline that I set up in AWS handles deploys this repo to two environments, production and development. Production is an S3 bucket delivered publicly via Cloudfront and development is a privately accessible (VPN only) S3 Bucket. Deployments are made in the following manner:
- on every tagged release to master, a deployment is made to production
- on every code push to feature branches, a deployment is made to development

This is outlined in the .drone.yml file, present in this repo.

If you want to know more about the pipeline itself and how that is set up, I'm not making any promises, but I'm looking into writing some guides on that in the near future. Originally, I went with using OOTB AWS services, but, it turns out that these services incur some extra costs that you can skip by going custom. Not to mention that skipping them forces your hand to learn a thing or two. So, if you want do get your hands dirty, you can:
- setup an OpenVPN server to access your private resources, instead of using a Amazon's VPN specific services (Customer Gateways, VPGs and VPN Connections)
- setup a NAT instance on a normal linux AMI, instead of Amazon's NAT Gateway

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
