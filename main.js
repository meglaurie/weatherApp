var body = document.getElementById("bodyBackground");
var title = [
    'Calgary',
    'Toronto',
    'New York',
    'Chicago',
    'Cupertino',
    'Nashville',
    'Los Angeles',
   
    'Hong Kong',

    'Sao Paulo',
    'San Jose'];


    var cities = [
      'Calgary,ca',
      'Toronto,ca',
      'New York,us',
      'Chicago,us',
      'Cupertino,us',
      'Nashville,us',
      'Los Angeles,us',
      
      'Hong Kong,hk',
      
      'Sao Paulo,br',
      'San Jose,cr',];

      var background =[
        'calgary.jpg',
        'toronto.jpg',
        'newyork.jpg',
        'chicago.jpg',
        'cupertino.jpg',
        'nashville.jpg',
        'losangeles.jpg',
        
        'hongkong.jpg',
        
        'saopaulo.jpg',
        'sanjose.jpg'];


    // some jquery to get the selected value out of the select box
    // once we have that, call the getWeather() function
    $(document).ready(function(){
        // when the value of the cbo select box changes...
        $("#cbo").on('change',function(){
            // inside here, 'this' points to $(#cbo)
            city=this.value
            // call getWeather() based on my new city
            getWeather();
        })
    })

    function initialize(){
      setInterval(changeCity, 10000);
      // console.log(currCityNum);
      changeCity();
    }

    var currCityNum = -1;
    var city = cities[currCityNum]; //initialized to calgary

    function changeCity(){
      currCityNum++;
      if(currCityNum == cities.length){
        currCityNum = 0;
      }
      var nextCity = cities[currCityNum];
      city = nextCity;
      document.getElementById('cbo').innerHTML = title[currCityNum];
      setImageCity();
      getWeather();
      // console.log(city);
    }

    var currBGNum = -1;
    var backgroundPic = background[currBGNum];

    function setImageCity(){
      currBGNum ++;
      if(currBGNum == background.length){
        currBGNum = 0;
      }
      var nextPic = background[currBGNum];
      backgroundPic = nextPic;
      body.style.background = "url('img/" + backgroundPic + "')";
  }

  function getWeather(){
    //AJAX request
    var xhttp = new XMLHttpRequest();
    var url = "http://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=317f42b9243d2198aca515d0a92dccfb";

    // AJAX event handler
    xhttp.onreadystatechange = function(){
        //check state and status
        if(xhttp.readyState==4 && xhttp.status==200){
            var responseText = JSON.parse(xhttp.responseText);
            //function to output our weather data
            outputWeather(responseText);
        }
    }
        // start AJAX call
        xhttp.open("GET",url,true);
        xhttp.send();

  }   // closing getWeather()

        // define our outputWeather function
        function outputWeather(weatherData){
            // in here 'weatherData' will be set to our responseText from above


            // the 'weather' array in our JSON, we need to use:
            // weatherData.weather[0]
            document.getElementById('main').innerHTML =
              weatherData.weather[0].main;

            document.getElementById('icon').src =
              "http://openweathermap.org/img/w/" +
                weatherData.weather[0].icon + ".png";

            // temperature in the JSON is in Kelvins!!
            document.getElementById('temp').innerHTML =
              parseInt(weatherData.main.temp-273.15);

            document.getElementById('wind').innerHTML =
              (weatherData.wind.speed * 1.6) + " km/h";

            var windSpeed = weatherData.wind.speed;
            let windMill = document.getElementById('wind-mill');
            var windMillSpeed ;

            if (windSpeed == 0){
              windMillSpeed = 0 ;
            }
            if (windSpeed > 0 && windSpeed < 2){
              windMillSpeed = 10;
            }
            if (windSpeed > 2 && windSpeed < 4 ){
              windMillSpeed = 5;
            }
            if (windSpeed > 4 && windSpeed < 7 ){
              windMillSpeed = 2;
            }
            if (windSpeed > 7 && windSpeed < 15 ){
              windMillSpeed = 1;
            }
            if (windSpeed > 15 && windSpeed < 30 ){
              windMillSpeed = .5;
            }
            if (windSpeed > 50 ){
              windMillSpeed = .25;
            }

          windMill.style.setProperty("animation-duration", windMillSpeed + "s");

          // console.log(windMill.style);
          // console.log(windSpeed);
          // console.log(windMillSpeed);
          
        }
