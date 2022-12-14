import React from 'react';
import style from './Security.module.css';

const Security = ({ info }) => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>Seguridad</h1>

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
};

export default Security;
