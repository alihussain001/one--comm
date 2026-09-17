import { useState } from 'react'
import './App.css'
import Login from './components/login'
import SignUp from './components/signup'

function App() {
  const [currentView, setCurrentView] = useState<'login' | 'signup'>('login')

  return (
    <>
      {currentView === 'login' ? (
        <Login onNavigateToSignup={() => setCurrentView('signup')} />
      ) : (
        <SignUp onNavigateToLogin={() => setCurrentView('login')} />
      )}
    </>
  )
}

export default App
