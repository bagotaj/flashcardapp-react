import React from 'react';

const InputField = props => {
  // eslint-disable-next-line
  const {
    type,
    name,
    value,
    onChange,
    onBlur,
    reference,
    error,
    labelText,
    required,
  } = props;
  return (
    <div className={`${error && 'was-validated'} text-start`}>
      <label className="form-label mt-3" htmlFor={name}>
        {labelText}
      </label>
      {type === 'textarea' ? (
        <textarea
          className="form-control"
          id={name}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          ref={reference}
          rows="3"
          value={value}
        />
      ) : (
        <input
          className="form-control"
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          ref={reference}
        />
      )}
      <div className="invalid-feedback mx-2">{error}</div>
    </div>
  );
};

export default InputField;
