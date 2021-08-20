export function validateField(
  formData,
  fieldName,
  setFormErrors,
  references,
  validators,
  formErrorTypes
) {
  const value = formData[fieldName];
  let isValid = true;

  setFormErrors(previousErrors => ({
    ...previousErrors,
    [fieldName]: '',
  }));

  if (validators[fieldName] !== undefined) {
    for (const [validationType, validatorFn] of Object.entries(
      validators[fieldName]
    )) {
      if (isValid !== false) {
        isValid = validatorFn(value);
        if (!isValid) {
          const errorText = formErrorTypes[validationType];
          setFormErrors(previousErrors => ({
            ...previousErrors,
            [fieldName]: errorText,
          }));
          references[fieldName]?.current.setCustomValidity(errorText);
        }
      }
    }
  }
  return isValid;
}

export function isFormValid(
  formData,
  setFormErrors,
  references,
  validators,
  formErrorTypes
) {
  let isValid = true;
  Object.keys(formData).forEach(fieldName => {
    const isFieldValid = validateField(
      formData,
      fieldName,
      setFormErrors,
      references,
      validators,
      formErrorTypes
    );
    if (!isFieldValid) {
      isValid = false;
    }
  });
  return isValid;
}
