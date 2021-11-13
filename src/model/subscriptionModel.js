import mongoose from 'mongoose';


const {Schema, model, SchemaTypes} = mongoose;

const subscriptionSchema = new Schema({
    userId: {
        type: SchemaTypes.ObjectId,
        ref: 'user'
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
}, {timestamps: true})

export const Subscription = model('subscription', subscriptionSchema);