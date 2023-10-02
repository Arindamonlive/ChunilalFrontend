import express from "express";
import cors from "cors";

const app = express();

// Enable CORS for your frontend origin
app.use(cors({ origin: "http://127.0.0.1:5500" }));

// Rest of your server code...

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});