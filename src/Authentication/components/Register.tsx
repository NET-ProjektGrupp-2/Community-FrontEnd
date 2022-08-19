import React from 'react'
import styles from "DebugTestDev.module.css"
import { useNavigate } from 'react-router-dom'
import { debug } from 'console'
export default function Register() {
  
  const [firstName, setfirstName] = React.useState('')
  const [lastName, setlastName] = React.useState('')
  const [Username, setUsername] = React.useState('')
  const [Email, setEmail] = React.useState('')
  const [Password, setPassword] = React.useState('')
  const [ConfirmPassword, setConfirmPassword] = React.useState('')


  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Send Data Here
    var jsonData = JSON.stringify({firstName: firstName, lastName: lastName, username: Username, email: Email, password: Password, confirmPassword: ConfirmPassword})
    console.log(jsonData)
  } 

  return (
    <>
      <div className={styles.contentWrapper}>
        <div className='default-form' id='registerForm'>
          <h1>Register</h1>
          <form method='post' onSubmit={handleSubmit}>
           <section>
            <label>First Name:</label>
            <input type="Text" name='userFirstName' onChange={event => setfirstName(event.target.value)}></input>
           </section>
           <section>
            <label>Last Name:</label>
            <input type="Text" name='userLastName' onChange={event => setlastName(event.target.value)}></input>
           </section>
          <section>
            <label>Username:</label>
            <input type="text" name='userUserName' onChange={event => setUsername(event.target.value)}></input>
          </section>
          <section>
            <label>Email:</label>
            <input type="email" name='userEmail' onChange={event => setEmail(event.target.value)}></input>
          </section>
          <section>
            <label>Password:</label>
            <input type="password" name='userPassword' onChange={event => setPassword(event.target.value)}></input>
          </section>
            <section>
            <label>Confirm Password:</label>
            <input type="password" name='userPasswordConfirm' onChange={event => setConfirmPassword(event.target.value)}></input>
            </section>
            <button type='submit'>Register</button>
          </form>
        </div>
      </div>
    </>
  )
}


