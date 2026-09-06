import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './routes/authRoute.js'
import postRouter from './routes/postRoute.js'

const app = express();
const PORT = process.env.PORT || 8000;



const allowedOrigin = ["momento-99cn1erto-palak691s-projects.vercel.app","http://localhost:5173"]
app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.get('/api',(req,res)=>{
  res.send("im root");
});

app.use('/api/auth',authRouter);
app.use('/api/posts',postRouter);

app.use((req,res)=>{
  res.status(404).json({message : "Route not Found!"});
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong'
   res.status(statusCode).json({ message });
});

const start = async () => {
    try{
         await mongoose.connect(process.env.MONGO_URL);
         console.log("mongodb connected");
        app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));

    }catch(err){
      console.log('err occurred', err);
    } 

}

start(); 