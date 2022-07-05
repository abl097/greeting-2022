const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const  nodeMailer = require('nodemailer');


const PORT = process.env.process || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const wishdata = require("./src/Model/data")

app.use(express.static(path.join(__dirname , '/Public'))); 
app.set('view engine','ejs');
app.set('views','./views');

app.get("/" , (req,res)=>{
    res.render("index");
})

app.post("/post" , (req,res)=>{
    console.log(req.body);

    data = {
        yourname:req.body.yourname,
        friendsname:req.body.friendsname,
        email:req.body.email
    }
    console.log(data);

    var item = wishdata(data);
    item.save((err,result)=>{
        console.log(result)

        if (err){
            console.log(err)
        }
        else{
            res.render('homepage',{item});
        }
        console.log(item)
    }) 
})


app.get("/wish/:id" , (req,res)=>{
    var id = req.params.id;
    wishdata.findOne({_id: id})
  .then((user)=>{  
  res.render("landingpage",{user});
  })
 
});

app.get("/mailer/:id" , (req,res)=>{

    var id = req.params.id;
    wishdata.findOne({_id: id})
  .then((user)=>{ 

    console.log(user)

    let mailTransporter = nodeMailer.createTransport({
        service: 'outlook',
        auth: {
            user: 'blarun001@outlook.com',
            pass: 'Hope4best'
        }
    });
      

    let mailDetails = {
        from: 'blarun001@outlook.com',
        to: user.email,
        subject: 'Happy 2022 from '+ user.yourname,
        text: 'You have a greeting from ' + user.yourname +' please click on the link to view it https://greeting-2022.herokuapp.com/wish/'+user._id
    };
      
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log(err);
            res.send(Error)

        } else {
            console.log(mailDetails);
            console.log('Email sent successfully');
            res.send(Success)
        }
    });
    })
    });



app.listen(PORT , (req,res)=>{
    console.log(`Server Running on PORT ${PORT}`);
})