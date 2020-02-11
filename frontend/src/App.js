import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';

import Users from './components/users'
import AddUser from './CRUD/Add'


function App() {
  return (
    <div className ="App">
      

  

      <Route exact path="/" component={Users}/>
      <Route path="/add" component={AddUser}/>
   

    </div>
  )
  
}

export default App;