import React from 'react';
import CardLogo from '../../assets/Card-logo2.png'
import './Loader.css'; 

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader-content">
        {/* <img className='logo-slide-left' src={CardLogo} alt="Logo" /> */}
        <div className="text-slide-right">Cardinal Inks Publishing.</div>
      </div>
    </div>
  );
};

export default Loader;