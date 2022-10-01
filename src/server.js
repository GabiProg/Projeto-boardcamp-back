import express from 'express';
import categoriaRoute from '../src/routes/categoriaRoute.js';

const server = express();

server.use(express.json());

server.use(categoriaRoute);

server.listen(4000, () => console.log("The server is listening on port 4000"));