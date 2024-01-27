const express = require('express')
const MosqueData = require('../models/mosqueData')
const auth = require('../middleware/auth')
const router = new express.Router()

//MosqueData
//MosqueData Create
router.post('/mosqueData/:map_id', auth, async (req, res) => {
    // const mosqueData = new MosqueData(req.body)
    try {
        if (req.users.map_id === req.params.map_id) {
            const mosqueData= new MosqueData({
                ...req.body,
                owner: req.users._id
            })
            await mosqueData.save()
            res.status(201).send(mosqueData)
        } else {
            res.status(403).send({authentication: 'unauthorised'})
        }
    } catch (e) {
        res.status(400).send(e)
    }
})

//MosqueData Read
router.get('/mosqueData', auth, async (req, res) => {
    try {
        // const mosqueData= await MosqueData.find({owner:req.user._id})
        await req.users.populate({ path: 'mosqueData' })
        res.send(req.users.mosqueData/*mosqueData*/)
    } catch (e) {
        res.status(500).send()
    }
})
//MosqueData Read by id
router.get('/mosqueData/:id', async (req, res) => {
    const map_id = req.params.id
    try {
        // const mosqueData= await MosqueData.findById(_id)
        const mosqueData= await MosqueData.findOne({ map_id })

        if (!mosqueData) {
            return res.status(201).send({ description: "empty" })
        }
        res.send(mosqueData)
    } catch (e) {
        res.status(500).send()
    }
})

//MosqueData Update
router.patch('/mosqueData/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const mosqueData= await MosqueData.findOne({ map_id: req.params.id, owner: req.users._id })
        // const mosqueData= await MosqueData.findByIdAndUpdate(req.params.id)



        if (!mosqueData) {
            return res.status(404).send()
        }

        updates.forEach((update) => mosqueData[update] = req.body[update])
        await mosqueData.save()
        // const mosqueData= await MosqueData.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

        res.send(mosqueData)
    } catch (e) {
        res.status(400).send(e)
    }
})

//MosqueData Delete
router.delete('/mosqueData/:id', auth, async (req, res) => {
    try {
        // const mosqueData= await MosqueData.findByIdAndDelete(req.params.id)
        const mosqueData= await MosqueData.findOneAndDelete({ map_id: req.params.id, owners: req.users_id })
        if (!mosqueData) {
            res.status(404).send()
        }

        res.send(mosqueData)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router