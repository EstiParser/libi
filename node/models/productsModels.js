import pool from '../pool.js';

class Products {
  static async findById(id) {
    const [rows] = await pool.query(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async get() {
    const [rows] = await pool.query(
      'SELECT * FROM products'
    );
    return rows;
  }

  static async update(id, updates) {
    console.log(updates);
    
    const [result] = await pool.query(
      'UPDATE products SET ? WHERE id = ?',
      [updates, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await pool.query(
      'DELETE FROM products WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  }

  static async create(product) {
    const [result] = await pool.query(
      'INSERT INTO products (name, price) VALUES (?, ?)',
      [product.name, product.price]
    );
    return result.insertId;
  }
}

export default Products;