import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../adduser/add.css';
import toast from 'react-hot-toast';

const Edit = () => {
  const initialUserState = {
    fname: '',
    lname: '',
    email: ''
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUserState);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`https://server-rho-lyart.vercel.app/api/getone/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
        toast.error('Failed to load user data.');
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://server-rho-lyart.vercel.app/api/update/${id}`,
        user
      );
      toast.success(response.data.msg, { position: 'top-right' });
      navigate('/');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user.');
    }
  };

  return (
    <div className='addUser'>
      <Link to='/'>Back</Link>
      <h3>Update User</h3>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className='inputGroup'>
          <label htmlFor='fname'>First Name</label>
          <input
            type='text'
            value={user.fname}
            onChange={inputChangeHandler}
            id='fname'
            name='fname'
            autoComplete='off'
            placeholder='First name'
          />
        </div>
        <div className='inputGroup'>
          <label htmlFor='lname'>Last Name</label>
          <input
            type='text'
            value={user.lname}
            onChange={inputChangeHandler}
            id='lname'
            name='lname'
            autoComplete='off'
            placeholder='Last name'
          />
        </div>
        <div className='inputGroup'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            value={user.email}
            onChange={inputChangeHandler}
            id='email'
            name='email'
            autoComplete='off'
            placeholder='Email'
          />
        </div>
        <div className='inputGroup'>
          <button type='submit'>UPDATE USER</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
