import React, { Component } from 'react';
import './App.css';
import DartkingList from './components/DartkingList';             // List 
import DartKingListAdd from './components/DartkingListAdd';       // form
import Paper from '@material-ui/core/Paper'                       // 페이퍼 
import Table from '@material-ui/core/Table'                       // 테이블 
import TableHead from '@material-ui/core/TableHead'               // 테이블 헤더         // 테이블바디
import TableRow from '@material-ui/core/TableRow'                 // 테이블 row
import TableCell from '@material-ui/core/TableCell'               // 테이블 col  
import TableBody from '@material-ui/core/TableBody';              // 테이블 body
import CircularProgress from '@material-ui/core/CircularProgress' // 프로그래스바
import { fade,withStyles,makeStyles } from '@material-ui/core/styles';            // CSS 스타일 적용

// App bar
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

// 스타일적용
const styles = theme =>({
  root:{
     width:"100%",
     margintop:theme.spacing.unit*3,
     minWidth:540
  },
  
  Paper:{
    marginLeft:18,
    marginRight:18
  },
  
  menu:{
    marginTop:15,
    marginBottom:15,
    display:'flex',
    justifyContent: 'center'
  },

  /* 프로그래스바 설정 */
  progress:{
      margin:theme.spacing.unit*2
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  tableHead:{
     fontSize:'1.0rem'
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  }  

});


// React DartKingList Start1
class App extends Component{

  constructor(props){
    super(props);
    this.state ={
      members:'',
      completed:0
    }
  }

  // 고객 목록 추가 이후에 새로고침 하는 과정을 구현하는 가장 대표적인 방법은 전체 고객을 불러오게함

  /*  이벤트 시작  */
  stateRefresh= () =>{
    this.setState({
      members:'',
      completed:0,
      searchKeyword: ''
    });
    this.callApi()
      .then(res => this.setState({members: res}))
      .catch(err => console.log(err));    
  }



  // 이벤트 설정
componentDidMount() {
  this.timer = setInterval(this.progress,20); // 0.02초마다 this.progress
  // 서버호출
  this.callApi()
  .then(res => this.setState({members: res}))
  .catch(err => console.log(err));
  }
  
callApi = async () => {
    const response = await fetch('/api/members');
    const body = await response.json();
    console.log(body);
    return body;
}
    
//프로그래스 영역
progress = ()=>{
  const {completed} = this.state;
  this.setState({completed:completed>=100?0:completed+1});
}

  render(){
    // 기본 props 설정
    const{classes} = this.props;
    const cellList =["번호","이미지","이름","나이","닉네임","성별","승점","설정"];

    return (

      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            FM 다트킹 순위
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="검색하기"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>   
      <div className={classes.menu}>
        <DartKingListAdd stateRefresh={this.stateRefresh} /> 
      </div>
           
       <Paper className={classes.Paper}>
         <Table className={classes.table}>{/* 테이블 */}
           <TableHead > {/*테이블 헤더*/}
             <TableRow>{/*테이블 Row*/}
               {cellList.map(c=>{
                 return <TableCell className={classes.tableHead}>{c}</TableCell>
               })}
             </TableRow>
           </TableHead>
           <TableBody>
             {/*테이블 List*/}
             {this.state.members?this.state.members.map( i =>{
                return <DartkingList stateRefresh={this.stateRefresh} rn={i.rn} key={i.seq} id={i.id} seq={i.seq} name={i.name} nicname={i.nicname} image={i.image} age={i.age} vp={i.vp} gender={i.gender} toDay={i.toDay}/>
              }):                            
              <TableRow>
                <TableCell colSpan='7' align='center'>
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                </TableCell>
              </TableRow>              
            } 
           </TableBody>
         </Table>
       </Paper>
       </div>
    );
  }
}
// Styles 적용
export default withStyles(styles)(App);