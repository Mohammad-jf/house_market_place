import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config'
import Spinner from './../components/Spinner';
import shareIcon from '../assets/svg/shareIcon.svg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import "swiper/css/bundle";



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
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                >
                    {listing.imageUrls.map((url, index) => (
                        <SwiperSlide key={index}>
                            <div className="swiper-container">
                                <img src={listing?.imageUrls[index]} alt="img" className='swiperSlideDiv' />
                            </div>
                        </SwiperSlide>))}
                </Swiper>


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

                    <p className="listingLocation">{listing.location}</p>
                    <p className="listingType">for {listing.type === 'rent' ? 'Rent' : 'Sale'}</p>
                    {listing.offer && <p className='discountPrice'>
                        ${listing.regularPrice - listing.discountedPrice} Discount</p>}

                    <ul className="listingDetailsList">
                        <li>{listing.berdroom > 1 ? `${listing.berdroom} Bedrooms ` : '1 Bedroom'}</li>
                        <li>{listing.bathdroom > 1 ? `${listing.bathdroom} Bathrooms ` : '1 Bathroom'}</li>
                        <li>{listing.parking && "Parking Spot"}</li>
                        <li>{listing.furnished && "Furnished"}</li>
                    </ul>

                    {auth.currentUser?.uid !== listing.userRef && (
                        <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`} className='primaryButton'>
                            Contact LandLord
                        </Link>
                    )}
                </div>
            </main>
        )
}

export default Listing