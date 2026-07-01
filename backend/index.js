require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
// const yahooFinance = require("yahoo-finance2").default;
const { User } = require("./model/UserModel");

 const { HoldingsModel } = require("./model/HoldingsModel");

 const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

 const PORT = process.env.PORT || 3002;
 const uri = process.env.MONGO_URL;


const app = express();
//  app.get("/addHoldings", async (req, res) => {
//   await HoldingsModel.deleteMany({});
//   let tempHoldings = [
//   {
//     name: "AAPL",
//     qty: 5,
//     avg: 260,
//     price: 0,
//     net: "0%",
//     day: "0%",
//   },
//   {
//     name: "MSFT",
//     qty: 2,
//     avg: 450,
//     price: 0,
//     net: "0%",
//     day: "0%",
//   },
//   {
//     name: "NVDA",
//     qty: 3,
//     avg: 150,
//     price: 0,
//     net: "0%",
//     day: "0%",
//   },
//   {
//     name: "GOOGL",
//     qty: 2,
//     avg: 170,
//     price: 0,
//     net: "0%",
//     day: "0%",
//   },
//   {
//     name: "AMZN",
//     qty: 4,
//     avg: 210,
//     price: 0,
//     net: "0%",
//     day: "0%",
//   },
//   {
//     name: "META",
//     qty: 1,
//     avg: 700,
//     price: 0,
//     net: "0%",
//     day: "0%",
//   },
//   {
//     name: "TSLA",
//     qty: 2,
//     avg: 310,
//     price: 0,
//     net: "0%",
//     day: "0%",
//   },
// ];
// for (const item of tempHoldings) {
//         await HoldingsModel.create(item);
//     }

//     res.send("Holdings Added");
//  })

//   tempHoldings.forEach((item) => {
//     let newHolding = new HoldingsModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.day,
//       day: item.day,
//     });

//     newHolding.save();
//   });
//   res.send("Done!");
// });

// app.use(cors());
// app.use(bodyParser.json());

// app.get("/addPositions", async (req, res) => {
//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   tempPositions.forEach((item) => {
//     let newPosition = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//     newPosition.save();
//   });
//   res.send("Done!");
// });

app.use(cors());
app.use(bodyParser.json());

app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});


app.get("/price/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol;

    const url =
      `https://eodhd.com/api/real-time/${symbol}.US?api_token=${process.env.EODHD_API_KEY}&fmt=json`;

    console.log(url);

    const response = await axios.get(url);

    res.json({
      symbol: response.data.code,
      price: response.data.close,
      change: response.data.change,
      changePercent: response.data.change_p,
    });

  } catch (err) {
    console.log(err.response?.data || err.message);

    res.status(500).json({
      message: "Unable to fetch stock price",
    });
  }
});
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    res.json({
      message: "Signup Successful",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
app.listen(PORT,()=>{
  console.log("App staryed");
  // mongoose.connect(uri);
  mongoose.connect(uri)
.then(() => {
    console.log("Mongo Connected");
})
.catch(err => {
    console.log(err);
});
 
  console.log("DB connected");
});
// console.log("URI =", uri);
// console.log("Password contains @ ?", uri.includes("@"));
// mongoose
//   .connect(uri)
//   .then(() => {
//     console.log("✅ MongoDB Connected");

//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log("❌ MongoDB Error:", err);
//   });