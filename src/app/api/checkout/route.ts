import { NextResponse } from 'next/server';

// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, company, painPoint } = body;

        console.log("Creating Checkout Session for:", { name, email, company, painPoint });

        // === REAL IMPLEMENTATION EXAMPLE ===
        /*
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: 'price_YOUR_PRICE_ID_HERE', // The 2.856€ Product ID
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/thank-you`,
            cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/`,
            customer_email: email,
            metadata: {
                company_name: company,
                pain_point: painPoint,
                customer_name: name
            },
        });

        return NextResponse.json({ url: session.url });
        */

        // === MOCK IMPLEMENTATION (For Verification) ===
        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Return a URL that redirects to our thank you page
        return NextResponse.json({ url: '/thank-you' });

    } catch (error) {
        console.error("Stripe Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
