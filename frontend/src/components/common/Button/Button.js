import React from 'react';

const Button = ({ buttonType, classes, title }) => {
  return (
    <button type={buttonType ? 'submit' : 'button'} className={classes}>
      {title}
    </button>
  );
};

export default Button;
