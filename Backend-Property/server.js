const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const propertyRoutes = require("./routes/PropertyRoute");
const favoriteRoutes = require("./routes/favoriteRoute");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/properties", propertyRoutes);
app.use("/api/favorite", favoriteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
