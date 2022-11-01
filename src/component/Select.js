import React from 'react'
import './Select.css'

export default function Select(props) {
  const changeCode = (e) => {
    props.action(Number(e.target.value))      // recupérer la value du departement selectionner ,puis on le passe dans la props
  }                                           
  return (
    <div className='select_div'>
          <select onChange={changeCode} name="departement" id="select_dep">
            <option value="0" >Tous les departements</option>;
            {
              props.data.map( (d,key)=> {
                return(
                  <option value={d.code} key={key} >
                     {d.nom} </option>
                  )
              }
              )
            }
          </select>
    </div>
  )
}
