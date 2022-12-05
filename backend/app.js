const fsExtra = require('fs-extra')
fsExtra.emptyDirSync('../annotate-image/src/components/images/')

const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../annotate-image/src/components/images/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })

app.use(cors())

app.post('/image', upload.array('file'), function (req, res) {
    res.json({})
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})