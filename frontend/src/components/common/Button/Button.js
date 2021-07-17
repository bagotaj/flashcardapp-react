import React from 'react';

const Button = ({ buttonType, classes, title, handleAddingOneCard }) => {
  return (
    <button
      type={buttonType ? 'submit' : 'button'}
      className={classes}
      onClick={handleAddingOneCard}
    >
      {title}
    </button>
  );
};

export default Button;
