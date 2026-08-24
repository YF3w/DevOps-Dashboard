import express = require("express"); // Import the Express framework
import cors = require("cors"); // Import the CORS middleware
import lib = require("node-system-stats"); // Import the library for system stats

const app = express(); // Create an instance of the Express application
const PORT = 3000; // Define the port number for the server to listen on

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable parsing of JSON request bodies


 
//**************CPU metrics************************
const {usagePercent} = require("node-system-stats"); // Importer la fonction usagePercent pour obtenir l'utilisation du CPU
async function checkCpu(){ // Definie une fonction asynchrone checkCpu() pour vérifier l'utilisation du CPU

  try {
    const CPUused = await usagePercent(); // pourquoi await ? parce que usagePercent() est une fonction asynchrone qui retourne une promesse. await permet d'attendre la résolution de cette promesse avant de continuer l'exécution du code.
    
    //console.log(`CPU Usage: ${CPUused.percent}%`);

    return CPUused.percent; // retourne le pourcentage d'utilisation du CPU
  
  } catch (err) {
    console.error(err);
  }
  return;
}
checkCpu(); // appel de la fonction checkCpu() pour vérifier l'utilisation du CPU
//**********************FIN CPU metrics********************************


//**************Memory metrics************************
const { showMemoryUsage} = require("node-system-stats"); // Importer la fonction showMemoryUsage pour obtenir l'utilisation de la mémoire
async function checkMemory() {
  try {
    const Used = (await lib.getMemoryInfo()); // fonction asynchrone qui retourne une promesse. await permet d'attendre la résolution de cette promesse avant de continuer l'exécution du code.
    /*
    console.log("Memory info:", Used);
    console.log(`Memory total: ${Used.total.gb}gb`);
    console.log(`Memory free: ${Used.free.gb}gb`);
    console.log(`Memory Used: ${Used.percentUsed}%`);
  */

    return { free: Used.free.gb, total: Used.total.gb, percent: Used.percentUsed }; // retourne un objet contenant la mémoire libre, totale et le pourcentage d'utilisation de la mémoire
  
  } catch (err) {
    console.error(err);
  }
  return;
}
checkMemory();

//*********************FIN Memory metrics*********************************/




//***********************Disk metrics*******************************/
const { getDiskInfo, formatBytes } = require("node-system-stats"); // Importer les fonctions getDiskInfo et formatBytes pour obtenir les informations sur le disque
  async function checkDisks() {
    try {

    const Used = (await getDiskInfo("C:\\Users")); // selection un disque spécifique 
  /*
    console.log("Disk info:", Used);
    console.log(`Disk size: ${formatBytes(Used[0].size)}`);
    console.log(`Disk used: ${formatBytes(Used[0].used)}`);
    console.log(`Disk Used: ${Used[0].percentUsed}%`);
     */

    return Used[0].percentUsed; // retourne le pourcentage d'utilisation du disque
 
  } catch (err) {
    console.error(err);
  }
}

checkDisks();


//***********************FIN Disk metrics*******************************




//***********************API routes*******************************

app.get("/api/metrics", async (_req, res) => { // définir une route GET pour l'API qui retourne les métriques du système
  res.json({
    "cpu (%)": await checkCpu(),
    "memory": await checkMemory(),
    "disk(%)": await checkDisks(),
  });
});


app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`); 
});

