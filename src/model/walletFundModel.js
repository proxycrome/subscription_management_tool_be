import mongoose from 'mongoose';


const {Schema, model, SchemaTypes} = mongoose;

const walletFundSchema = new Schema({
    userId: {
        type: SchemaTypes.ObjectId,
        ref: "user"
    },
    amount: {
        type: Number,
    },
    paymentGateway: {
        type: String,
    },
    status: {
        type: String,
    },
    date: {
        type: String
    },
    time: {
        type: String
    }
}, {timestamps: true})

export const WalletFund = model('walletFund', walletFundSchema);