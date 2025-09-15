import express from 'express';
import {authenticate}from '../middlewares/auth.js';
import Data from '../models/dataSchema.js';


const router = express.Router();

router.get("/devices", authenticate, async(req, res) => {
    const latest = await Data.aggregate([
        { $sort: { serverTimestamp: -1 } },
        { $group: { _id: "$uuid", doc: { $first: "$$ROOT" } } },    
    ]);
    res.json(latest.map(e => e.doc));
});

router.get("/data/:id/data", authenticate, async(req, res) => {
    const data = await Data.find({ uuid: req.params.id}).sort({ serverTimestamp: -1 }).limit(100);
    res.json(data);
});

export default router;
