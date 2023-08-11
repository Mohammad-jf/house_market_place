import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { setDoc, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'





const OAuth = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const onGoogleClick = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // check for user
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);


            // if user doesnt exist ,create user
            if (!docSnap.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timeStamp: serverTimestamp(),
                });
            }
            navigate('/');

        } catch (err) {
            toast.error('could not register with google')
        }
    }
    return (
        <div className='socialLogin'>
            <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with </p>
            <button className="socialIconDiv" onClick={onGoogleClick}>
                <img src={googleIcon} alt="googleIcon" className='socialIconImg' />
            </button>
        </div>
    )
}

export default OAuth