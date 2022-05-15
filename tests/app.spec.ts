import request from "supertest";
import { Express } from 'express-serve-static-core';
import app from "../src/index"

let server: Express
// Initial registration of users
describe('APP should say "user registered"', () => {
  const data = [{
    Name: "Shashank",
    Gender: "M",
    Age: "29",
    VehicalName: "Baleno",
    VehicalNumber: "TS-05-62395",
  },
  {
    Name: "Rohan",
    Gender: "M",
    Age: "36",
    VehicalName: "Swift",
    VehicalNumber: "KA-01-12345",
  },
  {
    Name: "Nandini",
    Gender: "f",
    Age: "29",
  },
  {
    Name: "Shipra",
    Gender: "F",
    Age: "27",
    VehicalName: "Polo",
    VehicalNumber: "KA-05-41491",
  },
  {
    Name: "Shipra",
    Gender: "F",
    Age: "27",
    VehicalName: "Activa",
    VehicalNumber: "KA-12-12332",
  },
  {
    Name: "Rahul",
    Gender: "M",
    Age: "35",
    VehicalName: "XUV",
    VehicalNumber: "KA-05-1234",
  },];
  data.forEach( d=>{
    beforeAll(() => {
      server = app;
    });
    it('should return 200', (done) => {
      request(server)
        .post('/shareRide')
        .send(d)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          expect(res.body).toMatchObject({ 'message': `user registered` })
          done()
        })
    })
  })
})

// to add journey of the registed users

describe('APP should say "Journey added!"', () => {
  beforeAll(() => {
    server = app;
  });

  const data = [
    {
      Name : "Rohan",
      Origin : "Hyderabad",
      Destination : "Banglore",
      Seats : 1,
      VehicalName : "Swift",
      VehicalNumber : "KA-01-12345"
    },
    {
      Name : "Shipra",
      Origin : "Banglore",
      Destination : "Mysore",
      Seats : 1,
      VehicalName : "Activa",
      VehicalNumber : "KA-12-12332"
    },
    {
      Name : "Shipra",
      Origin : "Banglore",
      Destination : "Mysore",
      Seats : 2,
      VehicalName : "Polo",
      VehicalNumber : "KA-05-41491"
    },
    {
      Name : "Shashank",
      Origin : "Hyderabad",
      Destination : "Banglore",
      Seats : 2,
      VehicalName : "Baleno",
      VehicalNumber : "TS-05-62395"
    },
    {
      Name : "Rahul",
      Origin : "Hyderabad",
      Destination : "Banglore",
      Seats : 5,
      VehicalName : "XUV",
      VehicalNumber : "KA-05-1234"
    },
    { // this test case will fail as the given vehical number is already registed
      Name : "Rohan",
      Origin : "Bangalore",
      Destination : "Pune",
      Seats : 1,
      VehicalName : "Swift",
      VehicalNumber : "KA-01-12345"
    },
  ]

  data.forEach( d=>{
    beforeAll(() => {
      server = app;
    });
    it('should return 200', (done) => {
      request(server)
        .post('/shareRide/addJourney')
        .send(d)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          expect(res.body).toMatchObject({ 'message': `Journey added!` })
          done()
        })
    })
  })
});

// To search for the requried ride

describe('APP should say "Requested Search"', () => {
  beforeAll(() => {
    server = app;
  });

  const data = [
    {
      Name : "Nandini",
      Origin : "Banglore",
      Destination : "Mysore",
      Seats : 1,
      PrefVehical : "Most Vacant"
    },
    {
      Name : "Gaurav",
      Origin : "Banglore",
      Destination : "Mysore",
      Seats : 1,
      PrefVehical : "Activa",
    },
    { // This test case will fail as there is no ride from mumbai registed so far
      Name : "Shashank",
      Origin : "Mumbai",
      Destination : "Banglore",
      Seats : 1,
      PrefVehical : "Most Vacant",
    },
    {
      Name : "Rohan",
      Origin : "Hyderabad",
      Destination : "Banglore",
      Seats : 1,
      PrefVehical : "Baleno",
    },
    { // This test case will also fail there is no vehical for the required ride
      Name : "Shashank",
      Origin : "Hyderabad",
      Destination : "Banglore",
      Seats : 1,
      PrefVehical : "Polo",
    }
  ]

  data.forEach( d=>{
    beforeAll(() => {
      server = app;
    });
    it('should return 200', (done) => {
      request(server)
        .post('/getRide')
        .send(d)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          expect(res.body).toMatchObject({ 'message': `Requested Search` })
          done()
        })
    })
  })
});

// To confirm the booking from the resulted search

describe('APP should say "Booked Ride"', () => {
  beforeAll(() => {
    server = app;
  });

  const data = [
    {
      VehicalNumber : "KA-05-41491",
    },
    {
      VehicalNumber : "KA-12-12332",
    },
    {
      VehicalNumber : "TS-05-62395",
    },
    
  ]

  data.forEach( d=>{
    beforeAll(() => {
      server = app;
    });
    it('should return 200', (done) => {
      request(server)
        .post('/getRide/cofirmRide')
        .send(d)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          expect(res.body).toMatchObject({ 'message': `Booked Ride` })
          done()
        })
    })
  })
});

// To end the ride 

describe('APP should say "Ride ended"', () => {
  beforeAll(() => {
    server = app;
  });

  const data = [
    {
      VehicalNumber : "KA-01-12345",
    },
    {
      VehicalNumber : "KA-12-12332",
    },
    {
      VehicalNumber : "KA-05-41491",
    },
    {
      VehicalNumber : "TS-05-62395",
    },    
  ]

  data.forEach( d=>{
    beforeAll(() => {
      server = app;
    });
    it('should return 200', (done) => {
      request(server)
        .post('/endRide')
        .send(d)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          expect(res.body).toMatchObject({ 'message': `Ride ended` })
          done()
        })
    })
  })
});

// To view the total rides shared and recieved by each user

describe('APP should say "Data Matched"', () => {
  const data = [
    {
      Name: "Nandini",
      Taken: 1,
      Offered: 0
    },
    {
      Name: "Rohan",
      Taken: 1,
      Offered: 1
    },
    {
      Name: "Shashank",
      Taken: 0,
      Offered: 1
    },
    {
      Name: "Gaurav",
      Taken: 1,
      Offered: 0
    },
    {
      Name: "Shipra",
      Taken: 0,
      Offered: 2
    },
  ]
  beforeAll(() => {
    server = app;
  });

  it('should return 200', (done) => {
    request(server)
      .get('/totalRide')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(typeof res.body).toEqual(typeof data);
        done()
      })
  });
});
