import Stripe from "stripe";
import { Request, Response, RequestHandler } from "express";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export const createPaymentIntent = async (req: Request, res: Response) => {
    try {
        const { cartItems } = req.body; 

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "El carrito está vacío" });
        }

        const lineItems = cartItems.map((item: any) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                    description: item.description,
                },
                unit_amount: Math.round(item.price * 100), 
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: 'http://127.0.0.1:5500/pagoExitoso.html',
            cancel_url: `http://127.0.0.1:5500/pagoCancelado.html`,
        });

        res.json({ url: session.url }); 
    } catch (error) {
        console.error("Error al crear la sesión de pago:", error);
        res.status(500).json({ message: "Error al procesar el pago" });
    }
};