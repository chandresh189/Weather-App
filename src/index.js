var axios =require('axios');

const Kelvin = 273;

 class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults() {

        var key2 = '3907c6dcd96299a0467c7c3404638c4f';
         var test2=`https://api.openweathermap.org/data/2.5/weather?q=${this.query}&appid=${key2}`;
      // var apiKey = "f810e1f4c0a0b046c1c42fb88130c7c9";
      // var test =`http://api.weatherstack.com/current?access_key=${apiKey}&query=${this.query}`;
        try {
            const response = await axios(test2);
            this.result = response;
            return this.result;
            console.log(this.result);
        } catch (error) {
            console.log(error);
        }
    }
}
const ids={
    cityName:document.querySelector("#city-name"),
    city:document.querySelector("#city"),
    myForm:document.querySelector("#myForm"),
    cityLoc:document.querySelector("#city-location"),
    windSpeed:document.querySelector("#wind-speed"),
    windDeg:document.querySelector("#wind-degree"),
    humidity:document.querySelector("#humidity"),
    time:document.querySelector("#time"),
    dayNight:document.querySelector("#day-night"),
    temp:document.querySelector("#temprature"),
    vis:document.querySelector("#visibility"),
    icon:document.querySelector(".icon"),
    desc:document.querySelector("#desc")
}
const viewResult=(result)=>{
   const main = result.data.main;
   const data = result.data;
   const coords = result.data.coord;
   ids.temp.textContent = 'temprature -'+Math.floor(main.temp-Kelvin)+'°C';
   ids.vis.textContent = 'visibility-'+ data.visibility;
   ids.windSpeed.textContent = 'wind speed-'+ data.wind.speed;
   ids.cityLoc.textContent = 'longitute-'+coords.lon + 'latitude -'+coords.lat;
   ids.humidity.textContent = 'humidity-'+main.humidity;
  // ids.icon.setAttribute('src','./icons/'+data.weather[0].icon);
   ids.desc.textContent = data.weather[0].main +' '+ data.weather[0].description;
   ids.city.textContent = data.name;
   ids.cityName.value = '';
}

async function newResult(e) {
    e.preventDefault();
    var city = ids.cityName.value;
    var s = new Search(city);
    var result = await s.getResults();
    console.log(result);
    viewResult(result);
}
ids.myForm.addEventListener('submit',newResult);
//window.onload = (e)=>{
  // newResult(e);
//}
