import { pool } from "../index.js";

async function resetDatabase() {
  try {
    // Drop existing tables if they exist
    await pool.query(`
        DROP TABLE IF EXISTS PlatformReleases CASCADE;
        DROP TABLE IF EXISTS Platforms CASCADE;
        DROP TABLE IF EXISTS Games CASCADE;
        DROP TABLE IF EXISTS Companies CASCADE;
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
          FOREIGN KEY (CompanyID) REFERENCES Companies(CompanyID) ON DELETE CASCADE
      );
    `);

    // Create the platforms table
    await pool.query(`
      CREATE TABLE Platforms (
          PlatformID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          PlatformName VARCHAR(100)
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

    // Create the platform releases table with foreign keys to games and platforms
    await pool.query(`
      CREATE TABLE PlatformReleases (
          PlatformReleaseID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          GameID INT,
          PlatformID INT,
          ReleaseDate DATE,
          FOREIGN KEY (GameID) REFERENCES Games(GameID) ON DELETE CASCADE,
          FOREIGN KEY (PlatformID) REFERENCES Platforms(PlatformID) ON DELETE CASCADE
      );
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
      INSERT INTO Platforms (PlatformName) VALUES
        ('Nintendo Switch'),
        ('PlayStation 5'),
        ('Xbox Series X'),
        ('PC');
    `);

    // Seed the platform releases table
    await pool.query(`
      INSERT INTO PlatformReleases (PlatformID, GameID) VALUES
        (1, 1),
        (1, 2),
        (1, 3),
        (2, 4),
        (2, 5),
        (2, 6),
        (3, 7),
        (3, 8),
        (3, 9),
        (4, 10),
        (4, 11),
        (4, 12),
        (4, 13),
        (4, 14),
        (4, 15);
    `);

    // Create a view to include game and platform names
    await pool.query(`
      CREATE VIEW PlatformReleasesView AS
      SELECT 
        pr.PlatformReleaseID,
        pr.PlatformID,
        p.PlatformName,
        pr.GameID,
        g.GameName
      FROM 
        PlatformReleases pr
      JOIN 
        Platforms p ON pr.PlatformID = p.PlatformID
      JOIN 
        Games g ON pr.GameID = g.GameID;
    `);

    console.log('Database reset and seeded successfully.');
  } catch (error) {
    console.error('Error resetting database:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

resetDatabase();