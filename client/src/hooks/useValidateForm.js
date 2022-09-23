import React, { useState } from 'react';
import { isValidEmail } from '../utils/validateEmail';

const useValidateForm = (formData, setFormData) => {
  const [errorsInputs, setErrorsInputs] = useState({
    mail: '',
    password: '',
    confirmPassword: '',
    codeReferred: '',
  });

  const handleChangeInputValue = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,20}$/;
    let checkValidate = false;

    if (id === 'canReceivedInformation') {
      console.log({ event: e.target });
      return setFormData({
        ...formData,
        [id]: !formData.canReceivedInformation,
      });
    }

    if (id === 'name' || id === 'lastName') {
      return setFormData({
        ...formData,
        [id]: value,
      });
    }

    if (value.length === 0) {
      return setErrorsInputs({
        ...errorsInputs,
        [id]: '',
      });
    }

    if (id === 'mail') {
      checkValidate = isValidEmail(value);
    }

    if (id === 'password') {
      checkValidate = regex.test(value);
    }

    if (id === 'confirmPassword') {
      checkValidate = formData.password === value;
    }

    if (checkValidate) {
      setErrorsInputs({
        ...errorsInputs,
        [id]: true,
      });

      setFormData({
        ...formData,
        [id]: value,
      });
    } else {
      setErrorsInputs({
        ...errorsInputs,
        [id]: false,
      });

      setFormData({
        ...formData,
        [id]: '',
      });
    }
  };

  return [errorsInputs, handleChangeInputValue];
};

export default useValidateForm;
