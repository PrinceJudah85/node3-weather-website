// List core modules before listing npm modules
const path = require("path"); // Core Node Module
const express = require("express"); // NPM Module
const hbs = require("hbs"); // Handlebars for Express (NPM Module) // Completely Optional to Learn. React does everything this does.
const request = require("postman-request"); // handles HTTP requests
const geocode = require("./utils/geocode"); // importing geocode function
const forecast = require("./utils/forecast"); // importing forecast function

const app = express(); // express() initializes an express server. All methods listed below this line configure the server to fulfill it's specified tasks

// ============ Define paths for Express Config ============= //
const publicDirectoryPath = path.join(__dirname, "../public"); // '__dirname' returns the path of where the current script is found
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// ======== Setup handlebars engine and views location ======== //
app.set("view engine", "hbs"); // setting up npm handlebars / hbs on the express app as the view engine
app.set("views", viewsPath); // re-routing the default 'views' directory to an alternate directory in order to render the content
hbs.registerPartials(partialsPath); //configures the path to the partials directory; Partials are parts of a website that get reused throughout a website (i.e. header and footer)

// ============= Setup static directory to serve ============= //
app.use(express.static(publicDirectoryPath));

//Setting up HBS Dynamic templating // OPTIONAL

//app.com  == Root Directory
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Rafael C",
  });
});

// app.com/about
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Rafael C",
  });
});

// app.com/help
app.get("/help", (req, res) => {
  res.render("help", {
    helpMsg:
      "This is the help message that will dynamically render on the help route of this site.",
    title: "Help Page",
    name: "Rafael C",
  });
});

// app.com/weather
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address to complete your search",
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
          location, // Same as: location: location
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error404Page", {
    title: "404",
    errorMsg: "Help article not found",
    name: "Rafael C",
  });
});

app.get("*", (req, res) => {
  // '*' wildcard character that means anthing that hasn't been listed above.
  res.render("error404Page", {
    title: "404",
    errorMsg: "Page Not Found",
    name: "Rafael C",
  });
});

// To get a better understanding of how these app methods work, visit the Express API Documentation @ http://expressjs.com/en/4x/api.html#app

// To start up the server
app.listen(3000, () => {
  // => receives a port #
  console.log("Server is up on port 3000.");
});

// ======== End of Document =========== //

//console.log(__filename) // returns the path to the file itself
//console.log(path.join(__dirname, '../public'))// path.join() method joins all given path segments together
