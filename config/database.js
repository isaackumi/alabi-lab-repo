// const mongoose = require("mongoose");

// const connectDatabase = () => {
//   mongoose
//     .connect(
//       process.env.NODE_ENV == "development"
//         ? process.env.DB_LOCAL_URI
//         :
//         `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}
//       @${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/` 
//       ,
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,

//       }
//     )
//     .then((con) => {
//       console.log(
//         `MongoDB Database connected to host: ${con.connection.host}`
//       );
//     })
//     .catch((err) => {
//       console.log(`Error connecting to database:  ${err}`);
//     });
// };

// module.exports = connectDatabase;
