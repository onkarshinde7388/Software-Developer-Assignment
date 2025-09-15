import React, {useState} from 'react'
import Login from './Login'
import Page from './Page'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  return (
    <div>
      {token ? <Page token={token} /> : <Login setToken={setToken} />}
    </div>
  )
}

export default App