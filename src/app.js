const express = require('express');
const path = require('path')
const hbs = require('hbs')
const app = express();
const geoCode = require('./util/geoCode');
const forecast = require('./util/forecast');
// console.log(__dirname);
const name = "Hamza Shaikh"
//Define path for express config
const publicDirectory = path.join(__dirname, "../public");
const partialsDirectory = path.join(__dirname, "../templates/partials")
const viewsDirectory = path.join(__dirname, "../templates/views")
//setup static directory to serve
app.use(express.static(publicDirectory))
//Setup handllebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsDirectory)
hbs.registerPartials(partialsDirectory)
//setup routing
app.get("", (req, res) => {
    res.render('index', {
        title: "Weather APP",
        name
    });
})
app.get("/about", (req, res) => {
    res.render('about', {
        title: "Weather APP",
        name
    });
})
app.get("/help", (req, res,) => {
    res.render('help', {
        title: "Weather APP ",
        name
    });
})
app.get('/help/*', (req, res) => {
    res.render('404error', {
        name,
        errMsg: "help not found"
    })
})
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide an Address"
        })
    }
    geoCode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(longitude, latitude, (error, { temp, pressure, city, foreCastd, country }) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send([{
                "Address": req.query.address,
                "city": city,
                "Temperature": temp,
                "pressure": pressure,
                "country": country,

                "foreCastd": foreCastd

            }
            ])

        })
    })
        ;
})
// app.get('/products', (req, res) => {
//     if (!req.query.games && !req.query.rating) {
//         return res.send({
//             error: "Please provide a game"
//         })

//     }
//     res.send({
//         products: []
//     })

// })
app.get('/*', (req, res) => {
    res.render('404error', {
        errMsg: "Page Not found",
        name
    })
})

// app.get("/help", (req, res) => {
//     res.send(`<h1>Hello Hamza Shaikh</h1>
//             <p>fuck you</p>

//     `);
// })
// app.get("/about", (req, res) => {
//     res.send("About Page");
// })


app.listen(3000, (err) => {
    if (err) {
        console.log(err);

    }
    console.log("Server is Running at port 3000");

})