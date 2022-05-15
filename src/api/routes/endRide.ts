import {Router} from "express";
import { endDetails } from "../controllers/endRide/endDetails";
import { Vehicaldata , JourneyData } from "../models/shareRideData";


const router = Router();

router.get('/', (req,res) => { // get route to display endRide.ejs file
    return res.render("endRide.ejs" , { Vehicaldata: Vehicaldata, JourneyData: JourneyData });
})

router.post('/', endDetails); // post route sends the requested route to the required controller

export default router;
