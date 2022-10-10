const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));

// Database Connection setup
const db = require("./db/conn");

// Bcrypting
const bcrypt = require("bcryptjs");

// Models Connection Setup
const faculty = require("./models/faculty");
const student = require("./models/student");
const subject = require("./models/subject");
const attendance = require("./models/attendance");

// Hbs Or Partials Connection
const path = require("path");
const staticPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const hbs = require("hbs");
const e = require("express");
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// -------------------------------------API Call--------------------------------------------
app.get("/", (req, res) => {
  try {
    res.status(200).render("index");
  } catch (error) {
    console.log(error);
    res.render("404");
  }
});

//-----------------------------------Register A Student--------------------------------------
app.get("/register", (req, res) => {
  try {
    res.status(200).render("register");
  } catch (error) {
    console.log(error);
    res.status(404).render("404");
  }
});

app.post("/register", async (req, res) => {
  try {
    const data = new student({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      birth: req.body.birth,
      id: req.body.cid,
      branch: req.body.branch,
      semester: req.body.sem,
    });
    const result = await data.save();
    res.status(200).render("index");
  } catch (error) {
    console.log(error);
    res.status(404).render("404");
  }
});

//--------------------------------Faculty Login----------------------------------------

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (email === "admin" && password === "admin") {
      const csStudent = await student.find({ branch: "cse" }).count();
      const ceStudent = await student.find({ branch: "ce" }).count();
      const itStudent = await student.find({ branch: "it" }).count();
      const meStudent = await student.find({ branch: "me" }).count();
      const eceStudent = await student.find({ branch: "ece" }).count();
      const eicStudent = await student.find({ branch: "eic" }).count();
      const eeeStudent = await student.find({ branch: "eee" }).count();
      const ts =
        csStudent +
        ceStudent +
        itStudent +
        meStudent +
        eceStudent +
        eicStudent +
        eeeStudent;

      const fac = await faculty.find();
      const tf = await faculty.find().count();
      res.status(200).render("admin", {
        name: "admin",
        cs: csStudent,
        ce: ceStudent,
        eee: eeeStudent,
        me: meStudent,
        eic: eicStudent,
        ece: eceStudent,
        it: itStudent,
        total: ts,
        faculties: fac,
        totalf: tf,
      });
    } else {
      const check = await faculty.findOne({ email: email });
      if (check) {
        const userpassword = check.password;
        const isMatch = await bcrypt.compare(password, userpassword);
        if (isMatch) {
          const name = check.name;
          const id = check._id;
          const arr = await subject.find({ faculty: id });
          res.status(200).render("faculty", {
            name: name,
            _id: id,
            docs: arr,
          });
        } else {
          res.send("<script>alert('Password Incorrect')</script>");
        }
      } else {
        res.send("<script>alert('Username Incorrect')</script>");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).render("404");
  }
});

//-------------------------------------Admin Section----------------------------------

// Faculty Register
app.get("/faculty_register", async (req, res) => {
  try {
    res.status(200).render("facultyregister");
  } catch (error) {
    console.log(error);
    res.status(404).render("404");
  }
});

app.post("/freg", async (req, res) => {
  try {
    const data = new faculty({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      department: req.body.dept,
      password: req.body.password,
    });
    const result = await data.save();
    res
      .status(200)
      .send("<script>alert('Register Successfully Successfully')</script>");
    // res.status(200).render("admin");
  } catch (error) {
    console.log(error);
    res.status(404).render("404");
  }
});

// ----------------------------------View Students--------------------------------

// CSE Students
app.get("/cs/students", async (req, res) => {
  try {
    const branch = "cse";
    const first = await student
      .find({ branch: branch, semester: "1st" })
      .sort({ name: 1 });
    const second = await student
      .find({ branch: branch, semester: "2nd" })
      .sort({ name: 1 });
    const third = await student
      .find({ branch: branch, semester: "3rd" })
      .sort({ name: 1 });
    const fourth = await student
      .find({ branch: branch, semester: "4th" })
      .sort({ name: 1 });
    const fifth = await student
      .find({ branch: branch, semester: "5th" })
      .sort({ name: 1 });
    const sixth = await student
      .find({ branch: branch, semester: "6th" })
      .sort({ name: 1 });
    const seventh = await student
      .find({ branch: branch, semester: "7th" })
      .sort({ name: 1 });
    const eightth = await student
      .find({ branch: branch, semester: "8th" })
      .sort({ name: 1 });
    res.status(200).render("allStudents", {
      first: first,
      second: second,
      third: third,
      fourth: fourth,
      fifth: fifth,
      sixth: sixth,
      seventh: seventh,
      eightth: eightth,
    });
  } catch (error) {
    console.log(error);
    res.status(404).render("404");
  }
});

// IT Students
app.get("/it/students", async (req, res) => {
  try {
    const branch = "it";
    const first = await student
      .find({ branch: branch, semester: "1st" })
      .sort({ name: 1 });
    const second = await student
      .find({ branch: branch, semester: "2nd" })
      .sort({ name: 1 });
    const third = await student
      .find({ branch: branch, semester: "3rd" })
      .sort({ name: 1 });
    const fourth = await student
      .find({ branch: branch, semester: "4th" })
      .sort({ name: 1 });
    const fifth = await student
      .find({ branch: branch, semester: "5th" })
      .sort({ name: 1 });
    const sixth = await student
      .find({ branch: branch, semester: "6th" })
      .sort({ name: 1 });
    const seventh = await student
      .find({ branch: branch, semester: "7th" })
      .sort({ name: 1 });
    const eightth = await student
      .find({ branch: branch, semester: "8th" })
      .sort({ name: 1 });
    res.status(200).render("allStudents", {
      first: first,
      second: second,
      third: third,
      fourth: fourth,
      fifth: fifth,
      sixth: sixth,
      seventh: seventh,
      eightth: eightth,
    });
  } catch (error) {
    console.log(error);
    res.status(404).render("404");
  }
});

// ME Students
app.get("/me/students", async (req, res) => {
  try {
    const branch = "me";
    const first = await student
      .find({ branch: branch, semester: "1st" })
      .sort({ name: 1 });
    const second = await student
      .find({ branch: branch, semester: "2nd" })
      .sort({ name: 1 });
    const third = await student
      .find({ branch: branch, semester: "3rd" })
      .sort({ name: 1 });
    const fourth = await student
      .find({ branch: branch, semester: "4th" })
      .sort({ name: 1 });
    const fifth = await student
      .find({ branch: branch, semester: "5th" })
      .sort({ name: 1 });
    const sixth = await student
      .find({ branch: branch, semester: "6th" })
      .sort({ name: 1 });
    const seventh = await student
      .find({ branch: branch, semester: "7th" })
      .sort({ name: 1 });
    const eightth = await student
      .find({ branch: branch, semester: "8th" })
      .sort({ name: 1 });
    res.status(200).render("allStudents", {
      first: first,
      second: second,
      third: third,
      fourth: fourth,
      fifth: fifth,
      sixth: sixth,
      seventh: seventh,
      eightth: eightth,
    });
  } catch (error) {
    console.log(error);
    res.status(404).render("404");
  }
});

// CE Students
app.get("/ce/students", async (req, res) => {
  try {
    const branch = "ce";
    const first = await student
      .find({ branch: branch, semester: "1st" })
      .sort({ name: 1 });
    const second = await student
      .find({ branch: branch, semester: "2nd" })
      .sort({ name: 1 });
    const third = await student
      .find({ branch: branch, semester: "3rd" })
      .sort({ name: 1 });
    const fourth = await student
      .find({ branch: branch, semester: "4th" })
      .sort({ name: 1 });
    const fifth = await student
      .find({ branch: branch, semester: "5th" })
      .sort({ name: 1 });
    const sixth = await student
      .find({ branch: branch, semester: "6th" })
      .sort({ name: 1 });
    const seventh = await student
      .find({ branch: branch, semester: "7th" })
      .sort({ name: 1 });
    const eightth = await student
      .find({ branch: branch, semester: "8th" })
      .sort({ name: 1 });
    res.status(200).render("allStudents", {
      first: first,
      second: second,
      third: third,
      fourth: fourth,
      fifth: fifth,
      sixth: sixth,
      seventh: seventh,
      eightth: eightth,
    });
  } catch (error) {
    console.log(error);
    res.status(404).render("404");
  }
});

// EEE Students
app.get("/eee/students", async (req, res) => {
  try {
    const branch = "eee";
    const first = await student
      .find({ branch: branch, semester: "1st" })
      .sort({ name: 1 });
    const second = await student
      .find({ branch: branch, semester: "2nd" })
      .sort({ name: 1 });
    const third = await student
      .find({ branch: branch, semester: "3rd" })
      .sort({ name: 1 });
    const fourth = await student
      .find({ branch: branch, semester: "4th" })
      .sort({ name: 1 });
    const fifth = await student
      .find({ branch: branch, semester: "5th" })
      .sort({ name: 1 });
    const sixth = await student
      .find({ branch: branch, semester: "6th" })
      .sort({ name: 1 });
    const seventh = await student
      .find({ branch: branch, semester: "7th" })
      .sort({ name: 1 });
    const eightth = await student
      .find({ branch: branch, semester: "8th" })
      .sort({ name: 1 });
    res.status(200).render("allStudents", {
      first: first,
      second: second,
      third: third,
      fourth: fourth,
      fifth: fifth,
      sixth: sixth,
      seventh: seventh,
      eightth: eightth,
    });
  } catch (error) {
    console.log(error);
    res.status(404).render("404");
  }
});

// EIC Students
app.get("/eic/students", async (req, res) => {
  try {
    const branch = "eic";
    const first = await student
      .find({ branch: branch, semester: "1st" })
      .sort({ name: 1 });
    const second = await student
      .find({ branch: branch, semester: "2nd" })
      .sort({ name: 1 });
    const third = await student
      .find({ branch: branch, semester: "3rd" })
      .sort({ name: 1 });
    const fourth = await student
      .find({ branch: branch, semester: "4th" })
      .sort({ name: 1 });
    const fifth = await student
      .find({ branch: branch, semester: "5th" })
      .sort({ name: 1 });
    const sixth = await student
      .find({ branch: branch, semester: "6th" })
      .sort({ name: 1 });
    const seventh = await student
      .find({ branch: branch, semester: "7th" })
      .sort({ name: 1 });
    const eightth = await student
      .find({ branch: branch, semester: "8th" })
      .sort({ name: 1 });
    res.status(200).render("allStudents", {
      first: first,
      second: second,
      third: third,
      fourth: fourth,
      fifth: fifth,
      sixth: sixth,
      seventh: seventh,
      eightth: eightth,
    });
  } catch (error) {
    console.log(error);
    res.status(404).render("404");
  }
});

// ECE Students
app.get("/ece/students", async (req, res) => {
  try {
    const branch = "ece";
    const first = await student
      .find({ branch: branch, semester: "1st" })
      .sort({ name: 1 });
    const second = await student
      .find({ branch: branch, semester: "2nd" })
      .sort({ name: 1 });
    const third = await student
      .find({ branch: branch, semester: "3rd" })
      .sort({ name: 1 });
    const fourth = await student
      .find({ branch: branch, semester: "4th" })
      .sort({ name: 1 });
    const fifth = await student
      .find({ branch: branch, semester: "5th" })
      .sort({ name: 1 });
    const sixth = await student
      .find({ branch: branch, semester: "6th" })
      .sort({ name: 1 });
    const seventh = await student
      .find({ branch: branch, semester: "7th" })
      .sort({ name: 1 });
    const eightth = await student
      .find({ branch: branch, semester: "8th" })
      .sort({ name: 1 });
    res.status(200).render("allStudents", {
      first: first,
      second: second,
      third: third,
      fourth: fourth,
      fifth: fifth,
      sixth: sixth,
      seventh: seventh,
      eightth: eightth,
    });
  } catch (error) {
    console.log(error);
    res.status(404).render("404");
  }
});

// ----------Student--------Delete or Update Operation---------------Student---------------

// Delete Student
app.get("/student/del/:id", async (req, res) => {
  try {
    const sid = req.params["id"];
    await student.findByIdAndDelete({ _id: sid });
    res.send('<script>alert("Delete Successfully")</script>');
  } catch (error) {
    console.log(error);
    res.status(404).render("404");
  }
});
// Update Student
app.get("/student/:id", async (req, res) => {
  try {
    const id = req.params["id"];
    const data = await student.findOne({ _id: id });
    res.status(200).render("updateStudent", {
      _id: data._id,
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      birth: data.birth,
      branch: data.branch,
      semester: data.semester,
    });
  } catch (error) {
    console.log(error);
    res.status(404).render("404");
  }
});

app.post("/student/:id", async (req, res) => {
  try {
    const id = req.params["id"];
    const result = await student.findByIdAndUpdate(
      { _id: id },
      { $set: req.body }
    );
    res.status(200).send("<script>alert('update Successfully')</script>");
  } catch (error) {
    console.log(error);
    res.status(404).render("404");
  }
});

// ------------Faculty---------Delete or Update Operation---------------Faculty---------------

// Delete Faculty
app.get("/faculty/del/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await faculty.findByIdAndDelete({ _id: id });
    const data = await faculty.find().sort({ name: 1, department: 1 });
    res.status(200).send("<script>alert('Delete Successfully')</script>");
  } catch (error) {
    console.log(error);
    res.status(404).render("404");
  }
});
// Update Faculty
app.get("/faculty/:id", async (req, res) => {
  try {
    const id = req.params["id"];
    const data = await faculty.findOne({ _id: id });
    res.status(200).render("updateFaculty", {
      _id: data._id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      dept: data.department,
    });
  } catch (error) {
    console.log(error);
    res.status(404).render("404");
  }
});

app.post("/faculty/:id", async (req, res) => {
  try {
    const id = req.params["id"];

    const result = await faculty.findByIdAndUpdate(
      { _id: id },
      { $set: req.body }
    );
    res.status(200).send("<script>alert('update Successfully')</script>");
  } catch (error) {
    console.log(error);
    res.status(404).render("404");
  }
});

// ---------------------------------Add Subject------------------------------------
app.post("/addsubject/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = new subject({
      name: req.body.subject,
      branch: req.body.branch,
      semester: req.body.semester,
      faculty: id,
    });
    await data.save();
    res.send("<script>alert('Add Successfully')</script>");
  } catch (error) {
    console.log(error);
    res.status(404).render("404");
  }
});

// -----------------------------------Attendance----------------------------------

// Take Attendance
app.get("/take_attendance/:id", async (req, res) => {
  try {
    const data = await subject.findOne({ _id: req.params.id });
    const result = await student
      .find({ branch: data.branch, semester: data.semester })
      .sort({ name: 1 });
    res.status(200).render("attendanceTable", {
      docs: result,
      id: req.params.id,
    });
  } catch (error) {
    console.log(error);
    res.status(404).render(404);
  }
});
// Save Attendance
app.post("/save_attendance/:id", async (req, res) => {
  try {
    const data = new attendance({
      date: req.body.date,
      subject: req.params.id,
      present: req.body.attendance,
    });
    await data.save();
    res.status(200).send("success");
  } catch (error) {
    console.log(error);
    res.status(404).render(404);
  }
});

// -------------------------View Attendance--------------------
// Check Status
app.get("/status_check/:id/:branch/:semester", async (req, res) => {
  try {
    res.status(200).render("statusCheck", {
      id: req.params.id,
      branch: req.params.branch,
      semester: req.params.semester,
    });
    // res.send(data.present);
  } catch (error) {
    console.log(error);
    res.status(404).render(404);
  }
});

// View 
app.post("/view/:id/:branch/:semester", async (req, res) => {
  try {
    const date = req.body.date;
    const status = req.body.status;
    const branch = req.params.branch;
    const semester = req.params.semester;
    if (status == "present") {
      const data = await attendance.findOne({
        subject: req.params.id,
        date: date,
      });
      if (data) {
        const result = await student.find(
          { id: data.present },
          { id: 1, name: 1 }
        ).sort({name:1});
        res.status(200).render("viewAttendance", {
          docs: result,
          status: "Present",
          date: date,
        });
      } else {
        res.send("no student to show");
      }
    } else if (status == "absent") {
      const data = await attendance.findOne({
        subject: req.params.id,
        date: date,
      });
      if (data) {
        const pStudent = data.present;
        const result = await student.find(
          { id: { $nin: pStudent }, branch: branch, semester: semester },
          { id: 1, name: 1 }
        ).sort({name:1});
        res.status(200).render("viewAttendance", {
          docs: result,
          status: "Absent",
          date: date,
        });
      } else {
        res.send("no data to show");
      }
    } else {
      res.send("something went wrong");
    }
    // res.send(data.present);
  } catch (error) {
    console.log(error);
    res.status(404).render(404);
  }
});

// Server Listen Or Call
app.listen(port, () => {
  console.log(`server started at port number ${port}`);
});
