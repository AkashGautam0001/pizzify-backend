const express = require("express");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const cors = require("cors");

const ServerConfig = require("./config/serverConfig");
const connectDB = require("./config/dbConfig");

const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const orderRouter = require("./routes/orderRoute");
const serverConfig = require("./config/serverConfig");
const restaurantsRouter = require("./routes/restaurantsRoute");

const app = express();

const options = {
	origin: serverConfig.FRONTEND_URL,
	credentials: true,
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie"],
};

app.use(cors(options));

app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/carts", cartRouter);
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/restaurants", restaurantsRouter);

app.listen(ServerConfig.PORT, async () => {
	await connectDB();
	console.log(`Server started at port ${ServerConfig.PORT}...!!`);
});
