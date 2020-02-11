import React from 'react';

// dartKingList Component 
class DartkingList extends React.Component{   
   render(){
      const pr  = this.props;
       return(
        <div>
           <MemberInfo image={pr.image} name={pr.name} age={pr.age} nicname ={pr.nicname} />
           <MemberVp   vp={pr.vp} />
        </div>
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
