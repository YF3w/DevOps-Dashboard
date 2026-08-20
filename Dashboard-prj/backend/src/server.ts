import express = require("express");
import cors = require("cors");
import lib = require("node-system-stats");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


const {usagePercent} = require("node-system-stats");
//**************CPU metrics************************

async function checkCpu(){

  try {
    const CPUused = await usagePercent();
    
    //console.log(`CPU Usage: ${CPUused.percent}%`);

    return CPUused.percent;
  } catch (err) {
    console.error(err);
  }
  return;
}
checkCpu();
//**********************FIN CPU metrics********************************


//**************Memory metrics************************
const { showMemoryUsage} = require("node-system-stats");
async function checkMemory() {
  try {
    const Used = (await lib.getMemoryInfo());
    /*
    console.log("Memory info:", Used);
    console.log(`Memory total: ${Used.total.gb}gb`);
    console.log(`Memory free: ${Used.free.gb}gb`);
    console.log(`Memory Used: ${Used.percentUsed}%`);
  */

    return { free: Used.free.gb, total: Used.total.gb, percent: Used.percentUsed };
  } catch (err) {
    console.error(err);
  }
  return;
}
checkMemory();

//*********************FIN Memory metrics*********************************/




//***********************Disk metrics*******************************/
const { getDiskInfo, formatBytes } = require("node-system-stats");
  async function checkDisks() {
    try {

    const Used = (await getDiskInfo("C:\\Users"));
  /*
    console.log("Disk info:", Used);
    console.log(`Disk size: ${formatBytes(Used[0].size)}`);
    console.log(`Disk used: ${formatBytes(Used[0].used)}`);
    console.log(`Disk Used: ${Used[0].percentUsed}%`);
     */

    return Used[0].percentUsed;
  } catch (err) {
    console.error(err);
  }
}

checkDisks();


//***********************FIN Disk metrics*******************************




//***********************API routes*******************************

app.get("/api/metrics", async (_req, res) => {
  res.json({
    "cpu (%)": await checkCpu(),
    "memory": await checkMemory(),
    "disk(%)": await checkDisks(),
  });
});


app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});




//class

