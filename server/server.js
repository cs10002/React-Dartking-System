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
      query += "      ,FLOOR( (CAST(REPLACE(CURRENT_DATE,'-','') AS UNSIGNED) - CAST(REPLACE(A.brdt,'.','') AS UNSIGNED)) / 10000 ) age";
      query += "      ,IF (A.gender= '1','남자','여자')gender "; 
      query += "      ,IFNULL(SUM(B.VP),0) vp";       
      query += "      ,DATE_FORMAT(now(), '%Y%m%d')toDay";       
      query += "      ,@rownum := @rownum+1 AS rn ";    
      query += " FROM MEMBERS A LEFT OUTER JOIN MEMBERS_VP B ON A.appgbn = B.appgbn  AND A.id = B.id ,(SELECT @rownum :=0) AS R ";
      query += " WHERE  A.isDeleted = 0"; 
      query += " GROUP BY A.seq ,A.appgbn,A.id,A.auth,A.name,A.nicname,A.image,A.gender";
      query += " ORDER BY VP DESC";     
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

  app.get('/api/members/:id/:vp', (req, res) => {

    let sql = 'INSERT INTO MEMBERS_VP (seq,appgbn,id,vp_gbcd,vp_dt,vp,regDt,updDt) VALUES(null,?,?,?,now(),?,now(),now())';
    let appgbn    = 'a001';
    let id        = req.params.id;
    let vp        = req.params.vp;
    let vp_gbcd   = 'vp01';
    let params    = [appgbn,id,vp_gbcd,vp];

     console.log(params);
     console.log(sql);


      connection.query(sql, params,
      (err, rows, fields) => {

        console.log(err); 
      res.send(rows);
      }
     )
    });

//REST API
app.get('/api/vplist/:id/:date/:vp_gbcd',(req,res)=>{    

  let query  =  "SELECT  A.SEQ,A.id                                ";
      query +=  "       ,CASE WHEN A.VP =5                         ";
      query +=  "        THEN 'VERY GOOD'                          ";
      query +=  "        WHEN  A.vp =3                        ";
      query +=  "        THEN 'GOOD'                               ";
      query +=  "        WHEN  A.vp =1                        ";
      query +=  "        THEN 'NORMAL'                             ";
      query +=  "        WHEN  A.vp =0                        ";
      query +=  "        THEN 'BAD' END AS vp_name                 ";
      query +=  "       ,A.vp                                      ";
      query += "        ,@rownum := @rownum+1 AS rn                ";    
      query +=  "  FROM MEMBERS_VP A  ,(SELECT @rownum :=0) AS R   ";
      query +=  "WHERE A.appgbn   = ?                              ";
      query +=  "  AND A.id       = ?                              ";
      query +=  "  AND A.vp_gbcd  = ?                              ";
      query +=  "  AND A.vp_dt  = DATE_FORMAT(?,'%Y%m%d')          ";
      query +=  "ORDER BY A.SEQ ASC , A.regDt DESC                 ";  


  let appgbn    = 'a001';
  let id        = req.params.id;
  let vp_gbcd   = req.params.vp_gbcd;
  let date      = req.params.date;
  let params    = [appgbn,id,vp_gbcd,date];

   console.log(query);
   connection.query(query,params
     ,(err, rows, fields) => {
          res.send(rows);
    }
  ) 
});


app.listen(port, () => console.log(`Listening on port ${port}`));
