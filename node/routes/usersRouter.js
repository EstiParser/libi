import express from "express";
import { UsersController } from "../controller/usersController.js";
import { authenticateToken,authorizeRole } from "../middleware/authMiddleware.js";

const usersRouter = express.Router();
const usersController = new UsersController();
usersRouter.use(authenticateToken);

usersRouter.get('/get',authorizeRole('admin'),usersController.getAllUsers);
usersRouter.get('/get/:email',authorizeRole('admin'), usersController.getUserByEmail);
usersRouter.put('/update/:id',authorizeRole('admin'), usersController.updateUser);
usersRouter.delete('/delete/:id',authorizeRole('admin'), usersController.deleteUser);

export { usersRouter };