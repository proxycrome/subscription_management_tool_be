import mongoose from 'mongoose';


const {Schema, model, SchemaTypes} = mongoose;

const subscriptionSchema = new Schema({
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'user'
    },
    product: {
        type: SchemaTypes.ObjectId,
        ref: 'product'
    },
    category: {
        type: SchemaTypes.ObjectId,
        ref: 'category'
    },
    billingCycle: {
        type: String,
        required: true
    },
    autoRenew: {
        type: String,
        required: true
    },
    // autoRenew: {
    //     type: Boolean,
    //     required: true
    // },
    subscriptionStatus: {
        type: String
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
})