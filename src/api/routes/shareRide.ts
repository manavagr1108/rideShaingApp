import {Router} from "express";
import { getDetails, addJourney } from "../controllers/shareRide/getDetails";

const router = Router();

const test = [
    {
        Name: "Shashank",
        Gender : "M",
        Age : "29",
        VehicalName: "Baleno",
        VehicalNumber: "TS-05-62395",
    },
    {
        Name: "Rohan",
        Gender : "M",
        Age : "36",
        VehicalName: "Swift",
        VehicalNumber: "KA-01-12345",
    },
    {
        Name: "Shipra",
        Gender : "F",
        Age : "27",
        VehicalName: "Polo",
        VehicalNumber: "KA-05-41491",
    },
    {
        Name: "Shipra",
        Gender : "F",
        Age : "27",
        VehicalName: "Activa",
        VehicalNumber: "KA-12-12332",
    },
    {
        Name: "Rahul",
        Gender : "M",
        Age : "35",
        VehicalName: "XUV",
        VehicalNumber: "KA-05-1234",
    },
]

router.get('/', (req,res) => {  // get route to display endRide.ejs file
    // return res.render("shareRide.ejs",{ name: "null" ,addDestiny : false , message : null});
    return res.send(test);
})
router.get('/addJourney', (req,res) => {  // get route to display endRide.ejs file
    return res.render("shareRide.ejs",{ name: "null" ,addDestiny : true , message : null});
})

router.post('/',getDetails); //post route sends the requested route to the required controller
router.post('/addJourney',addJourney); //post route sends the requested route to the required controller

export default router;
