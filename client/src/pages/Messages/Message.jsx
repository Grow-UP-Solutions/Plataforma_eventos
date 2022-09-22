import React from 'react';

import styles from './Message.module.css';

import { FiMail, FiArchive, FiStar } from 'react-icons/fi';
import { GrPin } from 'react-icons/gr';
import { BiBlock, BiPin } from 'react-icons/bi';

const users = [
  {
    img: 'https://i.pravatar.cc/150?img=59',
    name: 'Jean Pierre',
  },
  {
    img: 'https://i.pravatar.cc/150?img=41',
    name: 'Juan Castillo',
  },
  {
    img: 'https://i.pravatar.cc/150?img=24',
    name: 'Lucas Rodriguez',
  },
  {
    img: 'https://i.pravatar.cc/150?img=65',
    name: 'María Pilco',
  },
  {
    img: 'https://i.pravatar.cc/150?img=2',
    name: 'Goku',
  },
];

const Message = () => {
  return (
    <div className={`${styles.pageMessage} container`}>
      <div className={styles.containerMessage}>
        <div className={styles.containerTitle}>
          <h1 className={styles.title}>Mensajes</h1>
        </div>
        <div className={styles.gridContainer}>
          <div className={styles.containerChats}>
            <div className={styles.containerOptions}>
              <div>
                <FiMail />
                <span>Marcar todos como leídos</span>
              </div>
              <div>
                <FiArchive />
                <span>Archivar todas las conversaciones</span>
              </div>
              <div>
                <FiStar />
                <span>Mensajes destacados</span>
              </div>
            </div>

            <div className={styles.listChats}>
              {users.map((user) => (
                <div className={styles.itemChat}>
                  <div className={styles.userChat}>
                    <img src={user.img} alt={user.name} />
                    <span>{user.name}</span>
                  </div>
                  <div className={styles.itemChatDivisor} />
                  <div className={styles.itemOptionsChat}>
                    <div className={styles.itemChatNumberMessage}>1</div>
                    <div className={styles.containerItemMenu}>
                      <FiMail className={styles.itemMenuIcon} />
                      <div className={styles.helperMenu}>
                        <p>Marcar como leído</p>
                      </div>
                    </div>
                    <div className={styles.containerItemMenu}>
                      <FiArchive className={styles.itemMenuIcon} />
                      <div className={styles.helperMenu}>
                        <p>Archivar conversación</p>
                      </div>
                    </div>
                    <div className={styles.containerItemMenu}>
                      <BiPin className={styles.itemMenuIcon} />
                      <div className={styles.helperMenu}>
                        <p>Fijar conversacion</p>
                      </div>
                    </div>
                    <div className={styles.containerItemMenu}>
                      <BiBlock className={styles.itemMenuIcon} />
                      <div className={styles.helperMenu}>
                        <p>Bloquear usuario</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.buttonsChats}>
              <div>
                <p>Usuarios Bloqueados</p>
              </div>
              <div className={styles.buttonDivisor} />
              <div>
                <p>Conversaciones archivadas</p>
              </div>
            </div>
          </div>

          {/* CHAT */}
          <div className={styles.containerChat}>
            {/* NAME OF CHAT */}
            <div className={styles.chatHeader}>
              <img src={'https://i.pravatar.cc/150?img=65'} alt="user-photo" />
              <span>Pepito Pérez</span>
            </div>

            {/* CHAT */}
            <div className={styles.containerChatMessage}>
              <div className={styles.ownMessage}>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                </p>
                <div className={styles.wrapperInfoMessage}>
                  <FiStar className={styles.iconMessage} />
                  <span>Enero 25 2020 - 10:50 a.m</span>
                </div>
              </div>

              <div className={styles.otherMessage}>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                </p>
                <div className={styles.wrapperInfoMessage}>
                  <FiStar className={styles.iconMessage} />
                  <span>Enero 25 2020 - 10:50 a.m</span>
                </div>
              </div>
              <div className={styles.ownMessage}>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                </p>
                <div className={styles.wrapperInfoMessage}>
                  <FiStar className={styles.iconMessage} />
                  <span>Enero 25 2020 - 10:50 a.m</span>
                </div>
              </div>
            </div>

            {/* SEND MESSAGE */}
            <div className={styles.containerInputMessage}>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="10"
                placeholder="Escribe un mensaje aquí"
              ></textarea>
              <div className={styles.wrapperBtnInputMessage}>
                <p>
                  No se permite el envío de números de teléfono, direcciones de
                  correo electrónico, enlaces a sitios web o enlaces a redes
                  sociales.
                </p>
                <button>Enviar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
