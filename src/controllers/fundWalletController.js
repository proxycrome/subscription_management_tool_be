import {Wallet} from '../model/walletModel.js';


const fundWalletController = {
    createWallet: async (req, res) => {
        const {userId, balance} = req.body;

        try {
            const newWallet = new Wallet({userId, balance});
            const wallet = await newWallet.save();
            if(!wallet){
                return res.status(400).json({status: 'fail', message: 'something went wrong'});
            }
            return res.status(201).json({status: 'success', message: 'wallet funded successfully', data: {
                id: wallet._id,
                userId: wallet.userId,
                balance: wallet.balance
            }})
        } catch (error) {
            return res.status(500).json({status: 'fail', message: 'server error', error})
        }
    },

    getWallet: async (req, res) => {
        const {userId} = req.body;

        try {
            const wallet = await Wallet.findOne({userId}).lean().exec()
            return res.status(201).json({status: 'success', message: 'successful', data: {
                id: wallet._id,
                userId: wallet.userId,
                balance: wallet.balance
            }});
        } catch (error) {
            return res.status(500).json({status: 'fail', message: 'server error', error})
        }
    },

    editWallet: async (req, res) => {
        const {userId, balance, walletPin, newWalletPin} = req.body;

        try{
            // if(walletPin !== "1234"){
            //     return res.status(400).json({status: "fail", message: "wallet pin is incorrect"})
            // }
            const wallet = await Wallet.findOneAndUpdate(userId, {balance, walletPin: newWalletPin}, {new: true});
            return res.status(201).json({status: 'success', message: 'successful', data: {
                id: wallet._id,
                userId: wallet.userId,
                balance: wallet.balance
            }});
        }catch (error) {
            return res.status(500).json({status: 'fail', message: 'server error', error});
        }
    }
}

export default fundWalletController;