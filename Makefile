frontend-ng: frontend/src frontend/*.json
	cd frontend; \
	ng build --prod;

frontend-docker: frontend-ng
	docker build -f frontend/Dockerfile -t esn_corona_sport_frontend frontend/ 

backend-docker:
	cd server; \
	docker build . -t esn_corona_sport_backend

all: frontend-ng frontend-docker backend-docker

export:
	docker save esn_corona_sport_backend:latest > esn_corona_sport_backend.tar
	docker save esn_corona_sport_frontend:latest > esn_corona_sport_frontend.tar