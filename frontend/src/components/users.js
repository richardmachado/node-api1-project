import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {Link} from 'react-router-dom';




function Users() {

  const [user, setUsers] = useState(0);

useEffect( () => {
  axios.get("http://localhost:5000/api/users/")
  .then(response => {
    setUsers (response.data);
    console.log(response)
  })
  .catch(err => {
    console.error(err); 
  })
}, [])
if (!user) {
  return <div>Loading ... </div>
}



  return (
    <div className="App">
      <h1>List of users</h1>
      <Link to="/add">Add a user</Link>
      {user.map(users => 
        <div key ={users.id} className = "info">
        <p>{users.name}</p>
        <p>{users.bio}</p>
        <button>Edit</button>
        <button>Delete</button>
        </div>
      )}
    </div>
  );
}

export default Users;