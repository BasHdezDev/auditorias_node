import express from 'express';
import AppRoutes from './routes/index.routes.js';

const app = express();

app.use(AppRoutes);

export default app;
