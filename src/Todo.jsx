import React, { forwardRef, useState } from 'react';
import './App.css';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import DoneIcon from '@material-ui/icons/Done';
import { Button, IconButton, Modal, TextField } from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import db from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import checkboxes from './checkboxes.svg';

function getModalStyle() {
    const top = 50 ;
    const left = 50 ;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: '80%',
      maxWidth: 400,
     backgroundColor: theme.palette.background.paper,
      borderRadius: '0.5rem',
      padding: theme.spacing(2, 4, 3),
    },
  }));

const Todo = forwardRef(({todo}, ref) => {
    const [open, setOpen] = useState(false);
    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();
    const [input, setInput] = useState('');

    let handleDelete = () => {
        db.collection('todos').doc(todo.id).delete();
    }

    let StatusTrue = () => {
        db.collection('todos').doc(todo.id).update({status: true});
    }
    let StatusFalse = () => {
        db.collection('todos').doc(todo.id).update({status: false});

    }

    let handle_Close = () =>{
        setOpen(false)

    }
    let handleUpdate = () => {
        setInput(todo.todo)
       setOpen(true);
    }
    
    let handleTodoUpdate = (e) => {
        e.preventDefault();
        db.collection('todos').doc(todo.id).update({todo: input});
        setOpen(false);
    }

    return (
        <div className='card1' ref={ref}>
             <Modal
        open={open}
        onClose={handle_Close}

      >
       <div style={modalStyle} className={classes.paper}>
           <center><img src={checkboxes} className='logo' alt=""/></center>
           <form className='app__modal'>
      
           <TextField style={{marginTop:'1.7rem'}}  color='secondary' value={input} onChange={(e) => setInput(e.target.value)} className='input1' label="Update Todo..."  variant="outlined" size='small'/>
        
           
           <center>
           <Button disabled={!input} style={{width: 'fit-content', marginTop:'1rem'}} type='submit' variant='outlined' color='secondary' onClick={handleTodoUpdate} >Update</Button>

           </center>
           
          
           </form>
           
          
           
          
           
    </div>
      </Modal>

            <div style={{
                padding: '0 9px'
            }}>
            <AssignmentTurnedInIcon style={{
                color: '#FD940C'
            }}/>

            <p className={todo.status ? 'completedTodo':''}>{todo.todo}</p>
            </div>
           

            <div className='card_footer'>
                {todo.status ? ( <IconButton onClick={StatusFalse}  color='secondary' size='small'><ReplayIcon/></IconButton>) : (<IconButton onClick={StatusTrue} color='secondary' size='small'><DoneIcon/></IconButton>)}
                <IconButton color='secondary' onClick={handleUpdate} size='small'><EditIcon/></IconButton>
                <IconButton color='secondary' size='small' onClick={handleDelete}><DeleteOutlineIcon/></IconButton>
            </div>
        </div>
    )
}
    )

export default Todo;


