import React from "react";
import Country from './Country'
import { useState } from 'react'
import { useEffect } from 'react'

function App() {

  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('')

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
      console.log('fetch render')
  }, [])

  useEffect(() => {
    function sortCountries(sortType) {
      if (sortType == "AZ") {
        setCountries(prevCountries => {
          const sortedCountries = prevCountries.sort((a, b) => {
            if (a.name.common.toLowerCase() < b.name.common.toLowerCase())
              return -1;
          if (a.name.common.toLowerCase() > b.name.common.toLowerCase())
              return 1;
          return 0;
          })
          return sortedCountries;
      })}

      if (sortType == "ZA") {
        setCountries(prevCountries => {
          const sortedCountries = prevCountries.sort((a, b) => {
            if (a.name.common.toLowerCase() > b.name.common.toLowerCase())
              return -1;
          if (a.name.common.toLowerCase() < b.name.common.toLowerCase())
              return 1;
          return 0;
          })
          return sortedCountries;
      })}
      
      if (sortType == 'popA') {        
        setCountries(prevCountries => {
          return prevCountries.sort((a,b) => {
            return a.population - b.population;
          })
        })
      }

      if (sortType == 'popD') {        
        setCountries(prevCountries => {
          return prevCountries.sort((a,b) => {
            return b.population - a.population;
          })
        })
      }
  }
  sortCountries(sortType)
  setSortType('')
  }, [sortType])

  
  {/* the filter function returns an array of the country objects that match the name of the country from the search bar
      the map function returns an array of <Country /> components with the given props from the country objects
  */}

  function mapCountries() {
    console.log('map countries')

    return countries
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
        languages={country.languages}
        />
    })
  } 

  

  return (
    <div className="main">
      <div className="header">
        <input type="text" placeholder="Search.." onChange={event => setSearchTerm(event.target.value)} />
        
        <div><select name="membership" id="membership" onChange={event => setSortType(event.target.value)}>
          <option value="AZ">Country A - Z</option>
          <option value="ZA">Country Z - A</option>
          <option value="popD">Population Descending</option>
          <option value="popA">Population Ascending</option>
        </select>
        </div>
      </div>

      <div className="countries">
        {mapCountries()}
      </div>
    </div>
  )
}

export default App;