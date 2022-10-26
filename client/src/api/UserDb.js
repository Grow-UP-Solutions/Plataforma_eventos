import axios from 'axios';

const users = [
  {
    name: 'Jean Pierre',
    direction: 'Medellin - Colombia',
    phone: 33333333,
    documentNº: 33333333,
    city: 'Medellin',
    email: 'xxxxx@gmail.com',
    picture: 'https://i.insider.com/54e79e766bb3f76a6db7118f?width=600&format=jpeg',
    isSuperAdmin: true,
    isAdmin: true,
    isOrganizer: true,
    isLogged: true,
    membership: 'Marzo 2003',
    descriptionOrganizer:
      'Description del organizador consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero ero',
    rating: 5,
  },
  {
    name: 'Luis Chacon',
    direction: 'xxx 345',
    phone: 33333333,
    documentNº: 33333333,
    city: 'Medellin',
    email: 'yyyyyyyy@gmail.com',
    picture: 'https://imagenes.lainformacion.com/files/image_656_370/uploads/imagenes/2018/04/12/5acf2ac33b6ab.jpeg',
    isSuperAdmin: true,
    isAdmin: true,
    isOrganizer: true,
    isLogged: true,
    membership: 'marzo 2003',
    descriptionOrganizer:
      'Description del organizador consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eroDescription del organizador consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero ero',
    rating: 5,
  },
  {
    name: 'Pepito Perez',
    direction: 'xxx 345',
    phone: 33333333,
    documentNº: 33333333,
    city: 'Medellin',
    email: 'sssssssss@gmail.com',
    picture: 'https://i.insider.com/54e79e766bb3f76a6db7118f?width=600&format=jpeg',
    isSuperAdmin: true,
    isAdmin: true,
    isOrganizer: true,
    isLogged: true,
    membership: 'marzo 2003',
    descriptionOrganizer:
      'Description del organizador consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero ero',
    rating: 5,
  },
];

// function createUsers() {
//     users.forEach((e) => {
//       axios.post('http://localhost:3001/users/create', e);
//     });
//     return 'ok';
//   }

//   createUsers()
