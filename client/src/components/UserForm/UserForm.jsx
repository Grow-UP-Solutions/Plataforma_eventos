import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import styles from './UserForm.module.css';

import eventsApi from '../../axios/eventsApi';

/* ICONS */
import { BsCamera, BsCardImage, BsInfoCircle, BsPencilSquare } from 'react-icons/bs';

import { AiOutlineCheck } from 'react-icons/ai';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { checkMalasPalabras } from '../../utils/checkMalasPalabras';
import { inputKeyDown, inputKeyUpPh, inputKeyUpTel } from '../../utils/inputOnlyNumbers';

import { Link } from 'react-router-dom';
import { invalidWords } from '../../utils/invalidWord';
import { isValidEmail } from '../../utils/validateEmail';

import AvatarEditor from 'react-avatar-editor';
import { dataURLtoFile, toDataURL } from '../../utils/convertUrlToImageFile';

const UserForm = ({ userData }) => {
  const [auxPictureUser, setAuxPictureUser] = useState(userData.userpicture);
  const [formData, setFormData] = useState({
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    nickname: userData.nickname || '',
    email: userData.email || '',
    direction: userData.direction || '',
    city: userData.city || '',
    tel: userData.tel || '',
    phone: userData.phone || '',
    document: userData.document || '',
    descriptionOrganizer: userData.descriptionOrganizer || '',
    userpicture: userData.userpicture || '',
    frontDocument: userData.frontDocument || '',
    backDocument: userData.backDocument || '',
    imageRent: userData.imageRent || '',
    isDeclarant: userData.isDeclarant,
  });

  const editor = useRef();
  const [propertysImageUser, setPropertysImageUser] = useState({
    image: formData.userpicture || '',
    position: { x: 0.5, y: 0.5 },
    borderRadius: 100,
  });

  const handlePositionChange = (position) => {
    setPropertysImageUser({ ...propertysImageUser, position });
  };

  const handleProfileImg = async (e) => {
    setErrorMessagePhoto({
      userpicture: '',
    });

    setCanWriteInput({
      ...canWriteInput,
      userpicture: false,
    });

    const image = e.target.files[0];

    if (image.size > 120000) {
      return setErrorMessagePhoto({
        userpicture: 'Por favor ingrese una imagén con tamaño menor a 100kb',
      });
    }

    const imageUrl = URL.createObjectURL(image);

    setFormData({
      ...formData,
      userpicture: imageUrl,
    });
  };

  const handleOnSaveUserImagePicture = async () => {
    setCanWriteInput({
      ...canWriteInput,
      userpicture: true,
    });

    const img = editor.current.getImageScaledToCanvas().toDataURL();
    const rect = editor.current.getCroppingRect();

    if (!img || !rect) return;

    const imageFile = await toDataURL(img).then((dataUrl) => {
      return dataURLtoFile(dataUrl, 'david-bowie.jpg');
    });

    const imageData = new FormData();
    imageData.append('file', imageFile);
    imageData.append('upload_preset', 'j2xzagqg');

    try {
      const result = await axios.post('https://api.cloudinary.com/v1_1/dti4vifvz/image/upload', imageData);
      await eventsApi.put(`/users/updateUserPicture/${userData._id}`, { urlImage: result.data.secure_url });
      setFormData({
        ...formData,
        userpicture: result.data.secure_url,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelUserPicture = () => {
    setCanWriteInput({
      ...canWriteInput,
      userpicture: true,
    });

    setFormData({
      ...formData,
      userpicture: auxPictureUser,
    });
  };

  const [modalCancel, setModalCancel] = useState(false);

  const handleModalCancel = (option) => {
    if (option === 'continue') {
      cancelSendForm();

      setModalCancel(!modalCancel);
    } else {
      setModalCancel(!modalCancel);
    }
  };

  const [errorMessagePhoto, setErrorMessagePhoto] = useState({
    userpicture: '',
    frontDocument: '',
    backDocument: '',
    imageRent: '',
  });

  const [uploadMessage, setUploadMessage] = useState({
    status: false,
    message: '',
    color: '',
  });

  const [canWriteInput, setCanWriteInput] = useState({
    name: true,
    nickname: true,
    email: true,
    direction: true,
    city: true,
    tel: true,
    phone: true,
    password: true,
    document: true,
    descriptionOrganizer: true,
    userpicture: true,
    frontDocument: true,
    backDocument: true,
    imageRent: true,
    isDeclarant: true,
  });

  const [changePassword, setChangePassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [checkSuccessPassword, setCheckSuccessPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const [errorPassword, setErrorPassword] = useState({
    currentPassword: null,
    newPassword: null,
    confirmNewPassword: null,
  });

  const handleChangeInputPassword = async (e) => {
    const id = e.target.id;
    const value = e.target.value;
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[().#?!@$%^&*-]).{12,20}$/;
    let checkValidate = false;

    if (value === '') {
      return setErrorPassword({
        ...errorPassword,
        [id]: true,
      });
    }

    // TODO: currentPassword -> Comparar la contraseña.
    if (id === 'currentPassword') {
      try {
        const result = await eventsApi.post(`/users/isSamePassword/${userData._id}`, { password: value });

        console.log(result);
        checkValidate = result.data.success;
      } catch (error) {
        console.log(error);

        checkValidate = false;
      }
    }

    if (id === 'newPassword') {
      checkValidate = regex.test(value);
    }

    if (id === 'confirmNewPassword') {
      checkValidate = changePassword.newPassword === value;
    }

    if (checkValidate) {
      setErrorPassword({
        ...errorPassword,
        [id]: true,
      });

      setCheckSuccessPassword({
        ...checkSuccessPassword,
        [id]: true,
      });

      setChangePassword({
        ...changePassword,
        [id]: value,
      });
    } else {
      setErrorPassword({
        ...errorPassword,
        [id]: false,
      });

      setCheckSuccessPassword({
        ...checkSuccessPassword,
        [id]: false,
      });

      setChangePassword({
        ...changePassword,
        [id]: '',
      });
    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const handleChangeVisiblePassword = (option) => {
    setIsPasswordVisible({
      ...isPasswordVisible,
      [option]: !isPasswordVisible[option],
    });
  };

  const txtName = useRef();
  const txtAddress = useRef();
  const txtCity = useRef();
  const txtTel = useRef();
  const txtPhone = useRef();
  const txtDocument = useRef();
  const txtAreaDescription = useRef();
  useEffect(() => {
    txtName.current.focus();
  }, [canWriteInput.name]);

  useEffect(() => {
    txtAddress.current.focus();
  }, [canWriteInput.direction]);

  useEffect(() => {
    txtCity.current.focus();
  }, [canWriteInput.city]);

  useEffect(() => {
    txtTel.current.focus();
  }, [canWriteInput.tel]);

  useEffect(() => {
    txtPhone.current.focus();
  }, [canWriteInput.phone]);

  useEffect(() => {
    txtDocument.current.focus();
  }, [canWriteInput.document]);

  useEffect(() => {
    txtAreaDescription.current.focus();
  }, [canWriteInput.descriptionOrganizer]);

  const editFields = (e, inputName) => {
    e.preventDefault();

    if (inputName === 'name' || inputName === 'lastName') {
    }

    setCanWriteInput({
      ...canWriteInput,
      [inputName]: false,
    });
  };

  const [errorFields, setErrorFields] = useState({
    firstName: '',
    lastName: '',
    nickname: '',
    email: '',
    direction: '',
    city: '',
    tel: '',
    phone: '',
    document: '',
    descriptionOrganizer: '',
  });

  const handleInputChange = (e) => {
    const nameInput = e.target.name;
    const valueInput = e.target.value;
    const auxValueInput = valueInput;

    if (checkMalasPalabras(auxValueInput.toLowerCase())) {
      return setErrorFields({
        ...errorFields,
        [nameInput]: 'Por favor no use palabras ofensivas u obscenas.',
      });
    } else {
      setErrorFields({
        ...errorFields,
        [nameInput]: '',
      });
    }

    if (nameInput === 'tel') {
      const num = valueInput.replace(/ /g, '');
      if (num.length > 10) {
        return setErrorFields({
          ...errorFields,
          [nameInput]: 'Ingrese un número de télefono válido.',
        });
      }
    }

    if (nameInput === 'phone') {
      const num = valueInput.replace(/ /g, '');
      if (num.length > 10) {
        return setErrorFields({
          ...errorFields,
          [nameInput]: 'Ingrese un número de celular válido.',
        });
      }
    }

    if (nameInput === 'document') {
      if (valueInput.length < 7 || valueInput.length > 10 || valueInput.length === 9) {
        setErrorFields({
          ...errorFields,
          document: 'Por favor ingrese una cédula correcta.',
        });
      } else {
        setErrorFields({
          ...errorFields,
          document: '',
        });
      }
    }

    if (nameInput === 'descriptionOrganizer') {
      const auxValue = valueInput;

      invalidWords.forEach((word) => {
        if (auxValue.toLowerCase().includes(word)) {
          setErrorFields({
            ...errorFields,
            [nameInput]:
              'Este texto contiene cierta información que no esta permitida, como por ejemplo números de teléfono, direcciones de correo electrónico, enlaces web, redes sociales, etc. Por favor elimina esta información e inténtalo nuevamente. ',
          });
        }
      });
    }

    setFormData({
      ...formData,
      [nameInput]: valueInput,
    });
  };

  const updateUserData = async (e) => {
    e.preventDefault();

    let errorsGeneral = { ...errorFields, ...errorMessagePhoto };

    let hasErrors = false;
    let hasChanges = false;
    let isProfileCompleted = true;

    if (formData.isDeclarant && formData.imageRent === '') {
      return setErrorMessagePhoto({
        ...errorMessagePhoto,
        imageRent: 'Si es declarante por favor ingresar imagen del documento.',
      });
    }

    for (let i = 0; i < Object.keys(formData).length; i++) {
      const key = Object.keys(formData)[i];
      if (typeof formData[key] === 'boolean') continue;
      if (key === 'nickname') continue;
      if (key === 'imageRent') continue;
      if (!formData[key]) {
        isProfileCompleted = false;
        break;
      }
    }

    Object.values(errorsGeneral).forEach((error) => {
      if (error) hasErrors = true;
    });

    Object.values(canWriteInput).forEach((isChange) => {
      if (!isChange) hasChanges = true;
    });

    if (hasErrors) {
      return setUploadMessage({
        status: true,
        message: 'Por favor corrija los errores.',
        color: '#d53e27',
      });
    }

    if (!hasChanges) {
      return setUploadMessage({
        status: true,
        message: 'No haz hecho ningún cambio',
        color: '#d53e27',
      });
    }

    if (!hasErrors && hasChanges) {
      setUploadMessage({
        status: true,
        message: 'Tus cambios han sido guardados',
        color: '#29aa79',
      });

      let userFormDataCompleted = {
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`,
        isProfileCompleted,
      };

      if (checkVerifyEmail) {
        userFormDataCompleted = {
          ...userFormDataCompleted,
          email: changeEmail.email,
        };
      }

      if (errorPassword.currentPassword && errorPassword.newPassword && errorPassword.confirmNewPassword) {
        userFormDataCompleted = {
          ...userFormDataCompleted,
          password: changePassword.newPassword,
        };
      }

      try {
        await eventsApi.put(`/users/update/${userData._id}`, userFormDataCompleted);
      } catch (error) {
        console.log({ error });
      }
      window.location.reload();
    }
  };

  const cancelSendForm = () => {
    setErrorMessagePhoto({
      userpicture: '',
      frontDocument: '',
      backDocument: '',
      imageRent: '',
    });

    setFormData({
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      nickname: userData.nickname || '',
      email: userData.email || '',
      direction: userData.direction || '',
      city: userData.city || '',
      tel: userData.tel || '',
      phone: userData.phone || '',
      document: userData.document || '',
      descriptionOrganizer: userData.descriptionOrganizer || '',
      userpicture: userData.userpicture || '',
      frontDocument: userData.frontDocument || '',
      backDocument: userData.backDocument || '',
      imageRent: userData.imageRent || '',
    });

    setCanWriteInput({
      name: true,
      nickname: true,
      email: true,
      direction: true,
      city: true,
      tel: true,
      phone: true,
      password: true,
      document: true,
      descriptionOrganizer: true,
    });

    setChangePassword({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });

    setCheckSuccessPassword({
      currentPassword: false,
      newPassword: false,
      confirmNewPassword: false,
    });

    setErrorPassword({
      currentPassword: null,
      newPassword: null,
      confirmNewPassword: null,
    });

    setUploadMessage({
      status: false,
      message: '',
      color: '',
    });

    setErrorFields({
      firstName: '',
      lastName: '',
      nickname: '',
      email: '',
      direction: '',
      city: '',
      tel: '',
      phone: '',
      document: '',
      descriptionOrganizer: '',
    });
  };

  const handleImageBackDocument = async (e) => {
    setErrorMessagePhoto({
      ...errorMessagePhoto,
      backDocument: '',
    });

    setCanWriteInput({
      ...canWriteInput,
      backDocument: false,
    });

    const image = e.target.files[0];
    if (image.size > 120000) {
      return setErrorMessagePhoto({
        ...errorMessagePhoto,
        backDocument: 'Por favor ingrese una imagén con tamaño menor a 100kb',
      });
    }

    const imageData = new FormData();
    imageData.append('file', image);
    imageData.append('upload_preset', 'j2xzagqg');

    try {
      const result = await axios.post('https://api.cloudinary.com/v1_1/dti4vifvz/image/upload', imageData);

      setFormData({
        ...formData,
        backDocument: result.data.secure_url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageFrontDocument = async (e) => {
    setErrorMessagePhoto({
      ...errorMessagePhoto,
      frontDocument: '',
    });
    setCanWriteInput({
      ...canWriteInput,
      frontDocument: false,
    });

    const image = e.target.files[0];

    if (image.size > 120000) {
      return setErrorMessagePhoto({
        ...errorMessagePhoto,
        frontDocument: 'Por favor ingrese una imagén con tamaño menor a 100kb',
      });
    }

    const imageData = new FormData();
    imageData.append('file', image);
    imageData.append('upload_preset', 'j2xzagqg');

    try {
      const result = await axios.post('https://api.cloudinary.com/v1_1/dti4vifvz/image/upload', imageData);

      setFormData({
        ...formData,
        frontDocument: result.data.secure_url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageRent = async (e) => {
    setErrorMessagePhoto({
      ...errorMessagePhoto,
      imageRent: '',
    });

    setCanWriteInput({
      ...canWriteInput,
      imageRent: false,
    });

    const image = e.target.files[0];

    if (image.size > 120000) {
      return setErrorMessagePhoto({
        ...errorMessagePhoto,
        imageRent: 'Por favor ingrese una imagén con tamaño menor a 100kb',
      });
    }

    const imageData = new FormData();
    imageData.append('file', image);
    imageData.append('upload_preset', 'j2xzagqg');

    try {
      const result = await axios.post('https://api.cloudinary.com/v1_1/dti4vifvz/image/upload', imageData);

      setFormData({
        ...formData,
        imageRent: result.data.secure_url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [changeEmail, setChangeEmail] = useState({
    email: '',
  });

  const [errorChangeEmail, setErrorChangeEmail] = useState('');

  const [checkVerifyEmail, setCheckVerifyEmail] = useState(false);

  const handleOnChangeEmail = (e) => {
    const value = e.target.value;

    if (!isValidEmail(value)) return setErrorChangeEmail('Por favor ingrese un correo valido.');

    setErrorChangeEmail('');
    setChangeEmail({
      email: value,
    });
  };

  const verifyEmail = async (e) => {
    e.preventDefault();
    const email = changeEmail.email;

    if (!email) return setErrorChangeEmail('Por favor ingrese un correo.');

    const { isEmailExists } = await eventsApi.get(`/users/existsEmail/${email}`).then((result) => result.data);
    if (isEmailExists) return setErrorChangeEmail('Este correo ya ha sido registrado.');

    localStorage.setItem('user', JSON.stringify({ email }));

    const popup = window.open(
      `http://localhost:3000/verificarmail/profile`,
      'targetWindow',
      `toolbar=no, location=no, status=no,menubar=no, scrollbars=yes, resizable=yes,width=800, height=600`
    );

    window.addEventListener('message', async (event) => {
      const isConfirmEmail = event.data.confirm;
      if (isConfirmEmail) {
        setCheckVerifyEmail(true);
        popup.close();
      }
    });
  };

  const cancelChangeEmail = (e) => {
    e.preventDefault();
    setCheckVerifyEmail(false);
    setChangeEmail({ email: '' });
    setErrorChangeEmail('');
  };

  /* CONVERT TO ORGANIZER */
  const [modalSetOrganizer, setModalSetOrganizer] = useState(false);
  const [isProccessingToOrganizer, setIsProccessingToOrganizer] = useState(userData.isProccessingToOrganizer);

  const sendEmailToOrganizer = async () => {
    setIsProccessingToOrganizer(true);
    setModalSetOrganizer(false);

    const user = {
      id: userData._id,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      document: formData.document,
      tel: formData.tel,
      phone: formData.phone,
      referenciaU: 'U123',
      referenciaZ: '',
    };

    try {
      const result = await eventsApi.post('/users/requestToOrganizer', { user });
    } catch (error) {
      console.log({ error });
    }
  };

  const handleInputRadioButtonRent = async (e) => {
    const option = e.target.id;

    setErrorMessagePhoto({
      ...errorMessagePhoto,
      imageRent: '',
    });

    setCanWriteInput({
      ...canWriteInput,
      isDeclarant: false,
    });

    if (option === 'yes') setFormData({ ...formData, isDeclarant: true });
    if (option === 'no') {
      setFormData({ ...formData, isDeclarant: false, imageRent: '' });
    }
  };

  return (
    <div className={styles.containerUserForm}>
      <div className={styles.containerPhotoProfile}>
        <div className={styles.containerPhoto}>
          {formData.userpicture !== '' ? (
            <AvatarEditor
              border={0}
              borderRadius={propertysImageUser.borderRadius}
              onPositionChange={handlePositionChange}
              className={styles.avatarEditor}
              ref={editor}
              image={formData.userpicture}
            />
          ) : (
            <div className={styles.addPhoto}>
              <BsCamera className={styles.iconAddPhoto} />
            </div>
          )}
        </div>
        {!canWriteInput.userpicture && (
          <>
            <button style={{ marginBottom: 10 }} className={styles.btnSuccess} onClick={handleOnSaveUserImagePicture}>
              Guardar
            </button>
            <button style={{ marginBottom: 10 }} onClick={handleCancelUserPicture} className={styles.btnCancel}>
              Cancelar
            </button>
          </>
        )}
        <button className={styles.btnAddPhoto}>
          <input onChange={handleProfileImg} type='file' className={styles.inputFile} />
          <BsCardImage className={styles.btnAddPhotoIcon} />
          <span>Agregar Imagen</span>
        </button>
        {errorMessagePhoto.userpicture && <span className={styles.errorMessage}>{errorMessagePhoto.userpicture}</span>}
      </div>
      {!userData.isReject && (
        <>
          {userData.isReject && userData.isProfileCompleted && !userData.isOrganizer && !isProccessingToOrganizer && (
            <div className={styles.isUserIsProfileCompleted}>
              <span>¡Tu perfil esta completo! Y eres elegible para ser organizador</span>
              <div className={styles.containerBtnOrganizer}>
                <button onClick={() => setModalSetOrganizer(true)} className={styles.btnApplyForOrganizer}>
                  Aplicar para ser organizador
                </button>
                <BsInfoCircle className={styles.btnIconMoreInfo} />
                <div className={styles.containerMoreInfo}>
                  <p>Probando texto</p>
                </div>
              </div>
            </div>
          )}

          {isProccessingToOrganizer && !userData.isOrganizer && (
            <>
              <div className={styles.organizerContainer}>
                <p>El organizador es la persona que puede publicar eventos en "Lo que quiero hacer"</p>
                <div className={styles.containerOrganizerApprobed}>
                  <span className={styles.proccessingOrganizer}>
                    Su solicitud para ser un organizador está en proceso.
                  </span>
                  <BsInfoCircle className={styles.iconOrganizerInfo} />
                </div>
              </div>
            </>
          )}

          {userData.isOrganizer && (
            <>
              <div className={styles.organizerContainer}>
                <p>El organizador es la persona que puede publicar eventos en "Lo que quiero hacer"</p>

                <div className={styles.containerOrganizerApprobed}>
                  <AiOutlineCheck className={styles.iconOrganizerApprobed} />
                  <span>Organizador aprobado.</span>
                  <BsInfoCircle className={styles.iconOrganizerInfo} />
                </div>

                <button className={styles.btnCreateEvent}>Organiza un evento</button>
              </div>
            </>
          )}
        </>
      )}

      <div className={styles.divisor} />
      {/* FORM */}
      <div className={styles.containerForm}>
        <form>
          <div className={`${styles.formGroup} ${styles.formGroupNames}`}>
            <div className={styles.subFormGroup}>
              <div className={styles.inputsContainer}>
                <label htmlFor='firstName'>Nombre(s)</label>
                <input
                  onChange={handleInputChange}
                  disabled={canWriteInput.name}
                  value={formData.firstName}
                  type='text'
                  id='firstName'
                  name='firstName'
                  ref={txtName}
                />

                <span>Como aparece en la cedula</span>
              </div>
              <div className={styles.inputsContainer}>
                <label htmlFor='lastname'>Apellido(s)</label>
                <input
                  onChange={handleInputChange}
                  disabled={canWriteInput.name}
                  value={formData.lastName}
                  type='text'
                  id='lastName'
                  name='lastName'
                />
                <span>Como aparece en la cedula</span>
              </div>
              <button onClick={(e) => editFields(e, 'name')}>
                <BsPencilSquare className={styles.iconEdit} />
                <span>Editar</span>
              </button>
            </div>
            {errorFields.firstName && <span className={styles.errorMessageField}>{errorFields.firstName}</span>}
          </div>

          {formData.firstName.split(' ').length > 1 && (
            <div className={styles.formGroup}>
              <div className={styles.subFormGroup}>
                <div className={styles.inputsContainer}>
                  <label htmlFor='nickname'>Nombre como quieres que salga en tu perfil:</label>

                  <select
                    className={styles.selectNickName}
                    name='nickname'
                    id='nickname'
                    onChange={handleInputChange}
                    disabled={canWriteInput.nickname}
                    defaultValue={formData.nickname}
                  >
                    {formData.firstName.split(' ').map((name) => {
                      return (
                        <option key={name} value={`${name} ${formData.lastName.split(' ')[0]}`}>
                          {`${name} ${formData.lastName.split(' ')[0]}`}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <button onClick={(e) => editFields(e, 'nickname')}>
                  <BsPencilSquare className={styles.iconEdit} />
                  <span>Editar</span>
                </button>
              </div>
              {errorFields.nickname && <span className={styles.errorMessageField}>{errorFields.nickname}</span>}
            </div>
          )}
          <div className={styles.formGroup}>
            <div className={styles.subFormGroup}>
              <div className={styles.inputsContainer}>
                <label htmlFor='mail'>Email:</label>
                <input disabled value={formData.email} type='mail' id='mail' placeholder='email@ejemplo.com' />
              </div>
              <button onClick={(e) => editFields(e, 'email')}>
                <BsPencilSquare className={styles.iconEdit} />
                <span>Editar</span>
              </button>
            </div>
            {errorFields.email && <span className={styles.errorMessageField}>{errorFields.email}</span>}
          </div>

          {/* CHANGE EMAIL */}

          {!canWriteInput.email && (
            <>
              <div className={styles.formGroupPassword}>
                <label htmlFor='change-mail'>Nuevo email:</label>
                <div className={styles.containerInputChangeEmail}>
                  <input
                    style={{
                      border: errorChangeEmail && '1px solid #C34A33',
                    }}
                    type={'mail'}
                    id='change-mail'
                    required
                    autoComplete='off'
                    onChange={handleOnChangeEmail}
                  />

                  {errorChangeEmail && <span className={styles.errorMessageChangeEmail}>{errorChangeEmail}</span>}

                  {checkVerifyEmail && <AiOutlineCheck className={styles.iconCheckPassword} />}
                </div>
                <div className={styles.containerButtonsChangeMail}>
                  <button onClick={verifyEmail}>Verificar</button>
                  <button onClick={cancelChangeEmail}>Cancelar</button>
                </div>
              </div>
            </>
          )}

          <div className={styles.formGroup}>
            <div className={styles.subFormGroup}>
              <div className={styles.inputsContainer}>
                <label htmlFor='direction'>Dirección:</label>
                <input
                  onChange={handleInputChange}
                  disabled={canWriteInput.direction}
                  value={formData.direction}
                  type='text'
                  id='direction'
                  name='direction'
                  ref={txtAddress}
                />
              </div>
              <button onClick={(e) => editFields(e, 'direction')}>
                <BsPencilSquare className={styles.iconEdit} />
                <span>Editar</span>
              </button>
            </div>
            {errorFields.direction && <span className={styles.errorMessageField}>{errorFields.direction}</span>}
          </div>
          <div className={styles.formGroup}>
            <div className={styles.subFormGroup}>
              <div className={styles.inputsContainer}>
                <label htmlFor='city'>Ciudad:</label>
                <input
                  onChange={handleInputChange}
                  disabled={canWriteInput.city}
                  value={formData.city}
                  name='city'
                  type='text'
                  id='city'
                  ref={txtCity}
                />
              </div>
              <button onClick={(e) => editFields(e, 'city')}>
                <BsPencilSquare className={styles.iconEdit} />
                <span>Editar</span>
              </button>
            </div>
            {errorFields.city && <span className={styles.errorMessageField}>{errorFields.city}</span>}
          </div>
          <div className={styles.formGroup}>
            <div className={styles.subFormGroup}>
              <div className={styles.inputsContainer}>
                <label htmlFor='tel'>Télefono:</label>
                <input
                  onKeyDown={inputKeyDown}
                  onKeyUp={inputKeyUpTel}
                  onChange={handleInputChange}
                  disabled={canWriteInput.tel}
                  value={formData.tel}
                  type='tel'
                  id='tel'
                  name='tel'
                  ref={txtTel}
                />
              </div>
              <button onClick={(e) => editFields(e, 'tel')}>
                <BsPencilSquare className={styles.iconEdit} />
                <span>Editar</span>
              </button>
            </div>
            {errorFields.tel && <span className={styles.errorMessageField}>{errorFields.tel}</span>}
          </div>
          <div className={styles.formGroup}>
            <div className={styles.subFormGroup}>
              <div className={styles.inputsContainer}>
                <label htmlFor='phone'>Celular:</label>
                <input
                  onKeyDown={inputKeyDown}
                  onKeyUp={inputKeyUpPh}
                  onChange={handleInputChange}
                  disabled={canWriteInput.phone}
                  value={formData.phone}
                  type='tel'
                  id='phone'
                  name='phone'
                  ref={txtPhone}
                />
              </div>
              <button onClick={(e) => editFields(e, 'phone')}>
                <BsPencilSquare className={styles.iconEdit} />
                <span>Editar</span>
              </button>
            </div>
            {errorFields.phone && <span className={styles.errorMessageField}>{errorFields.phone}</span>}
          </div>

          {/* PASSWORD */}

          <div className={styles.formGroup}>
            <div className={styles.subFormGroup}>
              <div className={styles.inputsContainer}>
                <label htmlFor='password'>Contraseña</label>
                <input disabled value={'*************'} type='password' id='password' />
              </div>
              <button onClick={(e) => editFields(e, 'password')}>
                <BsPencilSquare className={styles.iconEdit} />
                <span>Editar</span>
              </button>
            </div>
          </div>

          {!canWriteInput.password && (
            <>
              <div className={styles.formGroupPassword}>
                <label htmlFor='password'>Contraseña actual:</label>
                <div className={styles.containerInputForPassword}>
                  <input
                    style={{
                      border: errorPassword.currentPassword === false && '1px solid #C34A33',
                    }}
                    type={isPasswordVisible.currentPassword ? 'text' : 'password'}
                    id='currentPassword'
                    required
                    onChange={handleChangeInputPassword}
                    autoComplete='off'
                  />

                  {!isPasswordVisible.currentPassword ? (
                    <FiEye
                      onClick={() => handleChangeVisiblePassword('currentPassword')}
                      className={styles.iconVisiblePassword}
                    />
                  ) : (
                    <FiEyeOff
                      onClick={() => handleChangeVisiblePassword('currentPassword')}
                      className={styles.iconVisiblePassword}
                    />
                  )}

                  {checkSuccessPassword.currentPassword && <AiOutlineCheck className={styles.iconCheckPassword} />}
                </div>
                {errorPassword.currentPassword === false && (
                  <span className={styles.errorMessage}>
                    Has ingresado una contraseña que no coincide con la registrada,intenta <br /> de nuevo o comunicate
                    con nosotros <a href='#'>aquí.</a>
                  </span>
                )}
              </div>
              <div className={styles.formGroupPassword}>
                <label htmlFor='newPassword'>Contraseña nueva:</label>
                <div className={styles.containerInputForPassword}>
                  <input
                    style={{
                      border: errorPassword.newPassword === false && '1px solid #C34A33',
                    }}
                    type={isPasswordVisible.newPassword ? 'text' : 'password'}
                    id='newPassword'
                    placeholder='Entre 12 y 20 caracteres que idealmente incluya combinación de letras, números y caracteres especiales (* / - _ & @^)'
                    required
                    onChange={handleChangeInputPassword}
                  />

                  {!isPasswordVisible.newPassword ? (
                    <FiEye
                      onClick={() => handleChangeVisiblePassword('newPassword')}
                      className={styles.iconVisiblePassword}
                    />
                  ) : (
                    <FiEyeOff
                      onClick={() => handleChangeVisiblePassword('newPassword')}
                      className={styles.iconVisiblePassword}
                    />
                  )}
                  {checkSuccessPassword.newPassword && <AiOutlineCheck className={styles.iconCheckPassword} />}
                </div>
                {errorPassword.newPassword === false && (
                  <span className={styles.errorMessage}>El formato debe tener entre 12 y 20 caracteres.</span>
                )}
              </div>

              <div className={styles.formGroupPassword}>
                <label htmlFor='newConfirmPassword'>Repetir contraseña nueva:</label>
                <div className={styles.containerInputForPassword}>
                  <input
                    style={{
                      border: errorPassword.confirmNewPassword === false && '1px solid #C34A33',
                    }}
                    type={isPasswordVisible.confirmNewPassword ? 'text' : 'password'}
                    id='confirmNewPassword'
                    required
                    onChange={handleChangeInputPassword}
                  />

                  {!isPasswordVisible.confirmNewPassword ? (
                    <FiEye
                      onClick={() => handleChangeVisiblePassword('confirmNewPassword')}
                      className={styles.iconVisiblePassword}
                    />
                  ) : (
                    <FiEyeOff
                      onClick={() => handleChangeVisiblePassword('confirmNewPassword')}
                      className={styles.iconVisiblePassword}
                    />
                  )}

                  {checkSuccessPassword.confirmNewPassword && <AiOutlineCheck className={styles.iconCheckPassword} />}
                </div>
                {errorPassword.confirmNewPassword === false && (
                  <span className={styles.errorMessage}>Las contraseñas no coinciden</span>
                )}
              </div>
            </>
          )}

          {/* PASSWORD */}

          <div className={styles.formGroup}>
            <div className={styles.subFormGroup}>
              <div className={styles.inputsContainer}>
                <label htmlFor='document'>Cédula:</label>
                <input
                  disabled={canWriteInput.document}
                  onChange={handleInputChange}
                  value={formData.document}
                  type='text'
                  id='document'
                  name='document'
                  style={{
                    border: errorFields.document ? '1px solid #d53e27' : '',
                  }}
                  ref={txtDocument}
                />
                <span>
                  El número y foto de tu cédula son requeridos para efectos de seguridad y cumplimiento de la normativa
                  tributaria.
                </span>
              </div>
              <button onClick={(e) => editFields(e, 'document')}>
                <BsPencilSquare className={styles.iconEdit} />
                <span>Editar</span>
              </button>
            </div>
            {errorFields.document && <span className={styles.errorMessageField}>{errorFields.document}</span>}
          </div>

          {/* PHOTOS OF document */}
          <div className={styles.containerPhotosCedula}>
            <div className={styles.photoFront}>
              <span>Imagen frontal de la cédula:</span>
              {formData.frontDocument ? (
                <>
                  <img className={styles.frontDocument} src={formData.frontDocument} alt='document' />
                </>
              ) : (
                <>
                  <div className={styles.dragDni}>
                    <input onChange={handleImageFrontDocument} type='file' className={styles.inputFile} />
                    <BsCamera className={styles.iconCameraFile} />
                    <span>Arrastra una imagen</span>
                  </div>
                </>
              )}
              <p>Formatos: Jpg o png. Max. 100kb</p>

              <button className={styles.btnAddPhoto}>
                <input onChange={handleImageFrontDocument} type='file' className={styles.inputFile} />
                <BsCardImage className={styles.btnAddPhotoIcon} />
                <span>Agregar Imagen</span>
              </button>

              {errorMessagePhoto.frontDocument && (
                <span className={styles.errorMessage}>{errorMessagePhoto.frontDocument}</span>
              )}
            </div>
            <div className={styles.photoBack}>
              <span>Imagen dorsal de la cédula:</span>
              {formData.backDocument ? (
                <>
                  <img className={styles.backDocument} src={formData.backDocument} alt='document' />
                </>
              ) : (
                <>
                  <div className={styles.dragDni}>
                    <input onChange={handleImageBackDocument} type='file' className={styles.inputFile} />
                    <BsCamera className={styles.iconCameraFile} />
                    <span>Arrastra una imagen</span>
                  </div>
                </>
              )}
              <p>Formatos: Jpg o png. Max. 100kb</p>

              {errorMessagePhoto.backDocument && (
                <span className={styles.errorMessage}>{errorMessagePhoto.backDocument}</span>
              )}

              <button className={styles.btnAddPhoto}>
                <input onChange={handleImageBackDocument} type='file' className={styles.inputFile} />
                <BsCardImage className={styles.btnAddPhotoIcon} />
                <span>Agregar Imagen</span>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className={styles.divisor} />
      <div className={styles.containerPeopleRent}>
        <p>¿Eres persona natural declarante del impuesto a la Renta?</p>
        <div className={styles.containerCheckBoxRent}>
          <div className={styles.checkbox}>
            <input
              checked={formData.isDeclarant}
              onChange={handleInputRadioButtonRent}
              name='rent'
              type='radio'
              id='yes'
            />
            <label htmlFor='yes'>Sí</label>
          </div>
          <div className={styles.checkbox}>
            <input
              checked={!formData.isDeclarant}
              onChange={handleInputRadioButtonRent}
              name='rent'
              type='radio'
              id='no'
            />
            <label htmlFor='no'>No</label>
          </div>
          <div className={styles.containerDrag}>
            {formData.imageRent && formData.isDeclarant ? (
              <>
                <img src={formData.imageRent} alt='rent' className={styles.imageRent} />
              </>
            ) : (
              <>
                <div className={styles.dragRent}>
                  <input
                    disabled={!formData.isDeclarant}
                    onChange={handleImageRent}
                    type='file'
                    className={styles.inputFile}
                  />
                  <BsCamera className={styles.iconCameraFile} />
                  <span>Arrastra una imagen</span>
                </div>
              </>
            )}
            <p>Formatos: Jpg o png. Max. 100kb</p>

            {errorMessagePhoto.imageRent && <span className={styles.errorMessage}>{errorMessagePhoto.imageRent}</span>}

            <button className={styles.btnAddPhoto}>
              <input
                disabled={!formData.isDeclarant}
                onChange={handleImageRent}
                type='file'
                className={styles.inputFile}
              />
              <BsCardImage className={styles.btnAddPhotoIcon} />
              <span>Agregar Imagen</span>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.divisor} />
      <div className={styles.containerAboutMe}>
        <div>
          <div className={styles.containerTitle}>
            <p>Sobre mí:</p>
            <button onClick={(e) => editFields(e, 'descriptionOrganizer')}>
              <BsPencilSquare className={styles.iconEdit} />
              <span>Editar</span>
            </button>
          </div>
          <div className={styles.containerAboutMeInput}>
            <textarea
              value={formData.descriptionOrganizer}
              name='descriptionOrganizer'
              id='descriptionOrganizer'
              cols='30'
              rows='10'
              onChange={handleInputChange}
              disabled={canWriteInput.descriptionOrganizer}
              ref={txtAreaDescription}
            ></textarea>
            <BsInfoCircle className={styles.btnIconMoreInfo} />
          </div>
        </div>
        {errorFields.descriptionOrganizer && (
          <span className={styles.errorMessageFieldAboutMe}>{errorFields.descriptionOrganizer}</span>
        )}
      </div>
      <div className={styles.containerMainButton}>
        {uploadMessage.status && (
          <span
            className={styles.uploadFormDataMessage}
            style={{
              color: uploadMessage.color,
            }}
          >
            {uploadMessage.message}
          </span>
        )}

        <button onClick={updateUserData} className={styles.btnSave}>
          Guardar
        </button>
        <button onClick={() => setModalCancel(true)} className={styles.btnCancel}>
          Cancelar
        </button>
      </div>

      {/* MODAL DE "CANCELAR FORM" */}

      {modalCancel && (
        <div className={styles.overlayCancel}>
          <div className={styles.containerModalCancel}>
            <p className={styles.titleModalCancel}>Tus cambios no serán guardados</p>

            <div className={styles.containerButtonsCancel}>
              <button onClick={() => handleModalCancel('close')}>Cerrar</button>
              <button onClick={() => handleModalCancel('continue')}>Continuar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Convert to Organizer */}

      {modalSetOrganizer && (
        <>
          <div className={styles.overlaySetOrganizer}>
            <div className={styles.containerModalSetOrganizer}>
              <h3>Esta aplicando para convertirte en organizador</h3>

              <p>Esto te permitirá publicar eventos por medio de la plataforma</p>

              <span>
                Al proceder con ésta aplicación confirmas que has leído y aceptar la{' '}
                <Link to={'/privacy'}>Politica de privacidad</Link>, la{' '}
                <Link to={'/privacy'}>Politica de seguridad</Link> y los{' '}
                <Link to={'/privacy'}>Términos y condiciones</Link>
                de LO QUE QUIERO HACER S.A.S que aplican para un Organizador y las cuales son distintas a las que
                aceptaste previamente al momento de crear tu cuenta.
              </span>

              <div className={styles.containerButtons}>
                <button onClick={sendEmailToOrganizer} className={styles.btnSuccess}>
                  Aceptar
                </button>
                <button onClick={() => setModalSetOrganizer(false)} className={styles.btnCancelOrganizer}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserForm;
