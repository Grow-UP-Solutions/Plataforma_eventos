import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import { GrDocumentPdf, GrDocumentWord, GrClose } from 'react-icons/gr';
import { IoDocumentTextOutline } from 'react-icons/io5';
import styles from './WorkWithUsForm.module.css';

const fileTypes = '.doc,.docx,.pdf';

const WorkWithUsForm = () => {

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  const { work } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    numId: '',
    mail: '',
    city: '',
    tel: '',
    phone: '',
  });

  const [fileCV, setFileCV] = useState({
    file: null,
    type: '',
    message: 'Arrastrar documento',
    status: null,
  });

  const [showOverlay, setShowOverlay] = useState(false);

  const handleChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileCV = (file) => {
    if (
      file['0'].type === 'application/pdf' ||
      file['0'].type === 'application/doc' ||
      file['0'].type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      setFileCV({
        file: file['0'],
        type: file['0'].type,
        message: file['0'].name,
        status: 'success',
      });
    } else {
      setFileCV({
        ...fileCV,
        message: 'No se puede subir el archivo.',
        status: 'failed',
      });
    }
  };

  const sendFormCV = () => {
    /* TODO: MANDAR CV A BASE DE DATOS */
    setShowOverlay(true);
  };

  return (
    <div className={`${styles.pageWorkWithUsForm} container`}>
      <h1 className={styles.titleWorkWithUsForm}>Trabaja con nosotros</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <h2 className={styles.titleForm}>Inscribete para ser ({work})</h2>

        <div className={styles.formGroup}>
          <label htmlFor="name">Nombre completo:</label>
          <input
            onChange={handleChangeInput}
            value={formData.name}
            name="name"
            type="text"
            id="name"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="numId">Número de Identificación:</label>
          <input
            onChange={handleChangeInput}
            value={formData.numId}
            name="numId"
            type="text"
            id="numId"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="mail">Email:</label>
          <input
            onChange={handleChangeInput}
            value={formData.mail}
            name="mail"
            type="text"
            id="mail"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="city">Ciudad:</label>
          <input
            onChange={handleChangeInput}
            value={formData.city}
            name="city"
            type="text"
            id="city"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="tel">Teléfono:</label>
          <input
            onChange={handleChangeInput}
            value={formData.tel}
            name="tel"
            type="text"
            id="tel"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Celular:</label>
          <input
            onChange={handleChangeInput}
            value={formData.phone}
            name="phone"
            type="text"
            id="phone"
            required
          />
        </div>

        <div className={styles.containerCV}>
          <p>Anexa la Hoja de Vida:</p>
          <div className={styles.dragCv}>
            <input
              type="file"
              multiple
              accept={fileTypes}
              className={styles.inputDrag}
              onChange={(e) => handleFileCV(e.target.files)}
            />
            {fileCV.type === 'application/pdf' ? (
              <GrDocumentPdf className={styles.dragIcon} />
            ) : fileCV.type === 'application/docx' ||
              fileCV.type ===
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? (
              <GrDocumentWord className={styles.dragIcon} />
            ) : (
              <IoDocumentTextOutline className={styles.dragIcon} />
            )}
            <span
              style={{
                color:
                  fileCV.status === 'success'
                    ? 'green'
                    : fileCV.status === 'failed'
                    ? 'red'
                    : '',
              }}
            >
              {fileCV.message}
            </span>
          </div>
          <span>Formatos: .PDF o .docx</span>
        </div>

        <div className={styles.containerBtn}>
          <button onClick={sendFormCV} className={styles.btnForm}>
            Aplicar
          </button>
        </div>
      </form>

      {/* Overlay */}
      {showOverlay && (
        <div className={styles.overlay}>
          <div className={styles.containerOverlay}>
            <div className={styles.containerIcon}>
              <GrClose className={styles.overlayIcon} />
            </div>
            <div className={styles.overlayInfo}>
              <h2 className={styles.overlayTitle}>
                Haz aplicado a nuestra vacante de {work.replace(':', '')}
              </h2>
              <p>
                Tu solicitud ha sido enviada con éxito. Pronto recibirás una
                respuesta a tu correo.
              </p>
              <button
                onClick={() => setShowOverlay(false)}
                className={styles.btnOverlay}
              >
                Listo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkWithUsForm;
