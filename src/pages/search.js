import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './search.css';
import firedb from '../firebase';

const Search = () => {
    const [data,setData] = useState({});

    const useQuery = () =>{
        return new URLSearchParams(useLocation().search);
    }

    var query = useQuery();
    var search = query.get("name");
    console.log("search",search);
    console.log("Search query:", search);
    console.log("Firebase data:", data);


   // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  searchData();
}, [search]);


const searchData = () => {
  const capitalizedSearch = search.charAt(0).toUpperCase() + search.slice(1);
  firedb.child("employeeData").orderByChild("name").equalTo(capitalizedSearch).on("value", (snapshot) => {
      if(snapshot.val()){
          const data = snapshot.val();
          setData(data);
      }
  });
};

  return (
    <>
    <div style={{marginTop:"70px"}}>
    <Link to="/" style={{margin:'auto' , paddingLeft:'575px'}}>
        <button className='btn btn-edit' style={{width:'120px' ,height:'40px', borderRadius:'6px'}}>Go Back</button>
    </Link>
    {Object.keys(data).length === 0 ?(
        <h2  style={{paddingLeft:'400px', marginTop:'50px'}}>No Search Found With That Name : {query.get("name")}</h2>
    ):(
        <table className='styled-table' style={{marginTop:'30px'}}>
      <thead>
        <tr>
          <th style={{textAlign:"center"}}>No.</th>
          <th style={{textAlign:"center"}}>Name</th>
          <th style={{textAlign:"center"}}>Email</th>
          <th style={{textAlign:"center"}}>Phone No</th>
          <th style={{textAlign:"center"}}>Salary</th>
          <th style={{textAlign:"center"}}>Status</th>
          
        </tr>
      </thead>
      <tbody>
      {Object.keys(data).map((id, index) => (
            <tr key={id}>
            <th scope="row">{index +1}</th>
            <td>{data[id].name}</td>
            <td>{data[id].email}</td>
            <td>{data[id].phone}</td>
            <td>{data[id].salary}</td>
            <td>{data[id].status}</td>
            
            </tr>
            
))}

      </tbody>
    </table>
    )}
    
  </div>
  </>
)
}

export default Search