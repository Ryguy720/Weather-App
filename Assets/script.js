let forCast = document.getElementById("5dayForcast")
let searchbtn = document.getElementById("fetch")
let APIKey = 'd1ac34599ba9f921f03a2248f9eaab89'
let previousSearch = JSON.parse(localStorage.getItem("WeatherAPI"))  || []
let currentDay = moment().format('l');
let nextDay1 = moment().add(1, 'days').format('l');
let nextDay2 = moment().add(2, 'days').format('l');
let nextDay3 = moment().add(3, 'days').format('l');
let nextDay4 = moment().add(4, 'days').format('l');
let nextDay5 = moment().add(5, 'days').format('l');
console.log(currentDay)

// created variables

searchbtn.addEventListener("click", function() {
    // fetch request gets a list of all the repos for the node.js organization
    var userInput = document.getElementById("cityName").value
    console.log(userInput)
    currentforcast(userInput)
  })
  
  function currentforcast(cityName) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=imperial`;
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        
        var HTMLdoc = `
        <h1>City: ${data.name}  ${currentDay}</h1>
        <h2>Weather: ${data.main.temp}</h2>
        <span><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></span>
        <h4>Humidity: ${data.main.humidity}</h4>
        <h5>Windspeed: ${data.wind.speed}</h5>
        
        `
      document.getElementById("currentForcast").innerHTML= HTMLdoc
      var lat = data.coord.lat
      var lon = data.coord.lon
      previousSearch.push(cityName)
      localStorage.setItem("WeatherAPI", JSON.stringify(previousSearch))
      displayPreviousSearch()
      getApi(lat,lon)
      })
  }
  
  function getApi(lat, lon) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;
    var tableIntro = `<table class="table table-stripped">
    <thead>
      <tr>
        <th scope="col">Day</th>
        <th scope="col">Temp</th>
        <th scope="col">Description</th>
        <th scope="col">Icon</th>
        <th scopr="col">UVi</th>
      </tr>
    </thead>
    <tbody>`
    
     var tableEnd = `
    </tbody>
  </table>`
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        // Loop over the data to generate a table, each table row will have a link to the repo url
        var forecast = data.daily;
        console.log(forecast)
        var htmlCode = "";
        for (var i = 1; i < 6; i++) {
          // Creating elements, tablerow, tabledata, and anchor
             htmlCode += `  <tr>
             <th scope="row">${i}</th>
             <td>${forecast[i].temp.max}</td>
             <td>${forecast[i].weather[0].main}</td>
             <td><img src="https://openweathermap.org/img/wn/${forecast[i].weather[0].icon}@2x.png" /></td><td>${forecast[i].uvi}</td>
           </tr>`
        }
        document.getElementById("5dayForcast").innerHTML=tableIntro + htmlCode + tableEnd
      });
  
  }
  
  function displayPreviousSearch() {
    let previousSearch = JSON.parse(localStorage.getItem("WeatherAPI"))  || []
    var previousCity = ""
    for( var i = 0; i < previousSearch.length; i ++){
      previousCity += `<li class="border border-3 rounded-pill m-1 p-1">${previousSearch[i]}</li>`
    } 
    document.getElementById("searchHistory").innerHTML=previousCity
     console.log(previousSearch)
  }
  displayPreviousSearch()