import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
  buttonType,
  classes,
  title,
  onClick,
  dataid,
  linkRouterPath,
}) => {
  if (linkRouterPath) {
    return (
      <Link to={linkRouterPath} className={classes} data-id={dataid}>
        {title}
      </Link>
    );
  }

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
