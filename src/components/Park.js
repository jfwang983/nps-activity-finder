import React from 'react'
import Frame from './Frame'
import './Park.css'

// Park holds all information related to a specific park.
class Park extends React.Component {
    constructor(props) {
        super(props)
        // The park json and apiKey values are taken from the parent component ActivityList.
        // 
        // KEY:
        // apiKey - my api key to make requests
        // data - All webcam information related to this park as json
        // buttonEnabled - Whether the View Webcams button is enabled or not
        // camLinks - List of all camera links available at this park
        this.state = {
            apiKey: this.props.apiKey,
            data: this.props.data,
            buttonEnabled: false,
            camLinks: []
        }
    }

    // toggleButtonState is called when the View Webcams button is clicked.
    toggleButtonState = () => {
        // If the webcams are disabled, then enable them.
        if(!this.state.buttonEnabled) {
            // API call to get all webcam information at this park.
            fetch(`https://developer.nps.gov/api/v1/webcams?q=${this.props.data.fullName}&api_key=${this.state.apiKey}`)
            .then(response => response.json())
            .then(json => {
                // newCamLinks starts out empty but adds each webcam.
                var newCamLinks = [];
                // Iterate through each row of webcam information in the json.
                for(var i = 0; i < json.data.length; i++) {
                    // Each webcam json data is added to the newCamLinks array.
                    newCamLinks.push(json.data[i]);
                }
                // camLinks is updated with the new list of camLinks.
                this.setState({
                    buttonEnabled: true,
                    camLinks: newCamLinks
                })
            })
        }
        // If the webcams are enabled, then disable them.
        else {
            this.setState({
                buttonEnabled: false
            })
        }
    }

    // render generates the park information.
    render() {
        // container holds all of the webcam information and the webcams.
        var container;
        // buttonMessage is the text on the button that enables/disables webcams.
        var buttonMessage;
         // If the webcams are enabled.
        if(this.state.buttonEnabled) {
            // Set button text to "Close Webcams" because the webcams are already enabled.
            buttonMessage = "Close Webcams";
            // entries starts out empty but adds webcam frames.
            var entries = []
            // Iterate through each row of webcam information in the json.
            for(var i = 0; i < this.state.camLinks.length; i++) {
                // Create an entry for each webcam that contains all webcam information.
                // The webcam json is passed to the Frame component.
                var entry = <Frame source={this.state.camLinks[i]}/>
                // Each webcam frame is added to the newCamLinks array.
                entries.push(entry)
            }
            // If there are no webcams available at this park.
            if(entries.length === 0) {
                var message = React.createElement("p", {}, "There are no webcams for this park")
                // Set the container to a div with the message that there are no webcams.
                container = React.createElement("div", {}, [message])
            }
            // If there is at least 1 webcam available at this park.
            else {
                // Set the container to a div with all the webcam frames.
                container = React.createElement("div", {}, [entries])
            }
        }
        // If the webcams are disabled.
        else {
            // Set button text to "View Webcams" because the webcams are already disabled.
            buttonMessage = "View Webcams";
            // Set the container to an empty div.
            container = React.createElement("div", {});
        }
        return(
            // Return a div with all park information, including webcams.
            <div className="box">
                <h3>{this.props.data.fullName}</h3>
                <p>Nickname: {this.props.data.name}</p>
                <p>Location: {this.props.data.states}</p>
                <p>Designation: {this.props.data.designation}</p>
                <a href={this.props.data.url} target="_blank" rel="noreferrer">Learn more about {this.props.data.name}</a>
                {container}
                {/* When the button is clicked, toggleButtonState is called. */}
                <button onClick={this.toggleButtonState}>{buttonMessage}</button>
            </div>
        )
    }
}

export default Park