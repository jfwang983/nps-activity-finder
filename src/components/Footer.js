import React from 'react'
import './Footer.css'

// The Footer component serves as the bottom of the website. It displays all of the sources and
// other information regarding the National Park Service and the API I used.
const Footer = () => {
    return (
        <div>
            <div className="footer">
                <h1>National Parks Activity Finder</h1>
                <a href="https://www.nps.gov/subjects/developer/api-documentation.htm#/">National Parks Service API</a>
                <a href="https://www.nps.gov/index.htm">National Parks Service Website</a>
                <img src="./pictures/nps-logo.png" alt="NPS logo" className="footerBackground"></img>
            </div>
        </div>
    )
}

export default Footer