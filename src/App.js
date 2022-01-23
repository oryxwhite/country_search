import React from "react";
import Country from './Country'
import { useState } from 'react'
import { useEffect } from 'react'


function App() {

  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(data => data.sort((a, b) => {
        if (a.name.common.toLowerCase() < b.name.common.toLowerCase())
            return -1;
        if (a.name.common.toLowerCase() > b.name.common.toLowerCase())
            return 1;
        return 0;
      }))
      .then(data => setCountries(data))
  }, [])

 
  return (
    <div className="main">
      <div className="header">
        <input type="text" placeholder="Search.." onChange={event => setSearchTerm(event.target.value)} />
      </div>
      <div className="countries">
        {/* the filter function returns an array of the country objects that match the name of the country from the search bar
            the map function returns an array of <Country /> components with the given props from the country objects
        */}
        
        {countries
        .filter(val => {
          if (searchTerm == '') {
            return val
          } else if (val.name.common.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val
          }
        })
        .map((country, key) => {
          return <Country 
            key={key}
            name={country.name.common}
            population={country.population}
            flag={country.flags.png}
            capital={country.capital}
            
            />
        })}
      </div>
    </div>
  )
}

export default App;