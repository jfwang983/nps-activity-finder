import React from 'react'
import ActivityList from './ActivityList'
import './ActivityFinder.css'

// The ActivityFinder component is the parent class to the ActivityList and handles the state data of
// the child component. The current activity that is selected is saved here as well as the api key
// for the website to make requests with. Most of the activity finder work is done in the activity 
// list component.
class ActivityFinder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activity: null,
            apiKey: "0XkmR8Mz014oPPOfysNPBEKqSSQKbP25wtEXgQTa"
        }
    }

    // activity is updated when parentCallback is called by ActivityList.
    onSelectActivity = (data) => {
        this.setState({
            activity: data
        })
    }

    render() {
        return(
            <div className = "list">
                <h2>Select Activity</h2>
                <div className = "list" >
                    {/* activity and apiKey are passed down for ActivityList to have as the state. */}
                    {/* parentCallback is called when ActivityList changes the value of the activity dropdown. */}
                    <ActivityList activity={this.state.activity} apiKey={this.state.apiKey} parentCallback={this.onSelectActivity}/>
                </div>
            </div>
        )
    }
}

export default ActivityFinder