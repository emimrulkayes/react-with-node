
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect( () => {
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data));
  }, []);

  const handleAddUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = {name, email};

    //  post data to server
    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
  }

  return (
    <div className="App">
      <h1>My own data: {users.length} </h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder='Name' required />
        <input type="text" name="email" placeholder='Email' required />
        <input type="submit" value="Add User" />

      </form>
      <ul>
        {
          users.map(user => <li 
            key={user.id}
            user = {user}
          > Name: {user.name} Email: {user.email} Phone: {user.phone} </li>)
        }
      </ul>
    </div>
  );
}

export default App;
