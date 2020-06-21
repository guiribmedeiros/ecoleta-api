import express from 'express';
import path from 'path';
import cors from 'cors';
import routes from '../routes/api';
import { errors } from 'celebrate';

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
app.listen(8000);
