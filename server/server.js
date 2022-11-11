const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const Product = require("./modal/Products");
require("express-async-errors");
var nodemailer = require("nodemailer");
//import stripe package
const stripe = require("stripe")(
  "sk_test_51Kys8xAcq45WQRykQWagru2Rn6XWZw1j1FEOYLqDon3qEqp4mgx3faPcTtZiB72aDgVsdLP0a4xehsubLWQGDNE8009v59GsBx"
);
//import uuid package
const { v4: uuid } = require("uuid");

const authenticateUser = require("./middleware/auth");
const supplierRoutes = require("./routes/supplierRoutes");
const CustomerRoutes = require("./routes/CustomerRoutes");
const ProjectRoutes = require("./routes/projectsRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const app = express();
//load configuration from .env file
require("dotenv-flow").config();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
require("./db/db");

//set logger middleware
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
const updateQty = async (req, res) => {
  const { pid, uPqty } = req.body;
  try {
    const product = await Product.findOne({ _id: pid });
    if (product) {
      const { qty: oldQty } = product;
      const newProduct = await Product.findOneAndUpdate(
        { _id: pid },
        { qty: oldQty - uPqty },
        {
          runValidators: true,
          new: true,
        }
      );
      return res.status(200).json({ data: newProduct });
    }
    return res.status(404).json({ msg: "Resource not found." });
  } catch (error) {
    return res.status(404).json({ msg: "Resource not found." });
  }
};
app.patch("/api/updateQty", updateQty);
//set the routes
//payment route
app.post("/api/payment", (req, res) => {
  const { product, token, Total } = req.body;
  product.items.map((item) => {
    console.log(item.name);
  });
  const idempotencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create({
        amount: Total * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: product.name,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      });

      {
        idempotencyKey;
      }
    })
    .then((result) => {
      // generate pdf

      //send email
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "IT20231514@my.sliit.lk",
          pass: "",
        },
      });

      var mailOptions = {
        from: "IT20231514@my.sliit.lk",
        to: token.email,
        subject: "Sending Email using Node.js",
        text: "That was easy!",
        html: `<!DOCTYPE html>
<html>
<head>
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
</head>
<body>

<h2>Payment Invoice</h2>

<table>
  <tr>
    <th>Name</th>
    <th>Price</th>
    <th>Quantity</th>
  </tr>
  ${product.items
    .map((item) => {
      console.log(item);
      return `<tr key=${item._id}>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>
      </tr>`;
    })
    .join("")}
</table>
<h3>Total Bill=${Total}.00$</h3>
</body>
</html>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
});

//other routes
app.use("/api/Projects", ProjectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/Customers", CustomerRoutes);
app.use("/api/order", orderRoutes);
app.use("/api", authenticateUser, supplierRoutes);
app.use("*", notFound);
//error handler middleware
app.use(errorHandler);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Service started on port: ${port}`);
});

module.exports = app;

// "server": "nodemon server --ignore client",
// "client": "npm start --prefix ../client",
// "start": "concurrently --kill-others-on-fail \"npm run server\" \"npm run client\""
