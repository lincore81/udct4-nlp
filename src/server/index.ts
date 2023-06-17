import path from 'path';
import express from 'express'
import mockAPIResponse from './mockAPI'

const app = express()

app.use(express.static('dist'))
console.log(__dirname)
app.get('/', function (_, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (_, res) {
    res.send(mockAPIResponse)
})
