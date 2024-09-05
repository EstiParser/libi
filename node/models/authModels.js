import pool from '../pool.js';

class Users {
    static async findOne(email) {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return rows[0];
    }

    static async create(user) {
        const [result] = await pool.query(
            'INSERT INTO users (name, password, email, permission) VALUES (?, ?, ?, ?)',
            [user.name, user.password, user.email, user.permission]
        );
        return result.insertId;
    }
}

export default Users;