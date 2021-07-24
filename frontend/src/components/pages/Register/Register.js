import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import validator from 'validator';
import InputField from '../../common/InputField/InputField';
import Button from '../../common/Button/Button';
import './Register.scss';

const Register = () => {
  const history = useHistory();

  const server = process.env.REACT_APP_SERVER_URL;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [alert, setAlert] = useState(null);
  const [formWasValidated, setFormWasValidated] = useState(false);

  const messageTypes = {
    success: `A regisztráció sikeres. A login oldalon lehet bejelentkezni`,
    fail: `A regisztráció sikeretelen volt az alább hiba miatt: `,
  };

  const references = {
    firstName: useRef(),
    lastName: useRef(),
    email: useRef(),
    password: useRef(),
  };

  const formErrorTypes = {
    required: `A mező kitöltése kötelező`,
    passwordLength: `A jelszó minimum 6 karakter hosszú`,
    validEmail: `Az email formátuma nem megfelelő`,
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
      await fetch(`${server}/api/register`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(res => {
          if (res.status >= 200 || res.status < 300) {
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
      <div className="row mt-5">
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
          <div className="md-3">
            <InputField
              name="lastName"
              type="text"
              value={formData.lastName}
              labelText="Vezetéknév"
              handleInputChange={handleInputChange}
              handleInputBlur={handleInputBlur}
              reference={references.lastName}
              error={formErrors.lastName}
            />
          </div>
          <div className="md-3">
            <InputField
              name="firstName"
              type="text"
              value={formData.firstName}
              labelText="Keresztnév"
              handleInputChange={handleInputChange}
              handleInputBlur={handleInputBlur}
              reference={references.firstName}
              error={formErrors.firstName}
            />
          </div>
          <div className="md-3">
            <InputField
              name="email"
              type="email"
              value={formData.email}
              labelText="Email cím"
              handleInputChange={handleInputChange}
              handleInputBlur={handleInputBlur}
              reference={references.email}
              error={formErrors.email}
            />
          </div>
          <div className="md-3">
            <InputField
              name="password"
              type="password"
              value={formData.password}
              labelText="Jelszó"
              handleInputChange={handleInputChange}
              handleInputBlur={handleInputBlur}
              reference={references.password}
              error={formErrors.password}
            />
          </div>
          <Button
            buttonType="submit"
            classes="btn btn-primary mt-3"
            title="Elküldés"
          />
        </form>
      </div>
    </>
  );
};

export default Register;
