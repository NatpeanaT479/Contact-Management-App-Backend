const { constants } = require("../constants");
//Custom error handler. Returns a json response based on the error status code set in the controllers and validate token handler
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    this.statusCode = statusCode
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed", //Informs user type of error
                message: err.message,      //Details of the error
                stackTrace: err.stack   // Informs where the error is being instantiated
            })
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized User",
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case 500:
            res.json({
                title: "Internal Server Error",
                message: err.message,
                stackTrace: err.stack
            })
    }

}

module.exports = { errorHandler };