import React, {useState} from 'react';
import axios from 'axios';
import styles from './UserForm.module.css';

import eventsApi from '../../axios/eventsApi';

/* ICONS */
import {
  BsCamera,
  BsCardImage,
  BsInfoCircle,
  BsPencilSquare,
} from 'react-icons/bs';

import {AiOutlineCheck} from 'react-icons/ai';
import {FiEye, FiEyeOff} from 'react-icons/fi';
import {checkMalasPalabras} from '../../utils/checkMalasPalabras';

const UserForm = ({userData}) => {
  const handleProfileImg = async (e) => {
    const image = e.target.files[0];

    const imageData = new FormData();
    imageData.append('file', image);
    imageData.append('upload_preset', 'j2xzagqg');

    try {
      const result = await axios.post(
        'https://api.cloudinary.com/v1_1/dti4vifvz/image/upload',
        imageData
      );

      setFormData({
        ...formData,
        userpicture: result.data.secure_url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageBackDocument = async (e) => {
    const image = e.target.files[0];

    const imageData = new FormData();
    imageData.append('file', image);
    imageData.append('upload_preset', 'j2xzagqg');

    try {
      const result = await axios.post(
        'https://api.cloudinary.com/v1_1/dti4vifvz/image/upload',
        imageData
      );

      setFormData({
        ...formData,
        backDocument: result.data.secure_url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageFrontDocument = async (e) => {
    const image = e.target.files[0];

    const imageData = new FormData();
    imageData.append('file', image);
    imageData.append('upload_preset', 'j2xzagqg');

    try {
      const result = await axios.post(
        'https://api.cloudinary.com/v1_1/dti4vifvz/image/upload',
        imageData
      );

      setFormData({
        ...formData,
        frontDocument: result.data.secure_url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageRent = async (e) => {
    const image = e.target.files[0];

    const imageData = new FormData();
    imageData.append('file', image);
    imageData.append('upload_preset', 'j2xzagqg');

    try {
      const result = await axios.post(
        'https://api.cloudinary.com/v1_1/dti4vifvz/image/upload',
        imageData
      );

      setFormData({
        ...formData,
        imageRent: result.data.secure_url,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
        const result = await eventsApi.post(
          `/users/isSamePassword/${userData._id}`,
          {password: value}
        );

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

  const editFields = (e, inputName) => {
    e.preventDefault();
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

    if (checkMalasPalabras(valueInput)) {
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

    if (nameInput === 'document') {
      if (
        valueInput.length < 7 ||
        valueInput.length > 10 ||
        valueInput.length === 9
      ) {
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

    setFormData({
      ...formData,
      [nameInput]: valueInput,
    });
  };

  const updateUserData = async (e) => {
    e.preventDefault();

    let userFormDataCompleted = {
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`,
    };

    if (
      errorPassword.currentPassword &&
      errorPassword.newPassword &&
      errorPassword.confirmNewPassword
    ) {
      userFormDataCompleted = {
        ...userFormDataCompleted,
        password: changePassword.newPassword,
      };
    }

    try {
      await eventsApi.put(
        `/users/update/${userData._id}`,
        userFormDataCompleted
      );
    } catch (error) {
      console.log({error});
    }

    window.location.reload();
  };

  const cancelSendForm = () => {
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
  };

  return (
    <div className={styles.containerUserForm}>
      <div className={styles.containerPhotoProfile}>
        <div className={styles.containerPhoto}>
          {formData.userpicture !== '' ? (
            <img src={formData.userpicture} alt='profile-img' />
          ) : (
            <div className={styles.addPhoto}>
              <BsCamera className={styles.iconAddPhoto} />
            </div>
          )}
        </div>
        <button className={styles.btnAddPhoto}>
          <input
            onChange={handleProfileImg}
            type='file'
            className={styles.inputFile}
          />
          <BsCardImage className={styles.btnAddPhotoIcon} />
          <span>Agregar Imagen</span>
        </button>
      </div>
      {userData.isOrganizer && (
        <div className={styles.isUserIsProfileCompleted}>
          <span>
            ¡Tu perfil esta completo! Y eres elegible para ser organizador
          </span>
          <div className={styles.containerBtnOrganizer}>
            <button className={styles.btnApplyForOrganizer}>
              Aplicar para ser organizador
            </button>
            <BsInfoCircle className={styles.btnIconMoreInfo} />

            <div className={styles.containerMoreInfo}>
              <p>Probando texto</p>
            </div>
          </div>
        </div>
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
            {errorFields.firstName && (
              <span className={styles.errorMessageField}>
                {errorFields.firstName}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <div className={styles.inputsContainer}>
              <label htmlFor='nickname'>
                Nombre como quieres que salga en tu perfil:
              </label>
              <input
                value={formData.nickname}
                name='nickname'
                type='text'
                id='nickname'
                onChange={handleInputChange}
                disabled={canWriteInput.nickname}
              />
            </div>
            <button onClick={(e) => editFields(e, 'nickname')}>
              <BsPencilSquare className={styles.iconEdit} />
              <span>Editar</span>
            </button>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.inputsContainer}>
              <label htmlFor='mail'>Email:</label>
              <input
                value={formData.email}
                type='mail'
                id='mail'
                placeholder='email@ejemplo.com'
              />
            </div>
            <button>
              <BsPencilSquare className={styles.iconEdit} />
              <span>Editar</span>
            </button>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.inputsContainer}>
              <label htmlFor='direction'>Dirección:</label>
              <input
                onChange={handleInputChange}
                disabled={canWriteInput.direction}
                value={formData.direction}
                type='text'
                id='direction'
                name='direction'
              />
            </div>
            <button onClick={(e) => editFields(e, 'direction')}>
              <BsPencilSquare className={styles.iconEdit} />
              <span>Editar</span>
            </button>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.inputsContainer}>
              <label htmlFor='city'>Ciudad:</label>
              <input
                onChange={handleInputChange}
                disabled={canWriteInput.city}
                value={formData.city}
                name='city'
                type='text'
                id='city'
              />
            </div>
            <button onClick={(e) => editFields(e, 'city')}>
              <BsPencilSquare className={styles.iconEdit} />
              <span>Editar</span>
            </button>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.inputsContainer}>
              <label htmlFor='tel'>Télefono:</label>
              <input
                onChange={handleInputChange}
                disabled={canWriteInput.tel}
                value={formData.tel}
                type='tel'
                id='tel'
                name='tel'
              />
            </div>
            <button onClick={(e) => editFields(e, 'tel')}>
              <BsPencilSquare className={styles.iconEdit} />
              <span>Editar</span>
            </button>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.inputsContainer}>
              <label htmlFor='phone'>Celular:</label>
              <input
                onChange={handleInputChange}
                disabled={canWriteInput.phone}
                value={formData.phone}
                type='tel'
                id='phone'
                name='phone'
              />
            </div>
            <button onClick={(e) => editFields(e, 'phone')}>
              <BsPencilSquare className={styles.iconEdit} />
              <span>Editar</span>
            </button>
          </div>

          {/* PASSWORD */}

          <div className={styles.formGroup}>
            <div className={styles.inputsContainer}>
              <label htmlFor='password'>Contraseña</label>
              <input
                disabled
                value={'*************'}
                type='password'
                id='password'
              />
            </div>
            <button onClick={(e) => editFields(e, 'password')}>
              <BsPencilSquare className={styles.iconEdit} />
              <span>Editar</span>
            </button>
          </div>

          {!canWriteInput.password && (
            <>
              <div className={styles.formGroupPassword}>
                <label htmlFor='password'>Contraseña actual:</label>
                <div className={styles.containerInputForPassword}>
                  <input
                    style={{
                      border:
                        errorPassword.currentPassword === false &&
                        '1px solid #C34A33',
                    }}
                    type={
                      isPasswordVisible.currentPassword ? 'text' : 'password'
                    }
                    id='currentPassword'
                    required
                    onChange={handleChangeInputPassword}
                    autoComplete='off'
                  />

                  {!isPasswordVisible.currentPassword ? (
                    <FiEye
                      onClick={() =>
                        handleChangeVisiblePassword('currentPassword')
                      }
                      className={styles.iconVisiblePassword}
                    />
                  ) : (
                    <FiEyeOff
                      onClick={() =>
                        handleChangeVisiblePassword('currentPassword')
                      }
                      className={styles.iconVisiblePassword}
                    />
                  )}

                  {checkSuccessPassword.currentPassword && (
                    <AiOutlineCheck className={styles.iconCheckPassword} />
                  )}
                </div>
                {errorPassword.currentPassword === false && (
                  <span className={styles.errorMessage}>
                    Has ingresado una contraseña que no coincide con la
                    registrada,intenta <br /> de nuevo o comunicate con nosotros{' '}
                    <a href='#'>aquí.</a>
                  </span>
                )}
              </div>
              <div className={styles.formGroupPassword}>
                <label htmlFor='newPassword'>Contraseña nueva:</label>
                <div className={styles.containerInputForPassword}>
                  <input
                    style={{
                      border:
                        errorPassword.newPassword === false &&
                        '1px solid #C34A33',
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
                  {checkSuccessPassword.newPassword && (
                    <AiOutlineCheck className={styles.iconCheckPassword} />
                  )}
                </div>
                {errorPassword.newPassword === false && (
                  <span className={styles.errorMessage}>
                    El formato debe tener entre 12 y 20 caracteres.
                  </span>
                )}
              </div>

              <div className={styles.formGroupPassword}>
                <label htmlFor='newConfirmPassword'>
                  Repetir contraseña nueva:
                </label>
                <div className={styles.containerInputForPassword}>
                  <input
                    style={{
                      border:
                        errorPassword.confirmNewPassword === false &&
                        '1px solid #C34A33',
                    }}
                    type={
                      isPasswordVisible.confirmNewPassword ? 'text' : 'password'
                    }
                    id='confirmNewPassword'
                    required
                    onChange={handleChangeInputPassword}
                  />

                  {!isPasswordVisible.confirmNewPassword ? (
                    <FiEye
                      onClick={() =>
                        handleChangeVisiblePassword('confirmNewPassword')
                      }
                      className={styles.iconVisiblePassword}
                    />
                  ) : (
                    <FiEyeOff
                      onClick={() =>
                        handleChangeVisiblePassword('confirmNewPassword')
                      }
                      className={styles.iconVisiblePassword}
                    />
                  )}

                  {checkSuccessPassword.confirmNewPassword && (
                    <AiOutlineCheck className={styles.iconCheckPassword} />
                  )}
                </div>
                {errorPassword.confirmNewPassword === false && (
                  <span className={styles.errorMessage}>
                    Las contraseñas no coinciden
                  </span>
                )}
              </div>
            </>
          )}

          {/* PASSWORD */}

          <div className={styles.formGroup}>
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
              />
              {errorFields.document && (
                <span className={styles.errorMessageField}>
                  {errorFields.document}
                </span>
              )}
              <span>
                El número y foto de tu cédula son requeridos para efectos de
                seguridad y cumplimiento de la normativa tributaria.
              </span>
            </div>
            <button onClick={(e) => editFields(e, 'document')}>
              <BsPencilSquare className={styles.iconEdit} />
              <span>Editar</span>
            </button>
          </div>

          {/* PHOTOS OF document */}
          <div className={styles.containerPhotosCedula}>
            <div className={styles.photoFront}>
              <span>Imagen frontal de la cédula:</span>
              {formData.frontDocument ? (
                <>
                  <img
                    className={styles.frontDocument}
                    src={formData.frontDocument}
                    alt='document'
                  />
                </>
              ) : (
                <>
                  <div className={styles.dragDni}>
                    <input
                      onChange={handleImageFrontDocument}
                      type='file'
                      className={styles.inputFile}
                    />
                    <BsCamera className={styles.iconCameraFile} />
                    <span>Arrastra una imagen</span>
                  </div>
                </>
              )}
              <p>Formatos: Jpg o png. Max. 100kb</p>
              <button className={styles.btnAddPhotoFile}>
                <BsCardImage className={styles.btnAddPhotoIcon} />
                <span>Agregar Imagen</span>
              </button>
            </div>
            <div className={styles.photoBack}>
              <span>Imagen dorsal de la cédula:</span>
              {formData.backDocument ? (
                <>
                  <img
                    className={styles.backDocument}
                    src={formData.backDocument}
                    alt='document'
                  />
                </>
              ) : (
                <>
                  <div className={styles.dragDni}>
                    <input
                      onChange={handleImageBackDocument}
                      type='file'
                      className={styles.inputFile}
                    />
                    <BsCamera className={styles.iconCameraFile} />
                    <span>Arrastra una imagen</span>
                  </div>
                </>
              )}
              <p>Formatos: Jpg o png. Max. 100kb</p>
              <button className={styles.btnAddPhotoFile}>
                <BsCardImage className={styles.btnAddPhotoIcon} />
                <span>Agregar Imagen</span>
                <input multiple type='file' className={styles.inputFile} />
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
            <input name='rent' type='radio' id='yes' />
            <label htmlFor='yes'>Sí</label>
          </div>
          <div className={styles.checkbox}>
            <input name='rent' type='radio' id='no' />
            <label htmlFor='no'>No</label>
          </div>
          <div className={styles.containerDrag}>
            {formData.imageRent ? (
              <>
                <img
                  src={formData.imageRent}
                  alt='rent'
                  className={styles.imageRent}
                />
              </>
            ) : (
              <>
                <div className={styles.dragRent}>
                  <input
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
            <button className={styles.btnAddPhotoFile}>
              <BsCardImage className={styles.btnAddPhotoIcon} />
              <span>Agregar Imagen</span>
              <input multiple type='file' className={styles.inputFile} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.divisor} />
      <div className={styles.containerAboutMe}>
        <div>
          <div className={styles.containerTitle}>
            <p>Sobre mí:</p>
            <button onClick={(e) => editFields(e, 'aboutMe')}>
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
            ></textarea>
            <BsInfoCircle className={styles.btnIconMoreInfo} />
          </div>
        </div>
      </div>
      <div className={styles.containerMainButton}>
        <button onClick={updateUserData} className={styles.btnSave}>
          Guardar
        </button>
        <button onClick={cancelSendForm} className={styles.btnCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default UserForm;
