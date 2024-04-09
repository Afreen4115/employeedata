import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import firedb from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faEdit } from '@fortawesome/free-solid-svg-icons';
import './addedit.css';

const initialState = {
  name: '',
  email: '',
  phone: '',
  salary: '',
  status: ''
};

export default function Addedit() {
  const [state, setState] = useState(initialState);
  const[data,setData]=useState({});
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    firedb.child('employeeData').on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        setData(prevData => ({ ...prevData, ...snapshot.val() }));
      } else {
        setData({});
      }
    });
    return () => {
      setData({}); 
    };
  }, [id]);

  useEffect(() => {
    if (id && data[id]) {
      setState(data[id]); 
    } else {
      setState(initialState);
    }
    return () => {
      setState(initialState);
    };
  }, [id, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      setState((prevState) => ({
        ...prevState,
        [name]: capitalizedValue,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, salary, status } = state;
  
    // Check if email or phone already exists in the database
    const emailExists = Object.values(data).some(item => item.email === email);
    const phoneExists = Object.values(data).some(item => item.phone === phone);
  
    if (!name || !email || !phone || !salary || !status) {
      toast.error('Please provide value in each input field');
    } else if (emailExists && id !== Object.keys(data).find(key => key !== id)) {
      toast.error('Email already exists');
    } else if (phoneExists && id !== Object.keys(data).find(key => key !== id)) {
      toast.error('Phone number already exists');
    } else {
      if (!id) {
        firedb.child('employeeData').push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success('Employee details added successfully!');
          }
        });
      } else {
        firedb.child(`employeeData/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success('Employee details updated successfully!');
          }
        });
      }
      setTimeout(() => navigate('/'), 500);
    }
  };
  

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { name, email, phone, salary, status } = state;
  //   if (!name || !email || !phone || !salary || !status) {
  //     toast.error('Please provide value in each input field');
  //   } else {
  //     if (!id) {
  //       firedb.child('employeeData').push(state, (err) => {
  //         if (err) {
  //           toast.error(err);
  //         } else {
  //           toast.success('Employee details added successfully!');
  //         }
  //       });
  //     } else {
  //       firedb.child(`employeeData/${id}`).set(state, (err) => {
  //         if (err) {
  //           toast.error(err);
  //         } else {
  //           toast.success('Employee details updated successfully!');
  //         }
  //       });
  //     }
  //     setTimeout(() => navigate('/'), 500);
  //   }
  // };

  return (
    <div style={{ marginTop: '30px' }} className='add'>
      <form
        style={{
          padding: '15px',
          margin: 'auto',
          maxWidth: '350px',
          alignContent: 'center',
          border: '1px solid rgb(72, 110, 176)',
          backgroundColor: 'rgb(113,134,178)',
          boxShadow: '0 2px 4px rgba(52, 115, 156, 0.15)',
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Enter your name'
          value={state.name || ''}
          onChange={handleChange}
        />

        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Enter your email'
          value={state.email || ''}
          onChange={handleChange}
        />

        <label htmlFor='phno'>Contact</label>
        <input
          type='tel'
          id='phno'
          name='phone'
          placeholder='Enter your Contact'
          value={state.phone || ''}
          onChange={handleChange}
        />

        <label htmlFor='salary'>Salary</label>
        <input
          type='number'
          id='salary'
          name='salary'
          placeholder='Salary'
          value={state.salary || ''}
          onChange={handleChange}
        />

        <label htmlFor='status'>Status</label>
        <select
          id='status'
          name='status'
          value={state.status || ''}
          onChange={handleChange}
        >
          <option value=''>Select Status</option>
          <option value='Active'>Active</option>
          <option value='Inactive'>Inactive</option>
        </select>

        <strong><input type='submit' value={id ? 'Update' : 'Save'} /></strong>
      </form>
    </div>
  );
}
