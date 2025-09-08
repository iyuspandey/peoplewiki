const Person = require("../model/student");
const Discussion = require("../model/discussion");
const getpeople= async(req,res)=>{
   try{
    const people=await Person.find({});
    res.status(200).json({data:people});
   }
   catch(err){
    console.error(" Error fetching people:", err);
    res.status(500).json({error:"Failed to fetch people",detail:err.message});
   }
};
const creatediscussion=async(req,res)=>{

        const {id,title}=req.body;
        if(!id||!title){
            return res.status(400).json({error:"ID and title are required"});
        }
         try {
            const exists = await Discussion.findOne({ id });
            if (exists) {
              return res.status(400).json({ error: "Discussion already exists" });
            }
        
            const discussion = new Discussion({ id, title, messages: [] });
            await discussion.save();
        
            res.status(201).json(discussion);
          } catch (err) {
            console.error("Error creating discussion:", err);
            res.status(500).json({ error: "Failed to create discussion", detail: err.message });
          }

};
const getalldiscussion=async(req,res)=>{
    try {
        const discussions = await Discussion.find({}, "id title createdAt messages");
        res.json(discussions);
      } catch (err) {
        console.error(" Error fetching discussions:", err);
        res.status(500).json({ error: "Failed to fetch discussions", detail: err.message });
      }
    };
const getdiscussion=async (req,res)=>{
     const { id } = req.params;
      try {
        const discussion = await Discussion.findOne({ id });
        if (!discussion) return res.status(404).json({ error: "Discussion not found" });
        res.json(discussion);
      } catch (err) {
        console.error(" Error fetching discussion:", err);
        res.status(500).json({ error: "Server error", detail: err.message });
      }
};
const addmessage=async(req,res)=>{
    const {id}=req.params;
    const{username,text,timestamp}=req.body;

    if(!username || !text || !timestamp){
        return res.status(400).json({error:"Invalid message data"});
    }
    try{
        const discussion=await Discussion.findOne({id});
        if(!discussion) return res.status(404).json({error:"Discussion not found"});
        discussion.messages.push({username,text,timestamp});
        await discussion.save();
        res.status(201).json({"status":"success"});
    }
    catch(err){
        console.error(" Error adding message:",err);
        res.status(500).json({error:"Failed to add message",detail:err.message});
    }
};
module.exports={getpeople,creatediscussion,getalldiscussion,getdiscussion,addmessage};
