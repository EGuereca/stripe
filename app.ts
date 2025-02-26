import express from 'express';
import routes from './src/routes/index';
import cors from 'cors';
import 'dotenv/config';


const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(cors());



app.use('/v1/api', routes);

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});