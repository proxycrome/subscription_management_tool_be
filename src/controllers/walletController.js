import {Wallet} from '../model/walletModel.js';


const walletController = {
    createWallet: async (req, res) => {
        const {userId, balance} = req.body;

        try {
            const newWallet = new Wallet({userId, balance});
            const wallet = await newWallet.save();
            if(!wallet){
                res.status(400).json({status: 'fail', message: 'something went wrong'});
            }
            return res.status(201).json({status: 'success', message: 'wallet funded successfully', data: wallet})
        } catch (error) {
            return res.status(500).json({status: 'fail', message: 'server error', error})
        }
    },

    getWallet: async (req, res) => {
        const {userId} = req.body;

        try {
            const wallet = await Wallet.find({userId}).lean().exec();
            return res.status(201).json({status: 'success', message: 'successful', data: wallet});
        } catch (error) {
            return res.status(500).json({status: 'fail', message: 'server error', error})
        }
    },

    editWallet: async (req, res) => {
        const {balance, walletPin} = req.body;
        const {walletId} = req.params;

        try{
            const wallet = await Wallet.findByIdAndUpdate(walletId, {balance, walletPin}, {new: true});
            return res.status(201).json({status: 'success', message: 'successful', data: wallet});
        }catch (error) {
            return res.status(500).json({status: 'fail', message: 'server error', error});
        }
    }
}

export default walletController;