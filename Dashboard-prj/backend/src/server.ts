import express = require("express"); // Import the Express framework
import cors = require("cors"); // Import the CORS middleware
import lib = require("node-system-stats"); // Import the library for system stats
const app = express(); // Create an instance of the Express application
const PORT = 3000; // Define the port number for the server to listen on
const { checkMetrics } = require("./routes/metrics");




app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable parsing of JSON request bodies




//***********************API routes*******************************

//app.get("/api/metrics", async (_req, res) => { // définir une route GET pour l'API qui retourne les métriques du système
  //res.json({
    //"cpu (%)": await checkCpu(),
    //"memory": await checkMemory(),
    //"disk(%)": await checkDisks(),
  //});
//});

app.get("/api/metrics", async (_req, res) => {
  try {
    const metrics = await checkMetrics();

    res.json(metrics);
  } catch (err) {
    console.error("Metrics error:", err);

    res.status(500).json({
      error: "Failed to get metrics"
    });
  }
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`); 
});

