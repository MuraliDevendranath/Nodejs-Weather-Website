const request = require('request')

const geoCode = (address, callback)=>{
    const urlMapBox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibXVyYWxpZGV2ZW5kcmFuYXRoIiwiYSI6ImNrem84amtrZjRreXMyb28xa3llZ3ExbTQifQ.hG_asRziCXc8S9vaq_It4A&limit=1'
    request({url:urlMapBox, json:true},(error,response)=>{
            if(error)
            {
                callback("Unable to connect to Map Box, " + error,undefined)
            } 
            else if(response.body.error)
            {
                callback("Unable to connect to Map Box, Please check your url", undefined)
            }
            else
            {
                callback(undefined,response)
            } 
       })
}

const foreCast = (address, callback)=>{
    const urlMapBox = 'http://api.weatherstack.com/current?access_key=b746746b20047f44fdb5ad532a936586&query='+address
    request({url:urlMapBox, json:true},(error,response)=>{
            if(error)
            {
                callback("Unable to connect to WeatherStack, " + error,undefined)
            } 
            else if(response.body.error)
            {
                callback("Unable to connect to WeatherStack, Please check your url", undefined)
            }
            else
            {
                callback(undefined,response)
            } 
       })
}

module.exports = {geoCode,foreCast}