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

export default DartkingList;
