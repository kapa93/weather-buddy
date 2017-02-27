$(document).ready(function(){

  document.getElementById('city').onkeydown = function(e){
    if(e.keyCode == 13){
      e.preventDefault()
      $("#button").click();
    }
  };

  $('.social').hide();

  var now = (new Date()).getTime()/1000;

  $('#edit').on('click', function() {
    $('.social').hide();
    localStorage.clear();
    location.reload();
    $('#wet').hide();
    $('#cityName').show();
  });

  var name;
  var units;

  $('#button').on('click', function() {
    name = document.getElementById("city").value;
    units = $('.units:checked').val();
    $('#cityName').hide();
    locationSuccess(name, units);
  });

  // api call for current weather conditions
  function locationSuccess() {
    $('.thumbnail').hide();
    $('#data').addClass('loader');
    var data;
    var temp;
    var api_url = 'http://api.openweathermap.org/data/2.5/weather?q=' + name + '&units=' + units + '&appid=a4e895ba42bbc0241aa3037092993c26';
    $.ajax({
      url : api_url,
      method : 'GET',
      success : function (data) {
        var tempr = data.main.temp;
        temp = Math.round(tempr);
        var cond = data.weather[0].description;
        var icon = data.weather[0].icon;
        localStorage.units = units;
        localStorage.name = name;
        localStorage.cache  = temp;
        localStorage.icon = icon;
        localStorage.cond = cond;
        localStorage.time = now;
        $('#data').removeClass('loader');
        $('#data').html('<span id="town">' + name + '</span>' + '<br>' + "<img id='icon' src='assets/images/"+icon+".png' width='auto' height='65'>" + 
          '<br>' + "<p id='con'>" + cond + "</p>" + "<p id='temp'>" + temp + "°</p>");
        $('.social').show();
      },
    });
  }

  if (!localStorage.cache) {
    $('.thumbnail').hide();
    $('#cityName').show();
  }
  else if (localStorage.cache && now - parseInt(localStorage.time) > 1*60*10) {
    $('#cityName').hide();
    name = localStorage.name;
    units = localStorage.units;
    locationSuccess(name, units);
  }
  else {
    $('.social').show();
    $('#cityName').hide();
    $('#data').html(localStorage.name + '<br>' + "<img id='icon' src='assets/images/" + localStorage.icon + ".png' width='auto' height='65'>" + "<p id='con'>" + localStorage.cond + "</p>" + "<p id='temp'>" + localStorage.cache + "°</p>");
    $('.thumbnail').show();
  }


});
