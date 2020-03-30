import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { withStyles, Theme  } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper'                       // 페이퍼 
import Table from '@material-ui/core/Table'                       // 테이블 
import TableHead from '@material-ui/core/TableHead'               // 테이블 헤더
import TableRow from '@material-ui/core/TableRow'                 // 테이블 row
import TableCell from '@material-ui/core/TableCell'               // 테이블 col  
import TableBody from '@material-ui/core/TableBody';              // 테이블 body
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress' // 프로그래스바


// radio
import { green } from '@material-ui/core/colors';
import Radio, { RadioProps } from '@material-ui/core/Radio';

// 스타일 작성
const styles = theme => ({
  hidden: {
   display: 'none'
  },
  Paper:{
    marginLeft:3,
    marginRight:3
  },
  /* 프로그래스바 설정 */
  progress:{
    margin:theme.spacing.unit*2
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  tableHead:{
    fontSize:'1.0rem',
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  }

});

// 승점 입력기
class DartKingVpAdd extends React.Component{

    constructor(props) {
        super(props);    
        this.state = {
          open: false,
          name:this.props.name,
          id:this.props.id,  
          vp:'1',
          completed:0,
          today:this.props.toDay,
          toDate:'',
          vplist:''
        }        
    }
    
    // 모달창 열기
    handleClickOpen=()=>{
        this.setState({
          open:true
        });

        this.setState({
          toDate:this.dateFormat(this.state.today,"-")          
        });        
        this.vpSearch();

      }
     
      // 모달창 닫기
      handleClose=()=>{
        this.setState({
          open:false
        });
      }

    // value 변경시
     handleValueChange=(e)=>{
      let nextState ={};
      nextState[e.target.name] = e.target.value;
      this.setState(nextState);
     }
     

     vpSearch=()=> {
      //this.timer = setInterval(this.progress,20); // 0.02초마다 this.progress
      // 서버호출
      this.callApi2()
      .then(res => this.setState({vplist: res}))
      .catch(err => console.log(err));
      }
     callApi2 = async () => {
       let argId   = this.state.id;
       let argDate = this.state.today;
       let argVp_gbcd = "vp01";

        const response = await fetch('/api/vplist/'+argId+'/'+argDate+'/'+argVp_gbcd);
        const body     = await response.json();
        return body;
    }

     vpAdd(id,vp){
      const url = '/api/members/'+ id+"/"+vp;
      fetch(url, {
           method: 'GET'
      });
     this.props.stateRefresh();
    }
    
    // 날짜포맷
     dateFormat=(date,gubn)=>{
      let yyyy = date.substr(0,4);
      let mm   = date.substr(4,2);
      let dd   = date.substr(6,2);
      let changeDt = yyyy+gubn+mm+gubn+dd;
      return changeDt;
    }

      render() {
      const {classes} = this.props;
      const cellList =["번호","평가등급","승점"];
        return (
          <div>
            <Button size={"small"} variant="contained" color="secondary" onClick={this.handleClickOpen}>
             {this.props.vp}
            </Button>
            <Dialog onClose={this.handleClose} open={this.state.open}>
              <DialogTitle onClose={this.handleClose}>
                승점 입력
              </DialogTitle>
              <DialogContent>
                <Typography align={'center'}>
                 <Link href="#" >
                  <span class="MuiButton-startIcon MuiButton-iconSizeLarge"><svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg></span>
                </Link> { this.state.toDate } 
                <Link href="#" >
                 <span class="MuiButton-endIcon MuiButton-iconSizeLarge"><svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg></span>
                </Link> 
                </Typography>    
                <Paper className={classes.Paper}>
                <Table className={classes.table} size={"small"}>{/* 테이블 */}
                  <TableHead > {/*테이블 헤더*/}
                    <TableRow>{/*테이블 Row*/}
                      {cellList.map(c=>{
                        return <TableCell className={classes.tableHead}>{c}</TableCell>
                      })}
                    </TableRow>
                    </TableHead>
                    
                  <TableBody>
                    {this.state.vplist?this.state.vplist.map( i =>{
                       return (<TableRow>
                                   <TableCell>{i.rn}</TableCell> 
                                   <TableCell>{i.vp_name}</TableCell> 
                                   <TableCell>{i.vp}</TableCell> 
                             </TableRow>)
                     }): 
                     <TableRow>
                     <TableCell colSpan='3' align='center'>
                       승점을 입력해주세요 
                     </TableCell>
                     </TableRow>                        
                    }
                  </TableBody>                  
                  </Table>        
                </Paper>
              
              </DialogContent>              
              <DialogContent>
                <Typography>
                 {this.state.name} 님 평가등급 을 입력 해주세요!
                </Typography>               
                Very Good
                <Radio
                    checked={ this.state.vp === '5'}
                    onChange={this.handleValueChange}
                    name='vp'                   
                    value='5'
                    inputProps={{ 'aria-label': '5' }}
                  />
                Good
                <Radio
                    checked={this.state.vp === '3'}
                    onChange={this.handleValueChange}       
                    name='vp'               
                    value='3'                  
                    inputProps={{ 'aria-label': '3' }}
                  />                  
                Normal
                <Radio
                    checked={ this.state.vp === '1'}
                    onChange={this.handleValueChange}
                    name='vp'                      
                    value='1'
                    inputProps={{ 'aria-label': '1' }}
                  />
                Bad
                <Radio
                    checked={ this.state.vp === '0'}
                    onChange={this.handleValueChange}
                    name='vp'                   
                    value='0'
                    inputProps={{ 'aria-label': '0' }}
                  />                  
                <Button size={"small"} variant="outlined" color="primary"  onClick={(e)=>{this.vpAdd(this.state.id,this.state.vp)}}>승점 입력</Button>
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
              </DialogActions>
            </Dialog>
          </div>
        )
    }

}

export default withStyles(styles)(DartKingVpAdd)