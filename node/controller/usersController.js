import User from "../models/usersModels.js";

export class UsersController {
    async getAllUsers(req, res) {
        try {
            const result = await User.get();
            return res.json({ data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error getting all users', error });
        }
    }

    async getUserByEmail(req, res) {
        try {
            const result = await User.findByEmail(req.params.email);
            return res.json({ data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error getting user by email', error });
        }
    }    

    async updateUser(req, res) {
        try {
            const resultItems = await User.update(req.params.id, req.body);
            return res.json(resultItems);
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error });
        }
    }

    async deleteUser(req, res) {
        try {
            const result = await User.delete(req.params.id);
            return res.json({ data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error });
        }
    }
}