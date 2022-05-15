import express from "express";
import path from "path";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// get data from the forms from frontend and pasre it
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.json({ strict: false }));

// # Ejs Setup
app.use(express.static(path.join(__dirname, "/../public")));
app.get("/", (req, res) => {
  // return res.render("home.ejs");
  return res.status(200).json({message : "Hello World!"});
});
app.set("views", path.join(__dirname, "/../views"));
app.set("view engine", "ejs");


// # Importing the Middlewares and Routes
import errorHandler from "./api/middlewares/Error";


// # All the routes
import getRide from "./api/routes/getRide";
import shareRide from "./api/routes/shareRide";
import endRide from "./api/routes/endRide";

app.use("/getRide", getRide); // for get ride all routes
app.use("/shareRide", shareRide); // for share ride all routes
app.use("/endRide",endRide); // for end ride all routes

import { totalRides } from "./api/models/totalRides" // to display total Rides shared and consumed
app.get("/totalRide", (req, res) => {
  return res.status(200).send(totalRides);
  // return res.render("totalRides", { totalRides: totalRides })
})

// # Page not found
app.use((_req, _res, next) => {
  const err: Error = new Error("Page Not Found");
  (err as any).status = 404;
  next(err);
});

// # Error Handler
app.use(errorHandler);
export default app;
module.exports = app.listen(port, () => { console.log(`Express is listening at http://localhost:${port}`);});

