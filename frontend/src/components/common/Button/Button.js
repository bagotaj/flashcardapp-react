import React from 'react';

const Button = ({ buttonType, classes, title, onClick, dataid }) => {
  return (
    <button
      type={buttonType ? 'submit' : 'button'}
      className={classes}
      onClick={onClick}
      data-id={dataid}
    >
      {title}
    </button>
  );
};

export default Button;
