const app = require('./src/app.js');
require('./src/DB.js')

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`); 
  });


  module.exports = app;