const express=require("express")
const {generateFile}=require("./generateFile")
const {executeCpp} =require("./executeCpp")
require("./cleanup"); 

const app=express();
exports.app = app;
const cors = require('cors');
const {generateAiReview}=require("./generateAiReview");


app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = ["https://coderush.space", "https://www.coderush.space"];
    if (!origin) return callback(null, true); // Allow non-browser or curl requests
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);  // Reject CORS but don't throw error
    }
  },
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));



app.post("/run", async (req, res) => {
  const { code, input = "", language = "cpp" } = req.body;

  if (!code) return res.status(400).json({ success: false, error: "Empty code" });

  try {
    const filePath = generateFile(language, code);
    const output = await executeCpp(filePath, input);
    res.json({ success: true, output });
  } catch (err) {
    res.status(500).json({ success: false, error: err.stderr || "Internal error" });
  }
});



app.post("/submit", async (req, res) => {
  const { language = "cpp", code, testCases = [] } = req.body;

  console.log("🟡 /submit called");

  if (!code || !testCases.length) {
    return res.status(400).json({ success: false, error: "Code or testCases missing" });
  }

  try {
    const filePath = generateFile(language, code);

    for (let i = 0; i < testCases.length; i++) {
      const { input, output: expectedOutput, isHidden } = testCases[i];
      console.log(`🧪 Running test ${i + 1}:`);
      const result = await executeCpp(filePath, input);

      const actualOutput = result.stdout.trim();
      const expected = expectedOutput.trim();

      if (actualOutput !== expected) {
        return res.json({
          success: true,
          verdict: "Failed",
          failedTest: i + 1,
          isHidden,
          actualOutput,
        });
      }
    }

    return res.json({ success: true, verdict: "Accepted" });
  } catch (error) {
    console.error("🔥 Submit Error:", error);
    return res.status(500).json({ success: false, error: error.stderr || "Execution failed" });
  }
});



app.post("/ai-review", async (req, res) => {
  const { code, problemDescription } = req.body;

  if (!code || !problemDescription) {
    return res.status(400).json({ success: false, error: "Missing code or problem description." });
  }

  try {
    const aiReview = await generateAiReview(code, problemDescription);
    res.status(200).json({ success: true, aiReview });
  } catch (error) {
    console.error("AI Review Error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to generate AI review",
    });
  }
});



const PORT=7000;
app.listen(PORT,(error)=>{
    if(error){
        console.log("Error While Running the Server")
    }else{
        console.log(`Server Started On server ${PORT}`)
    }
})