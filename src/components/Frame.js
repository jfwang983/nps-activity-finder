import React from 'react'
import './Frame.css'

// Frame holds the webcam information.
const Frame = (source) => {
    return (
        <div>
            <div className="title">
                <h3>{source.source.title} Webcam</h3>
                <p>Scroll down in the below frame to see the webcam</p>
            </div>
            <iframe src={source.source.url} title={source.source.url}></iframe>
            <div className="status">
                <p>Status:&nbsp;</p>
                <p className={source.source.status}>{source.source.status}</p>
            </div>
            <div className="description">
                <p>Description:</p>
                <p>{source.source.description}</p>
            </div>
        </div>
    )
}

export default Frame