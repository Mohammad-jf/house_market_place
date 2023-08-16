import { getAuth, updateProfile } from 'firebase/auth'
import { doc, updateDoc, collection, getDocs, query, orderBy, where, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase.config'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import { ListingItem } from '../components';
import Spinner from './../components/Spinner';


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
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(null);
  const { name, email } = formData;

  useEffect(() => {
    const fetchListing = async () => {
      try {
        // get a refrence to collection
        const listingsRef = collection(db, 'listings');

        // create a query
        const q = query(
          listingsRef,
          where('userRef', '==', auth.currentUser.uid),
          orderBy("timestamp", 'desc'),);

        // execute query
        const querySnap = await getDocs(q);

        const listings = [];

        querySnap.forEach((doc) => {
          listings.push({
            id: doc.id,
            data: doc.data()
          })
        })

        setListings(listings);
      } catch (err) {
        toast.error("could not fetch listings")
      }
    }

    fetchListing();
  }, [auth.currentUser.uid])


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

  const onDelete = async (id) => {
    if (window.confirm('are you sure you want to delete?')) {
      setLoading(true);
      await deleteDoc(doc(db, 'listings', id));
      const updatedListings = listings.filter((listing) => listing.id !== id);
      setListings(updatedListings);
      setLoading(false)
      toast.success('successfully deleted... :)');
    }
  }


  return loading ? <Spinner /> : (
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

        {listings && listings.length > 0 &&
          <>
            <p className="listingText">Your Listings</p>
            <ul className='categoryListings'>
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                  onDelete={() => onDelete(listing.id)}
                />))}
            </ul>
          </>
        }
      </main>

    </div>
  )
}

export default Profile