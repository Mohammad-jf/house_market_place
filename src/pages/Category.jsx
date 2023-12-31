import React from 'react'
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify'
import { Link, useParams } from 'react-router-dom';
import { Spinner, ListingItem } from '../components';


const Category = () => {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);
  const params = useParams();


  useEffect(() => {
    const fetchListing = async () => {
      try {
        // get a refrence to collection
        const listingsRef = collection(db, 'listings');

        // create a query
        const q = query(
          listingsRef,
          where('type', '==', params.categoryname),
          orderBy("timestamp", 'desc'),
          limit(10));

        // execute query
        const querySnap = await getDocs(q);

        // get last fetched doc
        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchedListing(lastVisible);


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
  }, [params.categoryname])


  // pagination/load more
  const onFetchMoreListing = async () => {
    try {
      // get a refrence to collection
      const listingsRef = collection(db, 'listings');

      // create a query
      const q = query(
        listingsRef,
        where('type', '==', params.categoryname),
        orderBy("timestamp", 'desc'),
        startAfter(lastFetchedListing),
        limit(10));

      // execute query
      const querySnap = await getDocs(q);

      // get the last fetched doc
      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedListing(lastVisible);


      const listings = [];

      querySnap.forEach((doc) => {
        listings.push({
          id: doc.id,
          data: doc.data()
        })
      })

      setListings((prev) => [...prev, ...listings]);
      setLoading(false);

    } catch (err) {
      toast.error("could not fetch listings")
    }
  }



  return (
    <div className='category'>
      <header>
        <p
          className='pageHeader'>
          {params.categoryname === 'rent' ? 'Plcaes For Rent' : "Places For Sale"}
        </p>

      </header>

      {loading ? <Spinner /> : listings && listings.length > 0 ?
        <>
          <main>
            <ul className='categoryListings'>

              {listings.map((item) => (
                <ListingItem
                  listing={item.data}
                  id={item.id}
                  key={item.id}
                />
              ))}

            </ul>
          </main>
          <br />
          <br />

          {lastFetchedListing && (
            <p className="loadMore" onClick={onFetchMoreListing}>Load More</p>
          )}
        </>
        : <p>No Listings For {params.categoryname}</p>}

    </div>
  )
}

export default Category