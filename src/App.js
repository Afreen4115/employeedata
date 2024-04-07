import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import View from './pages/view';
import Home from './pages/home'
import Addedit from './pages/addedit'
import About from './pages/about'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header';
import Search from './pages/search';


export default function App() {
  return (
   <Router>
    <div className="App">
    <Header/>
    <ToastContainer position='top-center'/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<Addedit/>}/>
        <Route path='/update/:id' element={<Addedit/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/view/:id' element={<View/>}/>
        <Route path='/search' element={<Search/>}/>
      </Routes>
    </div>
   </Router>
 )
}
