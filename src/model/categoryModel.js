import mongoose from 'mongoose';


const {Schema, model, SchemaTypes} = mongoose;

const categorySchema = new Schema({
    categoryName: {
		type: String,
		required: true
    },
    hasSubCategory: {
        type: Boolean
    },
    subCategory: {
        type: String
    },
    product: {
        type: SchemaTypes.ObjectId,
        ref: 'product'
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }

}, {timestamps: true})

export const Category = model('category', categorySchema)