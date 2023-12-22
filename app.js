const express = require("express"); // web framework for Node.js

const routes = require("./routes/index");

const morgan = require("morgan"); // HTTP request logger middleware for node.js


const rateLimit = require("express-rate-limit"); // Use to limit repeated requests to public APIs and/or endpoints


const helmet = require("helmet"); // Helmet helps secure Express apps by setting HTTP response headers.

// Content-Security-Policy: default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests
// Cross-Origin-Embedder-Policy: require-corp
// Cross-Origin-Opener-Policy: same-origin
// Cross-Origin-Resource-Policy: same-origin
// Origin-Agent-Cluster: ?1
// Referrer-Policy: no-referrer
// Strict-Transport-Security: max-age=15552000; includeSubDomains
// X-Content-Type-Options: nosniff
// X-DNS-Prefetch-Control: off
// X-Download-Options: noopen
// X-Frame-Options: SAMEORIGIN
// X-Permitted-Cross-Domain-Policies: none
// X-XSS-Protection: 0



const mongosanitize = require("express-mongo-sanitize"); // The sanitize function will strip out any keys that start with '$' in the input,
// so you can pass it to MongoDB without worrying about malicious users overwriting
// query selectors.


const bodyParser = require("body-parser") //Node.js body parsing middleware.

// Parse incoming request bodies in a middleware before your handlers, available under the 
 // req. body property.

//  const xss = require("xss") // xss is a module used to filter input from users to prevent XSS attacks

 const cors = require("cors");

 


 const app = express();


 app.use(express.urlencoded({
  extended: true,
}));

app.use(mongosanitize());

// app.use(xss());

 app.use(cors({
  origin: "https://chirpsky-frontend.onrender.com",
  methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
  credentials: true,

}));



 app.use(express.json({ limit: "10kb"}))
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended: true}));

 app.use(helmet());

 if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
 }

 const limiter = rateLimit({
  max: 3000,
  windowMs: 60 * 60 *1000, // In one hour upto 3000 requests
  message: "Too many requests from this IP, Go outside and play, please try again in one hour, and have a nice day.."
});


app.use("/chirpsky", limiter);



app.use(routes);


module.exports = app;