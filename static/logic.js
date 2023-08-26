  // Data for the top 10 COVID-19 
const hotspots = [
      { name: "United States of America", lat: 37.09024, lon: -95.712891 },
      { name: "Brazil", lat: -14.235004 , lon: -51.92528 },
      { name: "India", lat: 20.593684 , lon: 78.96288 },
      { name: "Russian Federation", lat: 61.52401, lon: 105.318756 },
      { name: "Mexico", lat: 23.634501 , lon: -102.552784 },
      { name: "United Kingdom", lat: 55.378051, lon: -3.435973 },
      { name: "Peru", lat: -9.189967, lon: -75.015152 },
      { name: "Italy", lat: 41.87194 , lon: 12.56738 },
      { name: "Germany", lat: 51.1657, lon: 10.4515 },
      { name: "France", lat: 46.227638, lon: 2.213749 },
      { name: "Indonesia", lat: -0.789275, lon: 113.921327 },
      { name: "Iran (Islamic Republic Of", lat: 32.427908, lon: 53.688046},
      { name: "Columbia", lat:4.570868 , lon: -74.297333 }, 
      { name: "Argentina", lat:-38.416097 , lon: -63.616672 },
      { name: "Spain", lat: 40.463667, lon: -3.74922 },
      { name: "China", lat: 35.86166, lon: 104.195397 },
      { name: "Poland", lat: 51.919438 , lon: 19.145136 },
      { name: "Ukraine", lat: 48.379433, lon: 31.16558 },
      { name: "South Africa", lat: -30.559482, lon: 22.937506 },
      { name: "Turkey", lat: 38.963745, lon: 35.243322 },
    ];
    
    // Total deaths data for each hotspot
  let totalDeathsData = {
      "United States of America": 1127152,
      "Brazil": 704659,
      "India": 531918,
      "Russian Federation": 399897,
      "Mexico": 334336,
      "United Kingdom": 228542,
      "Peru": 221364,
      "Italy": 191053,
      "Germany": 174979,
      "France": 167985,
      "Indonesia": 161916,
      "Iran (Islamic Republic Of": 146316,
      "Columbia": 142961,
      "Argentina": 130472,
      "Spain": 121852,
      "China": 121628,
      "Poland": 119635,
      "Ukraine": 109904,
      "South Africa": 102595,
      "Turkey": 101419
    };
    
    // Initialize the map
    let map = L.map('map').setView([0, 0], 2);
    
    // Add the base map layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    // Add markers for hotspots
    hotspots.forEach(hotspot => {
      let marker = L.circleMarker([hotspot.lat, hotspot.lon]).addTo(map);
      let totalDeaths = totalDeathsData[hotspot.name];
      marker.bindPopup(`${hotspot.name}<br>Total Deaths: ${totalDeaths}`);
    });
    

    // Graphs
    d3.json("/sample").then(data=>{
      console.log(data);
      let trace1 = {
          x: data.map(row=>row["Country"]),
          y:data.map(row=>row["Total Deaths"]),
          type :'bar',
          name : "Total Deaths",
      };
      let trace2= {
          x : data.map(row=>row["Country"]),
          y:data.map(row=>row["Total Vaccinations"]),
          type :'bar',
          name : "Total Vaccinations",
      };
  
  let dataTrace = [trace1,trace2];
  
  let layout = {
      barmode : 'group',
      title : " Top 20 countries by vaccination VS death",
      xaxis : {title : "Country"},
      yaxis : {title : "Count", type : 'log'},
     
  };
  
  Plotly.newPlot("Plot", dataTrace, layout);
  });
  
  
  d3.json("/sample2").then(data => {
      console.log(data);
  
      let trace3 = {
          labels: data.map(row => row["Country"]),
          values: data.map(row => row["New Covid Cases in Last 7 days"]),
          type: 'pie'
      };
  
      let dataTrace2 = [trace3];
  
      let layout2 = {
          height : 600,
          width : 800,
          title: "Top 10 Countries by New Cases (Last 7 Days)",
      };
  
      Plotly.newPlot("pieChart", dataTrace2, layout2);
  });


  // Create a dropdown menu for country
  // Call the app route from flask
  d3.json("/sample3").then(data => {
    console.log(data);

    // Call updatePlotly() when a change takes place 
    d3.selectAll("#selDataset").on("change", updatePlotly);

    // Call country names for dropdown
    let countries = data.map(row =>row["Country"]);

    // Loop through the countries
    countries.forEach(country => {
      dropdown.append("option").text(country).property("value", country);
    });

  });

  // Create function to update Plotly
  function updatePlotly(countrySelected) {

    // Use D3 to select the dropdown menu
    let dropdown = d3.select("#selDataset");

    let selectedCountry = data.find(row => row["Country"] == countrySelected);

    // Call data for each country selected
    document.getElementById("Cases_Cumulative_Total").textContent = selectedCountry["Cases_Cumulative_Total"];
    document.getElementById("Deaths_Cumulative_Total").textContent = selectedCountry["Deaths_Cumulative_Total"];
    document.getElementById("New_Cases_Last_7_Days").textContent = selectedCountry["New_Cases_Last_7_Days"];
    document.getElementById("New_Deaths_Last_7_Days").text = selectedCountry["New_Deaths_Last_7_Days"];

  }
    // Add event listener for dropdown udpates
    dropdown.on("change", function () {
      let selectedCountry = this.value;
      updatePlotly(selectedCountry);
    });

    init();
  
      

  
