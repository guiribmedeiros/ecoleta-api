import express from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { celebrate, Joi } from 'celebrate';

import PointController from '../app/controllers/PointController';
import ItemController from '../app/controllers/ItemController';

const routes = express.Router();
const pointController = new PointController();
const itemController = new ItemController();

// Items
routes.get('/items', itemController.index);

// Points
routes.get('/points', pointController.index);
routes.get('/points/:id', pointController.show);
routes.post(
    '/points',
    // File upload
    multer({
        storage: multer.diskStorage({
            destination: path.resolve(__dirname, '..', 'public', 'images', 'points'),
            filename(request, file, callback) {
                callback(null, `${crypto.randomBytes(6).toString('hex')}-${file.originalname}`);
            }
        }),
    }).single('image'),
    // Data validation
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        }),
    }, {
        // Returns all errors found
        abortEarly: false,
    }),
    pointController.create
);

export default routes;
