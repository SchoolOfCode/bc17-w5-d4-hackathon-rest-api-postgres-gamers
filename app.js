// Import the required modules
import express from 'express';
import morgan from 'morgan';

// Import your helper functions for your first resource here
import { getGames, getGamesById, createGames, updateGamesById, deleteGamesById } from './games.js';

// Import your helper functions for your second resource here
import { getCompanies, getCompaniesById, createCompanies, updateCompaniesById, deleteCompaniesById } from './companies.js';

// Import your helper functions for your third resource here
import { getPlatforms, getPlatformsById, createPlatforms, updatePlatformsById, deletePlatformsById } from './platforms.js';
import { getPlatformRelease, getPlatformReleaseById, createPlatformRelease, updatePlatformReleaseById, deletePlatformReleaseById } from './platformRelease.js';

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
    const games = await getGames();
    res.status(200).json({ status: "success", data: games });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Endpoint to retrieve a <games> by id
app.get("/Games/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const games = await getGamesById(id);
    if (!games) {
      res.status(404).json({ status: "error", message: "Game not found" });
    } else {
      res.status(200).json({ status: "success", data: games });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Endpoint to create a new <games>
app.post("/Games/", async function (req, res) {
  const data = req.body;
  try {
    const game = await createGames(data);
    res.status(201).json({ status: "success", data: game });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Endpoint to update a specific <games> by id
app.patch("/Games/:id", async function (req, res) {
  const id = req.params.id;
  const data = req.body;
  try {
    const game = await updateGamesById(id, data);
    if (!game) {
      res.status(404).json({ status: "error", message: "Game not found" });
    } else {
      res.status(200).json({ status: "success", data: game });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Endpoint to delete a specific <games> by id
app.delete("/Games/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const game = await deleteGamesById(id);
    if (!game) {
      res.status(404).json({ status: "error", message: "Game not found" });
    } else {
      res.status(200).json({ status: "success", data: game });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Companies Route Handlers

// Endpoint to retrieve all <companies>
app.get("/Companies/", async function (req, res) {
  try {
    const companies = await getCompanies();
    res.status(200).json({ status: "success", data: companies });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Endpoint to retrieve a <companies> by id
app.get("/Companies/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const companies = await getCompaniesById(id);
    if (!companies) {
      res.status(404).json({ status: "error", message: "Company not found" });
    } else {
      res.status(200).json({ status: "success", data: companies });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Endpoint to create a new <companies>
app.post("/Companies/", async function (req, res) {
  const data = req.body;
  try {
    const company = await createCompanies(data);
    res.status(201).json({ status: "success", data: company });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Endpoint to update a specific <companies> by id
app.patch("/Companies/:id", async function (req, res) {
  const id = req.params.id;
  const data = req.body;
  try {
    const company = await updateCompaniesById(id, data);
    if (!company) {
      res.status(404).json({ status: "error", message: "Company not found" });
    } else {
      res.status(200).json({ status: "success", data: company });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Endpoint to delete a specific <companies> by id
app.delete("/Companies/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const company = await deleteCompaniesById(id);
    if (!company) {
      res.status(404).json({ status: "error", message: "Company not found" });
    } else {
      res.status(200).json({ status: "success", data: company });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Platforms Route Handlers

// Endpoint to retrieve all <platforms>
app.get("/Platforms/", async function (req, res) {
  try {
    const platforms = await getPlatforms();
    res.status(200).json({ status: "success", data: platforms });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Endpoint to retrieve a <platforms> by id
app.get("/Platforms/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const platforms = await getPlatformsById(id);
    if (!platforms) {
      res.status(404).json({ status: "error", message: "Platform not found" });
    } else {
      res.status(200).json({ status: "success", data: platforms });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Endpoint to create a new <platforms>
app.post("/Platforms/", async function (req, res) {
  const data = req.body;
  try {
    const platform = await createPlatforms(data);
    res.status(201).json({ status: "success", data: platform });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Endpoint to update a specific <platforms> by id
app.patch("/Platforms/:id", async function (req, res) {
  const id = req.params.id;
  const data = req.body;
  try {
    const platform = await updatePlatformsById(id, data);
    if (!platform) {
      res.status(404).json({ status: "error", message: "Platform not found" });
    } else {
      res.status(200).json({ status: "success", data: platform });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Endpoint to delete a specific <platforms> by id
app.delete("/Platforms/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const platform = await deletePlatformsById(id);
    if (!platform) {
      res.status(404).json({ status: "error", message: "Platform not found" });
    } else {
      res.status(200).json({ status: "success", data: platform });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// PlatformReleases Route Handlers

// Endpoint to retrieve all <platformReleases>
app.get("/PlatformReleases/", async function (req, res) {
  try {
    const platformReleases = await getPlatformRelease();
    res.status(200).json({ status: "success", data: platformReleases });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Endpoint to retrieve a <platformReleases> by id
app.get("/PlatformReleases/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const platformRelease = await getPlatformReleaseById(id);
    if (!platformRelease) {
      res.status(404).json({ status: "error", message: "Platform Release not found" });
    } else {
      res.status(200).json({ status: "success", data: platformRelease });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Endpoint to create a new <platformReleases>
app.post("/PlatformReleases/", async function (req, res) {
  const data = req.body;
  try {
    const platformRelease = await createPlatformRelease(data);
    res.status(201).json({ status: "success", data: platformRelease });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Endpoint to update a specific <platformReleases> by id
app.patch("/PlatformReleases/:id", async function (req, res) {
  const id = req.params.id;
  const data = req.body;
  try {
    const platformRelease = await updatePlatformReleaseById(id, data);
    if (!platformRelease) {
      res.status(404).json({ status: "error", message: "Platform Release not found" });
    } else {
      res.status(200).json({ status: "success", data: platformRelease });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Endpoint to delete a specific <platformReleases> by id
app.delete("/PlatformReleases/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const platformRelease = await deletePlatformReleaseById(id);
    if (!platformRelease) {
      res.status(404).json({ status: "error", message: "Platform Release not found" });
    } else {
      res.status(200).json({ status: "success", data: platformRelease });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Start the server and listen on the specified port
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});