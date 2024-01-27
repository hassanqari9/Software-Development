const mongoose = require('mongoose')

const mosqueSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true,

    },
    map_id:{
        type: String,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    }
},{
    timestamps:true
})

const MosqueData = mongoose.model('MosqueData', mosqueSchema)


module.exports = MosqueData
