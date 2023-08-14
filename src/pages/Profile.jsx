import { getAuth, updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.config'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'


const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  // state object
  const initialState = {
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  }


  const [formData, setFormData] = useState(initialState);
  const [changeDetails, setChangeDetails] = useState(false);
  const { name, email } = formData;


  const onLogOut = () => {
    auth.signOut();
    navigate('/');
  }


  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // update displayName in fb
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // update in fs
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });

      }
    } catch (err) {
      toast.error("could not update profile details...");
    }
  }


  const onChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value
    }))
  }


  return (
    <div className='profile'>

      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button
          type='button'
          className="logOut"
          onClick={onLogOut}>
          LogOut
        </button>
      </header>

      <main>
        <div className='profileDetailsHeader'>
          <p className="profileDetailsText">personal Details</p>

          <p className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prev) => !prev);
            }}>
            {changeDetails ? 'Done' : 'change'}
          </p>
        </div>


        <div className="profileCard">
          <form >
            <input
              type="text"
              id="name"
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
              className={!changeDetails ? 'profileName' : 'profileNameActive'} />

            <input
              type="email"
              id="email"
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'} />
          </form>
        </div>

        <Link to='/create-listing' className='createListing'>
          <img src={homeIcon} alt="home" />
          <p>Sell or Rent your Home</p>
          <img src={arrowRight} alt="arrow right" />
        </Link>
      </main>

    </div>
  )
}

export default Profile