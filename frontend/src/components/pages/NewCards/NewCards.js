import { useState, useRef } from 'react';
import InputField from '../../common/InputField/InputField';
import Button from '../../common/Button/Button';

const NewCards = () => {
  const [formData, setFormData] = useState({
    cardTitle: '',
    side1: '',
    side2: '',
  });

  const [alert, setAlert] = useState(null);
  const [formWasValidated, setFormWasValidated] = useState(false);

  const messageTypes = {
    success: `A kártyacsomag mentése sikeres`,
    fail: `A kártyacsomag mentése sikeretelen volt az alább hiba miatt: `,
  };

  const references = {
    cardTitle: useRef(),
    side1: useRef(),
    side2: useRef(),
  };

  const formErrorTypes = {
    required: `A mező kitöltése kötelező`,
  };

  const [formErrors, setFormErrors] = useState({
    cardTitle: '',
    side1: '',
    side2: '',
  });

  const isFieldEmpty = value => {
    return value !== '';
  };

  const validators = {
    cardTitle: {
      required: isFieldEmpty,
    },
    side1: {
      required: isFieldEmpty,
    },
    side2: {
      required: isFieldEmpty,
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

  const handleAddingCards = async e => {
    e.preventDefault();
    setAlert(null);
    setFormErrors({
      side1: '',
      cardTitle: '',
      side2: '',
    });

    setFormWasValidated(false);
    const isValid = isFormValid();
    if (isValid) {
      await fetch('http://localhost:5000/api/cards', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cardTitle: formData.cardTitle,
          cards: [{ side1: formData.side1, side2: formData.side2 }],
        }),
      })
        .then(res => {
          if (res.status === 201) {
            setAlert({ alertType: 'success', message: messageTypes.success });
            setFormData({
              cardTitle: '',
              side1: '',
              side2: '',
            });
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
        <h2>Szókártya hozzáadása</h2>
        {alert && (
          <div>
            <p className={`alert alert-${alert.alertType}`}>{alert.message}</p>
          </div>
        )}
        <form
          noValidate
          onSubmit={handleAddingCards}
          className={`needs-validation ${formWasValidated && 'was-validated'}`}
        >
          <div className="md-3">
            <InputField
              name="cardTitle"
              type="text"
              value={formData.cardTitle}
              labelText="Kártyacsomag neve"
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              reference={references.cardTitle}
              error={formErrors.cardTitle}
            />
          </div>
          <div className="md-3">
            <InputField
              name="side1"
              type="text"
              value={formData.side1}
              labelText="Első oldal"
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              reference={references.side1}
              error={formErrors.side1}
            />
          </div>
          <div className="md-3">
            <InputField
              name="side2"
              type="text"
              value={formData.side2}
              labelText="Második oldal"
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              reference={references.side2}
              error={formErrors.side2}
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

export default NewCards;
