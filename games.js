
// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getGames() {
  // Query the database and return all resource ones
  const queryText = "SELECT * FROM Games";
  const result = await pool.query(queryText);
  return result.rows;
}

export async function getGamesById(id) {
  // Query the database and return the resource with a matching id or null
  const queryText = "SELECT * FROM Games WHERE gameid = $1";
  const result = await pool.query(queryText, [id]);
  return result.rows[0] || null;
}

export async function createGames(resource) {
  // Query the database to create an resource and return the newly created resource
}

export async function updateGamesById(id, updates) {
  // Query the database to update the resource and return the newly updated resource or null
}

export async function deleteGamesById(id) {
  // Query the database to delete the resource and return the deleted resource or null
}