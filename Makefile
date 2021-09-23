SERVICE = fe
COMMAND = /bin/bash

up:
	docker compose up -d --build
down:
	docker compose down
run:
	docker compose run --rm ${SERVICE} ${COMMAND}
exec:
	docker compose exec ${SERVICE} ${COMMAND}

yarn/start:
	docker compose run fe yarn start
