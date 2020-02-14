const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//REST API
app.get('/api/members',(req,res)=>{
    res.send([
        {
            'id': 1,
            'image': 'https://placeimg.com/64/64/any',
            'name': '김시용',
            'nicname': '불시용',
            'age': '37',
            'gender': '남자',
            'vp': 16
        } 
        ,
        {
          'id': 2,
          'image': 'https://placeimg.com/64/64/any',
          'name': '서용태',
          'nicname': '수용태',
          'age': '33',
          'gender': '남자',
          'vp': 20
        } 
        ,
        {
          'id': 3,
          'image': 'https://placeimg.com/64/64/any',
          'name': '오태준',
          'nicname': '오짱',
          'age': '34',
          'gender': '남자',
          'vp': 30
        } 
        ,
        {
          'id': 4,
          'image': 'https://placeimg.com/64/64/any',
          'name': '이혜광',
          'nicname': '혜광불패',
          'age': '41',
          'gender': '남자',
          'vp': 31
        } 
    ]);
});



app.listen(port, () => console.log(`Listening on port ${port}`));
