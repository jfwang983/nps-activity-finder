import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import ActivityFinder from './components/ActivityFinder'

// The App component holds the three main components of the website - the header, the activity finder,
// and the footer. The bulk of the work is done in the activity finder.
const App = () => {
  // The outer-middle-inner structure was designed to horizontally and vertically center the
  // elements inside of the inner class, which is where the ActivityFinder component is in.
  return (
    <div className="outer">
      <div className="middle">
      <Header/>
        <div className="inner">
          <ActivityFinder/>
        </div>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
