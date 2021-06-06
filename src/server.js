import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import routes from "./routes/index";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on ${server.address().port}`);
});

export default app;
