import React from 'react';

const InputField = props => {
  // eslint-disable-next-line
  const { type, name, value, onChange, onBlur, reference, error, labelText } =
    props;
  return (
    <div className={`${error && 'was-validated'}`}>
      <label className="form-label m-2" htmlFor={name}>
        {labelText}
      </label>
      <input
        className="form-control m-2"
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={reference}
      />
      <div className="invalid-feedback mx-2">{error}</div>
    </div>
  );
};

export default InputField;
