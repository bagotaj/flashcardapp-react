import { useState, useRef, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import validator from 'validator';
import InputField from '../../common/InputField/InputField';
import Button from '../../common/Button/Button';
// import './EditUser.scss';

const EditUser = props => {
  const history = useHistory();

  const { userId } = useParams();
  const { token } = props;

  const server = process.env.REACT_APP_SERVER_URL;

  const [formData, setFormData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
  });

  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetch(`${server}/api/users/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.status !== 200) {
          throw Error(`Nem sikerült lekérni az adatokat. ${res.status}`);
        }
        return res.json();
      })
      .then(jsonRes => {
        const { password, ...others } = jsonRes;
        setFormData(others);
        setAlert(null);
      })
      .catch(err => {
        setAlert(err.message);
      });
  }, [userId]);

  const [formWasValidated, setFormWasValidated] = useState(false);

  const messageTypes = {
    success: 'A változtatás sikerült.',
    fail: 'A változtatás sikeretelen.',
  };

  const references = {
    userName: useRef(),
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
    userName: '',
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
    userName: {
      required: isFieldEmpty,
    },
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
    // references[fieldName].current.setCustomValidity('');

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

  const handleUpdate = async e => {
    e.preventDefault();
    setAlert(null);
    setFormErrors({
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });

    setFormWasValidated(false);
    const isValid = isFormValid();
    if (isValid) {
      await fetch(`${server}/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
        .then(res => {
          if (res.status === 200) {
            setAlert({ alertType: 'primary', message: messageTypes.success });
            setFormData({
              userName: '',
              firstName: '',
              lastName: '',
              email: '',
              password: '',
            });
            history.push(`/profile/${userId}`);
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
        <h2>Felhasználói profil</h2>
        <div>
          {alert && (
            <p className={`alert alert-${alert.alertType}`}>{alert.message}</p>
          )}
        </div>

        <form
          noValidate
          onSubmit={handleUpdate}
          className={`needs-validation ${formWasValidated && 'was-validated'}`}
        >
          <div className="md-3">
            <InputField
              name="userName"
              type="text"
              value={formData.userName}
              labelText="Felhasználónév"
              handleInputChange={handleInputChange}
              handleInputBlur={handleInputBlur}
              reference={references.userName}
              error={formErrors.userName}
            />
          </div>
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
            title="Mentés"
          />
        </form>
      </div>
    </>
  );
};

export default EditUser;
