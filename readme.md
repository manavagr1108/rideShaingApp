# Ride-Sharing Application

Ride-Sharing Application is a NodeJs based application for sharing ride(Driver) or consume a shared
    ride (Passenger).

## Installation

Use the [node](https://nodejs.org/en/download/) package manager [npm](https://docs.npmjs.com/) to install all the dependencies using the below command.

```bash
$ npm install
```

## Usage
To run server and view it with frontent
```
$ npm run start:dev
```
 - NOTE : To view the frontend , we must uncomment the return render command and comment the send command from each file of controllers files
To run the required test cases
```
$ npm run test
```
## File Structure
<pre>
├── public
    ├── images
        ├── landingImg.jpg
    ├── js
    ├── stylesheets
        ├── landingpage1.css
├── src 
    ├──api
        ├── controller
            ├── endRide
                ├── endDetails.ts
            ├── getRide
                ├── getDetails.ts
            ├── shareRide
                ├── getDetails.ts
        ├── middlewares
            ├── Errors.ts
        ├── model
            ├── bookedRides.ts
            ├── shareRides.ts
            ├── totalRides.ts
        ├── routes
            ├── endRide.ts
            ├── getRide.ts
            ├── shareRide.ts
        ├── index.js
    ├──config
    ├── index.ts
├── public
   ├── CSS 
      ├── **/*.css
   ├── images 
   ├── js 
   ├── index.html 
├── tests 
    ├── app.spec.ts
├── views 
       ├── endRide.ejs
       ├── error_404.ejs
       ├── getRide.ejs
       ├── home.ejs
       ├── sharedRide.ejs
       ├── totalRides.ejs
├── node_modules 
├── package.json 
├── package-lock.json 
├── tsconfig.json
└── .gitignore
</pre>

## Working of project
 - Projects work based on the MVC(model-views-controllers) web architecute of the web.
 - Server side code is written in /src folder
 - We use Ejs to render the frontend.
 - We connect requested route controller to the server via routes file.
 - We use server memory to perform CRUD operations.
 - Server side logic is writted in controller section.
 - Main file is present in /src/index.ts. 

## Testing 
 - The project uses jest to complie the required test cases and the test cases can be modified based on requirements.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
