import axios from 'axios';
import { useEffect,useState } from 'react';
import './App.css';
import Users from './data.json';
import UsersList from './component/UsersList';
import Select from './component/Select';

function App() {
  
  const [data , setData] = useState([]) // 
  const [selectedDepartement , setSelectedDepartement] = useState(0)

  useEffect(()=>{
       fetchData()
  },[])
  
  const fetchData = async () => {
    try {                                           // appel api avec Axios , stocker les département dans une const qui passe en paramètre,                                                   //
      const getdata = await axios                   // déclanchement de la fonction dans UseEffeect 
      .get('https://geo.api.gouv.fr/departements/') // déclanchement de la fonction getDepartementUser();
       getDepartementUser(getdata)        
      } catch (error) {
        console.log(error)
      }
    }
    
  const getDepartementUser = (res) => {
    let list = [];                            
    for( const key in Users ){                      // récupérer et lister les departement du fichier data.json
      const departement = Users[key].departments    // puis les filtrer pour éviter les doublons 
      for( const i in departement){                 // et les mettrent dans le tableau list et déclencher cleanDepartement
        const code = departement[i]
        const index = list.findIndex(e => e === departement[i])
        if(index === -1 ){
          list.push(code)
        }
      }
    }
    
    cleanDepartement(res,list)
  }

  const cleanDepartement = (res,list) => {
    let array = [];
    const departements = res.data                       // comparé les departement des user et ceux de l'api
    for(const key in departements){                     // les mettres dans le State data
       const departement = departements[key]
       const index = list.findIndex(e => e === Number(departement.code))
       if(index > -1){
        array.push(departement)
       }
    }
    setData(array)
    
  }

  const sendUser = (id) => {
    setSelectedDepartement(id)
  }
 
  return (
    <div className="App">
        <header>
          <div className='title'>
            <h1>API Employees</h1>
          </div>
        </header>
      <Select data={data} action={sendUser}/>        
      <UsersList users={Users} selected={selectedDepartement}/>
    </div>
  );
}

export default App;
