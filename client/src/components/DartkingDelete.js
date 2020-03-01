import React from 'react';

class DartkingDelete extends React.Component{

    deleteMember(id){

        const url = '/api/members/' + id;
        fetch(url, {
             method: 'DELETE'
        });
       this.props.stateRefresh();
      }
        
        render() {
        return (
          <button onClick={(e) => {this.deleteMember(this.props.id)}}>삭제</button>
        )
    }
}

export default DartkingDelete;

