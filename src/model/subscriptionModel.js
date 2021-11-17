import mongoose from 'mongoose';


const {Schema, model, SchemaTypes} = mongoose;

const subscriptionSchema = new Schema({
    userId: {
        type: SchemaTypes.ObjectId,
        ref: 'user'
    },
    category: {
        type: String,
    },
    subCategory: {
        type: String,
    },
    product: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    billingCycle: {
        type: String,
        required: true
    },
    autoRenew: {
        type: String,
        required: true
    },
    subscriptionStatus: {
        type: String, 
        default: "inactive"
    },
    dateSubscribed: {
        type: String
    },
    dateExpired: {
        type: String
    }
}, {timestamps: true})

export const Subscription = model('subscription', subscriptionSchema);