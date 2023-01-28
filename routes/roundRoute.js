const route = require('express').Router();
const Round = require('../database/models/roundModel');

route.get('/all', async (req, res) => {
    try{
        const rounds = await Round.find()
        res.status(200).json({msg:'All rounds', rounds})
    }
    catch(err){
        console.log(err)
        res.status(500).json({msg:'Error', err})
    }
})


route.post('/add', async (req, res) => {
    try{
        const round = await Round.create(req.body)
        res.status(200).json({msg:'Round added', round})
    }
    catch(err){
        console.log(err)
        res.status(500).json({msg:'Error', err})
    }
})

route.post('/edit', async (req, res) => {
    const {id,name} = req.body;
    try{
        const editRound = await Round.updateOne({_id: id}, {$set: {name: name}})
        res.status(200).json({msg:'Round Updated', editRound, success: true})
    }
    catch(err){
        console.log(err)
        res.status(500).json({msg:'Error', err, success: false})
    }
})

route.post('/delete', async (req, res) => {
    const {id} = req.body;
    try{
        const deletedRound = await Round.findOneAndDelete({_id: id})
        res.status(200).json({msg:'Round deleted', deletedRound, success: true})
    }
    catch(err){
        console.log(err)
        res.status(500).json({msg:'Error', err, success: false})
    }
})

module.exports = route;
