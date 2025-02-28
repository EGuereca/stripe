import { Router, RequestHandler } from "express";
import OrderController from "../controllers/orderController";
import { createPaymentIntent } from "../controllers/paymentController";
import ProductController from "../controllers/productController";
import dotenv from "dotenv";
import { register, login } from "../controllers/authController";

dotenv.config();

const routes = Router();

/**
 * @swagger
 * /v1/api/payment/create-payment-intent:
 *   post:
 *     summary: Crear una intención de pago
 *     tags: [Pagos]
 *     responses:
 *       200:
 *         description: Intención de pago creada exitosamente
 */
routes.post("/create-payment-intent", createPaymentIntent as RequestHandler);

/**
 * @swagger
 * /v1/api/payment/get-order-id/{userId}:
 *   post:
 *     summary: Obtener ID de orden por usuario
 *     tags: [Órdenes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ID de orden obtenido exitosamente
 */
routes.post("/get-order-id/:userId", OrderController.getOrderId as RequestHandler);

/**
 * @swagger
 * /v1/api/payment/get-products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 */
routes.get("/get-products", ProductController.getAllProducts);

/**
 * @swagger
 * /v1/api/payment/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente
 */
routes.post("/login", login as unknown as RequestHandler);
routes.post("/register", register as unknown as RequestHandler);

routes.post("/get-order-products/:orderId", OrderController.getOrderProducts as RequestHandler);

routes.post("/create-order-detail", OrderController.createOrderDetail as RequestHandler);
routes.post("/orders/details", OrderController.createOrderDetail as RequestHandler);
routes.get("/orders/get-order-id/:userId", OrderController.getOrderId as RequestHandler);

export default routes;