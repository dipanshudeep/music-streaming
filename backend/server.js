import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import cors from 'cors';
import connectDB from './config/db.config.js';
import adminRouter from './routes/admin.router.js';
import path from 'path';



connectDB();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(json());
app.use(cors({
  origin:['https://music-streaming-psi.vercel.app/','*']
}));

app.use('/upload', express.static(path.join(path.resolve(), 'upload')));
app.use('/api/admin',adminRouter)

app.get('/', (req, res) => {
  res.send('Welcome to the Music Streaming Backend!'); 
});

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});

// music-streaming   mongodb+srv://dipanshu:music-streaming@cluster0.y8u3plr.mongodb.net/