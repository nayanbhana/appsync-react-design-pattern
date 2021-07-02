
AWS_CLI_VERSION=1.16.311
# Compose commands
COMPOSE_RUN_AWSCLI= docker-compose run --rm awscli
COMPOSE_RUN_NODE = docker-compose run --rm -p 3000:3000 -p 35729:35729 node
COMPOSE_BUILD_NODE = docker-compose run --rm node
# all: build

setup: .env
	docker build --build-arg VERSION=$(AWS_CLI_VERSION) -f cicd/docker/awscli.dockerfile -t awscli:$(AWS_CLI_VERSION) .
	docker build -f cicd/docker/node.dockerfile -t node:12.14.1 .

cfn_validate: .env
	$(COMPOSE_RUN_AWSCLI) make _cfn_validate
.PHONY: cfn_validate

deploy: cfn_validate build bootstrap deploy_auth deploy_datastore deploy_es deploy_api deploy_cloudfront deploy_app

build: .env
	$(COMPOSE_BUILD_NODE) make _build
.PHONY: build

bootstrap: .env
	$(COMPOSE_RUN_AWSCLI) make _bootstrap
.PHONY: bootstrap

deploy_auth: .env
	$(COMPOSE_RUN_AWSCLI) make _deploy_auth
.PHONY: deploy_auth

deploy_datastore: .env 
	$(COMPOSE_RUN_AWSCLI) make _deploy_datastore
.PHONY: deploy_datastore

deploy_es: .env 
	$(COMPOSE_RUN_AWSCLI) make _deploy_es
.PHONY: deploy_es

deploy_api: .env
	$(COMPOSE_RUN_AWSCLI) make _deploy_api
.PHONY: deploy_api

deploy_cloudfront: .env
	$(COMPOSE_RUN_AWSCLI) make _deploy_cloudfront
.PHONY: deploy_cloudfront

deploy_app: .env
	$(COMPOSE_RUN_AWSCLI) make _deploy_app
.PHONY: deploy_app

run_local: .env
	$(COMPOSE_RUN_NODE) /bin/sh -c 'cd src/frontend && yarn start'
.PHONY: run_local

clean: .env
	$(COMPOSE_RUN_AWSCLI) make _clean
	docker-compose down --remove-orphans --volumes
	rm .env
.PHONY: clean

# creates .env with .env.template if it doesn't exist already
.env:
	cp .env.template .env

_aws_login:
	dos2unix cicd/scripts/aws_login.sh
	bash cicd/scripts/aws_login.sh

_cfn_validate:
	dos2unix cicd/scripts/cfn_validate.sh
	bash cicd/scripts/cfn_validate.sh

_build:
	dos2unix cicd/scripts/build.sh
	bash cicd/scripts/build.sh

_bootstrap:
	dos2unix cicd/scripts/deploy_bootstrap.sh
	bash cicd/scripts/deploy_bootstrap.sh

_deploy_auth:
	dos2unix cicd/scripts/deploy_auth.sh
	bash cicd/scripts/deploy_auth.sh

_deploy_datastore:
	dos2unix cicd/scripts/deploy_datastore.sh
	bash cicd/scripts/deploy_datastore.sh

_deploy_es:
	dos2unix cicd/scripts/deploy_es.sh 
	bash cicd/scripts/deploy_es.sh

_deploy_api:
	dos2unix cicd/scripts/deploy_api.sh
	bash cicd/scripts/deploy_api.sh

_deploy_cloudfront:
	dos2unix cicd/scripts/deploy_cloudfront.sh
	bash cicd/scripts/deploy_cloudfront.sh

_deploy_app:
	dos2unix cicd/scripts/deploy_app.sh
	bash cicd/scripts/deploy_app.sh
	
_clean:
	rm -rf output/