import express from "express";
import { ProductsController } from "../controller/productsController.js";
import { authenticateToken,authorizeRole } from "../middleware/authMiddleware.js";
const productsRouter = express.Router();
const productsController = new ProductsController();

productsRouter.use(authenticateToken)
productsRouter.get('/get/:id',authorizeRole('user','admin'), productsController.getProductById);
productsRouter.get('/get',authorizeRole('user','admin'), productsController.getAllProducts);
productsRouter.put('/update/:id',authorizeRole('admin'), productsController.updateProduct);
productsRouter.delete('/delete/:id',authorizeRole('admin'), productsController.deleteProduct);
productsRouter.post('/add',authorizeRole('admin'), productsController.addProduct);

export { productsRouter };