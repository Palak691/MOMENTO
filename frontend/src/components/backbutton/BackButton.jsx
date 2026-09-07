import React from 'react'
import { useNavigate } from 'react-router-dom';
import './BackButton.css'
export const BackButton = () => {
  const navigate = useNavigate();

   return (
    <button onClick={() => navigate(-1)} className='backBtn'>
      ← Back 
    </button>
  );
}
