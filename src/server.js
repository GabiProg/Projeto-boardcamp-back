import express from 'express';
import categoriaRoute from '../src/routes/categoriaRoute.js';
import customersRoute from '../src/routes/customersRoute.js';
import gamesRoute from '../src/routes/gamesRoute.js';
import rentalsRoute from '../src/routes/rentalsRoute.js';

const server = express();

server.use(express.json());

server.use(categoriaRoute);
server.use(gamesRoute);
server.use(customersRoute);
server.use(rentalsRoute);

server.listen(4000, () => console.log("The server is listening on port 4000"));