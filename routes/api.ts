import express from 'express';
import PointController from '../app/controllers/PointController';
import ItemController from '../app/controllers/ItemController';

const routes = express.Router();
const pointController = new PointController();
const itemController = new ItemController();

// Items
routes.get('/items', itemController.index);

// Points
routes.get('/points', pointController.index);
routes.post('/points', pointController.create);
routes.get('/points/:id', pointController.show);

export default routes;
