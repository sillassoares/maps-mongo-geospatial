var map, JUIZ_DE_FORA, heatmap;

function initialize() {
	var JUIZ_DE_FORA = new google.maps.LatLng(-21.7290441,-43.4525616);

	map = new google.maps.Map(document.getElementById("map"), {
    	center: JUIZ_DE_FORA,
    	zoom: 12,
    	mapTypeId: google.maps.MapTypeId.ROADMAP
  	});


  	map.addListener('idle', function () {
  		var bounds = map.getBounds();
  		var ne = bounds.getNorthEast();
  		var sw = bounds.getSouthWest();
      var locations = [[sw.lng(), sw.lat()], [ne.lng(), ne.lat()]];

      $.ajax({
        method: 'GET',
        url: '/api/v1/positions/' + JSON.stringify(locations),
        success: function (data) {

          if (heatmap !== undefined) {
            heatmap.setMap(null);
          }

          heatmap = new google.maps.visualization.HeatmapLayer({
            data: data.map(function (m) { return new google.maps.LatLng(m.location.coordinates[1], m.location.coordinates[0]); }),
            map: map
          });

        }
      });
  	});
}