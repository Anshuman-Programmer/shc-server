import app from "./index";

// Define the port to run on, default to 5000 if not specified in the environment variables
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
