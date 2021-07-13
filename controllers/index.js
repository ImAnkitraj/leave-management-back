const Application = require('../models/Application');
const User = require('../models/User');
var mongoose = require("mongoose");

module.exports.APPLY_LEAVE = (req, res) => {
    console.log(req.body)
    console.log('hit')
    User.findById(mongoose.Types.ObjectId(req.body.userId))
    .then((user)=>{
        const leave = new Application({
            userId: mongoose.Types.ObjectId(req.body.userId),
            type: req.body.type,
            from: req.body.from,
            to: req.body.to,
            duration: req.body.duration,
            comments: req.body.comments,
            status: 'pending'
        })
        leave.save();
        user.applications.push(leave);
        user.save();
        res.send({
            status: true,
            application: leave
        })
    })
    .catch((err)=>{
        res.send(({
            status: false,
            message: 'Something went wrong'
        }))
    })
}

module.exports.GET_LEAVE = (req, res) => {
    Application.findById(req.params.id)
    .then(application => {
        res.send({
            status: true,
            application: application
        })
    })
    .catch(err=>{
        res.send({
            status: false,
            message: 'Something went wrong'
        })
    })
}

module.exports.GET_ALL_LEAVE = (req, res) => {
    console.log('all leave', req.params)
    Application.find({$or: [{status:'approved'},{status: 'rejected'}], userId: req.params.userId})
    .then((applications)=>{
        res.send({
            status: true,
            applications,
        })
    })
    .catch((err)=>{
        res.send({
            status: false,
            message: 'Something went wrong'
        })
    })
}

module.exports.GET_PENDING_LEAVE = (req, res) => {
    console.log('pending leave',req.params)
    Application.find({status:'pending',userId: mongoose.Types.ObjectId(req.params.userId)})
    .then((applications)=>{
        res.send({
            status: true,
            applications,
        })
    })
    .catch((err)=>{
        res.send({
            status: false,
            message: 'Something went wrong'
        })
    })
}

module.exports.APPROVE_LEAVE = (req, res) => {
    Application.findById(req.body.id)
    .then(application => {
        application.status = 'approved';
        return application.save()
    })
    .then(()=>{
        return Application.find({status:'pending',userId: mongoose.Types.ObjectId(req.body.userId)})
    })
    .then((applications)=>{
        res.send({
            status: true,
            applications,
        })
    })
    .catch((err)=>{
        res.send({
            status: false,
            message: 'Something went wrong'
        })
    })
}

module.exports.REJECT_LEAVE = (req, res) => {
    Application.findById(req.body.id)
    .then(application => {
        application.status = 'rejected';
        return application.save()
    })
    .then(()=>{
        return Application.find({status:'pending',userId: mongoose.Types.ObjectId(req.body.userId)})
    })
    .then((applications)=>{
        res.send({
            status: true,
            applications,
        })
    })
    .catch((err)=>{
        res.send({
            status: false,
            message: 'Something went wrong'
        })
    })
}