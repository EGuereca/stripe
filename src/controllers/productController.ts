import Product from "../db/models/products";
import { Request, Response } from "express";

export default class ProductController{

    static async getAllProducts(req: Request, res: Response){
        try {
            const products = await Product.findAll();
            res.json(products);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
            res.status(500).json({ message: "Error al obtener los productos" });
        }
    }
}