import {Router} from "express";
import { getDetails , confirmRide} from "../controllers/getRide/getDetails";

const router = Router();
const test =

router.get('/', (req,res) => {  // get route to display endRide.ejs file
    return res.render("getRide.ejs" , {message : null});
})

router.post('/', getDetails); //post route sends the requested route to the required controller
router.post('/cofirmRide', confirmRide); //post route sends the requested route to the required controller

export default router;
