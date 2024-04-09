import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import './home.css';
import firedb from '../firebase';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Home() {
  const [data, setData] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [sort, setSort] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(4);

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
    const { value } = e.target;
    if (value === "salary") {
      setSort(true);
      const sortedBySalary = Object.values(data).sort((a, b) => a.salary - b.salary);
      setSortedData(sortedBySalary);
    } else {
      setSort(true);
      firedb.child('employeeData').orderByChild(value).on('value', (snapshot) => {
        let sortedData = [];
        snapshot.forEach((snap) => {
          sortedData.push(snap.val());
        });
        setSortedData(sortedData);
      });
    }
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
  
  const filterData = (val) => {
    firedb.child('employeeData')
      .orderByChild('status')
      .equalTo(val)
      .on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setData(data);
        } else {
          setData({});
          toast.info(`No records found with status '${val}'.`);
        }
      });
  };

  // Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sort ? 
    sortedData.slice(indexOfFirstRecord, indexOfLastRecord) 
    : Object.values(data).slice(indexOfFirstRecord, indexOfLastRecord);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil((sort ? sortedData.length : Object.keys(data).length) / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => (
    <button key={number} onClick={() => setCurrentPage(number)} className={currentPage === number ? 'active' : ''}>
      {number}
    </button>
  ));

  return (
    <div style={{ marginTop: '18px' }}>
      <div className="container" style={{ marginBottom: '20px' }}>
        <label>Sort by: </label>
        <span style={{ margin: '0 2px' }}></span>
        <select id="dropdown" name="colValue" onChange={handleChange}>
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
        <br />
        <div className="buttons">
          <label>Status: </label>
          <button className="btn btn-active" onClick={() => { filterData('Active') }}>Active</button>
          <span style={{ margin: '0 3px' }}></span>
          <button className="btn btn-inactive" onClick={() => { filterData('Inactive') }}>Inactive</button>
        </div>
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>No.</th>
            <th style={{ textAlign: 'center' }}>Name</th>
            <th style={{ textAlign: 'center' }}>Email</th>
            <th style={{ textAlign: 'center' }}>Contact</th>
            <th style={{ textAlign: 'center' }}>Salary ₹</th>
            <th style={{ textAlign: 'center' }}>Status</th>
             <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((item, index) => (
            <tr key={index}>
              <th scope="row">{indexOfFirstRecord + index + 1}</th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.salary}</td>
              <td>{item.status}</td>
              <td>
                <Link to={`/update/${Object.keys(data)[indexOfFirstRecord + index]}`}>
                  <button className="btn btn-edit">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </Link>
                <button className="btn btn-delete" onClick={() => onDelete(Object.keys(data)[indexOfFirstRecord + index])}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <Link to={`/view/${Object.keys(data)[indexOfFirstRecord + index]}`}>
                  <button className="btn btn-view">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button style={{ cursor: 'pointer' }} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        {renderPageNumbers}
        <button style={{ cursor: 'pointer' }} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil((sort ? sortedData.length : Object.keys(data).length) / recordsPerPage)}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}
