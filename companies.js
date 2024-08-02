
// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getCompanies() {
  // Query the database and return all resource twos
  const queryText = "SELECT * FROM Companies";
  const result = await pool.query(queryText);
  return result.rows;
}

export async function getCompaniesById(id) {
  // Query the database and return the resource with a matching id or null
  const queryText = "SELECT * FROM Companies WHERE companyid = $1";
  const result = await pool.query(queryText, [id]);
  return result.rows[0] || null;
}

export async function createCompanies(company) {
  // Query the database to create an resource and return the newly created resource
  try {
    // Query the database to create an resource and return the newly created resource
      const queryText = "INSERT INTO companies (companyname, headquarters, foundedyear) VALUES ($1, $2, $3) RETURNING *";
      const result = await pool.query(queryText, [company.companyname, company.headquarters, company.foundedyear]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
}

export async function updateCompaniesById(id, updates) {
  // Query the database to update the resource and return the newly updated resource or null
  const queryText = "UPDATE companies SET companyname = $1, headquarters = $2, foundedyear = $3 WHERE companyid = $4 RETURNING *"; 
  const result = await pool.query(queryText, [updates.companyname, updates.headquarters, updates.foundedyear, id]);
  return result.rows || null;
}

export async function deleteCompaniesById(id) {
  // Query the database to delete the resource and return the deleted resource or null
  const queryText = "DELETE FROM companies WHERE companyid = $1"
  const result = await pool.query(queryText, [id]);
  return result.rows[0] || null;
}