import axios from 'axios';

const categories = [
  {
    name: 'Al Aire Libre',
    img: 'https://static7.depositphotos.com/1009094/686/i/450/depositphotos_6869569-stock-photo-picnic.jpg',
    description: 'Duis autem vel eum iriure',
  },
  {
    name: 'Artes',
    img: 'https://img.freepik.com/fotos-premium/pincel-manchado-pintura_23-2148002444.jpg?w=2000',
    description: 'Duis autem vel eum iriure',
  },
  {
    name: 'Autosuperacion',
    img: 'https://wikipsicologia.com/wp-content/uploads/2020/04/cliff-2699812_640.jpg',
    description: 'Duis autem vel eum iriure',
  },
  {
    name: 'Belleza',
    img: 'https://www.aedn.es/wp-content/uploads/2018/01/4-webs-imprescindibles-de-salud-y-belleza.jpg',
    description: 'Duis autem vel eum iriure',
  },
  {
    name: 'Ciencia',
    img: 'https://azsstatic.com/2697/conversions/frases-ciencia-large.jpg',
    description: 'Duis autem vel eum iriure',
  },
  {
    name: 'Comidas y Bebidas',
    img:
      'https://www.zarla.com/images/zarla-food-and-drink-logos-2400x2400-20211105.jpg?crop=21:16,smart&width=420&dpr=2',
    description: 'Duis autem vel eum iriure',
  },
  {
    name: 'Deportes',
    img: 'https://thumbs.dreamstime.com/b/bal%C3%B3n-de-f%C3%BAtbol-en-red-de-la-meta-39573145.jpg',
    description: 'Duis autem vel eum iriure',
  },
  {
    name: 'Educacion(no formal)',
    img: 'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/UK7J6QLYXZE4FGLM6LOHNDFH24.jpg',
    description: 'Duis autem vel eum iriure',
  },
  {
    name: 'Finanzas',
    img:
      'https://www.eleconomista.com.mx/__export/1589673125293/sites/eleconomista/img/2020/05/13/estrategias_-_ahorro.png_673822677.png',
    description: 'Duis autem vel eum iriure',
  },
  {
    name: 'Nuevos Amigos',
    img: 'https://porescribir.com/wp-content/uploads/2016/04/f31-1920x960.jpg',
    description: 'Duis autem vel eum iriure',
  },
  {
    name: 'Idiomas',
    img: 'https://www.anahuac.mx/blog/sites/default/files/articles/02.png',
    description: 'Duis autem vel eum iriure',
  },
  {
    name: 'Para niños',
    img: 'https://www.cndh.org.mx/sites/default/files/2018-12/bnr_ninos_1.jpg',
    description: 'Duis autem vel eum iriure',
  },
  {
    name: 'Manualidades',
    img:
      'https://diariolibre.blob.core.windows.net.optimalcdn.com/images/binrepository/manualidades_15557522_20210113175525.jpg',
    description: 'Duis autem vel eum iriure',
  },
  {
    name: 'Mascotas',
    img:
      'https://uploads-ssl.webflow.com/5c0923437b3820198bab7be0/5f50108002666e737c6e6817_Mascotas%20en%20condominios.jpg',
    description: 'Duis autem vel eum iriure',
  },
  {
    name: 'Negocios',
    img: 'https://www.esan.edu.pe/images/blog/2018/04/11/1500x844-5-rs.jpg',
    description: 'Duis autem vel eum iriure',
  },
  {
    name: 'Para toda la familia',
    img:
      'https://images.hola.com/images/026b-12a6a9db88f0-e6f3f408ec05-1000/horizontal-1200/una-familia-feliz-en-casa-sonriendo-.jpg',
    description: 'Duis autem vel eum iriure',
  },
  {
    name: 'Salud',
    img: 'https://www.nestle-centroamerica.com/sites/g/files/pydnoa521/files/Untitled%20design%20%2833%29.png',
    description: 'Duis autem vel eum iriure',
  },
  {
    name: 'Tecnologia',
    img: 'https://juancarlosabaunza.com/wp-content/uploads/2020/06/trabajo-en-equipo.jpg',
    description: 'Duis autem vel eum iriure',
  },
  {
    name: 'Viajes',
    img:
      'https://www.bolsosvandi.com/server/Portal_0001611/img/blogposts/las-8-cosas-imprescindibles-para-viajar_10843.jpg',
    description: 'Duis autem vel eum iriure',
  },
  {
    name: '+18',
    img: 'https://medac.es/sites/default/files/blog/destacadas/actividades-de%20riesgo.jpg',
    description: 'Duis autem vel eum iriure',
  },
  {
    name: 'Beneficiencia',
    img:
      'https://www.eluniverso.com/resizer/HLjRRVfWIasDJkOTjCmWfrIQWYs=/1000x668/smart/filters:quality(70)/cloudfront-us-east-1.images.arcpublishing.com/eluniverso/25XNG2HZRZDHBENVPMLVPUE5BQ.jpg',
    description: 'Duis autem vel eum iriure',
  },
];

/* function createCategorys() {
  categories.forEach((e) => {
    axios.post('http://localhost:3001/category/create', e);
  });
  return 'ok';
}
createCategorys(); */

export default categories;
