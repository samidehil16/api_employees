import React from 'react'
import './UserList.css'

export default function UsersList(props) {
  return (
    <div className='list'>
      {
          props.users.map(User =>{
            if (!props.selected ) {
              return(                                     
                <div key={User.id} className="userlist">
                  {User.name}
                </div>
              )
            }else if(User.departments.includes(props.selected)){
                return(                                           
                <div key={User.id} className="userlist">
                  {User.name}
                </div>
              )
            }
          })
        }
    </div>
  )
}
