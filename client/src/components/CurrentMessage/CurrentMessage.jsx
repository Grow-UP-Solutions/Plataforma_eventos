
import React, { useEffect, useState } from 'react';
import style from './CurrentMessage.module.css';
import eventsApi from '../../axios/eventsApi';
import avatar_group from '../../assets/imgs/avatar-grupal.png';
import avatar from '../../assets/imgs/no-avatar.png';

const CurrentMessage = ({ conversation, id }) => {

  const [user, setUser] = useState([]);
  const [group, setGroup] = useState(false);

  useEffect(() => {
    if (conversation.members.length < 3) {
      const friendId = conversation.members.find((m) => m !== id);
      const getUser = async () => {
        try {
          const res = await eventsApi.get("/users/" + friendId);
          setUser(res.data);
          setGroup(false);
        } 
        catch (err) {
          console.log(err);
        }
      };
      getUser();
    }
    else {
      setGroup(true);
    }
  }, [id, conversation]);

  return (
    <div>
      {
        group ?
        <div className={style.container}>
          <img src={avatar_group} alt="avatar_group" />
          <span><p>Grupo Evento</p></span> 
        </div> :

        <div className={style.container}>
          <img src={user.userpicture ? user.userpicture : avatar} alt="avatar" />
          <span><p>{user.name}</p></span> 
        </div>
      }
    </div>
  );
}

export default CurrentMessage;
