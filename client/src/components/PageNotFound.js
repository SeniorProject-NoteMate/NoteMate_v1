import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div>
      <h3 style={{ color: 'white',  textAlign:"center"}}>
        404 - Page not found<br/>
        <Link to="/">Go to Home</Link>
      </h3>
    </div>
  )
}

export default PageNotFound;