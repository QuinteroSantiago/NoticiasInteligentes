import React from 'react'
import Intro from './components/Intro'
import Footer from './components/Footer'
import NewsFeed from './components/NewsFeed'
import TimeKeeper from './components/TimeKeeper'

function App() {

  return (
    <div>
      <Intro />
      <TimeKeeper />
      <NewsFeed />
      <Footer />
    </div>
  )
}

export default App
