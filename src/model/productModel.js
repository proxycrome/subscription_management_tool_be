import mongoose from 'mongoose';


const {Schema, model, SchemaTypes} = mongoose;

const productSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    product_logo: {
        type: String
    },  
    category: {
        type: SchemaTypes.ObjectId,
        ref: 'category'
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
})

export const Product = model('product', productSchema);