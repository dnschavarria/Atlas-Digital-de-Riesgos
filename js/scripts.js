/////////////////////////
//SECCION DE funciones//f

function updateOpacity() {
	document.getElementById("span-opacity").innerHTML = document.getElementById("sld-opacity").value;
	Orosi8Layer.setOpacity(document.getElementById("sld-opacity").value);
}

//// SECION DEL MAPA////
////////////////////////

// Creación de un mapa de Leaflet
var map = L.map("mapid");

// Centro del mapa y nivel de acercamiento
var catedralSJ = L.latLng([9.823703, -83.804743]);
var zoomLevel = 17;

// Definición de la vista del mapa
map.setView(catedralSJ, zoomLevel);

// Adición de capa usando ".addTo(map); "
esriLayer = L.tileLayer.provider("Esri.WorldImagery").addTo(map);
osmLayer = L.tileLayer.provider("OpenStreetMap.Mapnik").addTo(map);

/* // Capas geoJSON guardadas en el mismo directorio, pero queda fijo no se sepuede activar y desactivar con el onctrol
$.getJSON("provincias.geojson", geodata => {
	L.geoJSON(geodata, {
		style() {
			return {
				color: "#0000ff",
				weight: 2,
				fillOpacity: 0.0
			};
		}
	}).addTo(map);
}); */

// // Capas servicio WMS para distritos
// var distritosWMSLayer = L.tileLayer.wms('http://geos.snitcr.go.cr/be/IGN_5/wms?', {
	// layers: 'limitedistrital_5k',
	// format: 'image/png',
	// transparent: true
// }).addTo(map);

// // Capas servicio WMS para cantones
// var cantonesWMSLayer = L.tileLayer.wms('http://geos.snitcr.go.cr/be/IGN_5/wms?', {
	// layers: 'limitecantonal_5k',
	// format: 'image/png',
	// transparent: true
// }).addTo(map);

// //Capas servicio WMS para provincias
// var provinciasWMSLayer = L.tileLayer.wms('http://geos.snitcr.go.cr/be/IGN_5/wms?', {
	// layers: 'limiteprovincial_5k',
	// format: 'image/png',
	// transparent: true
// }).addTo(map);

// cargar y desplegar una imagen sobre un área específica del mapa
var Orosi8Layer = L.imageOverlay("VOrosi_88.jpg", 
	[[9.8211280799999994, -83.8081661549999950],
	[9.8261571960000005, -83.8014372600000002]],
	{opacity:0.5}
).addTo(map);

/////////////////////////////
//// SECIONES DE GRUPOS DE CAPAS///
////////////////////////////

// Definición de los mapas bases
var baseMaps = {
	"ESRI World Imagery": esriLayer,
	"OpenStreetMap": osmLayer
};

// Definición de los mapas sobrepuesta
var overlayMaps = {
	// "Distrito": distritosWMSLayer,
	// "Cantones": cantonesWMSLayer,
	// "Provincias": provinciasWMSLayer,
	"Ortofoto": Orosi8Layer
};

/////////////////////////////
//// SECION DE CONTROLES///
////////////////////////////

// Controles de los mapas, position e sla posición, collapsed si queda fijo
var control_layers = L.control.layers(baseMaps, overlayMaps,{position:'topright', collapsed:false}).addTo(map);
L.control.scale({position:'topright', imperial:false}).addTo(map);
L.control.zoom({position:'topright'}).addTo(map);

/////////////////////////////
//// SECION DEL MARCADOR////
////////////////////////////

// Marcador para la Catedral Metropolitana de San José  //claseL.marker([lat, long],{opcion:valor deseado, opcion:valor deseado}).addTo(map);
/* var catedralSJMarker = L.marker([9.9326673, -84.0787633], {draggable:true, opacity:0.5}).addTo(map);
catedralSJMarker.bindPopup('<a href="https://es.wikipedia.org/wiki/Catedral_metropolitana_de_San_Jos%C3%A9">Catedral Metropolitana de San José</a>.<br>Catedral de estilo clásico y barroco. Templo principal de la arquidiócesis católica de San José.<br>Construída entre 1825 y 1827 y reconstruída en 1878.').openPopup();
catedralSJMarker.bindTooltip("Catedral Metropolitana de San José").openTooltip();	// Enseña la información al pasar el cursol x encima dle punto, sin darle click		
 */
 
// En JS: marcador PERSONALIZADO para la Catedral Metropolitana de San José

var catedralSJMarker = L.marker([9.9326673, -84.0787633],
	{ icon: L.divIcon(
		{ html: '<i class="fas fa-church"></i>'}
	)} 
).addTo(map);
		
$.getJSON("edificaciones.geojson", function(geodata) {
	var layer_geojson_edif = L.geoJson(geodata, {
		style: function(feature) {
			return {'color': "#33c6ff", 'weight': 2, 'fillOpacity': 0.0}
		}//,
		// onEachFeature: function(feature, layer) {
			// var popupText = "Cod_Provincia: " + feature.properties.cod_provin + "<br>" + "Nombre: " + feature.properties.provincia;
			// layer.bindPopup(popupText);
		// }			
	}).addTo(map);
	control_layers.addOverlay(layer_geojson_edif, 'Edificaciones');
});

