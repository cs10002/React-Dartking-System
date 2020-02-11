import React, { Component } from 'react';
import './App.css';
import DartkingList from './components/DartkingList';

// json 배열로 만들기
// const member = {
//   'id': 1,
//   'image': 'https://placeimg.com/64/64/any',
//   'name': '김시용',
//   'nicname': '불시용',
//   'age': '37',
//   'gender': '남자',
//   'vp': 0
// }

// json 배열로 만들기
const member = [
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
    'nicname': '18용태',
    'age': '33',
    'gender': '남자',
    'vp': 20
  } 
  ,
  {
    'id': 3,
    'image': 'https://placeimg.com/64/64/any',
    'name': '오태준',
    'nicname': '오점',
    'age': '24',
    'gender': '남자',
    'vp': 30
  } 

]

// React DartKingList Start1
class App extends Component{
  render(){
    return (
      // list
         /*<DartkingList
           id={member.id}
           image={member.image}
           name={member.name}
           age={member.age}
           vp={member.vp}                  
         />*/      
       <div>
         {member.map( i =>{
           return <DartkingList key={i.id} id={i.id} image={i.image} age={i.age} vp={i.vp}/>
         })}         
       </div>
    );
  }
}

export default App;
