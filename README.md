# Quarantine Sport Challenge

[Angular CLI](https://github.com/angular/angular-cli) version 6.1.2.

## Server

This project has a simple [CRUD Node Express Server](https://expressjs.com/), run `node server/src/index.js` to launch it. It will deploy to  `http://localhost:8080/`.

## Database

To run the project a MySQL database is necessary. Dev database name and login can be found in `server/src/index.js`. Setup script can be found in the `sql/create.sql`. 

### Angular Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project and don't forget `npm install` on the first build. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build. See package.json for details.

## Proxy

For prod builds a proxy `/api/` is defined for the frontend and has to be configured for the backend e.g. via reverse proxy.
