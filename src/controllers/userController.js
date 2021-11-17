import { Product } from "../model/productModel.js"
import { Category } from "../model/categoryModel.js";
import { User } from "../model/userModel.js";
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import { datauri } from "../config/multerConfig.js";
dotenv.config();

const Cloudinary = cloudinary.v2;




const userController = {
    editUser: async (req, res) => {
        const file = datauri(req);
        Cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_IMAGE_API_KEY,
            api_secret: process.env.CLOUD_IMAGE_API_SECRET
        });
        const result = await Cloudinary.uploader.upload(file.content,
           {
                dpr: "auto", 
                responsive: true, 
                width: "auto", 
                crop: "scale"
           }
        );
        const {firstName, lastName, email, country, phone} = req.body;
        const {userId} = req.params

        try {
            const user =  await User.findByIdAndUpdate(userId, {firstName, lastName, email, country, phone, photo: result.secure_url}, {new: true});
            return res.status(201).json({status: 'success', message: 'successful', data: user});
        } catch (error) {
            return res.status(500).json({status: 'fail', message: 'server error', error}); 
        }
    },

    createProduct: async (req, res) => {
        const { productName, amount, productLogo, access } = req.body

        if(!access || access !== 'admin') {
            return res.status(401).json({status: 'fail', message: 'unauthorized'});
        }

        try {
            const newProduct = new Product({productName, amount, productLogo});
            const product = await newProduct.save();

            if(!product){
                res.status(400).json({status: 'fail', message: 'something went wrong'})
            }
            return res.status(200).json({status: 'success', message: 'successful', data: product})

        } catch (error) {
            return res.status(500).json({status: 'fail', message: 'server error', error})
        }
    },

    getProducts: async (req, res) => {
        try {
            const products = await Product.find({}).exec()
            return res.status(201).json({status: 'success', message: 'successful', data: products})
        } catch (error) {
            return res.status(500).json({status: 'fail', message: 'server error', error})
        }
    },

    createCategory: async (req, res) => {
        const { categoryName, hasSubCategory, subCategory, access } = req.body;

        if(!access || access !== 'admin') {
            return res.status(401).json({status: 'fail', message: 'unauthorized'});
        }

        try {
            const newCategory = new Category({categoryName, hasSubCategory, subCategory});
            const category = await newCategory.save();

            if(!category){
                res.status(400).json({status: 'fail', message: 'something went wrong'})
            }
            return res.status(200).json({status: 'success', message: 'successful', data: category})

        } catch (error) {
            return res.status(500).json({status: 'fail', message: 'server error', error})
        }
    },

    getCategorys: async (req, res) => {
        try {
            const categories = await Category.find({}).populate({path: 'products', model: 'product'}).exec();
            return res.status(201).json({status: 'success', message: 'successful', data: categories})
        } catch (error) {
            return res.status(500).json({status: 'fail', message: 'server error', error})
        }
    },

    editCategory: async (req, res) => {
        const {categoryName, hasSubCategory, subCategory, access } = req.body
        const { categoryId, productId } = req.params;

        if(!access || access !== 'admin') {
            return res.status(401).json({status: 'fail', message: 'unauthorized'});
        }

        try {

            const category = await Category.findByIdAndUpdate(categoryId, {categoryName, hasSubCategory, subCategory, $push: {products: productId}}, {new: true})
            return res.status(201).json({status: 'success', message: 'successful', data: category})
        } catch (error) {
            return res.status(500).json({status: 'fail', message: 'server error', error}); 
        }

    }
}

export default userController;