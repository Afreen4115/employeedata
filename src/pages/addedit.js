import React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate,useParams} from 'react-router-dom';
import { toast } from 'react-toastify';
import firedb from '../firebase';
import './addedit.css';

const initialState = {
  name: '',
  email: '',
  phone: '',
  status:''
  
};

export default function Addedit() {
  const [state, setState] = useState(initialState);
  const[data,setData]=useState({});
  // const [data, setData] = useState({});

  const { name, email, phone,salary,status} = state;
  //navigate through pages

  const navigate = useNavigate();

// parameter hooks
  const {id}=useParams();
  useEffect(() => {
    firedb.child('employeeData').on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        // console.log("Snap shot value is:",snapshot.val());
        setData(prevData => (
           { ...prevData, ...snapshot.val() })
      );
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
    // Capitalize the first letter of the name
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
  

  //toastify

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !salary || !status ) {
      toast.error('Please provide value in each input field');
    } else {
      if(!id){
        firedb.child('employeeData').push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success('Employee details added successfully!');
          }
        });
      }
      else{
        firedb.child(`employeeData/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success('Employee details Updated successfully!');
          }
        });

      }
      setTimeout(() => navigate('/'), 500);
    }
  };

  return (
    <div style={{ marginTop: '30px' }} className='add'>
      <form
        style={{
          padding: '15px',
          margin: 'auto',
          maxWidth: '450px',
          alignContent: 'center',
          border:'1px solid rgb(72,110,176)',
          backgroundColor: 'rgb(72,125,166)',
          boxShadow: '0 2px 4px rgba(52,115,156,0.15)',
          
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Enter your name'
          value={name || ''}
          onChange={handleChange}
        />

        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Enter your email'
          value={email || ''}
          onChange={handleChange}
        />

        <label htmlFor='phno'>Contact</label>
        <input
          type='tel'
          id='phno'
          name='phone'
          placeholder='Enter your Contact'
          value={phone || ''}
          onChange={handleChange}
        />
        <label htmlFor='salary'>Salary</label>
        <input
          type='number'
          id='salary'
          name='salary'
          placeholder="₹ per annum"
          value={salary || ''}
          onChange={handleChange}
        />

<label htmlFor='status'>Status</label>
        <input
          type='text'
          id='status'
          name='status'
          placeholder='Enter your Status...'
          value={status || ''}
          onChange={handleChange}
        />

        <input type='submit' value={id?"Update":"Save"} />
      </form>
    </div>
  );
}
