const express = require("express");
const userRoute = require("./Routes/userRoute");
const paymentRoute = require("./Routes/paymentRoute");
const productRoute = require("./Routes/productRoute");
const orderRoute = require("./Routes/orderRoute");
const courtRoute = require("./Routes/courtRoute")
const reservationRoute= require("./Routes/ReservationRoute")
const coachRoute=require("./Routes/coachRoute");
const coachReservationRoute=require("./Routes/coachReservationRoute")
const connectDb = require('./Configuration/connectDb');

const helmet = require("helmet");


const cookieParser = require("cookie-parser");
var cors = require('cors')
const app = express();
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.PORT;
connectDb();

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Default to self
      scriptSrc: [
        "'self'",
        "https://js.stripe.com", // Allow Stripe scripts
        "https://gc.kis.v2.scr.kaspersky-labs.com", // Allow Kaspersky scripts (optional)
      ],
      connectSrc: ["'self'", "https://api.stripe.com"], // Allow Stripe API requests
      frameSrc: ["https://js.stripe.com"], // Allow Stripe frames if necessary
      imgSrc: ["'self'", "data:", "https://*"], // Allow images from trusted sources
    },
  })
);
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' https://js.stripe.com https://gc.kis.v2.scr.kaspersky-labs.com;"
  );
  next();
});

// Middleware to parse cookies
app.use(cookieParser());

// Add other middlewares (like bodyParser)
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true, // Allow cookies to be sent with requests
};

app.use(cors(corsOptions));
app.listen(port, (er) => {
  if (er) {
    console.log(er);
  } else {
    console.log(`server is running on port ${port}`);
  }
});
app.use(express.json())
app.use("/api", userRoute);
app.use("/api", productRoute);
app.use("/api", paymentRoute);
app.use("/api", orderRoute);
app.use("/api/courts", courtRoute);
app.use("/api/reservations", reservationRoute);
app.use("/api/coaches",coachRoute);
app.use("/api/coach-reservations", coachReservationRoute); // Prefix for coach reservation routes
