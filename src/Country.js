import React from 'react';

export default function country(props) {
  return (
    <div className='country'>
        <img className='flag' src={props.flag}></img>
        <div className='info'>
          <div className='name'>{props.name}</div> 
          <div>Population: {props.population}</div>
          <div>Capital: {props.capital}</div>
          {/* <div>Languages:  </div> */}
        </div>
    </div>
  )  
}
