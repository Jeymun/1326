import express from 'express';
import mocksRouter from './api/mocks/mocks.router.js';

const app = express();
app.use(express.json());

// Usar el router de mocks en la ruta base /api/mocks
app.use('/api/mocks', mocksRouter);

app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));
