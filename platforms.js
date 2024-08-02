
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

export async function createPlatforms(platform) {
  // Query the database to create an resource and return the newly created resource
  try {
      const queryText = "INSERT INTO platforms (platformname, gameid) VALUES ($1, $2) RETURNING *";
      const result = await pool.query(queryText, [platform.platformname, platform.gameid]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
}

export async function updatePlatformsById(id, gameid, updates) {
  // Query the database to update the resource and return the newly updated resource or null
  // try {const queryText = "UPDATE platforms SET platformname = $1, gameid = $2 WHERE gameId = $3 AND gameid = $2 RETURNING *";
  //   const result = await pool.query(queryText, [updates.platformname, updates.gameid, gameid, id]);
  //   return result.rows[0] || null;
  //   } catch (error) {
  //     console.error('Error updating platform:', error);
  //     throw error;
  //   }
}

export async function deletePlatformsById(id) {
  // Query the database to delete the resource and return the deleted resource or null
  const queryText = "DELETE FROM platforms WHERE id = $1"
  const result = await pool.query(queryText, [id]);
  return result.rows[0] || null;
}