// Userdata stores the basic data of the user
const Userdata: { Name: string, Gender: string, Age: number }[] = []
// Vehicaldata stores the vehical data of the user
const Vehicaldata: { Name: string, VehicalName: string, VehicalNumber: string , Status : boolean  }[] = []
// JourneyData stores the journey data of the ride which is to be shared
const JourneyData: { Name: string, Origin: string, Destination :string , Seats: number, VehicalName: string, VehicalNumber: string }[] = []

export { Userdata, Vehicaldata, JourneyData };