import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import validator from 'validator';
import InputField from '../../common/InputField/InputField';
import Button from '../../common/Button/Button';

const Login = props => {
  const history = useHistory();

  const server = process.env.REACT_APP_SERVER_URL;

  const { handleLoggedInUser, handleLocalStorage } = props;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const messageTypes = Object.freeze({
    success: `Be vagy jelentkezve.`,
    fail: `A bejelentkezés nem sikerült valamilyen hiba miatt.`,
  });

  const [alert, setAlert] = useState(null);
  const [formWasValidated, setFormWasValidated] = useState(false);

  const references = {
    email: useRef(),
    password: useRef(),
  };

  const formErrorTypes = Object.freeze({
    required: `A mező kitöltése kötelező`,
    validEmail: `Az email formátuma nem megfelelő`,
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  function isFieldEmpty(value) {
    return value !== '';
  }

  function isEmailInvalid(value) {
    return validator.isEmail(value);
  }

  const validators = {
    email: {
      required: isFieldEmpty,
      validEmail: isEmailInvalid,
    },
    password: {
      required: isFieldEmpty,
    },
  };

  function validateField(fieldName) {
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
  }

  function isFormValid() {
    let isValid = true;
    Object.keys(formData).forEach(fieldName => {
      const isFieldValid = validateField(fieldName);
      if (!isFieldValid) {
        isValid = false;
      }
    });
    return isValid;
  }

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

  const handleLogin = async e => {
    e.preventDefault();
    setAlert(null);
    setFormErrors({
      email: '',
      password: '',
    });

    setFormWasValidated(false);
    const isValid = isFormValid();
    if (isValid) {
      fetch(`${server}/api/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(res => res.json())
        .then(data => {
          if (data.status >= 200 && data.status < 300) {
            const user = {
              email: formData.email,
              userId: data.userId,
              firstName: data.firstName,
              token: data.token,
              role: data.role,
            };
            handleLocalStorage(user);
            handleLoggedInUser(user);
            setAlert({ alertType: 'success', message: messageTypes.success });
            setFormData({
              email: '',
              password: '',
            });
            history.push('/dashboard');
          } else {
            setAlert({ alertType: 'danger', message: data.message });
          }
        })
        .catch(error => {
          // eslint-disable-next-line
          console.error(error);
        });
    } else {
      setFormWasValidated(true);
    }
  };

  return (
    <div className="row mt-5">
      <h2>Bejelentkezés</h2>

      <div>
        {alert && (
          <p className={`alert alert-${alert.alertType}`}>{alert.message}</p>
        )}
      </div>

      <form
        noValidate
        onSubmit={handleLogin}
        className={`needs-validation ${formWasValidated && 'was-validated'}`}
      >
        <div className="md-3">
          <InputField
            name="email"
            id="email"
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
            id="password"
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
          title="Belépés"
        />
      </form>
    </div>
  );
};

export default Login;
