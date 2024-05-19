const mongoose = require('mongoose');
const app = require('./app.js')

// connect to db
mongoose
  .connect(process.env.DB_URL, {
    dbName: "DentistApp",
  })
  .then((result) => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
    console.log("Connected to the db!");
  })
  .catch((err) => console.log(err));