const express = require('express')
const multer = require('multer')
const { getIO } = require('../socketManager/socketManager')
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

}) // This will save files to the 'uploads' directory
const router = express.Router()

/* route to acept a post file */
router.post('/', upload.single('file'), function (req, res, next) {
  const io = getIO()
  res.setHeader('Content-Type', 'text/plain')
  res.setHeader('Transfer-Encoding', 'chunked')
  io.emit('file', req.file)
  console.log(req.file)
  // io.emit('done', 'all done');
})

module.exports = router
