import mongoose, { Mongoose } from "mongoose";

const musicSchema = new mongoose.Schema({
     title : {
            type: String,
            required: true,
            trim: true
        },     
     artist : {
                type: String,
                required: true,
                trim: true 
        },
        filePath : {
                type: String,
                required: true,
                trim: true 
        },
        imagePath : {
                type: String,
                required: true,
                trim: true 
        },
        


},{timestamps: true});

const music = mongoose.model.music || mongoose.model("music", musicSchema);
export default music;