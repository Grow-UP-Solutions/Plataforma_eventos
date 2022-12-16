import React from "react";
import styles from "./CardComments.module.css";
import avatar from "../../assets/imgs/no-avatar.png";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { Rating } from "@mui/material";
import { format, register } from "timeago.js";
import { useModal } from "../../hooks/useModal";
import Modal from "../../components/Modal/Modal";
import ModalComment from "../Modals/ModalComment";

const localeFunc = (number, index, total_sec) => {
  // number: the timeago / timein number;
  // index: the index of array below;
  // total_sec: total seconds between date to be formatted and today's date;
  return [
    ["justo ahora", "en un rato"],
    ["hace %s segundos", "en %s segundos"],
    ["hace 1 minuto", "en 1 minuto"],
    ["hace %s minutos", "en %s minutos"],
    ["hace 1 hora", "en 1 hora"],
    ["hace %s horas", "en %s horas"],
    ["hace 1 día", "en 1 día"],
    ["hace %s días", "en %s días"],
    ["hace 1 semana", "en 1 semana"],
    ["hace %s semanas", "en %s semanas"],
    ["hace 1 mes", "en 1 mes"],
    ["hace %s meses", "en %s meses"],
    ["hace 1 año", "en 1 año"],
    ["hace %s años", "en %s años"],
  ][index];
};
register("es_ES", localeFunc);

const CardComments = ({ o, organizer }) => {
  const [isOpenModal, openModal, closeModal] = useModal(false);

  const handleClickOpenModal = (e) => {
    e.preventDefault();
    openModal();
  };

  return (
    <div className={styles.userComment}>
      <div>
        <img
          className={styles.picture}
          src={avatar}
          alt="Not Found ):"
          width="20px"
          height="30px"
        />
      </div>

      <Modal isOpen={isOpenModal} closeModal={closeModal}>
        <ModalComment organizer={organizer} closeModal={closeModal} />
      </Modal>

      <div className={styles.nameDan}>
        <div className={styles.infoComment}>
          <div className={styles.namRat}>
            <span className={styles.user}>{o.title}</span>
            <Rating
              className={styles.rating}
              name="half-rating"
              precision={0.5}
              value={o.rating}
              readOnly
            />
          </div>
          <p className={styles.time}>{format(o.time, "es_ES")}</p>
          <p className={styles.opinion}>{o.opinion}</p>
        </div>

        <div
          className={styles.reportCom}
          onClick={handleClickOpenModal}
          data-hover="Reportar contenido inapropiado"
        >
          <ReportProblemIcon sx={{ fontSize: "40px", color: "#cbcbcb" , hover:"#fba430" }} />
        </div>
      </div>
    </div>
  );
};

export default CardComments;
