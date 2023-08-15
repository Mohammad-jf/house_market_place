import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config'
import Spinner from './../components/Spinner';
import shareIcon from '../assets/svg/shareIcon.svg'


const Listing = () => {
    const { listingid } = useParams();
    const navigate = useNavigate();
    const auth = getAuth();

    // component state
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sharedLinkCopied, setSharedLinkCopied] = useState(false);


    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, 'listings', listingid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setListing(docSnap.data())
                setLoading(false);
            }
        }

        fetchListing();
    }, [navigate, listingid])




    return loading ? <Spinner /> :
        (
            <main>
                {/* slider */}
                <div className="shareIconDiv" onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    setSharedLinkCopied(true)
                    setTimeout(() => {
                        setSharedLinkCopied(false);
                    }, 2000)
                }
                }>
                    <img src={shareIcon} alt="share" />
                </div>

                {sharedLinkCopied && <p className='linkCopied'>Link Copied</p>}

                <div className="listingDetails">
                    <p className="listingName">
                        {listing.name} - $ {listing.offer ? listing.discountedPrice : listing.regularPrice}
                    </p>


                </div>
            </main>
        )
}

export default Listing