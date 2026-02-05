// ZUNCHOS Stripe Checkout API Endpoint
// Node.js/Express example - adapt to your backend framework

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const router = express.Router();

// Fixed product configuration
const PRODUCT_CONFIG = {
    name: 'Diagnóstico técnico ZUNCHOS + arquitectura',
    price: 2856, // 2,856€ in cents (285600 cents)
    currency: 'eur'
};

/**
 * POST /api/create-checkout
 * Creates a Stripe Checkout Session for the fixed ZUNCHOS diagnostic product
 * 
 * Body parameters:
 * - customer_name: string
 * - customer_email: string
 * - company: string
 * - problem_description: string
 */
router.post('/create-checkout', async (req, res) => {
    try {
        const {
            customer_name,
            customer_email,
            company,
            problem_description
        } = req.body;

        // Validation
        if (!customer_name || !customer_email || !company || !problem_description) {
            return res.status(400).json({
                error: 'Faltan datos requeridos'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customer_email)) {
            return res.status(400).json({
                error: 'Email inválido'
            });
        }

        // Create or retrieve Stripe product
        let product;
        try {
            const products = await stripe.products.search({
                query: `name:'${PRODUCT_CONFIG.name}'`,
            });

            if (products.data.length > 0) {
                product = products.data[0];
            } else {
                product = await stripe.products.create({
                    name: PRODUCT_CONFIG.name,
                    description: 'Diagnóstico técnico completo de operación + propuesta de arquitectura ZUNCHOS a medida'
                });
            }
        } catch (error) {
            console.error('Error creating/retrieving product:', error);
            return res.status(500).json({
                error: 'Error al configurar el producto'
            });
        }

        // Create or retrieve price
        let price;
        try {
            const prices = await stripe.prices.list({
                product: product.id,
                active: true
            });

            const exactPrice = prices.data.find(p => p.unit_amount === PRODUCT_CONFIG.price * 100);

            if (exactPrice) {
                price = exactPrice;
            } else {
                price = await stripe.prices.create({
                    product: product.id,
                    unit_amount: PRODUCT_CONFIG.price * 100, // Convert to cents
                    currency: PRODUCT_CONFIG.currency,
                });
            }
        } catch (error) {
            console.error('Error creating/retrieving price:', error);
            return res.status(500).json({
                error: 'Error al configurar el precio'
            });
        }

        // Determine domain for redirect URLs
        const domain = process.env.DOMAIN || req.get('origin') || 'http://localhost:3000';

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: price.id,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${domain}/thank-you.html?email=${encodeURIComponent(customer_email)}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${domain}/`,
            customer_email: customer_email,
            metadata: {
                customer_name: customer_name,
                company: company,
                problem_description: problem_description,
                revenue: req.body.revenue || 'unknown',
                business_type: req.body.business_type || 'B2B',
                sales_process: req.body.sales_process || 'unknown'
            },
            // Optional: Automatically create customer
            customer_creation: 'always',
        });

        // Log the transaction attempt
        console.log('Stripe Checkout Session created:', {
            session_id: session.id,
            customer_email: customer_email,
            company: company,
            amount: PRODUCT_CONFIG.price
        });

        // Return checkout URL
        res.json({
            checkout_url: session.url,
            session_id: session.id
        });

    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({
            error: 'Error al crear la sesión de pago',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

/**
 * POST /api/webhook
 * Stripe webhook handler for payment completion events
 */
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        console.log('Payment successful:', {
            session_id: session.id,
            customer_email: session.customer_email,
            amount_total: session.amount_total / 100,
            metadata: session.metadata
        });

        // TODO: Add your post-payment logic here:
        // - Send confirmation email to customer
        // - Notify ZUNCHOS team
        // - Create calendar invite for diagnostic call
        // - Add to CRM/database
        // - Trigger internal workflows

        // Example: Send notification email
        // await sendConfirmationEmail({
        //     to: session.customer_email,
        //     name: session.metadata.customer_name,
        //     company: session.metadata.company
        // });

        // Example: Notify team
        // await notifyTeam({
        //     customer: session.metadata.customer_name,
        //     company: session.metadata.company,
        //     problem: session.metadata.problem_description
        // });
    }

    res.json({ received: true });
});

module.exports = router;

/**
 * SETUP INSTRUCTIONS:
 * 
 * 1. Install dependencies:
 *    npm install stripe express
 * 
 * 2. Set environment variables:
 *    STRIPE_SECRET_KEY=sk_test_xxx (from Stripe Dashboard)
 *    STRIPE_WEBHOOK_SECRET=whsec_xxx (from Stripe Webhook settings)
 *    DOMAIN=https://yourdomain.com (your production domain)
 * 
 * 3. In your main server file (e.g., server.js):
 *    const checkoutRouter = require('./api/create-checkout');
 *    app.use('/api', checkoutRouter);
 * 
 * 4. Configure Stripe webhook:
 *    - Go to Stripe Dashboard > Developers > Webhooks
 *    - Add endpoint: https://yourdomain.com/api/webhook
 *    - Select event: checkout.session.completed
 * 
 * 5. Update chat-closer.js:
 *    Replace the simulated API call with:
 *    
 *    fetch('/api/create-checkout', {
 *        method: 'POST',
 *        headers: { 'Content-Type': 'application/json' },
 *        body: JSON.stringify(payload)
 *    })
 *    .then(res => res.json())
 *    .then(data => {
 *        chatData.checkoutUrl = data.checkout_url;
 *        showStripePaymentButton(data.checkout_url);
 *    })
 *    .catch(error => {
 *        console.error('Error creating checkout:', error);
 *        addMessage('Error al crear la sesión de pago. Por favor, inténtalo de nuevo.');
 *    });
 */
