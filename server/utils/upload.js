const { ForbiddenError } = require("./CustomError")

function fileFilter (req, file, cb) {
  if(!file){
    return
  }
  if(file.mimetype === "text/csv"){
      cb(null, true)
  }else{
      cb(new ForbiddenError('Upload forbidden'))
  }
}

const disputeFileFilter = (req, file, cb) => {
    if(!file){
      return
    }
  const originalName = file.originalname
    const fileMime = originalName.endsWith('.pdf') ? 'application/pdf' : originalName.endsWith('.png') ? 'image/png' : ''
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedMimeTypes.includes(fileMime)) {
      req.fileMime = fileMime
      cb(null, true); // Accept the file
    } else {
      cb(new ForbiddenError('Invalid file type. Only PNG, and PDF files are allowed.')
      , false); // Reject the file
    }
};

 module.exports = {fileFilter,disputeFileFilter}