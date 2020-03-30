import React from 'react';

// 스타일 관련 api 추가
import {post} from 'axios'; 
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// combox 
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// radio
import { green } from '@material-ui/core/colors';
import Radio, { RadioProps } from '@material-ui/core/Radio';

import { withStyles, Theme  } from '@material-ui/core/styles';


// 스타일 작성
const styles = theme => ({
    hidden: {
     display: 'none'
    },
    formControl: {
        minWidth: 220
      },
      selectEmpty: {
        marginTop: theme.spacing(1),
      },  
      formControl2: {
        minWidth: 75
      },
      selectEmpty: {
        marginTop: theme.spacing(1),
      },
      buttonS:{
        marginTop:15,
        marginBottom:15,
        display:'flex',
        justifyContent: 'center'
      },      
      buttonD:{
        minWidth:5,
        minHeight:5
      },      
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        minWidth: 220
      },

});
    

// DartKingListAdd  
class DartkingListAdd extends React.Component{
    // 생성자 생성
    constructor(props){

        super(props);
        //state 설정
        this.state ={        
            file:null,
            id:'',
            pass:'',
            name:'',
            nicName:'',
            brdt:'',
            gender:'1',
            fileName:'',
            appgubn:'',
            yyyy:'',
            mm:'',
            dd:''
        }
    }

// form 셋팅
handleFormSubmit=(e)=> {

   e.preventDefault()
   this.addDartKing()
   .then((response) => {
    console.log(response.data);
    // 맴버추가 후 부모 함수 호출해서 다시 재조회 하기
    this.props.stateRefresh();
   })

   this.setState({
    file:null,
    userName:'',
    id:'',
    pass:'',
    name:'',
    nicName:'',
    brdt:'',
    gender:'1',
    fileName:'',
    appgubn:'',
    yyyy:'',
    mm:'',
    dd:''    
   })
   //window.location.reload();
   

}
    
// 파일변경시
handleFileChange=(e)=>{
 
 console.log(e.target);
  this.setState({    
    file: e.target.files[0],
    fileName: e.target.value    
  });

}
// value변경
handleValueChange=(e)=>{
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
}

// 서버로 보내기
addDartKing=()=>{

const url ="/api/members";
const formData = new FormData();
 formData.append('image',   this.state.file);
 formData.append('id',      this.state.id);
 formData.append('pass',    this.state.pass);
 formData.append('name',    this.state.name);
 formData.append('nicname', this.state.nicName);
 formData.append('brdt',    this.state.brdt);
 formData.append('gender',  this.state.gender);
 

 const config = {
        headers: {        
        'content-type': 'multipart/form-data'        
        }    
    }    
    return post(url, formData, config);
    
}

// 모달클릭 오픈
handleClickOpen=()=> {

    this.setState({    
        open: true
        
    });
}


// 모달 닫기
handleClose=()=> {
    this.setState({
        file:null,
        userName:'',
        id:'',
        pass:'',
        name:'',
        nicName:'',
        brdt:'',
        gender:'1',
        fileName:'',
        appgubn:'',
        open: false,
        yyyy:'',
        mm:'',
        dd:''
    });
}

render(){

    const {classes} = this.props;
    let yyyy = new Array();
    let mm   = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    let dd   = new Array();
    
    for(let i=0; i<=20; i++){
        let add_i = 1974+i+1;
        yyyy [i] = add_i;
    }
    
    for(let i=0; i<=30; i++){
        let add_i = i+1;
       
        if(add_i <= 9){
          add_i = "0"+add_i;
        }

        dd [i] = add_i;
    }

    return(
       <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
           맴버추가하기
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Member Join </DialogTitle>          
          <DialogContent>
          <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} />
             <label htmlFor="raised-button-file">
              <Button variant="contained" color="primary" component="span" name="file">
               {this.state.fileName === ''? "프로필 이미지 선택" : this.state.fileName}
              </Button>
             </label><br/>

            <TextField label="아이디"   type="text" name="id" value={this.state.id} onChange={this.handleValueChange} /><br/>
            <TextField label="패스워드" type="text" name="pass" value={this.state.pass} onChange={this.handleValueChange} /><br/>
            <TextField label="이름"      type="text" name="name"      value={this.state.name} onChange={this.handleValueChange} /><br/>
            <TextField label="닉네임"    type="text" name="nicName"   value={this.state.nicName} onChange={this.handleValueChange} /><br/>             
            <form className={classes.container} noValidate>
                <TextField
                  name="brdt"
                  label="Birthday"
                  type="date"
                  defaultValue="2019.05.24"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
             </form>
            <InputLabel id="demo-simple-select-label">성별</InputLabel>
             남
            <Radio
                checked={ this.state.gender === '1'}
                onChange={this.handleValueChange}
                value='1'
                name="gender"
                inputProps={{ 'aria-label': '1' }}
              />
              여
            <Radio
                checked={ this.state.gender === '2'}
                onChange={this.handleValueChange}
                value='2'
                name="gender"
                inputProps={{ 'aria-label': '2' }}
              />              
          </DialogContent>
          <DialogActions className={classes.buttonS}>
            <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
            <Button variant="outlined"  color="primary" onClick={this.handleClose}>닫기</Button>
          </DialogActions>
       </Dialog>
       </div>

    )
  }    
}

export default withStyles(styles)(DartkingListAdd)
