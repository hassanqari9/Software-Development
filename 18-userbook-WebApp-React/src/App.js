import './App.css';
import FormInput from './components/FormInput/FormInput';
import FormOutput from './components/FormOutput/FormOutput';
import {useState} from 'react'

const Users =[
  {
    id: 'A1',
    name: 'Hasaan',
    age: '21'
  },
  {
    id: 'B2',
    name: 'Koshan',
    age: '23'
  },
  {
    id: 'C3',
    name: 'Hyder',
    age: '17'
  }
]

function App() {
  const [newUsers, setNewUsers] = useState(Users)
  const addDataHandler = (data) => {
    setNewUsers(prevUsers => {
      return [data, ...prevUsers]
    })
  }

  return (
    <>
      <FormInput onAddData={addDataHandler}/>

      {newUsers.map(user => 
        <FormOutput key={user.id} name={user.name} age={user.age}/>
      )}
      
    </>
  );
}

export default App;
