import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

const Contact = () => {
    const [message, setMssage] = useState('');
    const [landLord, setLandLord] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const params = useParams();

    useEffect(() => {
        const getLandLordInfo = async () => {
            const docRef = doc(db, 'users', params.landlordId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setLandLord(docSnap.data());
            } else {
                toast.error("could not get landLord Data")
            }
        }
        getLandLordInfo();
    }, [params.landlordId]);


    const onChange = (e) => setMssage(e.target.value);


    return (
        <div className='pageContainer'>
            <header>
                <p className="pageHeader">contact LandLord</p>
            </header>

            {landLord !== null && (
                <main>
                    <div className="contactLandLord">
                        <p className="landLordName">contact {landLord?.name}</p>
                    </div>

                    <form className="messageFrom">
                        <div className="messageDiv">
                            <label htmlFor="message" className="messageLabel">Message</label>
                            <textarea name="message" id="message" className='textarea' value={message} onChange={onChange}></textarea>
                        </div>

                        <a href={`mailto:${landLord.email}?subject=${searchParams.get('listingName')}&body=${message}`}>
                            <button type='button' className='primaryButton'>Send Message</button>
                        </a>
                    </form>
                </main>
            )}
        </div>
    )
}

export default Contact