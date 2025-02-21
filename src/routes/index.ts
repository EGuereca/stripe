import { Router, RequestHandler } from "express";
import OrderController from "../controllers/orderController";
import { createPaymentIntent } from "../controllers/paymentController";
import ProductController from "../controllers/productController";
import dotenv from "dotenv";
import { register, login } from "../controllers/authController";

dotenv.config();


const routes = Router();


routes.post("/create-payment-intent", createPaymentIntent as RequestHandler);
routes.post("/get-order-id/:userId", OrderController.getOrderId as RequestHandler);
routes.post("/get-order-products/:orderId", OrderController.getOrderProducts as RequestHandler);
routes.post("/create-order-detail", OrderController.createOrderDetail as RequestHandler);
routes.get("/get-products", ProductController.getAllProducts);
routes.post("/orders/details", OrderController.createOrderDetail as RequestHandler);
// routes.post("/register", register as RequestHandler);
routes.post("/login", login as RequestHandler);
routes.get("/orders/get-order-id/:userId", OrderController.getOrderId as RequestHandler);

export default routes;