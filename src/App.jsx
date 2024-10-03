// App.jsx
import React from 'react'
import Intro from './components/Intro'
import Footer from './components/Footer'
import NewsFeed from './components/NewsFeed'
import TimeKeeper from './components/TimeKeeper'
import { StateProvider } from './StateProvider'

function App() {
  return (
    <StateProvider>
      <div>
        <Intro />
        <TimeKeeper />
        <NewsFeed />
        <Footer />
      </div>
    </StateProvider>
  )
}

export default App