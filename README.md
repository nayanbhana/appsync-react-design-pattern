# Introduction 
This repo deploy a sample react app which use cognito for auth and AppSync API for backend services.

# Repo Structure

```
├── README.md
├── cicd         *[deployment scripts and docker agents]*
├── cfn          *[CloudFormation templates]*
└── src          *[Application code]*
└── tests        *[Unit test code]*

All commands and build/deploy activities are invoked from within a container
.env.template is the list of all environment variables passed from local machine to the container. 
.env-<environment> carries variables specific for an environment eg: .env-dev

```

# Getting started

#Pre-requisites: 

1. Docker CE - 19.03.5
2. Docker Compose - 1.24.1

**Project set up**

```bash
make setup
```

**Validate cloudformation templates**

```bash
make cfn_validate
```

**Build code**

```bash
make build
```

**Deploy all**

```bash
make deploy
```

**Run app locally**

```bash
make run_local
```

**Deploy individual stacks**

*Deploy bootstrap infra*

```bash
make bootstrap
```

*Deploy cognito*

```bash
make deploy_auth
```

*Deploy datastore*

```bash
make deploy_datastore
```

*Deploy search*

```bash
make deploy_es
```

*Deploy AppSync API*

```bash
make deploy_api
```

*Deploy Cloudfront*

```bash
make deploy_cloudfront
```

*Deploy frontend code*

```bash
make deploy_app
```


