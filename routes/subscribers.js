//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!       USE POSTMATE TO TEST ROUTES       !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const express = require("express")
//routing part of express
const router = express.Router()
const subscriber = require("../models/user")

//GETTIN ALL SUBSCRIBERS
router.get('/', async (req,res)=>{
    try {
        const subs = await subscriber.find()
        res.json(subs)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})
//GET ONE
router.get('/:id', getSubscriber, (req,res)=>{
    res.json(res.subsc)
})
//CREATE ONE
router.post("/", async (req, res)=>{
    const subsc = new subscriber({
        name: req.body.name,
        subbed: req.body.subbed,
    })
    try {
        const newSub = await subsc.save()
        res.status(201).json(newSub)
    } catch (err) {
        res.status(400).json({message: err.message })
    }
})
//UPDATE ONE
router.put("/:id", getSubscriber, async (req, res)=>{
    if (req.body.name != null) {
        res.subsc.name = req.body.name
    }
    if (req.body.subbed != null) {
        res.subsc.subbed = req.body.subbed
    }
    try {
        const updatedSub = await res.subsc.save()
        res.json(updatedSub)
    } catch (err) {
        res.status(400).json({message: err.message  })
    }
})
//DELETE ONE
router.delete("/:id",getSubscriber, async(req, res)=>{
    try {
        await res.subsc.remove()
        res.json({message:"deleted subscriber"})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
    
})

//created a middlewear to for getting subscribers
async function getSubscriber(req,res,next){
    let subsc
    try {
        subsc = await subscriber.findById(req.params.id)
        if (subsc == null) {
             return res.status(404).json({message: 'Cannot find Subscriber'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.subsc = subsc
    //move to the next part of my code 
    next()
}

//exporting router
module.exports = router