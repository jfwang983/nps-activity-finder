import React from 'react'
import './Header.css'

// The Header component serves as the top of the website. It displays the website title and a
// background image to make the website have a more immersive experience.
const Header = () => {
    return (
        <div>
            <img src="./pictures/header-background.jpg" alt="header-background" className="headerBackground"></img>
            <div className="header">
                <h1>National Parks Activity Finder</h1>
            </div>
        </div>
    )
}

export default Header
