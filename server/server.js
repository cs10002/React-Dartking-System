const fs = require('fs'); // 파일시스템 연동
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mySql 연동
const data  = fs.readFileSync('../database.json');
const conf  = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
  
connection.connect();

let query = "SELECT A.seq ,A.appgbn ,A.id ,A.auth ,A.name ,A.image ,A.nicname";
    query += ",FLOOR( (CAST(REPLACE(CURRENT_DATE,'-','') AS UNSIGNED) - CAST(REPLACE(A.brdt,'.','') AS UNSIGNED)) / 10000 ) age";
    query += ",IF (A.gender= '1','남자','여자')gender FROM MEMBERS A";
//REST API
app.get('/api/members',(req,res)=>{    
   connection.query(query
     ,(err, rows, fields) => {
          res.send(rows);
    }
  ) 
    // res.send([
    //     {
    //         'id': 1,
    //         'image': 'https://placeimg.com/64/64/any',
    //         'name': '김시용',
    //         'nicname': '불시용',
    //         'age': '37',
    //         'gender': '남자',
    //         'vp': 16
    //     } 
    //     ,
    //     {
    //       'id': 2,
    //       'image': 'https://placeimg.com/64/64/any',
    //       'name': '서용태',
    //       'nicname': '수용태',
    //       'age': '33',
    //       'gender': '남자',
    //       'vp': 20
    //     } 
    //     ,
    //     {
    //       'id': 3,
    //       'image': 'https://placeimg.com/64/64/any',
    //       'name': '오태준',
    //       'nicname': '오짱',
    //       'age': '34',
    //       'gender': '남자',
    //       'vp': 30
    //     } 
    //     ,
    //     {
    //       'id': 4,
    //       'image': 'https://placeimg.com/64/64/any',
    //       'name': '이혜광',
    //       'nicname': '혜광불패',
    //       'age': '41',
    //       'gender': '남자',
    //       'vp': 31
    //     } 
    // ]);
});


app.listen(port, () => console.log(`Listening on port ${port}`));
