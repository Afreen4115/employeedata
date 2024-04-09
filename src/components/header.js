import React, { useEffect,useState } from 'react';
import './header.css';
import { Link,useLocation,useNavigate } from 'react-router-dom';


function Header() {
  const [activeTab, setActiveTab] = useState('Home');
  const location=useLocation();
  const[search,setSearch]=useState('');
  useEffect(()=>{
    if(location.pathname==='/'){
        setActiveTab('Home');
    }
    else if(location.pathname==='/add'){
      setActiveTab('AddContact');
    }
    else if(location.pathname==='/about'){
      setActiveTab('About');
    }
    // console.log(location);
  },[location]);
  const navigate=useNavigate();
  const handleSubmit=(e)=>{
      e.preventDefault();
      navigate(`/search?name=${search}`);
      setSearch('');
  }
  return (
    <div className="header">
      <p className="logo">Employee Data Management</p>
      <div className="header-right">
      <form onSubmit={handleSubmit} style={{display:'inline',border:'none'}} className='search-form'>
        <input
          type='text'
          className='inputField'
          placeholder='Search Name...'
          onChange={(e)=>{
            setSearch(e.target.value);
          }}
          value={search}
        />
      </form>
      <Link style={{textDecoration:'none'}}to='/'>
          <p 
          className={`${activeTab === "Home" ? "active" : ""}`} 
          onClick={() => setActiveTab("Home")}>
          Home</p>
        </Link>
        <Link style={{textDecoration:'none'}} to='/add'>
          <p 
          className={`${activeTab === "AddContact" ? "active" : ""}`} 
          onClick={() => setActiveTab("AddContact")}>
          Add Details</p>
        </Link>
        <Link style={{textDecoration:'none'}} to='/about'>
          <p 
          className={`${activeTab === "About" ? "active" : ""}`} 
          onClick={() => setActiveTab("About")}>
          About</p>
        </Link>
        
      </div>
    </div>
  );
}

export default Header;
