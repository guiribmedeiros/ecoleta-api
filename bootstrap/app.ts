import express from 'express';
import path from 'path';
import cors from 'cors';
import { errors } from 'celebrate';

import routes from '../routes/api';
import config from '../config/app';

// Creates the application
const app = express();

// Configures the application
app.use(cors());
app.use(express.json());
app.use(errors());

// Routes the application
app.use(routes);
app.use('/images', express.static(path.resolve(__dirname, '..', 'public', 'images')));

// Binds the application
app.listen(config.app_port);
