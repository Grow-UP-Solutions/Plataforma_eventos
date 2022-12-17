import React, { useContext, useRef, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import eventsApi from '../../axios/eventsApi';
import { AuthContext } from '../../context/auth';
import { UIContext } from '../../context/ui';
import formatDateToString from '../../utils/formatDateToString';
import style from './ModalComment.module.css';

const ModalComment = ({ closeModal, event, organizer, opinion }) => {
  const { user } = useContext(AuthContext);

  const selectTitleReport = useRef('');
  const textAreaDetailsReason = useRef('');

  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [resultMessageReport, setResultMessageReport] = useState(false);

  console.log({ opinion });

  const sendEmailToReportOrganizer = async () => {
    if (textAreaDetailsReason.current.value === '') {
      return setResultMessageReport({
        success: true,
        message: 'Por favor explique en detalle.',
      });
    }

    let dataForReport = {};

    if (event) {
      dataForReport = {
        userFromReport: { name: user.name, email: user.email },
        titleReport: selectTitleReport.current.value,
        reasonToReport: textAreaDetailsReason.current.value,
        dateToReport: formatDateToString(new Date()),
        eventReport: { eventTitle: event.title, eventId: event._id, image: event.pictures[0].picture },
        nameOpinion: opinion.title,
        opinion: opinion.opinion,
      };
    } else if (organizer) {
      dataForReport = {
        userFromReport: { name: user.name, email: user.email },
        titleReport: selectTitleReport.current.value,
        reasonToReport: textAreaDetailsReason.current.value,
        dateToReport: formatDateToString(new Date()),
        organizerReport: { organizerName: organizer.name, organizerId: organizer._id, image: organizer.userpicture },
        nameOpinion: opinion.title,
        opinion: opinion.opinion,
      };
    }

    setIsLoadingReport(true);

    try {
      await eventsApi.put('/users/report/opinions/check', { dataForReport });

      setResultMessageReport({
        success: true,
        message:
          'Gracias por tu reporte, el cual a sido enviado exitosamente. El contenido será investigado y las debidas acciones serán tomadas.',
      });
      setIsLoadingReport(false);
    } catch (error) {
      console.log({ error });
      setResultMessageReport({
        success: false,
        message: 'Intentelo de nuevo',
      });
      setIsLoadingReport(false);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.container_close}>
        <span className={style.title}>Reportar</span>
        <span className={style.modal_close} onClick={closeModal}>
          X
        </span>
      </div>

      <div className={style.line_div}></div>

      <div className={style.container_texts}>
        <p className={style.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, corrupti! Fuga explicabo consequatur
          provident ab exercitationem nulla autem cumque, distinctio dolores. Nobis vero magni beatae hic incidunt,
          minus necessitatibus aspernatur!
        </p>
      </div>

      <div className={style.container_select}>
        <select ref={selectTitleReport} defaultValue='Contenido inapropiado' className={style.select}>
          <option value='Contenido inapropiado'>Tiene contenido inapropiado</option>
          <option value='Cuenta falsa'>Es una cuenta falsa</option>
          <option value='Pretende ser otra persona/empresa'>Pretende ser otra persona / empresa</option>
          <option value='No realizo el evento programado'>No realizo el evento programado</option>
          <option value='Otro'>Otro</option>
        </select>
      </div>

      <div className={style.container_title}>
        <p>Explique con detalle:</p>
        <textarea
          ref={textAreaDetailsReason}
          name=''
          id=''
          cols='70'
          rows='10'
          className={style.modalTextArea}
        ></textarea>
      </div>

      {isLoadingReport && <AiOutlineLoading3Quarters className={style.isLoading} />}
      {resultMessageReport && (
        <div className={style.containerResultMessage}>
          <div className={style.overlayResultMessageReport}>
            <div className={style.containerResultMessageReport}>
              <p>
                Gracias por tu reporte, el cual a sido enviado exitosamente. El contenido será investigado y las debidas
                acciones serán tomadas.{' '}
              </p>
              <button type='button' onClick={closeModal}>
                Listo
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={style.container_button}>
        <button className={style.button_confirm} onClick={sendEmailToReportOrganizer}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ModalComment;
