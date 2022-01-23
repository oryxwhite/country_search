import React from 'react';

export default function country(props) {
  return (
    <div className='country'>
        <img className='flag' src={props.flag}></img>
        <div className='info'>
          {props.name} <br></br>
          {/* {props.population} */}
          
        </div>
    </div>
  )  
}
