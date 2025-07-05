import admin from "../models/admin.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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


export {register, login};