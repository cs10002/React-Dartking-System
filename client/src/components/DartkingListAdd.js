import React from 'react';
import {post} from 'axios'; 

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
            gender:'',
            fileName:'',
            appgubn:''
        }
    }


// form 셋팅
handleFormSubmit=(e)=> {
   e.preventDefault()
   this.addDartKing()
   .then((response) => {
   console.log(response.data);
   })

   this.setState({
    file:null,
    userName:'',
    id:'',
    pass:'',
    name:'',
    nicName:'',
    brdt:'',
    gender:'',
    fileName:'',
    appgubn:''
   })
   window.location.reload();
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

render(){
    return(
        <form onSubmit={this.handleFormSubmit}> 
            <h1> MemberAdd</h1>
            아이디:<input type="text" name="id" value={this.state.id} onChange={this.handleValueChange}/><br/>
            패스워드:<input type="text" name="pass" value={this.state.pass} onChange={this.handleValueChange}/><br/>
            프로필이미지:<input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
            이름:<input type="text" name="name" value={this.state.name} onChange={this.handleValueChange}/><br/>
            닉네임:<input type="text" name="nicName" value={this.state.nicName} onChange={this.handleValueChange}/><br/>
            생년월일:<input type="text" name="brdt" value={this.state.brdt} onChange={this.handleValueChange}/><br/>
            성별:<input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
            <button type="submit">추가하기</button>
        </form>
    )
  }    
}

export default DartkingListAdd
