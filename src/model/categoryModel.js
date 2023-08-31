import mongoose from 'mongoose';


const {Schema, model, SchemaTypes} = mongoose;

const categorySchema = new Schema({
    categoryName: {
		type: String,
		required: true
    },
    hasSubCategory: {
        type: Boolean,
        required: true
    },
    subCategory: {
        type: String
    },
    products: [{
        type: SchemaTypes.ObjectId,
        ref: 'product'
    }],

}, {timestamps: true})

export const Category = model('category', categorySchema)