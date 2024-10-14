import dotenv from "dotenv";

dotenv.config();

import app from "./index";

// Define the port to run on, default to 5000 if not specified in the environment variables
const port = process.env.PORT || 5000;
console.log(process.env.PORT);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
