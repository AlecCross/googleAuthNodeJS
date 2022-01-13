const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()

//Google Auth
const { OAuth2Client } = require('google-auth-library')
const CLIENT_ID = "700251402104-p1eeqgvc2u9i7s5d7b7fa9tib756ide0.apps.googleusercontent.com"
const client = new OAuth2Client(CLIENT_ID)

const PORT = process.env.PORT || 5000

//Middleware
app.set('view engine', 'ejs')
app.use(express.json())
app.use(cookieParser())


app.get('/', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    let token = req.body.token
    console.log(token)

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
        console.log(payload)
    }
    verify().catch(console.error);
})

app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT)
})
