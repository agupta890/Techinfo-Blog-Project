require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const authRouter = require("./routers/auth-routers");
const blogRouter = require("./routers/blog-router");
const adminRouter = require("./routers/admin-router");
const contactRouter = require("./routers/contact-router");
const connectDB = require("./utils/connection");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: true, // or process.env.CLIENT_URL
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));

app.use("/api/auth", authRouter);
app.use("/api", blogRouter);
app.use("/api", adminRouter);
app.use("/api", contactRouter);

// server
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
