import admin from "../models/admin.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import music from "../models/music.model.js";
import path from "path";

const register = async (req, res) => {
    try{
         const {username, password, email} = req.body;
         if(!username || !password || !email){
            return res.status(400).json({success: false, message:" All fields are required."});
         }


         const existingUser = await admin.findOne({ email });
            if(existingUser){
                return res.status(400).json({success: false, message:"Email already exists."});
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new admin({
                username,
                email,
                password:hashedPassword,
            })
            await newUser.save()


            const token = jwt.sign({id: newUser._id},process.env.jwt_SECRET,{expiresIn: '7d'});
            res.cookie(token, {
                httpOnly: false,
                secure: false,
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            })

            const userResponse = {
                id : newUser._id,
                username : newUser.username,
                email : newUser.email,
            }

            res.status(201).json({success : true, message : 'user registered',user : userResponse,token})

        } 
        catch (error) {
            console.error("Error in admin registration:", error);
            return res.status(500).json({success: false, message:"Internal server error."});
        }
             
    }

const login = async (req, res) => {
    try {
         const {email, password} = req.body
         if(!email || !password){
            return res.status(400).json({success:false, message: "all fields are required."});
         }

         const user = await admin.findOne({email})
         if (!user) {
            return res.status(400).json({success: false, message: "Invalid email or password."})
         }

         const isPasswordValid = await bcrypt.compare(password, user.password)
         if (!isPasswordValid){
            return res.status(400).json({success: false, message: "Invalid email or password."})
         }
         const token = jwt.sign({id: user._id}, process.env.jwt_SECRET,{expiresIn: '7d'});
          res.cookie("token", token, {
            httpOnly: false,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
          })

          const userResponse = {
            id : user._id,
            username : user.username,
            email : user.email,
          }
          res.status(200).json({success : true, message : 'login successful', user: userResponse, token});


    } catch (error) {
        console.error("Error in admin login:", error);
        return res.status(500).json({success: false, message:"Internal server error."});
        
    }
}

const uploadMusic = async (req, res) => {
    try {
        const {title, artist} = req.body
        if(!title || !artist){
            return res.status(400).json({success: false, message:"All fields are required."});
        }

        const musicFile = req.files.music?.[0];
        const imageFile = req.files.image?.[0];

        if (!musicFile || !imageFile) {
            return res.status(400).json({success: false, message:"Music file and image are required."});
        }

        const allowedExtensions = ['.mp3', '.jpg', '.jpeg', '.png', '.webp', '.wav'];
        const musicExt = path.extname(musicFile.originalname).toLowerCase();
        const imageExt = path.extname(imageFile.originalname).toLowerCase();

        if (!allowedExtensions.includes(musicExt) || !allowedExtensions.includes(imageExt)) {
            return res.status(400).json({success: false, message:"Invalid file type. Only audio (.mp3, .wap) and image ( '.jpg', '.jpeg', '.png', '.webp',) files are allowed."});
        }

        const filePath ="upload/"+ musicFile.filename;
        const imagePath ="upload/"+ imageFile.filename;
        // const filePath = musicFile.filename;
        // const imagePath =imageFile.filename;
        const newMusic = new music({
            title,
            artist,
            filePath,
            imagePath
        });
        await newMusic.save();
        res.status(201).json({
            success: true,message: "Music uploaded successfully.", newMusic}); 
            
        } catch (error) {
            console.error("Error in uploading music:", error);
            return res.status(500).json({success: false, message:"Internal server error."});            
        }
}

const getMusic = async (req, res)  => {
    try {
        const musics = await music.find()
        if (!musics || musics.length === 0){
            return res.status(404).json({success: false, message: "No music found."});
        }
        res.status(200).json({success: true, message: "Music fetched successfully.", musics});

        
    } catch (error) {
        console.error("Error in fetching music:", error);
        return res.status(500).json({success: false, message:"Internal server error."});
        
    }
}

const deleteMusic = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({success: false, message: "Music ID is required."});
        }
        const musicToDelete = await music.findByIdAndDelete(id);
        if (!musicToDelete) {
            return res.status(404).json({success: false, message: "Music not found."});
        }

        res.status(200).json({success: true, message: "Music deleted successfully.", music: musicToDelete});

    }
    catch (error) {
        console.error("Error in deleting music:", error);
        return res.status(500).json({success: false, message:"Internal server error."});
    }
}

export {register, login, uploadMusic , getMusic, deleteMusic}; 