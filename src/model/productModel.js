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
    productLogo: {
        type: String
    }, 
    categoryId: {
        type: SchemaTypes.ObjectId,
        ref: 'category'
    }
})

export const Product = model('product', productSchema);