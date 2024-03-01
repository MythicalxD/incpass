// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('sk_test_51J6TOJDyOVzZxe5d41cQkzzlfXVgd47ttEjRHoBLGrPtVa493wNBVld3RdcmqhsMF3K53vfBP7UBxPpr0hjvvqDW00PQpmvUEl');


const product = await stripe.products.create({
    name: 'T-shirt',
  });


const price = await stripe.prices.create({
  product: '{{0134}}',
  unit_amount: 2000,
  currency: 'usd',
});