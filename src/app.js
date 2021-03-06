const express = require('express')
const path = require('path')
const hbs = require('hbs')
const weatherReport = require('./Utils/Utils')
const app = express(path.join(__dirname,'../public'))
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const port = process.env.PORT || 3000

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
//app.get('',(req,res)=>{res.send('Hello Murali!!!!')})

app.get('',(req,res)=>{res.render('index',{
    'title':'Weather',
    'name': 'Murali'
})})

//app.get('/help',(req,res)=>{res.send('Help Page......')})

app.get('/help',(req,res)=>{res.render('help',{
    'title':'Help',
    'msg':'Our world depends on technology more than ever. All around the globe, computers process huge amounts of data for everything from business to video games to weather forecasts.'
})})

app.get('/help/*',(req,res)=>{res.render('404',{
    'errorMsg':'404 page not found'
})})

//app.get('/about',(req,res)=>{res.send('About Page.....')})

app.get('/about',(req,res)=>{res.render('about',{
    'title':'About',
    'msg':'Murali NodeJS Learning....'
})})

//app.get('/weather',(req,res)=>{res.send('Weather Page.....')})

app.get('/weather',(req,res)=>{
    // res.render('weather',{
    //     'title':'about',
    //     'msg':'Murali NodeJS Learning....'
    // })
    //console.log(req.query.address)
    if(!req.query.address)
    {
        return res.send({
            error:"Address is needed in your query string!!!"
        })       
    } 
    weatherReport.geoCode(req.query.address,(error, geoCodeData)=>
    {
        weatherReport.foreCast(geoCodeData.body.features[0].text,(error, foreCastData)=>{
            return res.send({                
            forecast: 'For the Location: ' + geoCodeData.body.features[0].text +  
            ', current tempertature is: ' 
            + foreCastData.body.current.temperature + '. But it feels like: ' + foreCastData.body.current.feelslike,
            location:geoCodeData.body.features[0].place_name,
            address:geoCodeData.body.features[0].text
        })})        
    })
})

app.get('/*',(req,res)=>{res.render('404',{
    'errorMsg':'404 page not found'
})})
app.listen(port,()=>{console.log('Server is up on port' + port)})

