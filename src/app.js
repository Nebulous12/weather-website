const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars for engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to store
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Steve'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Steve'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is some helpful text',
        title: 'Help',
        name: 'Steve'
    })
})

app.get('/weather',(req,res)=>{
       if(!req.query.address){
           return res.send({
            error: 'You must provide an address'
           })
       }
    //    res.send({
    //      forecast:'It is snowing',
    //      location: 'Philadelphia',
    //      address: req.query.address
    //    })
    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {

        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return  res.send({error})
            }
                   res.send({
                       forecast: forecastData,
                       location,
                       address:  req.query.address
                   })
             
        })

    })
        
})

app.get('/products', (req,res) => {

      if(!req.query.search){
          return res.send({
            error:'You must provide a search term'
          })
      }

     console.log(req.query.search);
      res.send({ 
        products:[]
      })
})




app.get('/help/*',(req,res) =>{
     res.render('404',{
         message: 'Help article not found',
         title: '404',
         name: 'Steve'
     })
})

app.get('*',(req,res) => {
     res.render('404',{
           message: 'Page not found',
           title: '404',
           name: 'Steve'
     })
})

app.listen(port, () => {
    console.log('Server is up on port 3000');
})

