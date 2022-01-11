import React, { useState, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import validator from 'validator';
import { isFormValid, validateField } from '../../../services/validator';
import InputField from '../../common/InputField/InputField';
import Button from '../../common/Button/Button';
import useIsMountedRef from '../../../services/useIsMountedRef';

const Login = props => {
  const history = useHistory();
  const location = useLocation();

  const server = process.env.REACT_APP_BACKEND_SERVER_URL;

  const { handleLoggedInUser } = props;

  const isMountedRef = useIsMountedRef();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputBlur = e => {
    const { name } = e.target;
    validateField(
      formData,
      name,
      setFormErrors,
      references,
      validators,
      formErrorTypes
    );
  };

  function handleLocalStorage(user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  const handleLogin = async e => {
    e.preventDefault();
    setAlert(null);
    setFormErrors({
      email: '',
      password: '',
    });

    setFormWasValidated(false);

    const isValid = isFormValid(
      formData,
      setFormErrors,
      references,
      validators,
      formErrorTypes
    );

    if (isValid) {
      fetch(`${server}/api${location.pathname}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, location: location.pathname }),
      })
        .then(async res => {
          if (res.status >= 200 && res.status < 300) {
            return res.json();
          }

          const json = await res.json();
          throw new Error(json.message);
        })
        .then(data => {
          if (isMountedRef.current) {
            const user = {
              email: formData.email,
              userId: data.userId,
              firstName: data.firstName,
              token: data.token,
              role: data.role,
            };
            handleLocalStorage(user);
            handleLoggedInUser(user);
            setFormData({
              email: '',
              password: '',
            });
            history.push('/dashboard');
          }
        })
        .catch(error => {
          setAlert({ alertType: 'warning', message: error.message });
        });
    } else {
      setFormWasValidated(true);
    }
  };

  return (
    <div className="mt-5">
      <h2>Bejelentkezés</h2>

      <div>
        {alert && (
          <p className={`alert alert-${alert.alertType}`}>{alert.message}</p>
        )}
      </div>

      <form
        noValidate
        onSubmit={handleLogin}
        className={`form-max-width needs-validation ${
          formWasValidated && 'was-validated'
        }`}
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
          classes="btn btn-primary my-4"
          title="Belépés"
        />
      </form>
    </div>
  );
};

export default Login;
