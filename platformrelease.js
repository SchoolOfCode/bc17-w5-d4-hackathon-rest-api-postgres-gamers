// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getPlatformRelease() {
  const result = await pool.query('SELECT * FROM PlatformReleasesView');
  return result.rows;
}

// Function to get a platform release by ID
export async function getPlatformReleaseById(id) {
  const result = await pool.query('SELECT * FROM PlatformReleasesView WHERE PlatformReleaseID = $1', [id]);
  return result.rows[0];
}

// Function to create a new platform release
export async function createPlatformRelease(data) {
  const { PlatformID, GameID } = data;
  const result = await pool.query(
    'INSERT INTO PlatformReleases (PlatformID, GameID) VALUES ($1, $2) RETURNING *',
    [PlatformID, GameID]
  );
  return result.rows[0];
}

// Function to update a platform release by ID
export async function updatePlatformReleaseById(id, data) {
  const { PlatformID, GameID } = data;
  const result = await pool.query(
    'UPDATE PlatformReleases SET PlatformID = $1, GameID = $2 WHERE PlatformReleaseID = $3 RETURNING *',
    [PlatformID, GameID, id]
  );
  return result.rows[0];
}

// Function to delete a platform release by ID
export async function deletePlatformReleaseById(id) {
  const result = await pool.query('DELETE FROM PlatformReleases WHERE PlatformReleaseID = $1 RETURNING *', [id]);
  return result.rows[0];
}