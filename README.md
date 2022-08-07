# Getting Started with jobs-hr Tech Server

## Configurations

The only setup required is to point your mongoDB uri to the environment variable `MONGODB_CONNECTION_URL`

## Scripts

To start the server in `development mode`, run `yarn dev` or `npm run dev`

To run in production, start by building the project `yarn build` or `npm run build`, then start with `node build/index.js`
