var body = document.getElementById("bodyBackground");
var title = [
    'Calgary',
    'Toronto',
    'New York',
    'Chicago',
    'Cupertino',
    'Nashville',
    'Los Angeles',
    'London',
    'Hong Kong',
    'Singapore',
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
      'London,en',
      'Hong Kong,hk',
      'Singapore,sp',
      'Sao Paulo,br',
      'San Jose,cr',];


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

    var currCityNum = -1;
    var city = cities[currCityNum]; //initialized to calgary
    function initialize(){
      setInterval(changeCity, 10000);
      console.log(currCityNum);
      changeCity();
    }

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

    function setImageCity(){
      // var background =[
      //   'calgary.jpg',
      //   'toronto.jpg',
      //   'newyork.jpg',
      //   'chicago.jpg',
      //   'cupertino.jpg',
      //   'nashville.jpg',
      //   'losangeles.jpg',
      //   'london.jpg',
      //   'hongkong.jpg',
      //   'singapore.jpg',
      //   'saopaulo.jpg',
      //   'sanjose.jpg'];
      //   var x;
      // for (x ; x>= background.length ; x++){
      //   // body.src = background[i];
      //   body.style.background = "url('img/" + background[x] + "')";
      //   return body;
      // }

      if(city === 'Calgary,ca'){
        body.style.background = "url('img/calgary.jpg')";

      }
      if(city === 'Toronto,ca'){
        body.style.background = "url('img/toronto.jpg')";
  ;
      }
      if(city === 'New York,us'){
        body.style.background = "url('img/newyork.jpg')";
      }
      if(city === 'Chicago,us'){
        body.style.background =  "url('img/chicago.jpg')";
      }
      if(city === 'Cupertino,us'){
        body.style.background = "url('img/cupertino.jpg')";
      }
      if(city === 'Nashville,us'){
        body.style.background = "url('img/nashville.jpg')";
      }
      if(city === 'Los Angeles,us'){
        body.style.background = "url('img/losangeles.jpg')";
      }
      if(city === 'London,en'){
        body.style.background = "url('img/london.jpg')";
      }
      if(city === 'Hong Kong,hk'){
        body.style.background = "url('img/hongkong.jpg')";
      }
      if(city === 'Singapore,sp'){
        body.style.background = "url('img/singapore.jpg')";
      }
      if(city === 'Sao Paulo,br'){
        body.style.background = "url('img/saopaulo.jpg')";
      }
      if(city === 'San Jose,cr'){
        body.style.background = "url('img/sanjose.jpg')";
      }
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
              weatherData.wind.speed + " mph";
        }
