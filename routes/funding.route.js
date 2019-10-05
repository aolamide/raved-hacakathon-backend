import express from "express";
import { getFundings, createFunding, fundingsByUser, fundingById,isFundingOwner, deleteFunding, updateFunding } from "../controllers/funding.controller";
import { userById } from "../controllers/user.controller";
import { requireSignIn } from "../controllers/auth";
import { createFundingValidator } from '../validator';
const router = express.Router();

router.get('/fundings', getFundings );
router.post(
    '/funding/new/:userId', 
    requireSignIn,  
    createFunding,
    createFundingValidator
);
router.get('/fundings/by/:userId', requireSignIn, fundingsByUser);
router.delete('/funding/:fundingId', requireSignIn, isFundingOwner, deleteFunding)
router.put('/funding/:fundingId', requireSignIn, isFundingOwner, updateFunding)

//any route containing userId, our app would first exec userById()
router.param("userId", userById );

//any route containing fundingId, our app would first exec userById()
router.param("fundingId", fundingById );

export default router;