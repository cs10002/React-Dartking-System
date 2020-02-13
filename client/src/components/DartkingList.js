import React from 'react';
import TableRow from '@material-ui/core/TableRow';  //  테이블 Row  만들기
import TableCell from '@material-ui/core/TableCell' //  테이블 cell 만들기


// dartKingList Component 
class DartkingList extends React.Component{   
   render(){
      const pr  = this.props;
       return(
          <TableRow>
             <TableCell>{pr.id}</TableCell>                                {/* id */}
             <TableCell><img src={pr.image} alt = "profile" /></TableCell> {/* image */}
             <TableCell>{pr.name}</TableCell>   {/* 이름  */}
             <TableCell>{pr.age}</TableCell>    {/* 나이  */}
             <TableCell>{pr.nicname}</TableCell>{/* 닉네임*/}
             <TableCell>{pr.gender}</TableCell> {/* 성별  */}
             <TableCell>{pr.vp}</TableCell>     {/* 승점  */}
          </TableRow>
      )
   }
}

//다트회원프로필
class MemberInfo extends React.Component{
   render(){      
      const pr = this.props;
      return(
         <div>
             <img src={pr.image} alt="profile"/>
             <h2>{pr.name}({pr.age})</h2>             
             <p>{pr.nicname}</p>
         </div>
      )
   }
}

//승점
class MemberVp extends React.Component{
   render(){
      return(
         <div>
            <p>승점: {this.props.vp}</p>
         </div>
      )
   }
}

export default DartkingList;
