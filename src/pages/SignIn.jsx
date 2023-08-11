import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'

const SignIn = () => {
  const navigate = useNavigate();

  const initialFormState = {
    email: '',
    password: ''
  }

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFromData] = useState(initialFormState)
  const { email, password } = formData;


  const onChange = (e) => {
    const { id, value } = e.target
    setFromData((prevState) => ({ ...prevState, [id]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const usercredential = await signInWithEmailAndPassword(auth, email, password);
      if (usercredential.user) {
        navigate('/');
      }

    } catch (err) {
      toast.error("Bad User Credentials")

    }


  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Wellcome Back!</p>
        </header>

        <main>
          <form onSubmit={onSubmit}>
            <input
              type="email"
              className='emailInput'
              placeholder='Email'
              id="email"
              value={email}
              onChange={onChange} />


            <div className="passwordInputDiv">
              <input
                type={showPassword ? 'text' : 'password'}
                className='passwordInput'
                placeholder='password'
                id='password'
                value={password}
                onChange={onChange} />

              <img
                src={visibilityIcon}
                className='showPassword'
                alt="showpassword"
                onClick={() => setShowPassword((prev) => !prev)} />
            </div>


            <Link to='/forgot-password' className='forgotPasswordLink'>
              Forgot Password !
            </Link>

            <div className='signInBar'>
              <p className="signInText">Sign In</p>

              <button className='signInButton'>
                <ArrowRightIcon fill='white' width='34px' height='34px' />
              </button>
            </div>

          </form>
          {/* google auth component */}

          <Link to='/sign-up' className='registerLink'>Sign Up Instead</Link>
        </main>
      </div>

    </>
  )
}

export default SignIn