$(document).ready(function(){
  var now = (new Date()).getTime()/1000;
    // If there is no cache set in localStorage, or if its older than 10 minutes:
  if(!localStorage.cache || now - parseInt(localStorage.time) > 1*60*10) {

    $('#data').addClass('loader');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(locationSuccess);
    }

    function locationSuccess(position) {
      var temp;
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      var api_url = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
                  lat + '&lon=' + 
                  lon + '&units=imperial&appid=a4e895ba42bbc0241aa3037092993c26';
      $.ajax({
        url : api_url,
        method : 'GET',
        success : function (data) {
          var tempr = data.main.temp;
          var temp = Math.round(tempr);
          var name = data.name;
          var cond = data.weather[0].description;
          var icon = data.weather[0].icon;
          $('#data').removeClass('loader');
          $('#data').html(name + '<br>' + "<img id='icon' src='assets/images/"+icon+".png' width='auto' height='65'>" + 
            '<br>' + "<p id='con'>" + cond + "</p>" + "<p id='temp'>" + temp + "°</p>");
          localStorage.cache  = temp;
          localStorage.name = name;
          localStorage.time = now;
          localStorage.icon = icon;
          localStorage.cond = cond;
        },
      });
    }

  }
  
  else {
    $('#data').html(localStorage.name + '<br>' + "<img id='icon' src='assets/images/"+localStorage.icon+
      ".png' width='auto' height='65'>" + "<p id='con'>" + localStorage.cond + "</p>" + "<p id='temp'>" + localStorage.cache + "°</p>");
  }

});