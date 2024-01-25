datasex = d3.json()


datasex.then()
var trace1 = {
    x: [1, 2, 3],
    y: [4, 5, 6],
    type: 'bar'
  };
  
  var trace2 = {
    x: [20, 30, 40],
    y: [50, 60, 70],
    xaxis: 'x2',
    yaxis: 'y2',
    type: 'bar'
  };
  
  var trace3 = {
    x: [300, 400, 500],
    y: [600, 700, 800],
    xaxis: 'x3',
    yaxis: 'y3',
    type: 'scatter'
  };
  
 
  
  var data = [trace1, trace2, trace3];
  
  var layout = {
    grid: {rows: 2, columns: 2, pattern: 'independent'},
  };
  
  Plotly.newPlot('graph1', data, layout);
  Plotly.newPlot('graph2', data, layout);
  Plotly.newPlot('graph3', data, layout);
  Plotly.newPlot('graph4', data, layout);

  //maping
  // Adding the title map
let myMap = L.map('map', {center:[24.408197,-101.6243106], zoom: 6})

// Adding the tile layer



// Variable to read the GeoJSON state data per year
let file1 = "Project_3_Team5-main/java_script_code/Interactive_Map/static/data/geomex_2018.geojson"

// Defining the parameters to add color of the states according to the Total homicide number
function getColor(death) {
    return death > 4000 ? 'darkred' :
           death > 3000  ? 'red' :
           death > 2000  ? '#FFA500' :
           death > 1000  ? 'yellow' :
           death > 500   ? '#1e5945':
           death > 0     ? 'green':
                           'blue';
}

// Adding function for the map interaction 
function on_feature(feature, layer){
    layer.bindPopup(`<h1>${feature.properties.death}</h1><h3>${(feature.properties.state_name)}</h3>`)

    layer.on({
        mouseover: function(event){
            event.target.setStyle({fillOpacity: 1})
        },
    mouseout :  function(event){
        event.target.setStyle({fillOpacity: 0.6})
        },
    click    : function(event){
        myMap.fitBounds(event.target.getBounds());
        }
    })
}

// fetch the json data set and console log it
d3.json(file1).then(function(data){
    console.log(data);

    // define a styling function for the GeoJSON layer 
    L.geoJson(data, {
        style: function(feature){
            return {
                color : 'white',
                fillColor: getColor(feature.properties.death),
                fillOpacity: 0.6,
                weight : 1.5
            }
        },
        onEachFeature : on_feature
    }).addTo(myMap)

// Adding the map legend


})