import React from 'react';

export default function About() {
  return (
    <div style={{ 
      margin:'auto',
      marginTop: '70px', 
      width: '300px', 
      padding: '20px', 
      border: '1.2px solid rgb(111,87,87)', 
      borderRadius: '8px', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
      textAlign: 'center',
      background:'rgb(240,240,240)',
      zIndex:'20px'
      
    }}>
      <div className="header"
      style={{
        background:'#6596d6',
        height:'10%',
        width:'100%',
        borderRadius:'8px'

      }}>
      <p style={{ marginBottom: '10px', background:'#6596e6',width:"100%" ,color:"white",marginTop:'10px',textAlign:'center'}}><strong>About Us</strong></p>
      </div>
      <p 
      style={{
        marginTop:'20px',
        fontSize:'17px',
        fontFamily:'serif',
        paddingTop:'25px'
      }}>
      Manage your workforce effortlessly with our Employee Data Management app. Add, view, edit, and delete employee records, and search based on various criteria. Customize features to suit your specific needs.
      </p>
      
    </div>
  );
}
