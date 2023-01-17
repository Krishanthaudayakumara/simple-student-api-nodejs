const { log } = require("console");
const express = require("express");

const router = express.Router();

const fs = require("fs");

let rawdata = fs.readFileSync("data.json");
let student = JSON.parse(rawdata);
let objKeys = Object.keys(student);

//Insert Method
router.post("/insert", (req, res) => {
  let result = [];
  let data = JSON.stringify(req.body);
  for (var i = 0; i < objKeys.length; i++) {
    result.push(student[objKeys[i]]);
  }
  result.push(JSON.parse(data));
  //console.log(result);
  try {
    fs.writeFileSync("data.json", JSON.stringify(result));
    res.status(200).json({ title: "successful", content: "data inserted" });
  } catch (err) {
    res.send(err);
  }
});

//Show all Method
router.get("/show/all", (req, res) => {
  //console.log(objKeys);
  res.json(student);
});

//Get by ID Method
router.get("/show/id/:id", (req, res) => {
  let notFound = 0;
  let result = [];
  for (let i = 0; i < objKeys.length; i++) {
    //console.log(i)
    try {
      if (req.params.id == student[i].sid) {
        result.push(student[i]);
        //console.log(result);
      } else {
        notFound++;
      }
    } catch (err) {
      notFound++;
      continue;
    }
  }
  if (notFound == objKeys.length) {
    res.status(404).json({ title: "Not Found", content: "data not found" });
  } else res.json(result);
});

//Get by Name Method
router.get("/show/name/:name", (req, res) => {
  let find = req.params.name.trim().toLowerCase();
  let notFound = 0;
  let result = [];

  for (let i = 0; i < objKeys.length; i++) {
    try {
      let fName = student[i].firstName.trim().toLowerCase();
      let lName = student[i].lastName.trim().toLowerCase();
      let FullName = fName + " " + lName;
      //console.log(FullName.includes(find));
      if (FullName.includes(find)) {
        result.push(student[i]);
      } else {
        notFound++;
      }
    } catch (err) {
      notFound++;
      continue;
    }
  }
  if (notFound == objKeys.length) {
    res.status(404).json({ title: "Not Found", content: "data not found" });
  } else res.json(result);
});

//Get by center Method
router.get("/show/center/:center", (req, res) => {
  let find = req.params.center.trim().toLowerCase();
  let notFound = 0;
  let result = [];

  for (let i = 0; i < objKeys.length; i++) {
    try {
      let center = student[i].center.trim().toLowerCase();
      if (center == find) {
        result.push(student[i]);
      } else {
        notFound++;
      }
    } catch (err) {
      notFound++;
      continue;
    }
  }
  if (notFound == objKeys.length) {
    res.status(404).json({ title: "Not Found", content: "data not found" });
  } else res.json(result);
});

//Get by semester Method
router.get("/show/semester/:semester", (req, res) => {
  let find = req.params.semester;
  let notFound = 0;
  let result = [];
  for (let i = 0; i < objKeys.length; i++) {
    try {
      let semester = student[i].semester;
      if (semester == find) {
        result.push(student[i]);
      } else {
        notFound++;
      }
    } catch (err) {
      notFound++;
      continue;
    }
  }
  if (notFound == objKeys.length) {
    res.status(404).json({ title: "Not Found", content: "data not found" });
  } else res.json(result);
});

//Get by gpa Method
router.get("/show/cgpa/:gpa", (req, res) => {
  let find = req.params.gpa;
  let notFound = 0;
  let result = [];
  for (let i = 0; i < objKeys.length; i++) {
    try {
      let semester = student[i].cgpa;
      if (semester == find) {
        result.push(student[i]);
      } else {
        notFound++;
      }
    } catch (err) {
      notFound++;
      continue;
    }
  }
  if (notFound == objKeys.length) {
    res.status(404).json({ title: "Not Found", content: "data not found" });
  } else res.json(result);
});

//Update by SID Method
router.put("/update/id/:id", (req, res) => {
  let result = [];
  let data = JSON.stringify(req.body);
  let notFound = 0;

  for (var i = 0; i < objKeys.length; i++) {
    result.push(student[objKeys[i]]);
  }
  result.push(JSON.parse(data));

  for (var i = 0; i < objKeys.length; i++) {
    try {
      if (req.params.id == result[i].sid) {
        result[i] = JSON.parse(data);
      } else {
        notFound++;
      }
    } catch (err) {
      notFound++;
      continue;
    }
  }

  if (notFound == objKeys.length) {
    res
      .status(404)
      .json({ title: "404 Data Not Found", content: "Oops, Data not found!" });
  } else {
    fs.writeFileSync("data.json", JSON.stringify(result));
    res.status(200).json({ title: "successful", content: "Data updated successfully" });
  }
});

//Delete by SID Method
router.delete("/delete/id/:id", (req, res) => {
  let notFound = 0;

  for (var i = 0; i < objKeys.length; i++) {
    try {
      if (req.params.id == student[i].sid) {
        delete student[i];
      } else {
        notFound++;
      }
    } catch (err) {
      notFound++;
      continue;
    }
  }
  if (notFound == objKeys.length) {
    res.status(404).json({ title: "Not Found", content: "data not found" });
  } else {
    fs.writeFileSync("data.json", JSON.stringify(student));
    res.status(200).json({ title: "successful", content: "data deleted successfully" });
  }
});

//Delete by email Method
router.delete("/delete/email/:email", (req, res) => {
  let notFound = 0;

  for (var i = 0; i < objKeys.length; i++) {
    try {
      if (req.params.email.toLowerCase() == student[i].email.toLowerCase()) {
        delete student[i];
      } else {
        notFound++;
      }
    } catch (err) {
      notFound++;
      continue;
    }
  }
  if (notFound == objKeys.length) {
    res.status(404).json({ title: "Not Found", content: "data not found" });
  } else {
    fs.writeFileSync("data.json", JSON.stringify(student));
    res.status(200).json({ title: "successful", content: "data deleted successfully" });
  }
});

module.exports = router;
