import React, { useState, useEffect } from 'react';
import './home.css';
import firedb from '../firebase';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Home() {
  const [data, setData] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [sort, setSort] = useState(false);

  useEffect(() => {
    firedb.child('employeeData').on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        setData(snapshot.val());
      } else {
        setData({});
      }
    });
    return () => {
      setData({});
    };
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Do you want to delete the record?")) {
      firedb.child(`employeeData/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success('Employee data deleted successfully!');
        }
      });
    }
  };

  const handleChange = (e) => {
    setSort(true);
    firedb.child('employeeData').orderByChild(`${e.target.value}`).on('value', (snapshot) => {
      let sortedData = [];
      snapshot.forEach((snap) => {
        sortedData.push(snap.val());
      });
      setSortedData(sortedData);
    });
  };

  const handleReset = () => {
    setSort(false); 
    setData({}); 
    firedb.child('employeeData').on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        setData(snapshot.val());
      }
    });
  };
  
  const filterData=(val)=>{
      firedb.child('employeeData')
      .orderByChild('status')
      .equalTo(val)
      .on('value',(snapshot)=>{
        if(snapshot.val()){
          const data=snapshot.val();
          setData(data);
        }
      })
  }

  return (
    <div style={{ marginTop: '70px' }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>No.</th>
            <th style={{ textAlign: 'center' }}>Name</th>
            <th style={{ textAlign: 'center' }}>Email</th>
            <th style={{ textAlign: 'center' }}>Contact</th>
            <th style={{ textAlign: 'center' }}> Salary ₹</th>
            <th style={{ textAlign: 'center' }}>Status</th>

            {!sort && <th style={{ textAlign: 'center' }}>Action</th>}
          </tr>
        </thead>
        <tbody>
          {sort
            ? sortedData.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.salary}</td>
                  <td>{item.status}</td>

                </tr>
              ))
            : Object.keys(data).map((id, index) => (
                <tr key={id}>
                  <th scope="row">{index + 1}</th>
                  <td>{data[id].name}</td>
                  <td>{data[id].email}</td>
                  <td>{data[id].phone}</td>
                  <td>{data[id].salary}</td>
                  <td>{data[id].status}</td>

                  <td>
                    <Link to={`/update/${id} `}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button className="btn btn-delete" onClick={() => onDelete(id)}>
                      Delete
                    </button>
                    <Link to={`/view/${id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      <br/>
      <div className="container">
        <label>Sort by:  </label>
        <span style={{ margin: '0 2px' }}></span>
        <select className="dropdown" name="colValue" onChange={handleChange}>
          <option>Please select</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="phone">Contact</option>
          <option value="salary">Salary</option>
          <option value="status">Status</option>
        </select>
        <button className="btn btn-reset" onClick={handleReset}>
          Reset
        </button>
        <br/>
        <div className="buttons">
        <label>Status: </label>
        <button className="btn btn-active" onClick={()=>{filterData('Active')}}>Active</button>
        <span style={{ margin: '0 3px' }}></span>
        <button className="btn btn-inactive" onClick={()=>{filterData('Inactive')}} >Inactive</button>
        </div>
      </div>
    </div>
  );
}
