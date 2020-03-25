frontend-ng: frontend/src frontend/*.json
	cd frontend; \
	ng build --prod;

frontend-docker: frontend-ng
	docker build -f frontend/Dockerfile  frontend/dist/ -t esn_corona_sport_frontend

backend-docker:
	cd server; \
	docker build . -t esn_corona_sport_backend --network host

all: frontend-ng frontend-docker backend-docker