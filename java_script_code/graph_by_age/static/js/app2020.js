let searchResults;

// Fetch data from a JSON file
fetch('homicide_mexico.homicide_age.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); 
  })
  .then(jsonData => {
    
    searchResults = jsonData;

    // Filter data for the year 2018
    const filteredResults = searchResults.filter(row => row.año === 2020);

    // 
    const edad = filteredResults.map(row => row.edad);
    const totalEdad = filteredResults.map(row => row.total_edad);

    // Create Highcharts configuration
    const options = {
      chart: {
        type: 'column', 
        renderTo: 'plot', // Render the chart to the 'plot' div
      },
      title: {
        text: 'Homicides by Age Groups in 2020',
      },
      xAxis: {
        title: {
          text: 'Age Groups',
        },
        categories: edad, 
      },
      yAxis: {
        title: {
          text: 'Total Homicides',
        },
      },
      plotOptions: {
        column: {
          color: '#808080', 
          events: {
            mouseOver: function () {
              this.update({
                color: '#FFA500', 
              });
            },
            mouseOut: function () {
              this.update({
                color: '#808080', 
              });
            },
          },
        },
      },
      legend: {
        enabled: false, 
      },
      series: [{
        name: 'Total Homicides',
        data: totalEdad, 
      }],
    };

    //Highcharts
    Highcharts.chart('plot', options);
  })
  .catch(error => {
    console.error('Error fetching or rendering data:', error);
  });
