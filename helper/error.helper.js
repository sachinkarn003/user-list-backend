exports.getValidationErrorMessage = ([req, res], data = null, customObj = null)=> {
    let response = {
        "status": "fail",
        "response": data ? data : req.t('invalid_parameters')
    }
    if (customObj) {
        response = { ...response, ...customObj };
    }
    return res.status(422).json(response);
}