import mongoose from "mongoose";
import { mailsender } from "../utils/mailSender.js";

const otpSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    otp : {
      type : String,
      required : true,
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        expires : 60 * 5,
    }

}, {timestamps: true});

//send verification email function
async function sendVerificationEmail(email,otp){
    try{
       const mailResponse = await mailsender(
        email,
        "Verification Email",
        `<h1>Please confirm your OTP</h1>
        <p>Here is your OTP code : ${otp}
        `
       );
       console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

//a middleware function to send the verification email after the document is creaated.
otpSchema.pre("save", async function (next) {
    console.log("New document saved to the database");
    // Only send an email when a new document is created
    if (this.isNew) {
      await sendVerificationEmail(this.email, this.otp);
    }
    next();
  });
 export default mongoose.model("OTP", otpSchema);