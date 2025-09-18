import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
   // const result = await axios.get("http://localhost:8080/users");
    const result = await axios.get("https://userhub-backend.onrender.com/users");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
   // await axios.delete(`http://localhost:8080/user/${id}`);
    await axios.delete(`https://userhub-backend.onrender.com/user/${id}`);
    loadUsers();
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row" key={index}>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>    
                <td>
                  <Link className="btn btn-primary mx-2" to={`/viewuser/${user.id}`}>View</Link>
                  <Link className="btn btn-outline-primary mx-2" to={`/edituser/${user.id}`}>Edit</Link>
                  <button className="btn btn-danger mx-2" onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/*
✅ What is useParams()?
📘 useParams is a hook from React Router that lets you access URL parameters.
So if your route URL looks like this: /user/edit/5 
   Then inside your component, useParams() gives you access to: { id: "5" }
You can use this id to fetch data, update, delete, etc.
 */
