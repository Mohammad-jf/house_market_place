import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc, serverTimestamp, } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'


const SignUp = () => {
  const navigate = useNavigate();
  const initialFormState = {
    name: '',
    email: '',
    password: ''
  }

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFromData] = useState(initialFormState)
  const { email, password, name } = formData;


  const onChange = (e) => {
    const { id, value } = e.target
    setFromData((prevState) => ({ ...prevState, [id]: value }))
  }



  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user

      // set the display name
      updateProfile(auth.currentUser, {
        displayName: name
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timeStamp = serverTimestamp();
      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      navigate('/');
    }
    catch (err) {
      toast.error("oops.... Something Went Wrong With Registration")
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
              type="text"
              className='nameInput'
              placeholder='name'
              id="name"
              value={name}
              onChange={onChange} />

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


            <div className='signUpBar'>
              <p className="signUpText">Sign Up</p>

              <button className='signUpButton'>
                <ArrowRightIcon fill='white' width='34px' height='34px' />
              </button>
            </div>

          </form>
          {/* google auth component */}
          <Link to='/sign-in' className='registerLink'>Sign In</Link>

        </main>
      </div>

    </>
  )
}

export default SignUp