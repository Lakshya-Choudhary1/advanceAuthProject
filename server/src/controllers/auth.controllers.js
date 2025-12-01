import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../schema/user.schema.js"
import generateVerificationCode from "../utils/generateVerificationCode.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import {sendVerificationEmail , sendWelcomeEmail ,sendResetPasswordEmail,sendResetPasswordSuccessEmail,sendLastLoginDateEmail} from "../mailtrap/email.js"

const SALT_ROUND  =  5 ;

export const signup = async(req,res)=>{
     const {email,password,name} = req.body;
     try{
          if(!email || !password || !name ){
               throw new Error("ALL FILED REQUIRED IN SIGNUP.CONTROLLERS")
          }
          
          const userAlreadyExists =await User.findOne({email})

          if(userAlreadyExists){
               return res.status(401).json({success:false , message : "USER ALREADY EXISTS"});
          }
          
          const hashPassward = await bcrypt.hash(password,SALT_ROUND);
          const verificationToken = generateVerificationCode();

          const newUser = new User({
               name,
               email,
               password:hashPassward,
               verificationToken,
               verificationTokenExpiresAt:Date.now() + (1000*60*15)             
          })

          await newUser.save();

          //jwt
          generateTokenAndSetCookie(res,newUser._id);

          //sent otp verification
          // await sendVerificationEmail(newUser.email,verificationToken);

          return res.status(201).json({
               success:true,
               message:'User created successfully',
               user:{
                    ...newUser._doc,
                    password:null
               }
          })

     }catch(err){
          return res.status(400).json({success:false , message: err.message});
     }
}

export const login = async(req,res)=>{
     try{
          const {email,password} = req.body;
          const user = await User.findOne({email});

          if(!user){
               return res.status(400).json({success:false,message:"email not exists!!"})
          }

          const encryptedPassword = await bcrypt.compare(password,user.password)

          if(!encryptedPassword){
               return res.status(400).json({success:false,message:"wrong password"})
          }

          generateTokenAndSetCookie(res,user._id);

          user.lastLogin = new Date();
          await user.save()

          // await sendLastLoginDateEmail(user.email,user.lastLogin)
          return res.status(200).json({success:true,message:"login successfull",user:{
               ...user._doc,
               password:null
          }})

     }catch(err){
          return res.status(400).json({success:false,message:err.message})
     }
}

export const logout = async(req,res)=>{
     try{
          if(res.cookie("token")) res.clearCookie("token");
          res.status(200).json({success:true,message:"logout successfull"})
     }catch(err){
          return res.status(400).json({success:false,message:err.message})
     }
}

export const verifyEmail = async(req,res) =>{
    try{
          const {code} = req.body;
          const user =  await User.findOne({
               verificationToken: code,
               verificationTokenExpiresAt: {$gt : Date.now()}
          })

          if(!user){
               return res.status(404).json({success:false,message:"NO USER EXISTS OR VERIFICATION TOKEN EXPIRED!!"})
          }

          user.isVerified = true;
          user.verificationToken = undefined;
          user.verificationTokenExpiresAt = undefined
          await user.save();
          // await sendWelcomeEmail(user.email,user.name);

          return res.status(200).json({
               success:true,
               message:"VALID VERIFICATION CODE",
               user:{
                    ...user._doc,
                    password:null
               }
          })
    }catch(err){
     return res.status(400).json({success:false , message: err.message});
    } 
}

export const forgotPassword = async(req,res)=>{
     try{
          const {email} = req.body;
          const user = await User.findOne({email});

          if(!user){
               return res.status(400).json({
                    success:false,
                    message:"Email Does Not Exists!!"
               })
          };

          const resetToken =  crypto.randomBytes(20).toString("hex");
          user.resetPasswordToken = resetToken;
          user.resetPasswordExpiresAt = Date.now() + (1000*60*60*1);
          await user.save();

          const url = process.env.CLIENT_URL;
          await sendResetPasswordEmail(user.email,`${url}/reset-password/${resetToken}`);

          return res.status(200).json({
               success:true,
               message:"Reset Link Sent On Mail"
          })

     }catch(err){
          return res.status(400).json({success:false,message:err.message});
     }
}

export const resetPassword = async(req,res)=>{
     const {id} = req.params;
     const {password} = req.body;
     try{
          const user = await User.findOne({
               resetPasswordToken:id,
               resetPasswordExpiresAt: {$gt :Date.now()}
          })

          if(!user){
               return res.status(400).json({
                    success:false,
                    message:"Session Expired"
               })
          }

          const hashPassward = await bcrypt.hash(password,SALT_ROUND);

          user.password = hashPassward;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpiresAt = undefined;

          await user.save();
          await sendResetPasswordSuccessEmail(user.email)
          return res.status(200).json({
               success:true,
               user:{
                    ...user._doc,
                    password:undefined
               }
          })

     }catch(error){
          return res.status(400).json({
               success:false,
               message:error.message
          })
     }
}

export const checkAuth = async(req,res)=>{
     try{
          const user = await User.findById(req.userId)

          if(!user){
               return res.status(401).json({
                    success:false,
                    message:"no user exists"
               })
          }

          res.status(200).json({
               success:true,
               user:{
                    ...user._doc,
                    password:null
               }
          })

     }catch(err){
          return res.status(401).json({
               success:false,
               message:err.message
          })
     }
}