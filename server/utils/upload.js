const { ForbiddenError } = require("./CustomError")

function fileFilter (req, file, cb) {

    if(file.mimetype === "text/csv"){
        cb(null, true)
    }else{
        cb(new ForbiddenError('Upload forbidden'))
    }
  }
 module.exports = {fileFilter}