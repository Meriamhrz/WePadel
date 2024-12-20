const Order = require("../models/Order");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
    try {
        // Log incoming request
        console.log("Request body:", req.body);

        // Ensure cart items exist
        if (!req.body.cartItems || req.body.cartItems.length === 0) {
            return res.status(400).json({ error: "Cart items are required" });
        }

        // Calculate total price
        const totalPrice = req.body.cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: req.body.cartItems.map((item) => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.brand || "Unnamed Product",
                        images: item.image ? [item.image] : [],
                    },
                    unit_amount: Math.round(item.price * 100), // Price in cents
                },
                quantity: item.quantity,
            })),
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}`,
            cancel_url: `${process.env.FRONTEND_URL}`,
            metadata: {
                userId: req.body.userId,
                products: JSON.stringify(req.body.cartItems),
                totalPrice,
            },
        });

        if (!session || !session.id) {
            throw new Error("Session creation failed, session ID is missing");
        }

        // Save order in the database
        const order = new Order({
            products: req.body.cartItems.map((item) => ({
                productId: item.productId || "63f96c0f8f8b9e001c39c72f",
                name: item.brand || "Unnamed Product",
                quantity: item.quantity,
            })),
            total: totalPrice,
        });

        await order.save();

        console.log("Order saved to the database:", order);
        console.log("Stripe session created:", session);

        res.json({ sessionId: session.id });
    } catch (error) {
        console.error("Error during checkout session creation:", error);
        res.status(500).json({
            msg: "Error during checkout session creation",
            error: error.message,
        });
    }
};

module.exports = { createCheckoutSession };
