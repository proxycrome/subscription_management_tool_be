import { Blog } from "../model/blogModel.js";
import { uploader } from "../config/cloudinaryConfig.js";
import { datauri } from "../config/multerConfig.js";


const BlogController = {
    createBlog: async (req, res) => {
        const {header, body, authorName, date, access} = req.body;
        
        if(!access || access !== 'admin') {
            return res.status(401).json({status: 'fail', message: 'unauthorized'});
        }
        
        const file = datauri(req);
        const result = await uploader.upload(file.content,
           {
                dpr: "auto", 
                responsive: true, 
                width: "auto", 
                crop: "scale"
           });

        try {
            const newBlog = new Blog ({header, body, authorName, date, blog_image: result.secure_url});
            const blog = await newBlog.save();

            if(!blog){
                res.status(400).json({status: 'fail', message: 'something went wrong'});
            }
            return res.status(201).json({status: 'success', message: 'successful', data: blog});
        } catch (error) {
            return res.status(500).json({status: 'fail', message: 'server error', error})
        }
    },

    getBlogs: async (req, res) => {
        try {
            const blogs = await Blog.find({}).lean().exec()
            return res.status(201).json({status: 'success', message: 'successful', data: blogs});
        } catch (error) {
            return res.status(500).json({status: 'fail', message: 'server error', error})
        }
    },

    getBlogById: async (req, res) => {
        const {blogId} = req.params;
        try {
            const blog = await Blog.findById(blogId).lean().exec()
            return res.status(201).json({status: 'success', message: 'successful', data: blog});
        } catch (error) {
            return res.status(500).json({status: 'fail', message: 'server error', error})
        }
    },
}

export default BlogController;