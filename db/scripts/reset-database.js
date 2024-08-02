import { pool } from "../index.js";

async function resetDatabase() {
  try {
    // Drop existing tables if they exist
    await pool.query(`
        DROP TABLE IF EXISTS Companies CASCADE;
        DROP TABLE IF EXISTS Games CASCADE;
        DROP TABLE IF EXISTS Platforms CASCADE;
    `);

    // Create the companies table
    await pool.query(`
      CREATE TABLE Companies (
          CompanyID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          CompanyName VARCHAR(100),
          Headquarters VARCHAR(100),
          FoundedYear INT
      );
    `);

    // Create the games table with a foreign key to the companies table
    await pool.query(`
      CREATE TABLE Games (
          GameID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          GameName VARCHAR(100),
          ReleaseYear INT,
          Genre VARCHAR(50),
          Revenue DECIMAL(10, 2),  -- in millions of dollars
          CompanyID INT,
          FOREIGN KEY (CompanyID) REFERENCES Companies(CompanyID)
      );
    `);

    // Create the platforms table
    await pool.query(`
      CREATE TABLE Platforms (
          PlatformID INT,
          PlatformName VARCHAR(50),
          GameID INT,
          FOREIGN KEY (GameID) REFERENCES Games(GameID)
      );
    `);

    // Seed the companies table
    await pool.query(`
      INSERT INTO Companies (CompanyName, Headquarters, FoundedYear) VALUES
        ('Nintendo', 'Kyoto, Japan', 1889),
        ('Sony Interactive Entertainment', 'San Mateo, California, USA', 1993),
        ('Microsoft Gaming', 'Redmond, Washington, USA', 2000),
        ('Rockstar Games', 'New York City, New York, USA', 1998),
        ('Electronic Arts', 'Redwood City, California, USA', 1982);
    `);

    // Seed the games table
    await pool.query(`
      INSERT INTO Games (GameName, ReleaseYear, Genre, Revenue, CompanyID) VALUES
        ('The Legend of Zelda: Breath of the Wild', 2017, 'Action-Adventure', 1920.00, 1),
        ('Animal Crossing: New Horizons', 2020, 'Life Simulation', 3300.00, 1),
        ('Super Mario Odyssey', 2017, 'Platformer', 1690.00, 1),
        ('God of War Ragnarök', 2022, 'Action-Adventure', 1000.00, 2),
        ('Spider-Man: Miles Morales', 2020, 'Action-Adventure', 625.00, 2),
        ('Horizon Forbidden West', 2022, 'Action RPG', 500.00, 2),
        ('Halo Infinite', 2021, 'First-Person Shooter', 525.00, 3),
        ('Forza Horizon 5', 2021, 'Racing', 350.00, 3),
        ('Sea of Thieves', 2018, 'Action-Adventure', 500.00, 3),
        ('Grand Theft Auto V', 2013, 'Action-Adventure', 7500.00, 4),
        ('Red Dead Redemption 2', 2018, 'Action-Adventure', 2500.00, 4),
        ('Minecraft', 2011, 'Sandbox', 9000.00, 3),
        ('FIFA 23', 2022, 'Sports', 1000.00, 5),
        ('Apex Legends', 2019, 'Battle Royale', 2000.00, 5),
        ('The Sims 4', 2014, 'Life Simulation', 1000.00, 5);
    `);

    // Seed the platforms table
    await pool.query(`
      INSERT INTO Platforms (PlatformID, PlatformName, GameID) VALUES
        (1, 'Nintendo Switch', 1),
        (1, 'Nintendo Switch', 2),
        (1, 'Nintendo Switch', 3),
        (2, 'PlayStation 5', 4),
        (2, 'PlayStation 5', 5),
        (2, 'PlayStation 5', 6),
        (3, 'Xbox Series X/S', 7),
        (4, 'PC', 7),
        (3, 'Xbox Series X/S', 8),
        (4, 'PC', 8),
        (3, 'Xbox Series X/S', 9),
        (4, 'PC', 9),
        (2, 'PlayStation 5', 10),
        (3, 'Xbox Series X/S', 10),
        (4, 'PC', 10),
        (2, 'PlayStation 5', 11),
        (3, 'Xbox Series X/S', 11),
        (4, 'PC', 11),
        (2, 'PlayStation 5', 12),
        (3, 'Xbox Series X/S', 12),
        (4, 'PC', 12),
        (5, 'Mobile', 12),
        (2, 'PlayStation 5', 13),
        (3, 'Xbox Series X/S', 13),
        (4, 'PC', 13),
        (2, 'PlayStation 5', 14),
        (3, 'Xbox Series X/S', 14),
        (4, 'PC', 14),
        (5, 'Mobile', 14),
        (2, 'PlayStation 5', 15),
        (3, 'Xbox Series X/S', 15),
        (4, 'PC', 15);
    `);

    console.log("Database reset successful");
  } catch (error) {
    console.error("Database reset failed: ", error);
  } finally {
    // End the pool
    await pool.end();
  }
}

await resetDatabase();