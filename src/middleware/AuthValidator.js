import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../model/userModel.js'


dotenv.config()

const AuthValidator = (req, res, next) => {
    try{
        const bearerToken = req.headers.authorization;
        if(!bearerToken){
            return res.status(401).json({ status: 'failed', message: 'unauthorized' });
        }
        
        let token = bearerToken.split(' ')[1];
        
        jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
            if(err){
                return res
                .status(500)
                .json({ status: false, message: 'failed to authenicate token.'});
            }
            const user = await User.findById(decode.id)
            req.body.userId = user._id;
            next();
                
        });
    }catch(err){
        console.log(err);
        return res.status(401).json({
            status: 'failed',
            message: 'unauthorized'
        });
    }
}

export default AuthValidator;