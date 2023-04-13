const express = require('express');
const app = express()
app.listen(5001);
const mysql = require("mysql2");
const ejs = require('ejs');
app.set('view engine','ejs')
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'jwt'
})
conn.connect((err)=>{
    if(err) throw err;
    console.log("connected");
})

app.get('/',(req,res)=>{
    res.render("search")
})

app.get('/getdata',(req,res)=>{
    let page  = req.query.page || 1;
    let limit = 10;
    let offset = (page - 1) * limit;
    let sql = `select * from student_express limit ${offset},${limit}`;
    let sql2 = 'select count(*) as count from student_express';
    let data = conn.query(sql,(err,result)=>{
        conn.query(sql2,(err,count)=>{
       
        let totPage = Math.ceil(count[0].count/limit);
        console.log(totPage);
        let pages = [];
        for(let i=0; i<totPage; i++){
            pages.push(i);
        }
        res.json({result,page,pages})
        
    });
})
})
