const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
const authRoutes = require("./routes/authRoutes");
const jobRoutes=require("./routes/jobRoutes")
app.get("/", (req, res) => {
  const data = req.body;
  res.send(`request data is ${data}`);
});
app.use("/api/auth", authRoutes);
app.use("/api/jobs",jobRoutes);
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
