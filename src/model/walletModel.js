import mongoose from 'mongoose';


const {Schema, model, SchemaTypes} = mongoose;

const walletSchema = new Schema({
    userId: {
        type: SchemaTypes.ObjectId,
        ref: "user"
    },
    balance: {
        type: Number,
        required: true
    },
    walletPin: {
        type: String,
        default: "1234"
    }
}, {timestamps: true})

export const Wallet = model('wallet', walletSchema);