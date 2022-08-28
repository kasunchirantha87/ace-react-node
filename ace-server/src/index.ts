import bodyParser from "body-parser";
import helmet from "helmet";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import cors from "cors";
import outbrakeRouter from "./routes/outbrake.routes";
import country from "./routes/country.routes";

const express = require('express');
const app = express();

// const corsOptions = {
//   origin:'*',
// };
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
};


/**
 * MW configuration
 */
 app.use(helmet());
 app.use(cors(corsOptions));
 app.use(bodyParser.json());
 app.use(
   bodyParser.urlencoded({
     limit: "5mb",
     extended: true,
     parameterLimit: 5000,
   })
 );
 
 app.use(express.static("public"));

app.use("/api/v1.0/user", userRouter);
app.use("/api/v1.0/auth", authRouter);
app.use("/api/v1.0/outbrake", outbrakeRouter);
app.use("/api/v1.0/country", country);
 
app.listen(5000, ()=> console.log('Server running at port 5000'));
