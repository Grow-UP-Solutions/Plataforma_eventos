
import React, { useEffect, useState } from 'react';
import style from './ReleaseAgreement.module.css';
import { animateScroll as scroll } from 'react-scroll';

const ReleaseAgreement = () => {

  const [info, setInfo] = useState('usuario');

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  const handleInputTypeUser = (e) => {
    setInfo(e.target.id);
  };

  return (
    <div className={style.container}>
      <div className={style.containerComponent}>
        <div className={style.container_box}>
          <div className={style.containerButtonTypeUser}>
            <input
              onChange={handleInputTypeUser}
              type='checkbox'
              checked={info === 'organizador'}
              id='organizador'
            />
            <label htmlFor='organizador'>Organizador</label>
          </div>
          <span className={style.hidden}></span>
          <div className={style.containerButtonTypeUser}>
            <input onChange={handleInputTypeUser} type='checkbox' checked={info === 'usuario'} id='usuario' />
            <label htmlFor='usuario'>Usuario</label>
          </div>
        </div>
      </div>

      <h1 className={style.title}>Acuerdo de Exoneración</h1>

      {info === 'usuario' && (
        <div className={style.container_text}>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, ad? Cumque nostrum officiis perspiciatis
            expedita autem! Consequuntur, velit. Architecto, officia asperiores. Nemo debitis atque asperiores impedit,
            nostrum fuga repellat minus!. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, ad? Cumque
            nostrum officiis perspiciatis expedita autem! Consequuntur, velit. Architecto, officia asperiores. Nemo
            debitis atque asperiores impedit, nostrum fuga repellat minus!. Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Fuga, ad? Cumque nostrum officiis perspiciatis expedita autem! Consequuntur, velit.
            Architecto, officia asperiores. Nemo debitis atque asperiores impedit, nostrum fuga repellat minus!
          </p>
          <br />
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, ad? Cumque nostrum officiis perspiciatis
            expedita autem! Consequuntur, velit. Architecto, officia asperiores. Nemo debitis atque asperiores impedit,
            nostrum fuga repellat minus!. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, ad? Cumque
            nostrum officiis perspiciatis expedita autem! Consequuntur, velit. Architecto, officia asperiores. Nemo
            debitis atque asperiores impedit, nostrum fuga repellat minus!. Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Fuga, ad? Cumque nostrum officiis perspiciatis expedita autem! Consequuntur, velit.
            Architecto, officia asperiores. Nemo debitis atque asperiores impedit, nostrum fuga repellat minus!
          </p>
          <br />
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, ad? Cumque nostrum officiis perspiciatis
            expedita autem! Consequuntur, velit. Architecto, officia asperiores. Nemo debitis atque asperiores impedit,
            nostrum fuga repellat minus!. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, ad? Cumque
            nostrum officiis perspiciatis expedita autem! Consequuntur, velit. Architecto, officia asperiores. Nemo
            debitis atque asperiores impedit, nostrum fuga repellat minus!. Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Fuga, ad? Cumque nostrum officiis perspiciatis expedita autem! Consequuntur, velit.
            Architecto, officia asperiores. Nemo debitis atque asperiores impedit, nostrum fuga repellat minus!
          </p>
        </div>
      )}

      {info === 'organizador' && (
        <div className={style.container_text}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error consequuntur doloremque numquam harum
            nesciunt voluptate eum recusandae esse illum repellat tenetur, quia adipisci saepe hic ipsum blanditiis,
            cumque, vero aliquam!
          </p>

          <br />

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, earum commodi ipsam similique officia
            libero quasi exercitationem rem voluptatum a voluptate iusto ex incidunt sunt perspiciatis delectus atque
            labore quod.
          </p>
        </div>
      )}
    </div>
  );
}

export default ReleaseAgreement;
