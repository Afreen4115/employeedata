// // // // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // // // import { faChevronLeft, faChevronRight, faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
// // // // // import React, { useState, useEffect } from 'react';
// // // // // import './home.css';
// // // // // import firedb from '../firebase';
// // // // // import { Link } from 'react-router-dom';
// // // // // import { toast } from 'react-toastify';

// // // // // export default function Home() {
// // // // //   const [data, setData] = useState({});
// // // // //   const [sortedData, setSortedData] = useState([]);
// // // // //   const [sort, setSort] = useState(false);
// // // // //   const [currentPage, setCurrentPage] = useState(1);
// // // // //   const [recordsPerPage] = useState(4);

// // // // //   useEffect(() => {
// // // // //     firedb.child('employeeData').on('value', (snapshot) => {
// // // // //       if (snapshot.val() !== null) {
// // // // //         setData(snapshot.val());
// // // // //       } else {
// // // // //         setData({});
// // // // //       }
// // // // //     });
// // // // //     return () => {
// // // // //       setData({});
// // // // //     };
// // // // //   }, []);

// // // // //   const onDelete = (id) => {
// // // // //     if (window.confirm("Do you want to delete the record?")) {
// // // // //       firedb.child(`employeeData/${id}`).remove((err) => {
// // // // //         if (err) {
// // // // //           toast.error(err);
// // // // //         } else {
// // // // //           toast.success('Employee data deleted successfully!');
// // // // //         }
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   const handleChange = (e) => {
// // // // //     const { value } = e.target;
// // // // //     if (value === "salary") {
// // // // //       setSort(true);
// // // // //       const sortedBySalary = Object.values(data).sort((a, b) => a.salary - b.salary);
// // // // //       setSortedData(sortedBySalary);
// // // // //     } else {
// // // // //       setSort(true);
// // // // //       firedb.child('employeeData').orderByChild(value).on('value', (snapshot) => {
// // // // //         let sortedData = [];
// // // // //         snapshot.forEach((snap) => {
// // // // //           sortedData.push(snap.val());
// // // // //         });
// // // // //         setSortedData(sortedData);
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   const handleReset = () => {
// // // // //     setSort(false); 
// // // // //     setData({}); 
// // // // //     firedb.child('employeeData').on('value', (snapshot) => {
// // // // //       if (snapshot.val() !== null) {
// // // // //         setData(snapshot.val());
// // // // //       }
// // // // //     });
// // // // //   };
  
// // // // //   const filterData = (val) => {
// // // // //     firedb.child('employeeData')
// // // // //       .orderByChild('status')
// // // // //       .equalTo(val)
// // // // //       .on('value', (snapshot) => {
// // // // //         const data = snapshot.val();
// // // // //         if (data) {
// // // // //           setData(data);
// // // // //         } else {
// // // // //           setData({});
// // // // //           toast.info(`No records found with status '${val}'.`);
// // // // //         }
// // // // //       });
// // // // //   };

// // // // //   // Pagination
// // // // //   const indexOfLastRecord = currentPage * recordsPerPage;
// // // // //   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
// // // // //   const currentRecords = sort ? 
// // // // //     sortedData.slice(indexOfFirstRecord, indexOfLastRecord) 
// // // // //     : Object.values(data).slice(indexOfFirstRecord, indexOfLastRecord);
// // // // //   const pageNumbers = [];

// // // // //   for (let i = 1; i <= Math.ceil((sort ? sortedData.length : Object.keys(data).length) / recordsPerPage); i++) {
// // // // //     pageNumbers.push(i);
// // // // //   }

// // // // //   const renderPageNumbers = pageNumbers.map(number => (
// // // // //     <button key={number} onClick={() => setCurrentPage(number)} className={currentPage === number ? 'active' : ''}>
// // // // //       {number}
// // // // //     </button>
// // // // //   ));

// // // // //   return (
// // // // //     <div style={{ marginTop: '18px' }}>
// // // // //       <div className="container" style={{ marginBottom: '20px' }}>
// // // // //         <label>Sort by: </label>
// // // // //         <span style={{ margin: '0 2px' }}></span>
// // // // //         <select id="dropdown" name="colValue" onChange={handleChange}>
// // // // //           <option>Please select</option>
// // // // //           <option value="name">Name</option>
// // // // //           <option value="email">Email</option>
// // // // //           <option value="phone">Contact</option>
// // // // //           <option value="salary">Salary</option>
// // // // //           <option value="status">Status</option>
// // // // //         </select>
// // // // //         <button className="btn btn-reset" onClick={handleReset}>
// // // // //           Reset
// // // // //         </button>
// // // // //         <br />
// // // // //         <div className="buttons">
// // // // //           <label>Status: </label>
// // // // //           <button className="btn btn-active" onClick={() => { filterData('Active') }}>Active</button>
// // // // //           <span style={{ margin: '0 3px' }}></span>
// // // // //           <button className="btn btn-inactive" onClick={() => { filterData('Inactive') }}>Inactive</button>
// // // // //         </div>
// // // // //       </div>
// // // // //       <table className="styled-table">
// // // // //         <thead>
// // // // //           <tr>
// // // // //             <th style={{ textAlign: 'center' }}>No.</th>
// // // // //             <th style={{ textAlign: 'center' }}>Name</th>
// // // // //             <th style={{ textAlign: 'center' }}>Email</th>
// // // // //             <th style={{ textAlign: 'center' }}>Contact</th>
// // // // //             <th style={{ textAlign: 'center' }}>Salary ₹</th>
// // // // //             <th style={{ textAlign: 'center' }}>Status</th>
// // // // //              <th style={{ textAlign: 'center' }}>Action</th>
// // // // //           </tr>
// // // // //         </thead>
// // // // //         <tbody>
// // // // //           {currentRecords.map((item, index) => (
// // // // //             <tr key={index}>
// // // // //               <th scope="row">{indexOfFirstRecord + index + 1}</th>
// // // // //               <td>{item.name}</td>
// // // // //               <td>{item.email}</td>
// // // // //               <td>{item.phone}</td>
// // // // //               <td>{item.salary}</td>
// // // // //               <td>{item.status}</td>
// // // // //               <td>
// // // // //                 <Link to={`/update/${Object.keys(data)[indexOfFirstRecord + index]}`}>
// // // // //                   <button className="btn btn-edit">
// // // // //                     <FontAwesomeIcon icon={faEdit} />
// // // // //                   </button>
// // // // //                 </Link>
// // // // //                 <button className="btn btn-delete" onClick={() => onDelete(Object.keys(data)[indexOfFirstRecord + index])}>
// // // // //                   <FontAwesomeIcon icon={faTrashAlt} />
// // // // //                 </button>
// // // // //                 <Link to={`/view/${Object.keys(data)[indexOfFirstRecord + index]}`}>
// // // // //                   <button className="btn btn-view">
// // // // //                     <FontAwesomeIcon icon={faEye} />
// // // // //                   </button>
// // // // //                 </Link>
// // // // //               </td>
// // // // //             </tr>
// // // // //           ))}
// // // // //         </tbody>
// // // // //       </table>
// // // // //       <div className="pagination">
// // // // //         <button style={{ cursor: 'pointer' }} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
// // // // //           <FontAwesomeIcon icon={faChevronLeft} />
// // // // //         </button>
// // // // //         {renderPageNumbers}
// // // // //         <button style={{ cursor: 'pointer' }} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil((sort ? sortedData.length : Object.keys(data).length) / recordsPerPage)}>
// // // // //           <FontAwesomeIcon icon={faChevronRight} />
// // // // //         </button>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // // import { faChevronLeft, faChevronRight, faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
// // // // import React, { useState, useEffect } from 'react';
// // // // import './home.css';
// // // // import firedb from '../firebase';
// // // // import { Link } from 'react-router-dom';
// // // // import { toast } from 'react-toastify';

// // // // export default function Home() {
// // // //   const [data, setData] = useState({});
// // // //   const [sortedData, setSortedData] = useState([]);
// // // //   const [sort, setSort] = useState(false);
// // // //   const [currentPage, setCurrentPage] = useState(1);
// // // //   const [recordsPerPage] = useState(4);
// // // //   const [activeStatus, setActiveStatus] = useState(null);

// // // //   useEffect(() => {
// // // //     firedb.child('employeeData').on('value', (snapshot) => {
// // // //       if (snapshot.val() !== null) {
// // // //         setData(snapshot.val());
// // // //       } else {
// // // //         setData({});
// // // //       }
// // // //     });
// // // //     return () => {
// // // //       setData({});
// // // //     };
// // // //   }, []);

// // // //   const onDelete = (id) => {
// // // //     if (window.confirm("Do you want to delete the record?")) {
// // // //       firedb.child(`employeeData/${id}`).remove((err) => {
// // // //         if (err) {
// // // //           toast.error(err);
// // // //         } else {
// // // //           toast.success('Employee data deleted successfully!');
// // // //         }
// // // //       });
// // // //     }
// // // //   };

// // // //   const handleChange = (e) => {
// // // //     const { value } = e.target;
// // // //     if (value === "salary") {
// // // //       setSort(true);
// // // //       const sortedBySalary = Object.values(data).sort((a, b) => a.salary - b.salary);
// // // //       setSortedData(sortedBySalary);
// // // //     } else {
// // // //       setSort(true);
// // // //       firedb.child('employeeData').orderByChild(value).on('value', (snapshot) => {
// // // //         let sortedData = [];
// // // //         snapshot.forEach((snap) => {
// // // //           sortedData.push(snap.val());
// // // //         });
// // // //         setSortedData(sortedData);
// // // //       });
// // // //     }
// // // //   };

// // // //   const handleReset = () => {
// // // //     setSort(false); 
// // // //     setData({}); 
// // // //     setActiveStatus(null);
// // // //     firedb.child('employeeData').on('value', (snapshot) => {
// // // //       if (snapshot.val() !== null) {
// // // //         setData(snapshot.val());
// // // //       }
// // // //     });
// // // //     const dropdown = document.getElementById("dropdown");
// // // //     dropdown.value = "Please select";
// // // //   };
  
// // // //   const filterData = (val) => {
// // // //     firedb.child('employeeData')
// // // //       .orderByChild('status')
// // // //       .equalTo(val)
// // // //       .on('value', (snapshot) => {
// // // //         const data = snapshot.val();
// // // //         if (data) {
// // // //           setData(data);
// // // //           setActiveStatus(val); // Set active status
// // // //         } else {
// // // //           setData({});
// // // //           toast.info(`No records found with status '${val}'.`);
// // // //         }
// // // //       });
// // // //   };

// // // //   // Pagination
// // // //   const indexOfLastRecord = currentPage * recordsPerPage;
// // // //   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
// // // //   const currentRecords = sort ? 
// // // //     sortedData.slice(indexOfFirstRecord, indexOfLastRecord) 
// // // //     : Object.values(data).slice(indexOfFirstRecord, indexOfLastRecord);
// // // //   const pageNumbers = [];

// // // //   for (let i = 1; i <= Math.ceil((sort ? sortedData.length : Object.keys(data).length) / recordsPerPage); i++) {
// // // //     pageNumbers.push(i);
// // // //   }

// // // //   const renderPageNumbers = pageNumbers.map(number => (
// // // //     <button key={number} onClick={() => setCurrentPage(number)} className={currentPage === number ? 'active' : ''}>
// // // //       {number}
// // // //     </button>
// // // //   ));

// // // //   return (
// // // //     <div style={{ marginTop: '18px' }}>
// // // //       <div className="container" style={{ marginBottom: '20px' }}>
// // // //         <label>Sort by: </label>
// // // //         <span style={{ margin: '0 2px' }}></span>
// // // //         <select id="dropdown" name="colValue" onChange={handleChange}>
// // // //           <option>Please select</option>
// // // //           <option value="name">Name</option>
// // // //           <option value="email">Email</option>
// // // //           <option value="phone">Contact</option>
// // // //           <option value="salary">Salary</option>
// // // //           <option value="status">Status</option>
// // // //         </select>
// // // //         <span style={{ margin: '0 4px' }}></span>

// // // //         <button className="btn btn-reset" onClick={handleReset} style={{background:'green', padding:'4px' ,width:'8%'}}>
// // // //           Reset
// // // //         </button>
// // // //         <br />
// // // //         <div className="buttons">
// // // //           <label>Status: </label>
// // // //           <button className={`btn btn-active ${activeStatus === 'Active' ? 'active-status' : ''}`} onClick={() => { filterData('Active') }}>Active</button>
// // // //           <span style={{ margin: '0 3px' }}></span>
// // // //           <button className={`btn btn-inactive ${activeStatus === 'Inactive' ? 'active-status' : ''}`} onClick={() => { filterData('Inactive') }}>Inactive</button>
// // // //         </div>
// // // //       </div>
// // // //       <table className="styled-table">
// // // //         <thead>
// // // //           <tr>
// // // //             <th style={{ textAlign: 'center' }}>No.</th>
// // // //             <th style={{ textAlign: 'center' }}>Name</th>
// // // //             <th style={{ textAlign: 'center' }}>Email</th>
// // // //             <th style={{ textAlign: 'center' }}>Contact</th>
// // // //             <th style={{ textAlign: 'center' }}>Salary ₹</th>
// // // //             <th style={{ textAlign: 'center' }}>Status</th>
// // // //              <th style={{ textAlign: 'center' }}>Action</th>
// // // //           </tr>
// // // //         </thead>
// // // //         <tbody>
// // // //           {currentRecords.map((item, index) => (
// // // //             <tr key={index}>
// // // //               <th scope="row">{indexOfFirstRecord + index + 1}</th>
// // // //               <td>{item.name}</td>
// // // //               <td>{item.email}</td>
// // // //               <td>{item.phone}</td>
// // // //               <td>{item.salary}</td>
// // // //               <td>{item.status}</td>
// // // //               <td>
// // // //                 <Link to={`/update/${Object.keys(data)[indexOfFirstRecord + index]}`}>
// // // //                   <button className="btn btn-edit" style={{background:'green'}}>
// // // //                     <FontAwesomeIcon icon={faEdit} />
// // // //                   </button>
// // // //                 </Link>
// // // //                 <button className="btn btn-delete" style={{background:'#f44336'}}onClick={() => onDelete(Object.keys(data)[indexOfFirstRecord + index])}>
// // // //                   <FontAwesomeIcon icon={faTrashAlt} />
// // // //                 </button>
// // // //                 <Link to={`/view/${Object.keys(data)[indexOfFirstRecord + index]}`}>
// // // //                   <button className="btn btn-view" style={{background:'#4777fa'}}>
// // // //                     <FontAwesomeIcon icon={faEye} />
// // // //                   </button>
// // // //                 </Link>
// // // //               </td>
// // // //             </tr>
// // // //           ))}
// // // //         </tbody>
// // // //       </table>
// // // //       <div className="pagination">
// // // //         <button style={{ cursor: 'pointer' }} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
// // // //           <FontAwesomeIcon icon={faChevronLeft} />
// // // //         </button>
// // // //         {renderPageNumbers}
// // // //         <button style={{ cursor: 'pointer' }} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil((sort ? sortedData.length : Object.keys(data).length) / recordsPerPage)}>
// // // //           <FontAwesomeIcon icon={faChevronRight} />
// // // //         </button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import { faChevronLeft, faChevronRight, faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
// // // import React, { useState, useEffect } from 'react';
// // // import './home.css';
// // // import firedb from '../firebase';
// // // import { Link } from 'react-router-dom';
// // // import { toast } from 'react-toastify';

// // // export default function Home() {
// // //   const [data, setData] = useState({});
// // //   const [sortedData, setSortedData] = useState([]);
// // //   const [sort, setSort] = useState(false);
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [recordsPerPage] = useState(4);
// // //   const [activeStatus, setActiveStatus] = useState(null);

// // //   useEffect(() => {
// // //     fetchData();
// // //   }, []);

// // //   const fetchData = () => {
// // //     firedb.child('employeeData').on('value', (snapshot) => {
// // //       if (snapshot.val() !== null) {
// // //         setData(snapshot.val());
// // //         if (sort) {
// // //           sortData(); // If sorting is active, re-sort the data
// // //         }
// // //       } else {
// // //         setData({});
// // //       }
// // //     });
// // //   };

// // //   const onDelete = (id) => {
// // //     if (window.confirm("Do you want to delete the record?")) {
// // //       firedb.child(`employeeData/${id}`).remove((err) => {
// // //         if (err) {
// // //           toast.error(err);
// // //         } else {
// // //           toast.success('Employee data deleted successfully!');
// // //           fetchData(); // Fetch data again after deletion
// // //         }
// // //       });
// // //     }
// // //   };

// // //   const handleChange = (e) => {
// // //     const { value } = e.target;
// // //     if (value === "salary") {
// // //       setSort(true);
// // //       sortData();
// // //     } else {
// // //       setSort(true);
// // //       firedb.child('employeeData').orderByChild(value).on('value', (snapshot) => {
// // //         let sortedData = [];
// // //         snapshot.forEach((snap) => {
// // //           sortedData.push(snap.val());
// // //         });
// // //         setSortedData(sortedData);
// // //       });
// // //     }
// // //   };

// // //   const sortData = () => {
// // //     const sortedBySalary = Object.values(data).sort((a, b) => a.salary - b.salary);
// // //     setSortedData(sortedBySalary);
// // //   };

// // //   const handleReset = () => {
// // //     setSort(false); 
// // //     setData({}); 
// // //     setActiveStatus(null);
// // //     fetchData(); // Fetch data again after resetting
// // //     const dropdown = document.getElementById("dropdown");
// // //     dropdown.value = "Please select";
// // //   };
  
// // //   // const filterData = (val) => {
// // //   //   firedb.child('employeeData')
// // //   //     .orderByChild('status')
// // //   //     .equalTo(val)
// // //   //     .on('value', (snapshot) => {
// // //   //       const data = snapshot.val();
// // //   //       if (data) {
// // //   //         setData(data);
// // //   //         setActiveStatus(val);
// // //   //         if (sort) {
// // //   //           sortData(); // If sorting is active, re-sort the filtered data
// // //   //         }
// // //   //       } else {
// // //   //         setData({});
// // //   //         toast.info(`No records found with status '${val}'.`);
// // //   //       }
// // //   //     });
// // //   // };

// // //   // const filterData = (val) => {
// // //   //   if (sort) {
// // //   //     // If sorting is active, filter the sorted data
// // //   //     let filteredData = sortedData.filter(item => item.status === val);
// // //   //     setData(filteredData.reduce((obj, item) => {
// // //   //       obj[item.id] = item;
// // //   //       return obj;
// // //   //     }, {}));
// // //   //     setActiveStatus(val);
// // //   //   } else {
// // //   //     // If sorting is not active, filter the original data
// // //   //     firedb.child('employeeData')
// // //   //       .orderByChild('status')
// // //   //       .equalTo(val)
// // //   //       .on('value', (snapshot) => {
// // //   //         const data = snapshot.val();
// // //   //         if (data) {
// // //   //           setData(data);
// // //   //           setActiveStatus(val);
// // //   //         } else {
// // //   //           setData({});
// // //   //           toast.info(`No records found with status '${val}'.`);
// // //   //         }
// // //   //       });
// // //   //   }
// // //   // };
// // //   const filterData = (val) => {
// // //     if (sort) {
// // //       // If sorting is active, filter the sorted data
// // //       let filteredData = sortedData.filter(item => item.status === val);
// // //       setData(filteredData.reduce((obj, item) => {
// // //         obj[item.id] = item;
// // //         return obj;
// // //       }, {}));
// // //       setActiveStatus(val);
// // //     } else {
// // //       // If sorting is not active, filter the original data
// // //       firedb.child('employeeData')
// // //         .orderByChild('status')
// // //         .equalTo(val)
// // //         .on('value', (snapshot) => {
// // //           const data = snapshot.val();
// // //           if (data) {
// // //             setData(data);
// // //             setActiveStatus(val);
// // //           } else {
// // //             setData({});
// // //             toast.info(`No records found with status '${val}'.`);
// // //           }
// // //         });
// // //     }
// // //   };
  
 

  
  
  

// // //   // Pagination
// // //   const indexOfLastRecord = currentPage * recordsPerPage;
// // //   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
// // //   const currentRecords = sort ? 
// // //     sortedData.slice(indexOfFirstRecord, indexOfLastRecord) 
// // //     : Object.values(data).slice(indexOfFirstRecord, indexOfLastRecord);
// // //   const pageNumbers = [];

// // //   for (let i = 1; i <= Math.ceil((sort ? sortedData.length : Object.keys(data).length) / recordsPerPage); i++) {
// // //     pageNumbers.push(i);
// // //   }

// // //   const renderPageNumbers = pageNumbers.map(number => (
// // //     <button key={number} onClick={() => setCurrentPage(number)} className={currentPage === number ? 'active' : ''}>
// // //       {number}
// // //     </button>
// // //   ));

// // //   return (
// // //     <div style={{ marginTop: '18px' }}>
// // //       <div className="container" style={{ marginBottom: '20px' }}>
// // //         <label>Sort by: </label>
// // //         <span style={{ margin: '0 2px' }}></span>
// // //         <select id="dropdown" name="colValue" onChange={handleChange}>
// // //           <option>Please select</option>
// // //           <option value="name">Name</option>
// // //           <option value="email">Email</option>
// // //           <option value="phone">Contact</option>
// // //           <option value="salary">Salary</option>
// // //           <option value="status">Status</option>
// // //         </select>
// // //         <span style={{ margin: '0 4px' }}></span>

// // //         <button className="btn btn-reset" onClick={handleReset} style={{background:'green', padding:'4px' ,width:'8%'}}>
// // //           Reset
// // //         </button>
// // //         <br />
// // //         <div className="buttons">
// // //           <label>Status: </label>
// // //           <button className={`btn btn-active ${activeStatus === 'Active' ? 'active-status' : ''}`} onClick={() => { filterData('Active') }}>Active</button>
// // //           <span style={{ margin: '0 3px' }}></span>
// // //           <button className={`btn btn-inactive ${activeStatus === 'Inactive' ? 'active-status' : ''}`} onClick={() => { filterData('Inactive') }}>Inactive</button>
// // //         </div>
// // //       </div>
// // //       <table className="styled-table">
// // //         <thead>
// // //           <tr>
// // //             <th style={{ textAlign: 'center' }}>No.</th>
// // //             <th style={{ textAlign: 'center' }}>Name</th>
// // //             <th style={{ textAlign: 'center' }}>Email</th>
// // //             <th style={{ textAlign: 'center' }}>Contact</th>
// // //             <th style={{ textAlign: 'center' }}>Salary ₹</th>
// // //             <th style={{ textAlign: 'center' }}>Status</th>
// // //              <th style={{ textAlign: 'center' }}>Action</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {currentRecords.map((item, index) => (
// // //             <tr key={index}>
// // //               <th scope="row">{indexOfFirstRecord + index + 1}</th>
// // //               <td>{item.name}</td>
// // //               <td>{item.email}</td>
// // //               <td>{item.phone}</td>
// // //               <td>{item.salary}</td>
// // //               <td>{item.status}</td>
// // //               <td>
// // //                 <Link to={`/update/${Object.keys(data)[indexOfFirstRecord + index]}`}>
// // //                   <button className="btn btn-edit" style={{background:'green'}}>
// // //                     <FontAwesomeIcon icon={faEdit} />
// // //                   </button>
// // //                 </Link>
// // //                 <button className="btn btn-delete" style={{background:'#f44336'}}onClick={() => onDelete(Object.keys(data)[indexOfFirstRecord + index])}>
// // //                   <FontAwesomeIcon icon={faTrashAlt} />
// // //                 </button>
// // //                 <Link to={`/view/${Object.keys(data)[indexOfFirstRecord + index]}`}>
// // //                   <button className="btn btn-view" style={{background:'#4777fa'}}>
// // //                     <FontAwesomeIcon icon={faEye} />
// // //                   </button>
// // //                 </Link>
// // //               </td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>
// // //       <div className="pagination">
// // //         <button style={{ cursor: 'pointer' }} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
// // //           <FontAwesomeIcon icon={faChevronLeft} />
// // //         </button>
// // //         {renderPageNumbers}
// // //         <button style={{ cursor: 'pointer' }} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil((sort ? sortedData.length : Object.keys(data).length) / recordsPerPage)}>
// // //           <FontAwesomeIcon icon={faChevronRight} />
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faChevronLeft, faChevronRight, faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
// // import React, { useState, useEffect } from 'react';
// // import './home.css';
// // import firedb from '../firebase';
// // import { Link } from 'react-router-dom';
// // import { toast } from 'react-toastify';

// // export default function Home() {
// //   const [data, setData] = useState({});
// //   const [sortedData, setSortedData] = useState([]);
// //   const [sort, setSort] = useState(false);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [recordsPerPage] = useState(4);
// //   const [activeStatus, setActiveStatus] = useState(null);

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const fetchData = () => {
// //     firedb.child('employeeData').on('value', (snapshot) => {
// //       if (snapshot.val() !== null) {
// //         setData(snapshot.val());
// //         if (sort) {
// //           sortData(); // If sorting is active, re-sort the data
// //         }
// //       } else {
// //         setData({});
// //       }
// //     });
// //   };

// //   const onDelete = (id) => {
// //     if (window.confirm("Do you want to delete the record?")) {
// //       firedb.child(`employeeData/${id}`).remove((err) => {
// //         if (err) {
// //           toast.error(err);
// //         } else {
// //           toast.success('Employee data deleted successfully!');
// //           fetchData(); // Fetch data again after deletion
// //         }
// //       });
// //     }
// //   };

// //   const handleChange = (e) => {
// //     const { value } = e.target;
// //     if (value === "name") {
// //       setSort(true);
// //       sortData();
// //     } else {
// //       setSort(true);
// //       firedb.child('employeeData').orderByChild(value).on('value', (snapshot) => {
// //         let sortedData = [];
// //         snapshot.forEach((snap) => {
// //           sortedData.push(snap.val());
// //         });
// //         setSortedData(sortedData);
// //       });
// //     }
// //   };

// //   const sortData = () => {
// //     const sortedByName = Object.values(data).sort((a, b) => {
// //       if (a.name < b.name) return -1;
// //       if (a.name > b.name) return 1;
// //       return 0;
// //     });

// //     if (activeStatus === 'Active') {
// //       const activeSorted = sortedByName.filter(item => item.status === 'Active');
// //       setSortedData(activeSorted);
// //     } else if (activeStatus === 'Inactive') {
// //       const inactiveSorted = sortedByName.filter(item => item.status === 'Inactive');
// //       setSortedData(inactiveSorted);
// //     } else {
// //       setSortedData(sortedByName);
// //     }
// //   };

// //   const handleReset = () => {
// //     setSort(false); 
// //     setData({}); 
// //     setActiveStatus(null);
// //     fetchData(); // Fetch data again after resetting
// //     const dropdown = document.getElementById("dropdown");
// //     dropdown.value = "Please select";
// //   };
  
// //   const filterData = (val) => {
// //     if (sort) {
// //       // If sorting is active, filter the sorted data
// //       let filteredData = Object.values(data).filter(item => item.status === val);
// //       setSortedData(filteredData);
// //       setActiveStatus(val);
// //     } else {
// //       // If sorting is not active, filter the original data
// //       firedb.child('employeeData')
// //         .orderByChild('status')
// //         .equalTo(val)
// //         .on('value', (snapshot) => {
// //           const data = snapshot.val();
// //           if (data) {
// //             setData(data);
// //             setActiveStatus(val);
// //           } else {
// //             setData({});
// //             toast.info(`No records found with status '${val}'.`);
// //           }
// //         });
// //     }
// //   };

// //   // Pagination
// //   const indexOfLastRecord = currentPage * recordsPerPage;
// //   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
// //   const currentRecords = sort ? 
// //     sortedData.slice(indexOfFirstRecord, indexOfLastRecord) 
// //     : Object.values(data).slice(indexOfFirstRecord, indexOfLastRecord);
// //   const pageNumbers = [];

// //   for (let i = 1; i <= Math.ceil((sort ? sortedData.length : Object.keys(data).length) / recordsPerPage); i++) {
// //     pageNumbers.push(i);
// //   }

// //   const renderPageNumbers = pageNumbers.map(number => (
// //     <button key={number} onClick={() => setCurrentPage(number)} className={currentPage === number ? 'active' : ''}>
// //       {number}
// //     </button>
// //   ));

// //   return (
// //     <div style={{ marginTop: '18px' }}>
// //       <div className="container" style={{ marginBottom: '20px' }}>
// //         <label>Sort by: </label>
// //         <span style={{ margin: '0 2px' }}></span>
// //         <select id="dropdown" name="colValue" onChange={handleChange}>
// //           <option>Please select</option>
// //           <option value="name">Name</option>
// //           <option value="email">Email</option>
// //           <option value="phone">Contact</option>
// //           <option value="salary">Salary</option>
// //           <option value="status">Status</option>
// //         </select>
// //         <span style={{ margin: '0 4px' }}></span>

// //         <button className="btn btn-reset" onClick={handleReset} style={{background:'green', padding:'4px' ,width:'8%'}}>
// //           Reset
// //         </button>
// //         <br />
// //         <div className="buttons">
// //           <label>Status: </label>
// //           <button className={`btn btn-active ${activeStatus === 'Active' ? 'active-status' : ''}`} onClick={() => { filterData('Active') }}>Active</button>
// //           <span style={{ margin: '0 3px' }}></span>
// //           <button className={`btn btn-inactive ${activeStatus === 'Inactive' ? 'active-status' : ''}`} onClick={() => { filterData('Inactive') }}>Inactive</button>
// //         </div>
// //       </div>
// //       <table className="styled-table">
// //         <thead>
// //           <tr>
// //             <th style={{ textAlign: 'center' }}>No.</th>
// //             <th style={{ textAlign: 'center' }}>Name</th>
// //             <th style={{ textAlign: 'center' }}>Email</th>
// //             <th style={{ textAlign: 'center' }}>Contact</th>
// //             <th style={{ textAlign: 'center' }}>Salary ₹</th>
// //             <th style={{ textAlign: 'center' }}>Status</th>
// //              <th style={{ textAlign: 'center' }}>Action</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {currentRecords.map((item, index) => (
// //             <tr key={index}>
// //               <th scope="row">{indexOfFirstRecord + index + 1}</th>
// //               <td>{item.name}</td>
// //               <td>{item.email}</td>
// //               <td>{item.phone}</td>
// //               <td>{item.salary}</td>
// //               <td>{item.status}</td>
// //               <td>
// //                 <Link to={`/update/${Object.keys(data)[indexOfFirstRecord + index]}`}>
// //                   <button className="btn btn-edit" style={{background:'green'}}>
// //                     <FontAwesomeIcon icon={faEdit} />
// //                   </button>
// //                 </Link>
// //                 <button className="btn btn-delete" style={{background:'red'}} onClick={() => onDelete(Object.keys(data)[indexOfFirstRecord + index])}>
// //                   <FontAwesomeIcon icon={faTrashAlt} />
// //                 </button>
// //                 <Link to={`/view/${Object.keys(data)[indexOfFirstRecord + index]}`}>
// //                   <button className="btn btn-view" style={{background:'blue'}}>
// //                     <FontAwesomeIcon icon={faEye} />
// //                   </button>
// //                 </Link>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //       <div className="pagination">
// //         <button onClick={() => setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)} disabled={currentPage === 1}>
// //           <FontAwesomeIcon icon={faChevronLeft} />
// //         </button>
// //         {renderPageNumbers}
// //         <button onClick={() => setCurrentPage(currentPage === pageNumbers.length ? pageNumbers.length : currentPage + 1)} disabled={currentPage === pageNumbers.length}>
// //           <FontAwesomeIcon icon={faChevronRight} />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronLeft, faChevronRight, faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
// import React, { useState, useEffect } from 'react';
// import './home.css';
// import firedb from '../firebase';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';

// export default function Home() {
//   const [data, setData] = useState({});
//   const [sortedData, setSortedData] = useState([]);
//   const [sort, setSort] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [recordsPerPage] = useState(4);
//   const [activeStatus, setActiveStatus] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = () => {
//     firedb.child('employeeData').on('value', (snapshot) => {
//       if (snapshot.val() !== null) {
//         setData(snapshot.val());
//         if (sort) {
//           sortData(); // If sorting is active, re-sort the data
//         }
//       } else {
//         setData({});
//       }
//     });
//   };

//   const onDelete = (id) => {
//     if (window.confirm("Do you want to delete the record?")) {
//       firedb.child(`employeeData/${id}`).remove((err) => {
//         if (err) {
//           toast.error(err);
//         } else {
//           toast.success('Employee data deleted successfully!');
//           fetchData(); // Fetch data again after deletion
//         }
//       });
//     }
//   };

//   const handleChange = (e) => {
//     const { value } = e.target;
//     if (value === "salary") {
//       setSort(true);
//       sortData();
//     } else {
//       setSort(true);
//       firedb.child('employeeData').orderByChild(value).on('value', (snapshot) => {
//         let sortedData = [];
//         snapshot.forEach((snap) => {
//           sortedData.push(snap.val());
//         });
//         setSortedData(sortedData);
//       });
//     }
//   };

//   const sortData = () => {
//     const sortedBySalary = Object.values(data).sort((a, b) => a.salary - b.salary);
//     setSortedData(sortedBySalary);
//   };

//   const handleReset = () => {
//     setSort(false); 
//     setData({}); 
//     setActiveStatus(null);
//     fetchData(); // Fetch data again after resetting
//     const dropdown = document.getElementById("dropdown");
//     dropdown.value = "Please select";
//   };
  
//   const filterData = (val) => {
//     if (sort) {
//       // If sorting is active, filter the sorted data
//       let filteredData = Object.values(data).filter(item => item.status === val);
//       setSortedData(filteredData);
//       setActiveStatus(val);
//     } else {
//       // If sorting is not active, filter the original data
//       firedb.child('employeeData')
//         .orderByChild('status')
//         .equalTo(val)
//         .on('value', (snapshot) => {
//           const data = snapshot.val();
//           if (data) {
//             setData(data);
//             setActiveStatus(val);
//           } else {
//             setData({});
//             toast.info(`No records found with status '${val}'.`);
//           }
//         });
//     }
//   };
  
 

//   // Pagination
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = sort ? 
//     sortedData.slice(indexOfFirstRecord, indexOfLastRecord) 
//     : Object.values(data).slice(indexOfFirstRecord, indexOfLastRecord);
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil((sort ? sortedData.length : Object.keys(data).length) / recordsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   const renderPageNumbers = pageNumbers.map(number => (
//     <button key={number} onClick={() => setCurrentPage(number)} className={currentPage === number ? 'active' : ''}>
//       {number}
//     </button>
//   ));

//   return (
//     <div style={{ marginTop: '18px' }}>
//       <div className="container" style={{ marginBottom: '20px' }}>
//         <label>Sort by: </label>
//         <span style={{ margin: '0 2px' }}></span>
//         <select id="dropdown" name="colValue" onChange={handleChange}>
//           <option>Please select</option>
//           <option value="name">Name</option>
//           <option value="email">Email</option>
//           <option value="phone">Contact</option>
//           <option value="salary">Salary</option>
//           <option value="status">Status</option>
//         </select>
//         <span style={{ margin: '0 4px' }}></span>

//         <button className="btn btn-reset" onClick={handleReset} style={{background:'green', padding:'4px' ,width:'8%'}}>
//           Reset
//         </button>
//         <br />
//         <div className="buttons">
//           <label>Status: </label>
//           <button className={`btn btn-active ${activeStatus === 'Active' ? 'active-status' : ''}`} onClick={() => { filterData('Active') }}>Active</button>
//           <span style={{ margin: '0 3px' }}></span>
//           <button className={`btn btn-inactive ${activeStatus === 'Inactive' ? 'active-status' : ''}`} onClick={() => { filterData('Inactive') }}>Inactive</button>
//         </div>
//       </div>
//       <table className="styled-table">
//         <thead>
//           <tr>
//             <th style={{ textAlign: 'center' }}>No.</th>
//             <th style={{ textAlign: 'center' }}>Name</th>
//             <th style={{ textAlign: 'center' }}>Email</th>
//             <th style={{ textAlign: 'center' }}>Contact</th>
//             <th style={{ textAlign: 'center' }}>Salary ₹</th>
//             <th style={{ textAlign: 'center' }}>Status</th>
//              <th style={{ textAlign: 'center' }}>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentRecords.map((item, index) => (
//             <tr key={index}>
//               <th scope="row">{indexOfFirstRecord + index + 1}</th>
//               <td>{item.name}</td>
//               <td>{item.email}</td>
//               <td>{item.phone}</td>
//               <td>{item.salary}</td>
//               <td>{item.status}</td>
//               <td>
//                 <Link to={`/update/${Object.keys(data)[indexOfFirstRecord + index]}`}>
//                   <button className="btn btn-edit" style={{background:'green'}}>
//                     <FontAwesomeIcon icon={faEdit} />
//                   </button>
//                 </Link>
//                 <button className="btn btn-delete" style={{background:'#f44336'}}onClick={() => onDelete(Object.keys(data)[indexOfFirstRecord + index])}>
//                   <FontAwesomeIcon icon={faTrashAlt} />
//                 </button>
//                 <Link to={`/view/${Object.keys(data)[indexOfFirstRecord + index]}`}>
//                   <button className="btn btn-view">
//                     <FontAwesomeIcon icon={faEye} />
//                   </button>
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="pagination">
//         <button onClick={() => setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)} disabled={currentPage === 1}>
//           <FontAwesomeIcon icon={faChevronLeft} />
//         </button>
//         {renderPageNumbers}
//         <button onClick={() => setCurrentPage(currentPage === pageNumbers.length ? currentPage : currentPage + 1)} disabled={currentPage === pageNumbers.length}>
//           <FontAwesomeIcon icon={faChevronRight} />
//         </button>
//       </div>
//     </div>
//   );
// }

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import './home.css';
import firedb from '../firebase';
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function Home() {
  const [data, setData] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [sort, setSort] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(4);
  const [activeStatus, setActiveStatus] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    firedb.child('employeeData').on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        setData(snapshot.val());
        if (sort) {
          sortData(); // If sorting is active, re-sort the data
        }
      } else {
        setData({});
      }
    });
  };
  

  const onDelete = (id) => {
    if (window.confirm("Do you want to delete the record?")) {
      firedb.child(`employeeData/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success('Employee data deleted successfully!');
          fetchData(); // Fetch data again after deletion
        }
      });
    }
  };

  // const handleChange = (e) => {
  //   const { value } = e.target;
  //   if (value === "salary") {
  //     setSort(true);
  //     sortData();
  //   } else {
  //     setSort(true);
  //     firedb.child('employeeData').orderByChild(value).on('value', (snapshot) => {
  //       let sortedData = [];
  //       snapshot.forEach((snap) => {
  //         sortedData.push(snap.val());
  //       });
  //       setSortedData(sortedData);
  //     });
  //   }
  //   setActiveStatus(null);

  // };
  const handleChange = (e) => {
    const { value } = e.target;
    if (value === "salary") {
      setSort(true);
      sortData();
    } else {
      setSort(true);
      firedb.child('employeeData').orderByChild(value).on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          let sortedData = [];
          snapshot.forEach((snap) => {
            sortedData.push(snap.val());
          });
          setSortedData(sortedData);
        } else {
          toast.info(`No records found for the selected criteria.`);
          setCurrentPage(1); // Navigate to the first page
        }
      });
    }
    setActiveStatus(null);
  };
  

  const sortData = () => {
    const sortedBySalary = Object.values(data).sort((a, b) => a.salary - b.salary);
    setSortedData(sortedBySalary);
  };
  // const handleReset = () => {
  //       setSort(false); 
  //       setData({}); 
  //       setActiveStatus(null);
  //       fetchData(); // Fetch data again after resetting
  //       const dropdown = document.getElementById("dropdown");
  //       dropdown.value = "Please select";
  //     };
  
  const handleReset = () => {
    setSort(false); 
    setData({}); 
    setActiveStatus(null);
    setCurrentPage(1); // Reset currentPage to 1
    fetchData(); // Fetch data again after resetting
    const dropdown = document.getElementById("dropdown");
    dropdown.value = "Please select";
  };
  
  

  // const filterData = (val) => {
  //   firedb.child('employeeData')
  //     .orderByChild('status')
  //     .equalTo(val)
  //     .on('value', (snapshot) => {
  //       const data = snapshot.val();
  //       if (data) {
  //         const filteredData = Object.values(data);
  //         if (sort) {
  //           const sortedFilteredData = filteredData.sort((a, b) => a.name.localeCompare(b.name));
  //           setSortedData(sortedFilteredData);
  //         } else {
  //           setData(data);
  //         }
  //         setActiveStatus(val);
  //       } else {
  //         setData({});
  //         toast.info(`No records found with status '${val}'.`);
  //       }
  //     });
  // };
  const filterData = (val) => {
    firedb.child('employeeData')
      .orderByChild('status')
      .equalTo(val)
      .on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const filteredData = Object.values(data);
          if (sort) {
            const sortedFilteredData = filteredData.sort((a, b) => a.name.localeCompare(b.name));
            setSortedData(sortedFilteredData);
          } else {
            setData(data);
          }
          setActiveStatus(val);
        } else {
          // setCurrentPage(1); 
          navigate('/');// Reset to the first page
          setData({});
          setActiveStatus(null);
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
        <span style={{ margin: '0 4px' }}></span>

        <button  className="btn btn-reset" onClick={handleReset} style={{background:'green', padding:'4px' ,width:'8%'}}>
          Reset
        </button>
        <br />
        <div className="buttons">
          <label>Status: </label>
          <button className={`btn btn-active ${activeStatus === 'Active' ? 'active-status' : ''}`} onClick={() => { filterData('Active') }}>Active</button>
          <span style={{ margin: '0 3px' }}></span>
          <button className={`btn btn-inactive ${activeStatus === 'Inactive' ? 'active-status' : ''}`} onClick={() => { filterData('Inactive') }}>Inactive</button>
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
                  <button className="btn btn-edit" style={{background:'green'}}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </Link>
                <button className="btn btn-delete" style={{background:'#f44336'}}onClick={() => onDelete(Object.keys(data)[indexOfFirstRecord + index])}>
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
        <button style={{cursor:'pointer'}}onClick={() => setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)} disabled={currentPage === 1}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        {renderPageNumbers}
        <button style={{cursor:'pointer'}}onClick={() => setCurrentPage(currentPage === pageNumbers.length ? currentPage : currentPage + 1)} disabled={currentPage === pageNumbers.length}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}

