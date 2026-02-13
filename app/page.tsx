import React from 'react'
import Hello from './components/hello'
const Home = () => {
  console.log("what type of componets ")

  return (
    <main>

      <div className='5x1 underline'> Welcome to Home</div>
      <Hello />
    </main>
  )
}

export default Home