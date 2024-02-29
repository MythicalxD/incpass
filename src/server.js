

const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('pk_test_51J6TOJDyOVzZxe5dtOFHL6ztQAk8YtSJCnxjA1lMsnCrNtcppzC5xPe9il5PTKfWaGP2gVsv5rUlPtk43tjuqJEN00ySurYRd7');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/process-payment', async (req, res) => {
  const { token, price } = req.body;

  try {
    // Create a charge using the token and price
    const charge = await stripe.charges.create({
      amount: price * 100, // Amount in cents
      currency: 'CAD',
      description: 'Your Company Name - Service Description',
      source: token.id,
    });

    // Handle the charge success
    console.log(charge);
    res.json({ success: true, message: 'Payment successful' });
  } catch (error) {
    // Handle the charge failure
    console.error(error);
    res.status(500).json({ success: false, message: 'Payment failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
