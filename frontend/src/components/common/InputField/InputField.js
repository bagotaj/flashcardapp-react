import React from 'react';

const InputField = props => {
  // eslint-disable-next-line
  const {
    type,
    name,
    value,
    handleInputChange,
    handleInputBlur,
    reference,
    error,
    labelText,
    required,
    options,
  } = props;

  let inputField;

  if (type === 'select') {
    inputField = (
      <select
        id={name}
        name={name}
        required={required}
        className="form-select"
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        ref={reference}
        value={value}
      >
        {options.map(option => (
          <option value={option.value} key={option.text}>
            {option.text ? option.text : option.value}
          </option>
        ))}
      </select>
    );
  } else if (type === 'textarea') {
    inputField = (
      <textarea
        className="form-control"
        id={name}
        name={name}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        required={required}
        ref={reference}
        rows="3"
        value={value}
      />
    );
  } else {
    inputField = (
      <input
        className="form-control"
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        required={required}
        ref={reference}
      />
    );
  }

  return (
    <div className={`${error && 'was-validated'} text-start`}>
      <label className="form-label mt-3" htmlFor={name}>
        {labelText}
      </label>
      {inputField}
      <div className="invalid-feedback mx-2">{error}</div>
    </div>
  );
};

export default InputField;
