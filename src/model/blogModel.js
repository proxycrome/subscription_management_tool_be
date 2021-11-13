import mongoose from 'mongoose';


const {Schema, model} = mongoose;

const blogSchema = new Schema ({
    header:{
        type: String
    },
    body: {
        type: String
    },
    blogImage: {
        type: String
    },
    authorName: {
        type: String
    },
    date: {
        type: String
    }
}, {timestamps: true});

export const Blog = model('blog', blogSchema);