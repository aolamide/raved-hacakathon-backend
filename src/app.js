import express from 'express';
import morgan from 'morgan';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressValidator from 'express-validator';
import cors from 'cors';
// import cors from 'cors';
dotenv.config();
const app = express();

//db
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('DB connected'))
.catch(err => console.log(err));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});

//routes
import fundingRoutes  from './routes/funding.route';
import authRoutes  from './routes/auth';
import userRoutes  from './routes/user.route';

app.get('/', (req, res) => {
    res.json('Hello')
})

// middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
// app.use(cors());
app.use('/', fundingRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use((err, req, res, next) => {
    if(err.name === "UnauthorizedError") {
        res.status(401).json({error : "Unauthorized!"});
    }
})




const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`A node JS API is listening on port ${PORT}`));