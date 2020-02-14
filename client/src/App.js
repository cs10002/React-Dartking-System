import React, { Component } from 'react';
import './App.css';
import DartkingList from './components/DartkingList';   // List 
import Paper from '@material-ui/core/Paper'             // 페이퍼 
import Table from '@material-ui/core/Table'             // 테이블 
import TableHead from '@material-ui/core/TableHead'     // 테이블 헤더
import TabTableBodyle from '@material-ui/core/TableBody'// 테이블바디
import TableRow from '@material-ui/core/TableRow'       // 테이블 row
import TableCell from '@material-ui/core/TableCell'     // 테이블 col  
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';  // CSS 스타일 적용


// 스타일적용
const styles = theme =>({
  root:{
     width:"100%",
     margintop:theme.spacing.unit*3,
     overflowX:"auto"
  },
  table:{
    minWidth:1080
  }
});

// json 만들기
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
// const member = [
//   {
//       'id': 1,
//       'image': 'https://placeimg.com/64/64/any',
//       'name': '김시용',
//       'nicname': '불시용',
//       'age': '37',
//       'gender': '남자',
//       'vp': 16
//   } 
//   ,
//   {
//     'id': 2,
//     'image': 'https://placeimg.com/64/64/any',
//     'name': '서용태',
//     'nicname': '수용태',
//     'age': '33',
//     'gender': '남자',
//     'vp': 20
//   } 
//   ,
//   {
//     'id': 3,
//     'image': 'https://placeimg.com/64/64/any',
//     'name': '오태준',
//     'nicname': '오짱',
//     'age': '34',
//     'gender': '남자',
//     'vp': 30
//   } 
//   ,
//   {
//     'id': 4,
//     'image': 'https://placeimg.com/64/64/any',
//     'name': '이혜광',
//     'nicname': '혜광불패',
//     'age': '41',
//     'gender': '남자',
//     'vp': 31
//   } 
// ]

// React DartKingList Start1
class App extends Component{

  state = {
    members:''
  }

  // 이벤트 설정
componentDidMount() {
  this.callApi()
  .then(res => this.setState({members: res}))
  .catch(err => console.log(err));
  }
  


callApi = async () => {
    const response = await fetch('/api/members');
    const body = await response.json();
    return body;
}
    


  render(){
    const{classes } = this.props;
    return (
      // list
         /*<DartkingList
           id={member.id}
           image={member.image}
           name={member.name}
           age={member.age}
           vp={member.vp}                  
         />*/      
       <Paper>
         <Table className={classes.root}>{/* 테이블 */}
           <TableHead className={classes.table}> {/*테이블 헤더*/}
             <TableRow>{/*테이블 Row*/}
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>나이</TableCell>
              <TableCell>닉네임</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>승점</TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {/*테이블 List*/}
            {this.state.members?this.state.members.map( i =>{
                return <DartkingList key={i.id} id={i.id} name={i.name} nicname={i.nicname} image={i.image} age={i.age} vp={i.vp} gender={i.gender}/>
              }):''} 
           </TableBody>
         </Table>
       </Paper>
    );
  }
}
// Styles 적용
export default withStyles(styles)(App);
