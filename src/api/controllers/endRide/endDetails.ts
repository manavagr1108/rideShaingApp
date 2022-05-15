import { Handler } from "express";
import { Vehicaldata, JourneyData } from "../../models/shareRideData"

// This route is used to end the rides from the frontend
// We get the vehicalNumber and change the status of the respective satus to false
// Also remove the data entry of the particular field from the JourneyData

const endDetails: Handler = async (req, res, next) => {
    const VehicalNumber = req.body.journey; 
    Vehicaldata.forEach(vehical => { // loop to find the requested entry in this data field
        if (vehical.VehicalNumber === VehicalNumber && vehical.Status === true) { // condition which is satisfied runs into the field
            JourneyData.forEach((journey, index) => { // loop in the JourneyData to remove the journey data
                if (journey.VehicalNumber === VehicalNumber) { // condition 
                    JourneyData.slice(index, 1); // removing the entry
                    vehical.Status = false; // changing the data
                }
            })
        }
    })
    return res.status(200).send({message:"Ride ended"});
    // return res.render("endRide", { Vehicaldata: Vehicaldata, JourneyData: JourneyData });
}

export { endDetails }