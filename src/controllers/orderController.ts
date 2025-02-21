import  Order  from "../db/models/orders";
import  OrderDetail  from "../db/models/orders-details";
import  Product  from "../db/models/products";
import { Request, Response } from "express";

export default class OrderController {
    static async createOrder(req: Request, res: Response) {
        try {
            const { userId, totalAmount, items } = req.body;
            const order = await Order.create({
                cliente_id: userId,
                estado: "carrito",
                createdAt: new Date(),
                updatedAt: new Date()
            });
        } catch (error) {
            console.error("Error al crear la orden:", error);
            res.status(500).json({ message: "Error al crear la orden" });
        }
    }

    static async getOrderDetails(req: Request, res: Response) {
        try {
            const { cliente_id } = req.params;
            const order = await Order.findOne({
                where: { cliente_id, estado: "carrito" },
                include: [{ model: OrderDetail, include: [{ model: Product }] }],
            });
            const orderId = order?.id;
            const orderDetails = await OrderDetail.findAll({
                where: { order_id: orderId },
                include: [{ model: Product }],
            });
            res.json(orderDetails);
        } catch (error) {
            console.error("Error al obtener los detalles de la orden:", error);
            res.status(500).json({ message: "Error al obtener los detalles de la orden" });
        }
    }

    static async updateOrderStatus(req: Request, res: Response) {
        try {
            const { orderId } = req.params;
            const { status } = req.body;
        } catch (error) {
            console.error("Error al actualizar el estado de la orden:", error);
            res.status(500).json({ message: "Error al actualizar el estado de la orden" });
        }
    }
    
    static async getOrderProducts(req: Request, res: Response) {
        try {
            const { orderId } = req.params; 
    
            const products = await Product.findAll({
                attributes: ["name", "description", "price", "stock", "image"],
                include: [
                    {
                        model: OrderDetail,
                        attributes: [],
                        include: [
                            {
                                model: Order,
                                attributes: [],
                                where: { id: orderId, estado: "carrito"}, 
                            },
                        ],
                    },
                ],
                raw: true, 
            });
    
            res.json(products);
        } catch (error) {
            console.error("Error al obtener productos de la orden:", error);
            res.status(500).json({ message: "Error al obtener los productos" });
        }
    }

    static async getOrderId(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const {estado} = req.body;
            const order = await Order.findOne({
                where: { cliente_id: userId, estado: estado },
            });
            res.json(order);
        } catch (error) {
            console.error("Error al obtener el ID de la orden:", error);
        }
    }

    static async createOrderDetail(req: Request, res: Response) {
        try {
            const { orderId, productId, quantity } = req.body;

            const order = await Order.findByPk(Number(orderId));
            if (!order) {
                return res.status(404).json({ message: 'Orden no encontrada.' });
            }

            const product = await Product.findByPk(Number(productId));
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado.' });
            }

            const orderDetail = await OrderDetail.create({ order_id:orderId, product_id:productId, quantity:quantity, createdAt: new Date(), updatedAt: new Date() });

            res.status(201).json({ message: 'Detalle de orden creado correctamente', orderDetail });
        } catch (error) {
            console.error("Error al crear el detalle de la orden:", error);
            res.status(500).json({ message: "Error al crear el detalle de la orden" });
        }
    }
}


