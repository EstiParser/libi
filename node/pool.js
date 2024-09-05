import mysql from 'mysql2/promise';
import config from './config.js';

const pool = mysql.createPool({
  host: config.DB_HOST,
  user: 'root',
  database: 'hairstyles',
  port: config.DB_PORT,
  password: config.DB_PASSWORD,
});

async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();

    console.log('Connected to MySQL successfully');


    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        permission VARCHAR(50)
      )
    `;
    await connection.query(createUsersTable);

    const createProductsTable = `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price VARCHAR(50) NOT NULL
      )
    `;
    await connection.query(createProductsTable);

    console.log('Tables are ready.');
    connection.release(); 
  } catch (error) {
    console.error('Failed to initialize database:', error.message);
  }
}

initializeDatabase();

export default pool;