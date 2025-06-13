build_docker_dev:
	docker build -t cryptorisk-web-dev:latest .
	docker tag cryptorisk-web-dev:latest derwin334/cryptorisk-web-dev:latest
	docker push derwin334/cryptorisk-web-dev:latest
