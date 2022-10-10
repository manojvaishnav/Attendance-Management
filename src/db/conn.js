const mongoose = require("mongoose");
// require('dotenv').config();

// mongoose.connect(process.env.MONGO_URL)
// .then(()=>{
//     console.log('Database connected successfully')
// })
// .catch((error)=>{
//     console.log('Database not connected');
//     console.log(error);
// });

mongoose
  .connect("mongodb://localhost:27017/attendance")
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log("Database not connected");
    console.log(error);
  });
