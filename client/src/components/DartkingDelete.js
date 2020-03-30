import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';


class DartkingDelete extends React.Component{

  constructor(props) {
    super(props);    
    this.state = {    
      open: false
    }
    
    // this.handleClickOpen = this.handleClickOpen.bind(this) 
    // this.handleClose = this.handleClose.bind(this);
    }
    
    // 모달창 열기
    handleClickOpen=()=>{
      this.setState({
        open:true
      });
    }
   
    // 모달창 닫기
    handleClose=()=>{
      this.setState({
        open:false
      });
    }
    

    deleteMember(id){
        const url = '/api/members/' + id;
        fetch(url, {
             method: 'DELETE'
        });
       this.props.stateRefresh();
      }
        render() {
        return (
          <div>
            <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>
              삭제
            </Button>
            <Dialog onClose={this.handleClose} open={this.state.open}>
              <DialogTitle onClose={this.handleClose}>
                삭제경고
              </DialogTitle>
              <DialogContent>
                <Typography>
                  선택한 Member 정보가 삭제됩니다.
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" color="primary" onClick={(e)=>{this.deleteMember(this.props.id)}}>삭제</Button>
                <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
              </DialogActions>
            </Dialog>
          </div>
        )
    }
}

export default DartkingDelete;

