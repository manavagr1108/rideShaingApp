import { Handler } from "express";
import { Vehicaldata, JourneyData } from "../../models/shareRideData"
import { totalRides } from "../../models/totalRides"
import { Confirmdata } from "../../models/bookedRide"


// This route is used to find all the required routes that are available for the user to consume
// Working
// Get all the necessary data from the user and store them
// Run a loop for Journeydata which stores all the journey details and try to match the origin and destination
// if the destination is matched push it into to the ReqJounrey temporaray array of objects
// also push the RideOwner , RideReciever , VehicalNumber in to the Confrimdata array for future ref.

const getDetails: Handler = async (req, res, next) => {
    console.log(req.body);
    const { // storing data
        Name,
        Origin,
        Destination,
        Seats,
        PrefVehical
    } = req.body
    let ReqJourney: { Name: string, Origin: string, Destination: string, Seats: number, VehicalName: string, VehicalNumber: string }[] = []; // temp variable
    if (PrefVehical === "Most Vacant") { // if the request for Most Vacant vehical
        let mostVacant = 0; // temporary variable to keep track of the most vacant vehical
        JourneyData.forEach(journey => { // loop
            if (journey.Origin === Origin && journey.Destination === Destination && journey.Seats >= Seats && mostVacant < journey.Seats) { // condition
                if (ReqJourney.length > 0) ReqJourney.pop();
                ReqJourney.push(journey);
                const RideOwner = journey.Name;
                const RideReciever = Name;
                const VehicalNumber = journey.VehicalNumber;
                Confirmdata.push({ RideOwner, RideReciever, VehicalNumber })
                mostVacant = journey.Seats;
                return;
            }
        })
    } else { // else if the request is for a particular vehical
        JourneyData.forEach(journey => { // loop 
            if (journey.Origin === Origin && journey.Destination === Destination && journey.VehicalName === PrefVehical && journey.Seats >= Seats) { // condition
                ReqJourney.push(journey);
                const RideOwner = journey.Name;
                const RideReciever = Name;
                const VehicalNumber = journey.VehicalNumber;
                Confirmdata.push({ RideOwner, RideReciever, VehicalNumber })
            }
        })
    }

    // searching is done

    if (ReqJourney.length === 0) { // if no ride is found
        return res.status(400).send({message : "No User Found"});
        // return res.render("getRide", { message: "No User Found" });
    } else { // if ride is found we try to push a new user or update the exisiting user in total ride data base
        console.log(ReqJourney);
        let temp = 0;
        totalRides.forEach(user => {
            if (user.Name === Name) {
                user.Taken++;
                temp++;
                return;
            }
        })
        if (temp === 0) {
            const Taken = 0;
            const Offered = 0;
            totalRides.push({ Name, Taken, Offered });
        }
        return res.status(200).send({message : "Requested Search"});
        // return res.render("getRide", { message: ReqJourney })
    }

}

// Now for the confirmation of the ride form the user is done here
// He will send us the VehicalNumber from the frontend and using the Vehical Number we can detect the journey and other stuffs
const confirmRide: Handler = async (req, res, next) => {
    const index = req.body.VehicalNumber;
    console.log(index);
    let temp = 0;
    const tempConfirmData: { RideOwner: string, RideReciever: string, VehicalNumber: string }[] = [];
    Vehicaldata.forEach(user => { // loop to get RideOwner RideReciever data from the Confirmdata that was updated in the above route
        Confirmdata.forEach(conf => {
            if (conf.RideOwner === user.Name && conf.VehicalNumber === user.VehicalNumber && temp === 0 && !user.Status) {
                temp++;
                const RideOwner = conf.RideOwner;
                const RideReciever = conf.RideReciever;
                const VehicalNumber = conf.VehicalNumber;
                const Status = true;
                tempConfirmData.push({ RideOwner, RideReciever, VehicalNumber });
                user.Status = Status;
            }
        })
    })
    if (temp === 0) { // if we couldn't find the user we return no user found
        return res.status(400).send({message:"No User Found"});
        // return res.render("getRide", { message: "No User Found" })
    } else { // else we update teh totalRides data , i.e, the taken value is incremented or new entry in pushed
        temp =0;
        totalRides.forEach(user => {
            if (user.Name === tempConfirmData[0].RideReciever) {
                user.Taken++;
                temp++;
                return;
            }
        })
        if (temp === 0) {
            const Name = tempConfirmData[0].RideReciever;
            const Taken = 1;
            const Offered = 0;
            totalRides.push({ Name, Taken, Offered });
        }
    }
    return res.status(200).send({message:"Booked Ride"});
    // return res.render("getRide", { message: "Ride is confirmed" })
}
export { getDetails, confirmRide };