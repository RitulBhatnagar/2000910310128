const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const port = 1000;
require("./db/connect")
const entityRoute = require("./routes/entityRoute");
const clientRoute = require("./routes/clientRoute");
const engageRoute = require("./routes/engageRoute")
const userRoute = require("./routes/userRoute");
 app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true,
}));

app.use("/api/entity", entityRoute);
app.use("/api/client", clientRoute);
app.use("/api/engage", engageRoute);
app.use("/api/user", userRoute);


app.listen(port, () => {
  console.log(`server started`)
})