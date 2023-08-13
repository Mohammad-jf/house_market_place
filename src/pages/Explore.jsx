import React from 'react'
import rentCategoryImg from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImg from '../assets/jpg/sellCategoryImage.jpg'
import { Link } from 'react-router-dom';



const Explore = () => {
  return (
    <div className='explore'>

      <header>
        <p className="pageHeader">Explore</p>
      </header>

      <main>
        {/* slider */}
        <p className="exploreCategoryHeading">Categories</p>

        <div className="exploreCategories">
          <Link to='/category/rent' >
            <img src={rentCategoryImg} alt="rent" className='exploreCategoryImg' />
            <p className='exploreCategoryName'>Places For Rent</p>
          </Link>

          <Link to='/category/sale' >
            <img src={sellCategoryImg} alt="sell" className='exploreCategoryImg' />
            <p className="exploreCategoryName">Places For Sale</p>
          </Link>
        </div>
      </main>

    </div>
  )
}

export default Explore