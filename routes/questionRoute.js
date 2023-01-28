const route = require('express').Router();
const Question = require('../database/models/questionModel');

route.get('/', (req, res) => {
    res.status(200).json({msg:'Hello World!'})
})


route.get('/:id', async (req, res) => {
    try{
        const questions = await Question.find({round: req.params.id})
        res.status(200).json({msg:'Question', questions, success: true})
    }
    catch(err){
        console.log(err)
        res.status(500).json({msg:'Error', err, success: false})
    }
})

route.post('/add', async (req, res) => {
    console.log(req.body);
    try{
        const newQuestion = await Question.create(req.body)
        res.status(200).json({msg:'Question added', newQuestion,success: true})
    }
    catch(err){
        console.log(err)
        res.status(500).json({msg:'Error', err, success: false})
    }
})

route.post('/edit', async (req, res) => {
    try{
        console.log(req.body);
        const updatedQuestion = await Question.findOneAndUpdate({_id: req.body.id}, {$set: {title:  req.body.title, code: req.body.code, options: req.body.options, answer: req.body.answer}})
        res.status(200).json({msg:'Question Updated', updatedQuestion, success: true})
    }
    catch(err){
        console.log(err)
        res.status(500).json({msg:'Error', err, success: false})
    }
})

route.post('/delete', async (req, res) => {
    try{
        const delQuestion = await Question.findOneAndDelete({_id: req.body.id})
        res.status(200).json({msg:'Question deleted', delQuestion, success: true})
    }
    catch(err){
        console.log(err)
        res.status(500).json({msg:'Error', err, success: false})
    }
})


module.exports = route;