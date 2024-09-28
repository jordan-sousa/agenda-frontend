import React from 'react';
import './ButtonLogout.css'
import { useNavigate } from 'react-router-dom';

const ButtonLogout = ({text}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem('token');
    
    
    navigate('/'); 
  };

  return (
    <button onClick={handleLogout} className='btn_logout'>
      {text}
    </button>
  );
};

export default ButtonLogout;
