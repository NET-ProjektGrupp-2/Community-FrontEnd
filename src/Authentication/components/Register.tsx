import React from 'react'

export default function Register() {
  return (
    <>
      <div className='page-content'>
        <div className=''>
          <h1>Register</h1>
          <form>
            <label>Email:</label>
            <input type="email" name='userEmail'></input>
            
            <label>Password:</label>
            <input type="password" name='userPassword'></input>
          </form>
        </div>
      </div>
    </>
  )
}
