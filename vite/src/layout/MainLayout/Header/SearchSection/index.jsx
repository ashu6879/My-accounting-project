import React from 'react';

const slideInKeyframes = `
  @keyframes slideIn {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    50% {
      transform: translateX(-100%);
      opacity: 1;
    }
    100% {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;

const headingStyle = {
  display: 'inline-block',
  animation: 'slideIn 30s linear infinite', // Slower animation
  whiteSpace: 'nowrap', // Prevents text from wrapping to the next line
};

const textStyle = {
  color: '#e0a700', // Darker, richer yellow
};

const textStyle1 = {
  color: '#0044cc', // Darker, richer blue
};

const containerStyle = {
  overflow: 'hidden', // Hides the overflowing text
  width: '100%', // Ensures the container takes full width
  display: 'flex',
  justifyContent: 'center',
};

const Heading = () => {
  return (
    <>
      <style>{slideInKeyframes}</style>
      <div style={containerStyle}>
        <h1 style={headingStyle}>
          Welcome to <span style={textStyle}>Accounts</span> <span style={textStyle1}>Admin</span>  Portal.
        </h1>
      </div>
    </>
  ); 
};

export default Heading;




