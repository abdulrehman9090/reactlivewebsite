import checkboxes from './checkboxes.svg';
import './App.css';
import {  Button, FormControl, TextField } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import React, {useState, useEffect} from 'react';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';


const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#FD940C'
    }
  },
})


function App() {

  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {

    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo, status: doc.data().status})));
    })

  }, [])

  const AddTodo = (e) => {
    e.preventDefault();
    db.collection('todos').add({
      todo: input,
      status: false,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(err => alert(err.message));
    setInput('');

  }


  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <header>
       <img src={checkboxes} className='logo' alt=""/>
       <h3 style={{color: '#FD940C'}}>Personal Todo List</h3>
      </header>

      <div className='card'>
        <form>
          <FormControl className='form'>
        <TextField color='secondary' value={input} onChange={(e) => setInput(e.target.value)} className='input1' label="Write Todo..."  variant="outlined" size='small'/>
        <Button type='submit' disabled={!input} className='btnAdd' variant='contained' color='secondary' onClick={AddTodo}><AddIcon/></Button>
        </FormControl>
        </form>
        
        
      </div>
      <div className='todoContainer'>
        <FlipMove  enterAnimation="fade" leaveAnimation="fade">
      {todos.map(todo => <Todo key={todo.id} todo={todo}/>)}
      </FlipMove>
      </div>
     
    
    </div>
    </ThemeProvider>
   
  );
}

export default App;
