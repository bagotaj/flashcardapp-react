import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import InputField from '../InputField/InputField';
import Button from '../Button/Button';

import './FormCards.scss';

const FormCards = props => {
  const { type, loggedInUser, cardPack, flashcardPack } = props;

  const location = useLocation();

  const backend = process.env.REACT_APP_BACKEND_SERVER_URL;

  const [formData, setFormData] = useState(
    type === 'edit'
      ? cardPack
      : {
          cardType: '',
          cardTitle: '',
          description: '',
          side1: '',
          side2: '',
        }
  );

  const [flashcards, setFlashcards] = useState(
    type === 'edit' ? flashcardPack : []
  );

  const [cardTypeOptions] = useState([
    { value: '', text: 'Válassz!' },
    {
      text: 'Nyelv kártya',
    },
    {
      text: 'Egyéb kártya',
    },
  ]);

  const endpointsNew = {
    languageCardsNew: '/languagecards/new',
    otherCardsNew: '/othercards/new',
  };

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
  };

  const validateField = fieldName => {
    if (fieldName === 'cardId') return true;

    const value = formData[fieldName];
    let isValid = true;
    setFormErrors(prev => ({
      ...prev,
      [fieldName]: '',
    }));
    references[fieldName]?.current.setCustomValidity('');

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

  const setSendingData = () => {
    let collectedData = {
      cardType: formData.cardType,
      cardTitle: formData.cardTitle,
      description: formData.description,
      cards: '',
      userId: loggedInUser.userId,
    };

    if (type === 'edit') {
      const setUpFlashcards = [];

      flashcards.forEach(onecard => {
        const sides = {
          side1: onecard.side1,
          side2: onecard.side2,
        };

        setUpFlashcards.push(sides);
      });

      collectedData = {
        ...collectedData,
        cards: setUpFlashcards,
      };
    } else {
      collectedData = {
        ...collectedData,
        cards: flashcards,
      };
    }

    return collectedData;
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
      let url;

      if (type === 'new' && formData.cardType === 'Nyelv kártya') {
        url = `${backend}/api${endpointsNew.languageCardsNew}`;
      } else if (type === 'new' && formData.cardType === 'Egyéb kártya') {
        url = `${backend}/api${endpointsNew.otherCardsNew}`;
      }

      if (type === 'edit') {
        url = `${backend}/api${location.pathname}`;
      }

      try {
        const response =
          type === 'new'
            ? await fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${loggedInUser.token}`,
                },
                body: JSON.stringify(setSendingData()),
              })
            : await fetch(url, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${loggedInUser.token}`,
                },
                body: JSON.stringify(setSendingData()),
              });

        if (response.status === 200) {
          setAlert({ alertType: 'primary', message: messageTypes.success });
          setFormData({
            cardType: '',
            cardTitle: '',
            description: '',
            side1: '',
            side2: '',
          });
          setFlashcards([]);
        }
      } catch (error) {
        setAlert({ alertType: 'danger', message: messageTypes.fail + error });
      }
    } else {
      setFormWasValidated(true);
    }
  };

  const handleAddingOneCard = e => {
    e.preventDefault();

    setFlashcards([
      ...flashcards,
      {
        side1: formData.side1,
        side2: formData.side2,
      },
    ]);

    setFormData({
      ...formData,
      side1: '',
      side2: '',
    });
  };

  const handleEditFlashcard = e => {
    e.preventDefault();
    const { id } = e.target.dataset;

    setFormData({
      ...formData,
      side1: flashcards[id].side1,
      side2: flashcards[id].side2,
    });

    const cards = flashcards.filter((elem, index) => {
      return index !== Number(id);
    });

    setFlashcards(cards);
  };

  const handleDeleteFlashcard = e => {
    e.preventDefault();
    const { id } = e.target.dataset;

    const cards = flashcards.filter((elem, index) => {
      return index !== Number(id);
    });

    setFlashcards(cards);
  };

  return (
    <>
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

        <h3>Kártya létrehozása</h3>
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
            />
          </div>
        </div>
        <div className="d-grid gap-2 d-md-block mt-3 mb-3">
          <Button
            buttonType="submit"
            classes="btn btn-primary m-3"
            title="Mentés"
          />

          <Button
            buttonType="button"
            onClick={handleAddingOneCard}
            classes="btn btn-primary m-3"
            title="Szókártya hozzáadása"
          />
        </div>
        <div>
          {flashcards.length !== 0 &&
            flashcards.map((flashcard, index) => (
              <div className="row mb-3" key={flashcard.side1}>
                <div className="col-6 col-lg-5">
                  <div className="box center-content">{flashcard.side1}</div>
                </div>
                <div className="col-6 col-lg-5">
                  <div className="box center-content">{flashcard.side2}</div>
                </div>
                <div className="col-6 col-lg-2 new-card-buttons">
                  <Button
                    buttonType="button"
                    onClick={handleEditFlashcard}
                    classes="btn btn-primary new-card-one-button"
                    title={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        fill="currentColor"
                        className="bi bi-pencil-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                      </svg>
                    }
                    dataid={index}
                  />
                  <Button
                    buttonType="button"
                    onClick={handleDeleteFlashcard}
                    classes="btn btn-warning new-card-one-button"
                    title={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        className="bi bi-trash-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                      </svg>
                    }
                    dataid={index}
                  />
                </div>
              </div>
            ))}
        </div>
      </form>
    </>
  );
};

export default FormCards;
