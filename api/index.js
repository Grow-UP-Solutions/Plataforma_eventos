import app from './src/app.js';
import './src/DB.js';


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    try {
    console.log(`%s listening at ${PORT}`); 
  } catch (error) {
    console.log(error.message    )
  }
  });



  export default app;