const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');

const cors=require("cors");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors({
  origin: '*'
}));

const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use('/api', routes);

app.get('*', function(req, res, next) {
    var err = new Error();
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (err.status === 404) {
        let data = {
            title: '404 Not Found',
            content: 'Oops, page not found!'
        };
        res.status(err.status).json(data);
    } else {
        return next();
    }
});

app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.statusCode + " " + err.message,
    });
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})