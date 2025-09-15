import React, {useState} from 'react'
import { postApi } from './api'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await postApi(username, password);
    if(res.token) {
        localStorage.setItem('token', res.token);
        window.location.reload();
    } else {
        alert('Login failed');
    }
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-green-500'>
    <div className='h-80 w-100 flex flex-col text-center items-center bg-green-200 p-4 rounded-lg justify-evenly'>
        <h2 className='text-lg font-bold'>Login</h2>
        <input type="text" placeholder='username' className='mb-2 p-2 border border-gray-300 rounded' onChange= {(e) => setUsername(e.target.value)}/>
        <input type="password" placeholder='password' className='mb-2 p-2 border border-gray-300 rounded' onChange= {(e) => setPassword(e.target.value)}/>
        <button className='bg-blue-500 text-white p-2 rounded' onClick={handleSubmit}>Submit</button>
    </div>
    </div>
  )
}

export default Login