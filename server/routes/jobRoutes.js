const express=require("express");
const { getJobs, addJob, deleteJob, updateJob } = require("../controller/jobController");
const route=express.Router();
const auth=require("../middleware/authMiddleware");
route.get("/",auth,getJobs)
route.post("/",auth,addJob)
route.delete("/:id",auth,deleteJob);
route.put("/:id",auth,updateJob)

module.exports=route;