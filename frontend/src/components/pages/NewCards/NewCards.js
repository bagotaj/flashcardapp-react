import { useState, useRef } from 'react';
import InputField from '../../common/InputField/InputField';
import Button from '../../common/Button/Button';

const NewCards = () => {
  const [formData, setFormData] = useState({
    cardType: '',
    cardTitle: '',
    description: '',
    side1: '',
    side2: '',
  });
  const [flashcards, setFlashCards] = useState([
    {
      side1: '',
      side2: '',
    },
  ]);

  const [cardTypeOptions] = useState([
    { value: '', text: 'Válassz!' },
    {
      text: 'Nyelv kártya',
    },
    {
      text: 'Egyéb kártya',
    },
  ]);

  const [endpoints] = useState({
    languageCards: '/languagecards/new',
    otherCards: '/othercards/new',
  });

  const [alert, setAlert] = useState(null);
  const [formWasValidated, setFormWasValidated] = useState(false);

  const messageTypes = {
    success: `A kártyacsomag mentése sikeres`,
    fail: `A kártyacsomag mentése sikeretelen volt az alább hiba miatt: `,
  };

  const references = {
    cardType: useRef(),
    cardTitle: useRef(),
    description: useRef(),
    side1: useRef(),
    side2: useRef(),
  };

  const formErrorTypes = {
    required: `A mező kitöltése kötelező`,
  };

  const [formErrors, setFormErrors] = useState({
    cardType: '',
    cardTitle: '',
    description: '',
    side1: '',
    side2: '',
  });

  const isFieldEmpty = value => {
    return value !== '';
  };

  const validators = {
    cardType: {
      required: isFieldEmpty,
    },
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
    // references[fieldName]?.current.setCustomValidity('');

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
      cardType: '',
      cardTitle: '',
      description: '',
      side1: '',
      side2: '',
    });

    setFormWasValidated(false);
    const isValid = isFormValid();
    if (isValid) {
      const backend = 'http://localhost:5000/api';
      let url;

      if (formData.cardType === 'Nyelv kártya') {
        url = `${backend}${endpoints.languageCards}`;
      } else {
        url = `${backend}${endpoints.otherCards}`;
      }
      await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cardTitle: formData.cardTitle,
          description: formData.description,
          cards: [{ side1: formData.side1, side2: formData.side2 }],
        }),
      })
        .then(res => {
          if (res.status >= 200 || res.status < 300) {
            setAlert({ alertType: 'success', message: messageTypes.success });
            setFormData({
              cardType: '',
              cardTitle: '',
              description: '',
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

  const handleAddingOneCard = e => {
    e.preventDefault();

    setFlashCards([
      ...flashcards,
      {
        side1: formData.side1,
        side2: formData.side2,
      },
    ]);
  };

  return (
    <>
      <div className="row mt-5">
        <h2>Szókártyacsomag létrehozás</h2>
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
              name="cardType"
              type="select"
              value={formData.cardType}
              labelText="Kártyacsomag típusa"
              options={cardTypeOptions}
              handleInputChange={handleInputChange}
              handleInputBlur={handleInputBlur}
              reference={references.cardTitle}
              error={formErrors.cardTitle}
              required
            />
          </div>
          <div className="md-3">
            <InputField
              name="cardTitle"
              type="text"
              value={formData.cardTitle}
              labelText="Kártyacsomag neve"
              handleInputChange={handleInputChange}
              handleInputBlur={handleInputBlur}
              reference={references.cardTitle}
              error={formErrors.cardTitle}
              required
            />
          </div>
          <div className="md-3">
            <InputField
              name="description"
              type="textarea"
              value={formData.description}
              labelText="Leírás"
              handleInputChange={handleInputChange}
              handleInputBlur={handleInputBlur}
              reference={references.description}
              error={formErrors.description}
            />
          </div>

          <h3>Szókártya létrehozás</h3>
          <div>
            {flashcards.map(flashcard => (
              <div className="row" key={flashcard.side1}>
                <div className="col md-3">{flashcard.side1}</div>
                <div className="col md-3">{flashcard.side2}</div>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col md-3">
              <InputField
                name="side1"
                type="text"
                value={formData.side1}
                labelText="Első oldal"
                handleInputChange={handleInputChange}
                handleInputBlur={handleInputBlur}
                reference={references.side1}
                error={formErrors.side1}
                required
              />
            </div>
            <div className="col md-3">
              <InputField
                name="side2"
                type="text"
                value={formData.side2}
                labelText="Második oldal"
                handleInputChange={handleInputChange}
                handleInputBlur={handleInputBlur}
                reference={references.side2}
                error={formErrors.side2}
                required
              />
            </div>
          </div>
          <div className="d-grid gap-2 d-md-block mt-3 mb-5">
            <Button
              buttonType="submit"
              classes="btn btn-primary m-3"
              title="Mentés"
            />

            <Button
              buttonType="click"
              handleAddingOneCard={handleAddingOneCard}
              classes="btn btn-primary m-3"
              title="Szókártya hozzáadása"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default NewCards;
