import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Users from '../models/authModels.js'; 

const TOKEN_SECRET = 'your_jwt_secret_key';

export class authController {
    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await Users.findOne(email);
            if (!user) {
                throw new Error('Invalid email.');
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                throw new Error('Invalid password.');
            }

            const token = jwt.sign({ _id: user.id, permission: user.permission }, TOKEN_SECRET, { expiresIn: '30d' });
            const permission = user.permission;
            res.header("auth-token", token).send({ token ,permission});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async register(req, res) {
        let { name, password, email, permission } = req.body;
        try {
            const existingUser = await Users.findOne(email);
            if (existingUser) {
                throw new Error('User already exists.');
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            permission = 'user';
            const userId = await Users.create({ name, password: hashedPassword, email, permission });

            res.status(200).json({ message: 'The user has been successfully added', userId });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}