const express = require('express')
const app = express()

const mongoose = require('mongoose')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const postRainCheck = (rainCheck) => {
  // TODO: search for rain check
  // if it exists, notify both parties
  // if not, add it
}

app.post('/', (req, res) => {
  let rainCheck = {
    firstParty: {
      phoneNumber: req.body.firstPartyPhoneNumber,
      url: req.headers.host
    },
    secondParty: {
      phoneNumbers: req.body.secondPartyPhoneNumbers
    }
  }

  console.log(rainCheck)

  // TODO: check reports

  const response = postRainCheck(rainCheck);

  res.send(response)
})

app.post('/ignore-reports', (req, res) => {
  let rainCheck = {
    firstParty: {
      phoneNumber: req.body.firstPartyPhoneNumber,
      url: req.headers.host
    },
    secondParty: {
      phoneNumber: req.body.secondPartyPhoneNumbers
    }
  }

  const response = postRainCheck(rainCheck)

  res.send(response)
})

app.delete('/', (req, res) => {
  let rainCheck = {
    firstParty: {
      phoneNumber: req.body.firstPartyPhoneNumber,
      url: req.headers.host
    },
    secondParty: {
      phoneNumber: req.body.secondPartyPhoneNumbers
    }
  }

  // TODO: find and delete rain check from db

  res.send('DELETE rain-check')
})

app.post('/report', (req, res) => {
  let report = {
    phoneNumber: req.body.phoneNumber,
    reason: req.body.reason
  }

  // TODO: add report to db

  res.send('POST report')
})

app.post('/confirm', (req, res) => {
  let user = { phoneNumber: req.body.phoneNumber }
  let activeRainChecks = req.body.activeRainChecks

  // TODO: find all rain checks in db from user that are not listed
  // in activeRainChecks and delete them

  res.send('POST confirm')
})

async function start() {
  try {
    console.log("Starting server...")
    
    const mongoAcount = {
      username: "samsly7",
      password: "Littleman7&"
    }
    const uri = `mongodb+srv://${mongoAcount.username}:${mongoAcount.password}@raincheck.c9wm7jy.mongodb.net/?retryWrites=true&w=majority`
    await mongoose.connect(uri)
    console.log("Mongoose connected to DB")

    const port = 3000
    await app.listen(port)
    console.log(`Listening on port ${port}...`)
  } catch (error) {
    console.error(error)
  }
}
start()
