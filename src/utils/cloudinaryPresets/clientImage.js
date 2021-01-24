const Busboy = require('busboy');
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

restaurantLogo = (req, res, next) => {
  let uploadingFile = false
  let uploadingCount = 0

  function done() {
    if (uploadingFile) return;
    if(uploadingCount > 0) return;

    next()
  }
  
  const busboy = new Busboy({ headers: req.headers })

  req.body = {}
  
  busboy.on('field', (key, val) => {
    req.body[key] = val
  })

  busboy.on('file', (key, file) => {
    uploadingFile = true
    uploadingCount++

    const stream = cloudinary.uploader.upload_stream(
      { upload_preset: 'Client_image' },
      (err, res) => {
        if (err) throw new Error('Something went wrong! try again')
        req.body[key] = res
        uploadingFile = false
        uploadingCount--
        done()
      }
    )
    
    file.on('data', data => {
      stream.write(data)
    })

    file.on('end', () => {
      stream.end()
    })
  })
  
  busboy.on('finish', () => {
    done()
  })
  
  req.pipe(busboy)
}

module.exports = restaurantLogo
