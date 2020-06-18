import express from 'express';
import path from 'path';
import cors from 'cors';
import routes from '../routes/api';

// Creates the application
const app = express();

// Configures the application
app.use(cors());
app.use(express.json());

// Routes the application
app.use(routes);
app.use('/images', express.static(path.resolve(__dirname, '..', 'public', 'images')));

// Binds the application
app.listen(8000);
