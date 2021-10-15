import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../model/userModel.js'


//initialize env
dotenv.config()

const AuthController = {

    signUp: async(req, res) => {
        try{
            const { firstName, lastName, email, password, country } = req.body;

            if(!firstName || !lastName || !email || !password || !country) {
                return res.status(400).json({status: 'fail', message: "Please fill all fields"})
            }

            // Find if email alredy exists

            const emailExist = await User.findOne({email});

            if(emailExist) {
                return res.status(400).json({status: 'fail', message: "User already exist"})
            }


            //password hash 
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            if(hashedPassword){
                const newUser = new User({firstName, lastName, email, password: hashedPassword, country})
                const savedUser = await newUser.save();
                
                if(savedUser) {
                    jwt.sign({id:savedUser._id}, process.env.JWT_SECRET, {expiresIn: 3600}, (err, token) => {
                        if(err) {
                            throw err;
                        }
                    
                        res.status(200).json({status: "success", data: {
                            token: 'Bearer ' + token,
                            id: savedUser._id,
                            firstName: savedUser.firstName,
                            lastName: savedUser.lastName,
                            email: savedUser.email,
                            country: savedUser.country
                        }, message: "successful"});
                    }); 
                }
            }
        }catch(error){
            res.status(500).json({status: "fail", message: "server err", error});
        }
        
    },

    login:  async(req, res) => {
        try{
            const {email, password} = req.body;

            if(!email || !password) {
                return res.status(400).json({status: 'fail', message: "Provide email and password"});
            }

            const isUser = await User.findOne({email});

            if(!isUser) {
                res.status(404).json({status: 'fail', message: "record not found"})
            }

            // validate user password

            const match = await bcrypt.compare(password, isUser.password);

            if(!match) {
                return res.status(400).json({status: 'fail', message: "email or password is incorrect"});
            }


            jwt.sign({id: isUser._id}, process.env.SECRET,{expiresIn: 86400}, (err, token) => {
                    
                if(err) {
                    throw err;
                }
        
                return res.status(200).json({status: "success", data: {
                    token: "Bearer " + token,
                    id: isUser._id,
                    firstName: isUser.firstName,
                    lastName: isUser.lastName,
                    email: isUser.email,
                    country: isUser.country
                }, message: "successful"});
            });
        }catch(error){
            res.status(500).json({status: "fail", message: "server err", error});
        }
    }   
        
};

export default AuthController; 