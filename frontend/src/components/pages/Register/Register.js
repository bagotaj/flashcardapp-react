import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import validator from 'validator';
import InputField from '../../common/InputField/InputField';

const Register = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [alert, setAlert] = useState(null);
  const [formWasValidated, setFormWasValidated] = useState(false);

  const messageTypes = {
    success: `Registration has been successful. You're free to login now`,
    fail: `Registration has failed due to following error: `,
  };

  const references = {
    firstName: useRef(),
    lastName: useRef(),
    email: useRef(),
    password: useRef(),
  };

  const formErrorTypes = {
    required: `This field is required`,
    passwordLength: `Password needs to be at least 6 characters long`,
    validEmail: `Email format is incorrect`,
  };

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const isFieldEmpty = value => {
    return value !== '';
  };

  const isEmailInvalid = value => {
    return validator.isEmail(value);
  };

  const isPasswordValid = value => {
    return value.length >= 6;
  };

  const validators = {
    firstName: {
      required: isFieldEmpty,
    },
    lastName: {
      required: isFieldEmpty,
    },
    email: {
      required: isFieldEmpty,
      validEmail: isEmailInvalid,
    },
    password: {
      required: isFieldEmpty,
      passwordLength: isPasswordValid,
    },
  };

  const validateField = fieldName => {
    const value = formData[fieldName];
    let isValid = true;
    setFormErrors(prev => ({
      ...prev,
      [fieldName]: '',
    }));
    references[fieldName].current.setCustomValidity('');

    if (validators[fieldName] !== undefined) {
      for (const [validationType, validatorFn] of Object.entries(
        validators[fieldName]
      )) {
        if (isValid !== false) {
          isValid = validatorFn(value);
          if (!isValid) {
            const errorText = formErrorTypes[validationType];
            setFormErrors(prev => ({
              ...prev,
              [fieldName]: errorText,
            }));
            references[fieldName].current.setCustomValidity(errorText);
          }
        }
      }
    }
    return isValid;
  };

  const isFormValid = () => {
    let isValid = true;
    for (const fieldName of Object.keys(formData)) {
      const isFieldValid = validateField(fieldName);
      if (!isFieldValid) {
        isValid = false;
      }
    }
    return isValid;
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputBlur = e => {
    const { name } = e.target;
    validateField(name);
  };

  const handleRegister = async e => {
    e.preventDefault();
    setAlert(null);
    setFormErrors({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });

    setFormWasValidated(false);
    const isValid = isFormValid();
    if (isValid) {
      await fetch('http://localhost:5000/api/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(res => {
          if (res.status === 201) {
            setAlert({ alertType: 'success', message: messageTypes.success });
            setFormData({
              firstName: '',
              lastName: '',
              email: '',
              password: '',
            });
            history.push('/login');
          }
        })
        .catch(error => {
          setAlert({ alertType: 'danger', message: messageTypes.fail + error });
        });
    } else {
      setFormWasValidated(true);
    }
  };

  return (
    <>
      <div className="container-sm">
        <h2>Regisztráció</h2>
        <div>
          {alert && (
            <p className={`alert alert-${alert.alertType}`}>{alert.message}</p>
          )}
        </div>

        <form
          noValidate
          onSubmit={handleRegister}
          className={`needs-validation ${formWasValidated && 'was-validated'}`}
        >
          <div className="col-md-6">
            <InputField
              name="lastName"
              type="text"
              value={formData.lastName}
              labelText="Vezetéknév"
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              reference={references.lastName}
              error={formErrors.lastName}
            />
            <InputField
              name="firstName"
              type="text"
              value={formData.firstName}
              labelText="Kersztnév"
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              reference={references.firstName}
              error={formErrors.firstName}
            />
            <InputField
              name="email"
              type="email"
              value={formData.email}
              labelText="Email cím"
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              reference={references.email}
              error={formErrors.email}
            />
            <InputField
              name="password"
              type="password"
              value={formData.password}
              labelText="Jelszó"
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              reference={references.password}
              error={formErrors.password}
            />
          </div>
          <button type="submit" className="btn btn-primary m-2">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
