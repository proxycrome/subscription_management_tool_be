import { Product } from "../model/productModel.js"
import { Category } from "../model/categoryModel.js";
import { User } from "../model/userModel.js";
import { uploader } from "../config/cloudinaryConfig.js";
import { datauri } from "../config/multerConfig.js";



const userController = {
    editUser: async (req, res) => {
        const file = datauri(req);
        const result = await uploader.upload(file.content,
           {
                dpr: "auto", 
                responsive: true, 
                width: "auto", 
                crop: "scale"
           });
        const {firstName, lastName, email, country, phone} = req.body;
        const {userId} = req.params;

        try {
            const user =  await User.findByIdAndUpdate(userId, {firstName, lastName, email, country, phone, photo: result.secure_url}, {new: true});
            res.status(201).json({status: 'success', message: 'successful', data: user});
        } catch (error) {
            res.status(500).json({status: 'fail', message: 'server error', error}); 
        }
    },

    createProduct: async (req, res) => {
        const { productName, amount, productLogo, categoryId } = req.body

        if(!productName || !amount || !categoryId){
            res.status(400).json({status: 'fail', message: 'Please fill all fields'})
        }

        try {
            const newProduct = new Product({productName, amount, productLogo, categoryId});
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
            const products = await Product.find({}).populate({path: 'categoryId', model: 'category'}).exec()
            return res.status(201).json({status: 'success', message: 'successful', data: products})
        } catch (error) {
            return res.status(500).json({status: 'fail', message: 'server error', error})
        }
    },

    createCategory: async (req, res) => {
        const { categoryName, hasSubCategory, subCategory } = req.body

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
        const {categoryName, hasSubCategory, subCategory } = req.body
        const { categoryId, productId } = req.params;
        try {

            const category = await Category.findByIdAndUpdate(categoryId, {categoryName, hasSubCategory, subCategory, $push: {products: productId}}, {new: true})
            return res.status(201).json({status: 'success', message: 'successful', data: category})
        } catch (error) {
            return res.status(500).json({status: 'fail', message: 'server error', error}); 
        }

    }
}

export default userController;