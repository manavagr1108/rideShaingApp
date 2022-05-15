// ! Error Handler for the the application

import { ErrorRequestHandler } from "express";
/**
 * * Error Handler which sends appropriate message
 */
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    // If status 404 send a 404 error
    if (err.status === 404) res.render("error_404");
    // Else send appropriate message with the status code
    else {
        console.log(err.message); // For debugging

        res.status(err.status).send(
            `Something went wrong Try again later. \n Message : 
        ${JSON.stringify(err.message)}`,
        );
    }
};

export default errorHandler;