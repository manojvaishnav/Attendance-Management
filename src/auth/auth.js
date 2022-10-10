// const express = require('express');
// const app = express();

// const bcrypt = require('bcryptjs');

// const faculty = require('../models/faculty');
// const auth = app.post("/login", async (req, res) => {
//     try {
//       const id = req.body.fid;
//       const password = req.body.password;
//       if (id==="admin" && password==="admin") {
//         res.status(200).render('admin');
//       } else {
//         const check = await faculty.findOne({ fid: id });
//         if (check) {
//           const userpassword = check.password;
//           const isMatch = await bcrypt.compare(password, userpassword);
//           if (isMatch) {
//             res.status(200).send("register");
//           } else {
//             res.send("Password Incorrect");
//           }
//         } else {
//           res.send("Invalid Username");
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(404).render("404");
//     }
//   });

// module.exports = auth;