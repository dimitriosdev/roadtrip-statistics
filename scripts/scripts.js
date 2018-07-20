
function addTimes (startTime, endTime) {
    var times = [ 0, 0]
    var max = times.length
  
    var a = (startTime || '').split(':')
    var b = (endTime || '').split(':')
  
    // normalize time values
    for (var i = 0; i < max; i++) {
      a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
      b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
    }
  
    // store time values
    for (var i = 0; i < max; i++) {
      times[i] = a[i] + b[i]
    }
  
    var hours = times[0]
    var minutes = times[1]
  
    if (minutes >= 60) {
      var h = (minutes / 60) << 0
      hours += h
      minutes -= 60 * h
    }
  
    return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2)
  }

function ParseDistanceString(distanceString)
{
    var parsedValue = 0;
    if (distanceString.slice(-2) === "km"){
        distanceString = distanceString.substring(0, distanceString.length - 2)
    }
    parsedValue = parseInt(distanceString, 10);
    return parsedValue;
}


function initMap() {
    
    var andriatiki = {lat: 42.408864 , lng: 15.316082};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: andriatiki
        //mapTypeId: 'terrain'
      });

    for (var i = 0; i < geoData.length; i++) {
        var latLng = new google.maps.LatLng(geoData[i].Location.lat,geoData[i].Location.lng);
        var marker = new google.maps.Marker({position: latLng, map: map});
    }
}

 function init() {
    var totalDistance = 0;
    var durationStrings = [];
    
    for(var i = 0; i < data.length; i++) {
        durationStrings.push(data[i].Duration);
        var distanceString = data[i].Distance;
        var distance = ParseDistanceString(distanceString);
        totalDistance += distance;
    } 
    totalDuration = durationStrings.reduce(addTimes, 0);

    $(function() {
        var totalDist = totalDistance.toString() + "km";
        var totalDur = totalDuration.substring(0, 2) + "hours " + totalDuration.substring(totalDuration.length - 2, totalDuration.length) + "mins";
        $(".js-total-distance").text(totalDist);
        $(".js-total-duration").text(totalDur);
    });
}

init();
