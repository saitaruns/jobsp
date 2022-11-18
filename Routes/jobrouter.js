const express = require("express");
const Location = require("../Models/Location");
const Skills = require("../Models/Skills");
const Job = require("../Models/Job");
const router = express.Router();
const verifyToken = require('../authverify')

router.get("/",async (req, res) => {
    const userid = req.query.userid;
    const posts = await Job
        .find
        // {
        //     createdAt: {
        //         $gte: new Date(new Date().setHours(00, 00, 00)),
        //         $lt: new Date(new Date().setHours(23, 59, 59)),
        //     },
        // },
        ()
        .populate("location")
        .populate({
            path: "skills",
            populate: {
                path: "skill",
                model: "Skill",
            },
        });
    return res.status(200).send(posts);
});

router.post("/", async (req, res) => {
    const { title, description, skills, location, benefits, openUntil } =
        req.body;

    console.log(
        title + "\n",
        description + "\n",
        skills + "\n",
        location + "\n",
        benefits + "\n",
        openUntil + "\n"
    );

    const post = await Job.create({
        title,
        description,
        skills,
        location,
        benefits,
        openUntil,
    });

    return res.status(200).send(post);
});

router.patch("/:job_id",async (req,res)=>{
    await Job.findByIdAndUpdate(req.params.job_id,{$set:req.body},{new:true}).then(function(err,j){
        if(!j){
            return res.status(400).send(err)
        }
        else{
            return res.status(200).send(j)
        }
    })
})

router.delete("/:job_id",async (req,res)=>{
    await Job.deleteOne({_id:req.params.job_id}).then((d)=>{
        if(d.deletedCount!=0){
            return res.status(200).send("deleted")
        }
        return res.status(400).send("Couldn't find the job with the given id")
    })
})

router.post("/skill", async (req, res) => {
    const name = req.body.name;
    const skill = await Skills.create({
        name,
    });
    return res.send(skill);
});

router.get("/locations", async (req, res) => {
    const lcs = await Location.find();
    console.log(lcs);
    return res.send("dsad");
});

module.exports = router;
