let searchResults; // Declare the variable

// Fetch data from a JSON file
fetch('homicide_mexico.homicide_age.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Parse the JSON data
  })
  .then(jsonData => {
    // Assign the fetched data to searchResults
    searchResults = jsonData;

    // Now you can use searchResults
    console.log(searchResults);

    // Filter data for the year 2018
    const filteredResults = searchResults.filter(row => row.año === 2018);

    // Continue with your data processing or rendering logic
    let edad = filteredResults.map(row => row.edad);

    let trace1 = {
      x: filteredResults.map(row => row.edad),
      y: filteredResults.map(row => row.total_edad || 0), // Use optional chaining and provide a default value
      type: "bar"
    };

    // Data trace array
    let chartData = [trace1];

    // Apply a title to the layout
    let layout = {
      title: "Homicides by Age Groups in 2018",
      width: 800     
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("plot", chartData, layout);
  })
  .catch(error => {
    console.error('Error fetching or rendering data:', error);
  });
