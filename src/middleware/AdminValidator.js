import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../model/userModel.js'


//initialize env
dotenv.config()

const AdminValidator = async (req, res, next) => {
    const bearerToken = req.header('Authorization');
    if(!bearerToken) {
        return res.status(401).json({status: "fail", message: "Unauthorized"})
    }
    try{
        const token = bearerToken.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id)
        req.body.user = user._id;
        req.body.access = user.access;
        next();
        
    } catch(error) {
        res.status(500).json({status: 'failed', message: "server error"})
    }
}

export default AdminValidator;