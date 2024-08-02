// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getPlatforms() {
  // Query the database and return all platforms
  const queryText = "SELECT * FROM Platforms";
  const result = await pool.query(queryText);
  return result.rows;
}

export async function getPlatformsById(id) {
  // Query the database and return the platform with a matching id or null
  const queryText = "SELECT * FROM Platforms WHERE platformid = $1";
  const result = await pool.query(queryText, [id]);
  return result.rows[0] || null;
}

export async function createPlatforms(platform) {
  // Query the database to create a platform and return the newly created platform
  try {
    const queryText = "INSERT INTO platforms (platformname) VALUES ($1) RETURNING *";
    const result = await pool.query(queryText, [platform.platformname]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error creating platform:', error);
    throw error;
  }
}

export async function updatePlatformsById(id, updates) {
  // Query the database to update the platform and return the newly updated platform or null
  try {
    const queryText = "UPDATE platforms SET platformname = $1 WHERE platformid = $2 RETURNING *";
    const result = await pool.query(queryText, [updates.platformname, id]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error updating platform:', error);
    throw error;
  }
}

export async function deletePlatformsById(id) {
  // Query the database to delete the platform and return the deleted platform or null
  const queryText = "DELETE FROM platforms WHERE platformid = $1 RETURNING *";
  const result = await pool.query(queryText, [id]);
  return result.rows[0] || null;
}