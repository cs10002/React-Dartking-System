const fs = require('fs'); // 파일시스템 연동
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mySql 연동
const data   = fs.readFileSync('../database.json');
const conf   = JSON.parse(data);
const mysql  = require('mysql');
const multer = require('multer');
const upload = multer({dest: '../upload'})

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
  
connection.connect();


    //REST API
app.get('/api/members',(req,res)=>{    
  let query = "SELECT  A.seq ,A.appgbn ,A.id ,A.auth ,A.name ,A.image ,A.nicname";
      query += ",FLOOR( (CAST(REPLACE(CURRENT_DATE,'-','') AS UNSIGNED) - CAST(REPLACE(A.brdt,'.','') AS UNSIGNED)) / 10000 ) age";
      query += ",IF (A.gender= '1','남자','여자')gender , @rownum := @rownum+1 AS rn FROM MEMBERS A , (SELECT @rownum :=0) AS R WHERE  A.isDeleted = 0";   
      
      console.log(query);
   connection.query(query
     ,(err, rows, fields) => {
          res.send(rows);
    }
  ) 
});

app.use('/image', express.static('../upload'));

app.post('/api/members', upload.single('image'),(req, res) =>{
   let sql    = 'INSERT INTO MEMBERS (seq , appgbn, id, pass, auth, name, image, nicname,brdt, gender, regDt, updDt,createdDate,isDeleted) VALUES(null,?,?,?,?,?,?,?,?,?,now(),now(),now(),0)';   
   let appgbn    = 'a001';
   let id        = req.body.id;
   let pass      = req.body.pass;
   let auth      = 'a2';
   let name      = req.body.name;
   let image     =  '/image/' + req.file.filename;
   let nicname   = req.body.nicname;
   let brdt      = req.body.brdt;
   let gender    = req.body.gender;

   console.log(image);
   let params    =[appgbn,id,pass,auth,name,image,nicname,brdt,gender]
   
   connection.query(sql,params,(err,rows,fields)=>{
     console.log(err);
      res.send(rows);
   });

});

// 삭제 모듈
app.delete('/api/members/:id', (req, res) => {

  let sql = 'UPDATE MEMBERS SET isDeleted = 1 WHERE id = ?';

  let params = [req.params.id];
    connection.query(sql, params,
    (err, rows, fields) => {
    res.send(rows);
    }
   )
  });
  
app.listen(port, () => console.log(`Listening on port ${port}`));
