import React from 'react'
import Park from './Park'
import {Dropdown} from 'semantic-ui-react'

// ActivityList holds the activity dropdown and the list of parks associated with the specified activity.
class ActivityList extends React.Component {
    constructor(props) {
        super(props)
        // The activity and apiKey values are taken from the parent component ActivityFinder.
        // The activities and parks values are handled by ActivityList.
        // 
        // KEY:
        // activity - current selected activity (based upon dropdown value)
        // apiKey - my api key to make requests
        // activities - all possible activities at National Parks
        // parks - all parks associated with the currently-selected activity
        this.state = {
            activity: this.props.activity,
            apiKey: this.props.apiKey,
            activities: [],
            parks: [],
        }
    }

    // onChange is called when the currently-selected activity changes based upon user input.
    onChange = async (event, data) => {
        // parks is cleared and activity is set to the new activity.
        this.setState((state, props) => ({
            parks: [],
            activity: this.state.activities[data.value].text,
        }))
        // The new activity value is sent to ActivityFinder.
        // await is used to ensure the callback finishes before the parks are updated.
        await this.props.parentCallback(this.state.activities[data.value].text)
        // API call to get all parks associated with the newly-selected activity.
        fetch(`https://developer.nps.gov/api/v1/activities/parks?q=${this.state.activity}&api_key=${this.state.apiKey}`)
        .then(response => response.json())
        .then(json => {
                this.setState({
                parks: json["data"][0]["parks"]
            })
        })
    }
    
    // render generates the dropdown list and the list of parks associated with the currently-selected
    // activity as well as the park information.
    render() {
        // entries starts out empty but adds Park elements.
        var entries = []
        // Iterate through each park json in the parks array.
        for(var i = 0; i < this.state.parks.length; i++) {
            // Create an entry for each park that contains all necessary park information.
            // The apiKey and park json are sent to the Park component for more api calls.
            var entry = <Park apiKey={this.state.apiKey} data={this.state.parks[i]}/>
            // The park entry is added to the entries array.
            entries.push(entry)
        }
        // The div container holds all park entries.
        var container = React.createElement("div", {}, [entries])
        return (
            <div className="dropdown">
                {/* The dropdown holds all the activities at the National Parks. */}
                {/* The dropdown calls onChange when the selected activity value changes. */}
                <Dropdown
                    placeholder="Activity"
                    search
                    selection
                    options={this.state.activities}
                    onChange={this.onChange}
                />
                {/* The container of park entries is displayed. */}
                {container}
            </div>
        )
    }

    // componentDidMount is called when this component is created. An api call is made to get
    // all the activities possible at National Parks.
    componentDidMount() {
        // API call to get all activities.
        fetch(`https://developer.nps.gov/api/v1/activities?api_key=${this.state.apiKey}`)
        .then(response => response.json())
        .then(json => {
            // allActivities starts out empty but adds possible activities.
            const allActivities = []
            // Iterate through all 40 activities.
            for(var i = 0; i < 40; i++) {
                // act is an object that holds specific traits related to each activity.
                // The key -value pair is needed for the dropdown and the text allows the
                // user to visually understand what the activity is.
                const act = {}
                act.key = i
                act.text = json.data[i].name
                act.value = i
                // Each activity object is added to the allActivities array.
                allActivities.push(act)
            }
            // activities is updated with the new activities.
            this.setState({
                activities: allActivities
            })
        })
    }
}

export default ActivityList