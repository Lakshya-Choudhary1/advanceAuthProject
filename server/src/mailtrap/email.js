import { client,sender } from "./mailtrap.config.js";
import {VERIFICATION_EMAIL_TEMPLATE, WELCOME_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE,LAST_LOGGIN_TEMPLATE} from "./emailTemplates.js"


export const sendVerificationEmail = async(email,verificationCode) =>{
     try{
          const recipients = [{email}];
          await client.send({
               from: sender,
               to: recipients,
               subject: "Verify Your Email!!",
               html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationCode),
               category: "EMAIL VERIFICATION",
          });
     }catch(err){
          throw new Error("mailTrap error",err.message);
     }
}

export const sendWelcomeEmail = async(email,name) =>{
     try{
          const recipients = [{email}];

          const response =  await client.send({
               from: sender,
               to: recipients,
               subject: "WELCOME!!",
               html: WELCOME_TEMPLATE.replace("{name}",name),
               category: "Welcome",
          });
          console.log("Email Welcome sent : ",response)
  
     }catch(err){
          throw new Error('mailTrap err',err.message);
     }
}

export const sendResetPasswordEmail=async(email,url)=>{
     const recipients = [{email}];
     try{

          const response = await client.send({
               from:sender,
               to:recipients,
               subject:"Reset Password Link",
               html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",url),
               category:"Reset Password Link"
          })

          
     }catch(error){
          console.log("sendResetPasswordLink Error :" ,error.message);
          throw new Error("sendResetPasswordLink Error:",error.message);
     }
}

export const sendResetPasswordSuccessEmail = async(email)=>{
     const recipients = [{email}]; 
     try{
          const response  = await client.send({
               from:sender,
               to:recipients,
               subject:"Password Reset SuccessFull",
               html:PASSWORD_RESET_SUCCESS_TEMPLATE,
               category:"Successfull Password Reset"
          })
     }catch(error){
          console.log("sendResetPaswordSuccessLink",error.message);
          throw new Error("sendResetPasswordSuccessLink",error.message);
     }
}

export const sendLastLoginDateEmail = async(email,date) => {
     const recipients = [{email}];
     
     try{
          const response = await client.send({
               from:sender,
               to:recipients,
               subject:"Someone have loggedIn",
               html: LAST_LOGGIN_TEMPLATE.replace("{lastLogin}",new Date(date)),
               category:"login"
          });

          console.log(response);

     }catch(err){
          throw new Error("SEND LAST LOGIN DATE EMAIL : ",err.message);
     }
}

