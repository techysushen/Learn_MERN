import express  from 'express';
import colors from 'colors';
import dotenv  from 'dotenv';
import connectDB from './config/db.js';
import path from "path";
import productRouter from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import {errorHandler, notFound} from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import morgan from "morgan";

const app = express();

dotenv.config();
connectDB();

if(process.env.NODE_ENV=='development'){
    app.use(morgan('dev'));
}

app.use(express.json());

app.get('/',(req,res) => {
    res.send('Api is running ....')
})

app.get('/api/config/paypal',(req,res)=>res.send(process.env.PAYPAL_CLIENT_ID));
app.use('/api/products', productRouter);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server is running in ${process.env.NODE_ENV} mode at port : ${PORT}`.yellow.bold));