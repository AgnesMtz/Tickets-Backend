import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: process.env.E_MAIL, 
      pass: process.env.EPASSWORD, 
    },
  });

  transporter.verify().then(()=>{
    console.log("Listo para mandar correos");
})