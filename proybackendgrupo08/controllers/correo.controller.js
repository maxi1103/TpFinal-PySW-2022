const {request,response}= require('express');
const nodeMailer = require('nodemailer');

const enviarCorreo = (req=request,resp=response)=>{
    let body = req.body;

    let config = nodeMailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        secure: false, // true for 465, false for other ports
        auth:{
            user:'42017525@fi.unju.edu.ar',
            pass:'nata17181502'
        }
    });

    const opciones = {
        from:'Empresarios 👻',
        subject:body.asunto,
        to:body.email,
        text:body.mensaje
    
    };
     
    config.sendMail(opciones,function(error,result){
        if (error) return resp.json({ok:false,msg:error })
        return resp.json({
            ok:true,
            msg:result
        })
    })
}


module.exports ={
    enviarCorreo
};