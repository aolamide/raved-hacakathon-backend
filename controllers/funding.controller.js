import Funding from '../models/funding.model';
import _ from 'lodash';

const fundingById = (req, res, next, id) => {
    Funding.findById(id)
    .populate('postedBy', '_id name')
    .exec((err, funding) => {
        if(err|| !funding) {
            return res.status(400).json({
                error : err
            })
        }
        req.funding = funding;
        next()
    })
}
const getFundings = (req, res) => {
    Funding.find()
    .populate('postedBy', "_id name")
    .select('_id title body description amount donatedAmount image')
    .then(fundings => {
        res.json({ fundings });
    })
    .catch(err => console.log(err))
};

const createFunding = (req, res) => {
    let funding = new Funding(req.body);
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        funding.postedBy  = req.profile;
        funding.save((err, result) => {
            if(err) {
                return res.status(400).json({
                    error : err
                })
            }
            res.json(result)
        })
};

const fundingsByUser = (req, res) => {
    Funding.find({postedBy : req.profile._id})
    .populate("postedBy", "_id name")
    .sort("_created")
    .exec((err, fundings) => {
        if(err) return res.status(400).json({error : err})
        res.json(fundings)
    })
}

const isFundingOwner = (req, res, next) => {
    let isFundingOwner = req.funding && req.auth && req.funding.postedBy._id == req.auth._id;
    if(!isFundingOwner) {
        return res.status(403).json({
            error : 'User is not authorized'
        })
    }
    next();
}

const updateFunding = (req, res, next) => {
    let funding = req.funding;
    funding = _.extend(funding, req.body);
    funding.updted = Date.now();
    funding.save(err => {
        if(err) {
            return res.status(400).json({
                error : err
            })
        }
        res.json(funding);
    })
}
const deleteFunding = (req, res) => {
    let funding = req.funding;
    funding.remove((err, funding) => {
        if(err) {
            return res.status(400).json({error : err})
        }
        res.json({
            message : 'Funding deleted successfully'
        })
    })
}


export { getFundings, createFunding, fundingsByUser, fundingById, isFundingOwner, deleteFunding, updateFunding };