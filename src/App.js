import React, { useEffect, useState } from "react";
import Weather from './components/Weather';
import { Dimmer, Loader } from 'semantic-ui-react';

const URL= `https://api.openweathermap.org/data/2.5/weather`
const API_KEY = `9c74fe25b8858f559e638b0dc7750540`

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(`${URL}?lat=${lat}&lon=${long}&appid=${API_KEY}`)
        .then(weatherData => weatherData.json())
        .then(weatherData => {
          setData(weatherData)
          console.log(weatherData,"weatherData");
        });
    }
    fetchData();
  }, [lat, long])

  return (
    <div className="App">
      {(typeof data.main != 'undefined') ? (  
        <Weather weatherData={data} />
      ) : (
        <div>
          {/* <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer> */}
        </div>
      )}
    </div>
  );
}

export default App;
