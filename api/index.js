import app from "./src/app.js";
import "./src/DB.js";

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`%s listening at ${PORT}`);
});

export default app;
