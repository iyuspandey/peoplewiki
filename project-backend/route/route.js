const express=require("express");
const router=express.Router();
const {getpeople,creatediscussion,getalldiscussion,getdiscussion,addmessage}=require("../controller/control");  
router.get("/people",getpeople);
router.get("/discussions",getalldiscussion);
router.post("/discussions",creatediscussion);
router.get("/discussions/:id",getdiscussion);
router.post("/discussions/:id/message",addmessage);
module.exports=router;




