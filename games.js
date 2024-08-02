
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

export async function createGames(game) {
  try {
  // Query the database to create an resource and return the newly created resource
    const queryText = "INSERT INTO games (gamename, releaseyear, genre, revenue, companyid) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const result = await pool.query(queryText, [game.gamename, game.releaseyear, game.genre, game.revenue, game.companyid]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error creating game:', error);
    throw error;
  }
}

export async function updateGamesById(id, updates) {
  // Query the database to update the resource and return the newly updated resource or null
  try {const queryText = "UPDATE games SET gamename = $1, releaseyear = $2, genre = $3, revenue = $4, companyId = $5 WHERE gameId = $6 RETURNING *";
    const result = await pool.query(queryText, [updates.gamename, updates.releaseyear, updates.genre, updates.revenue, updates.companyid, id]);
    return result.rows[0] || null;
    } catch (error) {
      console.error('Error updating game:', error);
      throw error;
    }
}

export async function deleteGamesById(id) {
  // Query the database to delete the resource and return the deleted resource or null
}