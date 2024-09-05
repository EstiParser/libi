import pool from '../pool.js';

class User {
    static async findByEmail(email) {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return rows[0];
    }

    static async get() {
        const [rows] = await pool.query(
            'SELECT * FROM users'
        );
        return rows;
    }

    static async update(id, updates) {
        const [result] = await pool.query(
            'UPDATE users SET ? WHERE id = ?',
            [updates, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await pool.query(
            'DELETE FROM users WHERE id = ?',
            [id]
        );
        return result.affectedRows;
    }
}

export default User;