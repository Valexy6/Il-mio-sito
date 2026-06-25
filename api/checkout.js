const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const FREE_SHIPPING_THRESHOLD = 3500; // €35 in cents
const SHIPPING_COST = 500;            // €5 in cents

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { items } = req.body;

    const line_items = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: { name: item.name },
        unit_amount: Math.round(item.unitPrice),
      },
      quantity: item.quantity,
    }));

    const subtotal = items.reduce((s, i) => s + Math.round(i.unitPrice) * i.quantity, 0);
    const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['IT', 'DE', 'FR', 'ES', 'PT', 'AT', 'BE', 'NL', 'CH', 'GB', 'SE', 'DK', 'PL'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: isFreeShipping ? 0 : SHIPPING_COST,
              currency: 'eur',
            },
            display_name: isFreeShipping ? 'Spedizione gratuita' : 'Spedizione standard',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
      ],
      success_url: `${req.headers.origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/#shop`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
