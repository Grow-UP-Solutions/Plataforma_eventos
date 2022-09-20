import React, { useState } from 'react';

import styles from './UserForm.module.css';

/* ICONS */
import {
  BsCamera,
  BsCardImage,
  BsPencilSquare,
  BsInfoCircle,
} from 'react-icons/bs';

const UserForm = () => {
  const [profileImg, setProfileImg] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    nickname: '',
    email: '',
    address: '',
    city: '',
    tel: '',
    phone: '',
    password: '',
  });

  const handleProfileImg = (e) => {
    setProfileImg(e.target.files[0]);
  };

  return (
    <div className={styles.containerUserForm}>
      <div className={styles.containerPhotoProfile}>
        <div className={styles.containerPhoto}>
          {profileImg ? (
            <img src={profileImg} alt="profile-img" />
          ) : (
            <div className={styles.addPhoto}>
              <BsCamera className={styles.iconAddPhoto} />
            </div>
          )}
        </div>
        <button className={styles.btnAddPhoto}>
          <input
            onChange={handleProfileImg}
            type="file"
            className={styles.inputFile}
          />
          <BsCardImage className={styles.btnAddPhotoIcon} />
          <span>Agregar Imagen</span>
        </button>
      </div>
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

      <div className={styles.divisor} />

      {/* FORM */}
      <div className={styles.containerForm}>
        <form>
          <div className={styles.formGroup}>
            <div className={styles.inputsContainer}>
              <label htmlFor="name">Nombre(s)</label>
              <input type="text" id="name" />
              <span>Como aparece en la cedula</span>
            </div>
            <div className={styles.inputsContainer}>
              <label htmlFor="lastname">Apellido(s)</label>
              <input type="text" id="lastname" />
              <span>Como aparece en la cedula</span>
            </div>
            <button>
              <BsPencilSquare className={styles.iconEdit} />
              <span>Editar</span>
            </button>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.inputsContainer}>
              <label htmlFor="nickname">
                Nombre como quieres que salga en tu perfil:
              </label>
              <input type="text" id="nickname" />
            </div>
            <button>
              <BsPencilSquare className={styles.iconEdit} />
              <span>Editar</span>
            </button>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.inputsContainer}>
              <label htmlFor="mail">Email:</label>
              <input type="mail" id="mail" placeholder="email@ejemplo.com" />
            </div>
            <button>
              <BsPencilSquare className={styles.iconEdit} />
              <span>Editar</span>
            </button>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.inputsContainer}>
              <label htmlFor="address">Dirección:</label>
              <input type="text" id="address" />
            </div>
            <button>
              <BsPencilSquare className={styles.iconEdit} />
              <span>Editar</span>
            </button>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.inputsContainer}>
              <label htmlFor="city">Ciudad:</label>
              <input type="text" id="city" />
            </div>
            <button>
              <BsPencilSquare className={styles.iconEdit} />
              <span>Editar</span>
            </button>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.inputsContainer}>
              <label htmlFor="tel">Télefono:</label>
              <input type="tel" id="tel" />
            </div>
            <button>
              <BsPencilSquare className={styles.iconEdit} />
              <span>Editar</span>
            </button>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.inputsContainer}>
              <label htmlFor="phone">Celular:</label>
              <input type="tel" id="phone" />
            </div>
            <button>
              <BsPencilSquare className={styles.iconEdit} />
              <span>Editar</span>
            </button>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.inputsContainer}>
              <label htmlFor="password">Contraseña</label>
              <input type="password" id="password" />
            </div>
            <button>
              <BsPencilSquare className={styles.iconEdit} />
              <span>Editar</span>
            </button>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.inputsContainer}>
              <label htmlFor="dni">Cédula:</label>
              <input type="text" id="dni" />
              <span>
                El número y foto de tu cédula son requeridos para efectos de
                seguridad y cumplimiento de la normativa tributaria.
              </span>
            </div>
            <button>
              <BsPencilSquare className={styles.iconEdit} />
              <span>Editar</span>
            </button>
          </div>

          {/* PHOTOS OF DNI */}
          <div className={styles.containerPhotosCedula}>
            <div className={styles.photoFront}>
              <span>Imagen frontal de la cédula:</span>
              <div className={styles.dragDni}>
                <input type="file" className={styles.inputFile} />
                <BsCamera className={styles.iconCameraFile} />
                <span>Arrastra una imagen</span>
              </div>
              <p>Formatos: Jpg o png. Max. 100kb</p>

              <button className={styles.btnAddPhotoFile}>
                <BsCardImage className={styles.btnAddPhotoIcon} />
                <span>Agregar Imagen</span>
              </button>
            </div>
            <div className={styles.photoBack}>
              <span>Imagen dorsal de la cédula:</span>
              <div className={styles.dragDni}>
                <input multiple type="file" className={styles.inputFile} />
                <BsCamera className={styles.iconCameraFile} />
                <span>Arrastra una imagen</span>
              </div>
              <p>Formatos: Jpg o png. Max. 100kb</p>

              <button className={styles.btnAddPhotoFile}>
                <BsCardImage className={styles.btnAddPhotoIcon} />
                <span>Agregar Imagen</span>
                <input multiple type="file" className={styles.inputFile} />
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
            <input name="rent" type="radio" id="yes" />
            <label htmlFor="yes">Sí</label>
          </div>
          <div className={styles.checkbox}>
            <input name="rent" type="radio" id="no" />
            <label htmlFor="no">No</label>
          </div>
          <div className={styles.containerDrag}>
            <div className={styles.dragRent}>
              <input multiple type="file" className={styles.inputFile} />
              <BsCamera className={styles.iconCameraFile} />
              <span>Arrastra una imagen</span>
            </div>
            <p>Formatos: Jpg o png. Max. 100kb</p>
            <button className={styles.btnAddPhotoFile}>
              <BsCardImage className={styles.btnAddPhotoIcon} />
              <span>Agregar Imagen</span>
              <input multiple type="file" className={styles.inputFile} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.divisor} />
      <div className={styles.containerAboutMe}>
        <div>
          <div className={styles.containerTitle}>
            <p>Sobre mí:</p>
            <button>
              <BsPencilSquare className={styles.iconEdit} />
              <span>Editar</span>
            </button>
          </div>
          <div className={styles.containerAboutMeInput}>
            <textarea name="aboutme" id="" cols="30" rows="10"></textarea>
            <BsInfoCircle className={styles.btnIconMoreInfo} />
          </div>
        </div>
      </div>
      <div className={styles.containerMainButton}>
        <button className={styles.btnSave}>Guardar</button>
        <button className={styles.btnCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default UserForm;
