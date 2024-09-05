import Products from "../models/productsModels.js";

export class ProductsController {
    async addProduct(req, res) {
        try {
            const { name, price } = req.body;
            const productId = await Products.create({ name, price });
            res.status(200).json({ message: 'The product has been successfully added', productId });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async getProductById(req, res) {
        try {
            const result = await Products.findById(req.params.id);
            return res.json({ data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error getting product by ID', error });
        }
    }

    async getAllProducts(req, res) {
        try {
            const result = await Products.get();
            return res.json({ data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error getting products', error });
        }
    }

    async updateProduct(req, res) {
        try {
            const result = await Products.update(req.params.id, req.body);
            return res.json(result);
        } catch (error) {
            res.status(500).json({ message: 'Error updating product', error });
        }
    }

    async deleteProduct(req, res) {
        try {
            const result = await Products.delete(req.params.id);
            return res.json({ data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product', error });
        }
    }
  
}