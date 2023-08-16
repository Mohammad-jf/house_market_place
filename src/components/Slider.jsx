import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import "swiper/css/bundle";
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../firebase.config'
import Spinner from './Spinner';





const Slider = () => {
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchListing = async () => {
            try {
                // get a refrence to collection
                const listingsRef = collection(db, 'listings');

                // create a query
                const q = query(
                    listingsRef,
                    orderBy("timestamp", 'desc'),
                    limit(5));

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
                setLoading(false);

            } catch (err) {
                toast.error("could not fetch listings")
            }
        }

        fetchListing();
    }, []);

    if (listings?.length === 0) {
        return <></>
    }

    return loading ? <Spinner /> : (
        <>
            <p className="exploreHeading">Recomended</p>
            <Swiper
                modules={[Pagination, A11y]}
                slidesPerView={1}
                pagination={{ clickable: true }}
            >
                {listings.map(({ data, id }) => (
                    <SwiperSlide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>

                        <div className="swiper-container">
                            <img
                                src={data?.imageUrls[0]}
                                alt="img"
                                className='swiperSlideDiv'

                            />
                            <p className="swiperSlideText">{data.name}</p>
                            <p className="swiperSlidePrice">
                                ${data.discountedPrice ?? data.regularPrice}
                                {data.type === 'rent' && ' / month'}
                            </p>
                        </div>

                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default Slider