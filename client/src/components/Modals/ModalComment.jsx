import React, { useContext, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import eventsApi from "../../axios/eventsApi";
import { AuthContext } from "../../context/auth";
import { UIContext } from "../../context/ui";
import formatDateToString from "../../utils/formatDateToString";
import style from "./ModalComment.module.css";

const ModalComment = ({ closeModal, organizer }) => {
  const { user } = useContext(AuthContext);
  const { toggleScreenLogin } = useContext(UIContext);

  const selectTitleReport = useRef("");
  const textAreaDetailsReason = useRef("");

  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [resultMessageReport, setResultMessageReport] = useState(false);

  const sendEmailToReportOrganizer = async () => {
    if (Object.keys(user).length === 0) {
      return toggleScreenLogin();
    }

    if (textAreaDetailsReason.current.value === "") {
      return setResultMessageReport({
        success: true,
        message: "Por favor explique en detalle.",
      });
    }

    setIsLoadingReport(true);

    const dataForReport = {
      userFromReport: { name: user.name, email: user.email },
      organizerReport: {
        nameOrganizer: organizer.name,
        emailOrganizer: organizer.email,
        pictureOrganizer: organizer.userpicture,
      },
      titleReport: selectTitleReport.current.value,
      reasonToReport: textAreaDetailsReason.current.value,
      dateToReport: formatDateToString(new Date()),
    };

    try {
      await eventsApi.put("/users/report/organizer", { dataForReport });

      setResultMessageReport({
        success: true,
        message: "Gracias por tu reporte, el cual a sido enviado exitosamente. El contenido será investigado y las debidas acciones serán tomadas. ",
      });
      setIsLoadingReport(false);
    } catch (error) {
      setResultMessageReport({
        success: false,
        message: "Intentelo de nuevo",
      });
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
          corrupti! Fuga explicabo consequatur provident ab exercitationem nulla
          autem cumque, distinctio dolores. Nobis vero magni beatae hic
          incidunt, minus necessitatibus aspernatur!
        </p>
      </div>

      <div className={style.container_select}>
        <select
          ref={selectTitleReport}
          defaultValue="Contenido inapropiado"
          className={style.select}
        >
          <option value="Contenido inapropiado">
            Tiene contenido inapropiado
          </option>
          <option value="Cuenta falsa">Es una cuenta falsa</option>
          <option value="Pretende ser otra persona/empresa">
            Pretende ser otra persona / empresa
          </option>
          <option value="No realizo el evento programado">
            No realizo el evento programado
          </option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <div className={style.container_title}>
        <p>Explique con detalle:</p>
        <textarea
          ref={textAreaDetailsReason}
          name=""
          id=""
          cols="70"
          rows="10"
          className={style.modalTextArea}
        ></textarea>
      </div>

      <div>
        {isLoadingReport && (
          <AiOutlineLoading3Quarters className={style.isLoading} />
        )}

        {resultMessageReport && (
          <p
            style={{
              color: resultMessageReport.success ? "#29aa79" : "#d53e27",
            }}
            className={style.resultMessageReport}
          >
            {resultMessageReport.message}
          </p>
        )}
      </div>

      <div className={style.container_button}>
        <button
          className={style.button_confirm}
          onClick={sendEmailToReportOrganizer}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ModalComment;
