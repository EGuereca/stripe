import express from 'express';
import routes from './src/routes/index';
import cors from 'cors';
import 'dotenv/config';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const app = express();
const PORT = process.env.PORT;

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Pagos',
            version: '1.0.0',
            description: 'Documentación de la API de pagos'
        },
        servers: [
            {
                url: `http://localhost:${PORT}`
            }
        ]
    },
    apis: ['./src/routes/*.ts']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(express.json());
app.use(cors());



app.use('/v1/api', routes);

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📚 Documentación disponible en http://localhost:${PORT}/api-docs`);
});