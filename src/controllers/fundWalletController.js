import {Wallet} from '../model/walletModel.js';
import {WalletFund} from '../model/walletFundModel.js'


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
            const wallet = await Wallet.findOneAndUpdate({userId}, {balance, walletPin: newWalletPin}, {new: true});
            return res.status(201).json({status: 'success', message: 'successful', data: {
                id: wallet._id,
                userId: wallet.userId,
                balance: wallet.balance
            }});
        }catch (error) {
            return res.status(500).json({status: 'fail', message: 'server error', error});
        }
    },

    createWalletFund: async (req, res) => {
        const {userId, amount, paymentGateway, status, date, time} = req.body;

        try {
            const newWalletFund = new WalletFund({userId, amount, paymentGateway, status, date, time})
            const walletFund = await newWalletFund.save()
            if(!walletFund){
                return res.status(400).json({status: 'fail', message: 'something went wrong'});
            }
            return res.status(201).json({status: 'success', message: 'successful', data: walletFund})
        } catch (error) {
            return res.status(500).json({status: 'fail', message: 'server error', error})
        }
    },

    getWalletFund: async (req, res) => {
        const{userId} = req.body;

        try {
            const walletFunds = await WalletFund.find({userId}).lean().exec();
            return res.status(201).json({status: 'success', message: 'successful', data: walletFunds});
        } catch (error) {
            return res.status(500).json({status: 'fail', message: 'server error', error});
        }
    },

    deleteWalletFund: async (req, res) => {
        const {walletId} = req.params;
        
        try{
            await WalletFund.findByIdAndDelete(walletId); 
            return res.status(201).json({status: 'success', message: 'Subscription deleted successful'});
        }catch(error){
            return res.status(500).json({status: 'fail', message: 'server error', error});
        }
    }
}

export default fundWalletController;