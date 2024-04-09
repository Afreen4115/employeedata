import React from 'react'
import {useState,useEffect} from 'react';
import {useParams,Link} from 'react-router-dom';
import firedb from '../firebase';
import './view.css';


export default function View() {
  const [user,setUser]=useState();
  const {id}=useParams();
  useEffect(() => {
    firedb
      .child(`employeeData/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUser({...snapshot.val()});
        } else {
          setUser({});
        }
      })
      .catch((error) => {
        console.error(error);
        setUser({});
      });
  }, [id]);
  
  console.log('user',user);
  return (
    <div style={{marginTop:'70px'}}>
      <div className="card">
        <div className="card-header">
          <p>Employee Details</p>
        </div>
        <div className="container-view">
          <strong>ID: </strong>
          <span>{id}</span>
          <br/>
          <br/>
          {/* conditional rendering neccessary */}
          {user && ( // Conditionally render if user exists
            <>
              <strong>Name: </strong>
              <span>{user.name}</span>
              <br/>
              <br/>
              <strong>Email: </strong>
              <span>{user.email}</span>
              <br/>
              <br/>
              <strong>Contact Number: </strong>
              <span>{user.phone}</span>
              <br/>
              <br/>
              <strong>Salary: </strong>
              <span>{user.salary}</span>
              <br/>
              <br/>
              <Link to='/'>
                <button className="btn btn-edit" style={{marginBottom:'18px',width:'100px' ,borderRadius:'7px',padding:'5px'}}>Go Back</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
  
}