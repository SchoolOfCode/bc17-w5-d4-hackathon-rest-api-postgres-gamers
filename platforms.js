
// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getPlatforms() {
  // Query the database and return all resource twos
  const queryText = "SELECT * FROM Platforms";
  const result = await pool.query(queryText);
  return result.rows;
}

export async function getPlatformsById(id) {
  // Query the database and return the resource with a matching id or null
  const queryText = "SELECT * FROM Platforms WHERE platformid = $1";
  const result = await pool.query(queryText, [id]);
  return result.rows[0] || null;
}

export async function createPlatforms(resource) {
  // Query the database to create an resource and return the newly created resource
}

export async function updatePlatformsById(id, updates) {
  // Query the database to update the resource and return the newly updated resource or null
}

export async function deletePlatformsById(id) {
  // Query the database to delete the resource and return the deleted resource or null
}