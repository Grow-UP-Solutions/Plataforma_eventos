import { useState } from 'react';
import eventsApi from '../axios/eventsApi';
import { checkMalasPalabras } from '../utils/checkMalasPalabras';
import { isValidEmail } from '../utils/validateEmail';

const useValidateForm = (formData, setFormData) => {
  const [errorsInputs, setErrorsInputs] = useState({
    name: '',
    lastName: '',
    mail: '',
    password: '',
    confirmPassword: '',
    codeReferred: '',
  });

  const handleChangeInputValue = async (e) => {
    const id = e.target.id;
    const value = e.target.value;
    const regex = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[*/-_&@^]).{12,20}$/;
    let checkValidate = false;

    setErrorsInputs({ ...errorsInputs, [id]: true });

    if (id === 'name' || id === 'lastName') {
      if (checkMalasPalabras(value)) {
        return setErrorsInputs({ ...errorsInputs, [id]: false });
      }
    }

    if (id === 'canReceivedInformation') {
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
