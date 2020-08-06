const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../template/views");
const partialPath = path.join(__dirname, "../template/partials");

// Setup handlebars and view location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

// Setup Static Directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Anisha Tiwari",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Weather",
    name: "Anisha Tiwari",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helptext: "this is help page",
    title: "Help Page",
    name: "Anisha Tiwari",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search)
    return res.send({
      error: "You should provide a search term.",
    });
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Anisha Tiwari",
    error: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Anisha Tiwari",
    error: "page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
