import { Handler } from "express";
import { Userdata, Vehicaldata, JourneyData } from "../../models/shareRideData"
import { totalRides } from "../../models/totalRides"

// this route is used to add users to the data base , Userdata and vehicaldata in filled in this route
// working :
// we first check if the same vehical already exists or not
//  if it present send "This User is already Registered!"
// else push data and ask user to add journey

const getDetails: Handler = async (req, res, next) => { 
    console.log(req.body);
    const {
        Name,
        Gender,
        Age,
        VehicalName,
        VehicalNumber
    } = req.body
    let temp = 0;
    Vehicaldata.forEach(vehical => { // checking if the Vehical Number is registed or not
        if (vehical.VehicalNumber == VehicalNumber) {
            temp++;
            return;
        }
    })
    if (temp != 0) { // if vehical already exists then return "This User is already Registered!"
        
        return res.status(400).send({message : "user is already registered"})
        // res.render("shareRide", { name: Name, addDestiny: false, message: "This User is already Registered!" })
    } else { // else we push the data and ask user to enter journey data
        Userdata.push({ Name, Gender, Age });
        const Status : boolean = false;
        Vehicaldata.push({ Name, VehicalName, VehicalNumber , Status });
        Userdata.map(user => {
            console.log(user);
        })
        Vehicaldata.map(user => {
            console.log(user);
        })
        return res.status(200).send({message : "user registered"})
        // return res.render("shareRide", { name: Name, addDestiny: true, message: null })
    }
}

// This route is used to add journey data into the database
// working:
// get the journey data and check if the vehical is already registed or not
// if already registed return "This Vehical is already Registered!"
// else confirm the ride

const addJourney: Handler = async (req, res, next) => {
    const {
        Name,
        Origin,
        Destination,
        Seats,
        VehicalName,
        VehicalNumber
    } = req.body;
    let temp = 0;
    JourneyData.forEach(vehical => { // checking vehical number is already registed or not
        if (vehical.VehicalNumber == VehicalNumber) {
            temp++;
            return;
        }
    })
    if (temp != 0) { // return vehical is already registered
        return res.status(400).send({message : "Vehical Already Registed!"})
        // res.render("shareRide", { name: Name, addDestiny: true, message: "This vehical is already Registered! please enter another vehical number" })
        console.log(JourneyData);
    } else { // else comfirm the ride and update the data base
        JourneyData.push({ Name, Origin, Destination, Seats, VehicalName, VehicalNumber });
        console.log(JourneyData);
        temp = 0;
        totalRides.forEach(user => {
            if (user.Name === Name) {
                user.Offered++;
                temp++;
                return;
            }
        })
        if (temp === 0) {
            const Taken = 0;
            const Offered = 1;
            totalRides.push({ Name, Taken, Offered });
        }
        return res.status(200).send({message : "Journey added!"})
        // return res.render("shareRide", { name: Name, addDestiny: true, message: "This vehical is Successfully Registered!" })
    }
}

export { getDetails, addJourney };