var weather = document.getElementById("weather");

navigator.geolocation.getCurrentPosition(function (position) {
  var url = "https://api.open-meteo.com/v1/forecast?latitude=" + position.coords.latitude +
    "&longitude=" + position.coords.longitude +
    "&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset" +
    "&temperature_unit=fahrenheit&timezone=auto&forecast_days=7";

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.daily.time.length; i++) {
        var date = new Date(data.daily.time[i] + "T00:00");
        var day = i === 0 ? "Today" : date.toLocaleDateString([], { weekday: "long" });
        var high = Math.round(data.daily.temperature_2m_max[i]);
        var low = Math.round(data.daily.temperature_2m_min[i]);
        var sunrise = new Date(data.daily.sunrise[i]);
        var sunset = new Date(data.daily.sunset[i]);
        var sunriseTime = sunrise.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
        var sunsetTime = sunset.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
        var card = "";

        card = card + "<article class='card'>";
        card = card + "<h2>" + day + "</h2>";
        card = card + "<p>" + date.toLocaleDateString([], { month: "short", day: "numeric" }) + "</p>";
        card = card + "<p><strong>High:</strong> " + high + "&deg;F</p>";
        card = card + "<p><strong>Low:</strong> " + low + "&deg;F</p>";
        card = card + "<p><strong>Sunrise:</strong> " + sunriseTime + "</p>";
        card = card + "<p><strong>Sunset:</strong> " + sunsetTime + "</p>";
        card = card + "</article>";

        weather.innerHTML = weather.innerHTML + card;
      }
    });
});
