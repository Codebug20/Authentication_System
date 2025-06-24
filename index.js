import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./database/index.js";
dotenv.config({
  path: "./.env",
});
const port = process.env.PORT;
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("something went wrong with the database connection", err);
  });
