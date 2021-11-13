import { Subscription } from "../model/subscriptionModel.js";


const subscriptionController = {
    createSubscription: async (req, res) => {
        const {product, billingCycle, autoRenew, subscriptionStatus, userId} = req.body;

        try {
            const newSub = new Subscription({userId, product, billingCycle, autoRenew, subscriptionStatus});
            const sub = await newSub.save();
            if(!sub){
                res.status(400).json({status: 'fail', message: 'something went wrong'});
            }
            return res.status(201).json({status: 'success', message: 'successful', data: sub})
        } catch (error) {
            return res.status(500).json({status: 'fail', message: 'server error', error})
        }
    },

    getSubscription: async (req, res) => {
        const {userId} = req.body;
        try {
            const sub = await Subscription.find({userId}).populate({path: 'category', model: 'category'}).exec();
            return res.status(201).json({status: 'success', message: 'successful', data: sub});
        } catch (error) {
            return res.status(500).json({status: 'fail', message: 'server error', error})
        }
    },

    editSubscription: async (req, res) => {
        const {category, billingCycle, autoRenew, subscriptionStatus} = req.body;
        const {subId} = req.params;
        try{
            const sub = await Subscription.findByIdAndUpdate(subId, {category, billingCycle, autoRenew, subscriptionStatus}, {new: true});
            return res.status(201).json({status: 'success', message: 'successful', data: sub});
        }catch (error) {
            return res.status(500).json({status: 'fail', message: 'server error', error});
        }
    },
    deleteSubscription: async(req, res) => {
        const { subId } = req.params;
            
        try{
            await Subscription.findByIdAndDelete(subId); 
            return res.status(201).json({status: 'success', message: 'Subscription deleted successful'});
        }catch(err){
            return res.status(500).json({status: 'fail', message: 'server error', err})
        }
    }
}

export default subscriptionController;