// Import the required modules
import express from "express";
import morgan from "morgan";

// Import your helper functions for your first resource here
import {
  getGames,
  getGamesById,
  createGames,
  updateGamesById,
  deleteGamesById,
} from "./games.js";

// Import your helper functions for your second resource here
import {
  getCompanies,
  getCompaniesById,
  createCompanies,
  updateCompaniesById,
  deleteCompaniesById,
} from "./companies.js";

// Import your helper functions for your third resource here
import {
  getPlatforms,
  getPlatformsById,
  createPlatforms,
  updatePlatformsById,
  deletePlatformsById,
} from "./platforms.js";

// Initialize the express app
const app = express();
// Retrieve the port number from environment variables
const PORT = process.env.PORT;

app.use(express.json()); // express.json() middleware is used to parse incoming JSON requests
app.use(morgan("dev")); // morgan() middleware is used to log the requests to the console

// Games Route Handlers

// Endpoint to retrieve all <games>
app.get("/Games/", async function (req, res) {
  try {
    const games = await getGames(); // Assume getGames is a function that retrieves games from the database
    res.status(200).json({ 
      status: "success", 
      data: games 
    });
  } catch (error) {
    console.error('Error retrieving games:', error);
    res.status(500).json({ 
      status: "error", 
      message: "Internal Server Error" 
    });
  }
});

// Endpoint to retrieve a <games> by id
app.get("/Games/:id", async function (req, res) { //endpoint
  const id = req.params.id; //whatever is in the url parameter is now the variable "id"
  const games = await getGamesById(id); //the variable games will be whatever the function getGamesById throws back, taking in the id variable
  if (!games) { //if there's no game saved to the variable...
    return res //return as a response...
      .status(404) //status 404
      .json({ status: "fail", data: { msg: "No games 4 u :(" } }); //json object with the properties status: fail and the data as no games for you
  }
  res.status(200).json({ status: "success", data: games }); //butif that doesn't proc send the json, a 200 status code and a status key
});

// Endpoint to create a new <games>
app.post("/Games/", async function (req, res) {
  const data = req.body;
  const game = await createGames(data);
  res.status(201).json({ status: "success", data: game });  
});

// Endpoint to update a specific <games> by id
app.patch("/Games/:id", async function (req, res) {
  const id = req.params.id;
  const data = req.body;
  const game = await updateGamesById(id, data);
  // Assume 404 status if the game is not found
  if (!game) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "game not found" } });
  }
  res.status(200).json({ status: "success", data: game });
});

// Endpoint to delete a specific <games> by id
app.delete("/Games/:id", async function (req, res) {
});

// Companies Route Handlers

// Endpoint to retrieve all <companies>
app.get("/Companies/", async function (req, res) {
    const companies = await getCompanies();
    res.status(200).json({ 
      status: "success", 
      data: companies 
    });
  });
  
  // Endpoint to retrieve a <companies> by id
  app.get("/Companies/:id", async function (req, res) {
    const id = req.params.id; 
    const companies = await getCompaniesById(id); 
    if (!companies) {
      return res 
        .status(404) //status 404
        .json({ status: "fail", data: { msg: "Must be a small indie" } });
    }
    res.status(200).json({ status: "success", data: companies });
  });
  
  // Endpoint to create a new <companies>
  app.post("/Companies/", async function (req, res) {
    const data = req.body;
    const company = await createCompanies(data);
    res.status(201).json({ status: "success", data: company });  
  });
  
  // Endpoint to update a specific <companies> by id
  app.patch("/Companies/:id", async function (req, res) {
  });
  
  // Endpoint to delete a specific <companies> by id
  app.delete("/Companies/:id", async function (req, res) {
  });

// Platforms Route Handlers

// Endpoint to retrieve all <platforms>
app.get("/Platforms/", async function (req, res) {
  const platforms = await getPlatforms();
  res.status(200).json({ 
    status: "success", 
    data: platforms 
  });
});

// Endpoint to retrieve a <platforms> by id
app.get("/Platforms/:id/", async function (req, res) {
  const id = req.params.id; 
  const gameid = req.params.gameid;
  const platforms = await getPlatformsById(id); 
  if (!platforms) {
    return res 
      .status(404)
      .json({ status: "fail", data: { msg: "Are you looking for the OUYA or something?" } });
  }
  res.status(200).json({ status: "success", data: platforms });
});

// Endpoint to create a new <platforms>
app.post("/Platforms/", async function (req, res) {
  const data = req.body;
  const company = await createCompanies(data);
  res.status(201).json({ status: "success", data: company });  
});
// Endpoint to update a specific <platforms> by id
app.patch("/Platforms/:id", async function (req, res) {
});

// Endpoint to delete a specific <platforms> by id
app.delete("/Platforms/:id", async function (req, res) {
});


// Start the server and listen on the specified port
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});