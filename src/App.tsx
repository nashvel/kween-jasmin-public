import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { motion, AnimatePresence } from 'framer-motion'
import { Download } from 'lucide-react'
import FontGenerator from './components/FontGenerator'
import About from './components/About'
import Preloader from './components/Preloader'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState('home')
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      setDeferredPrompt(null)
    }
  }

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a
              href="https://www.facebook.com/github.nacht"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img src="/nacht/logo.png" alt="Kween Font" className="w-12 h-12 object-contain" />
              <h1 className="text-xl font-bold text-gray-900 hidden sm:block">Kween Font</h1>
            </a>

            <nav className="hidden md:flex items-center gap-8">
              <button onClick={() => setCurrentPage('home')} className="text-gray-600 hover:text-gray-900 transition text-sm font-medium">Home</button>
              <button onClick={() => setCurrentPage('home')} className="text-gray-600 hover:text-gray-900 transition text-sm font-medium">Generator</button>
              <button onClick={() => setCurrentPage('about')} className="text-gray-600 hover:text-gray-900 transition text-sm font-medium">About</button>

              {deferredPrompt && (
                <button
                  onClick={handleInstallClick}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg font-medium text-sm hover:bg-emerald-100 transition"
                >
                  <Download size={16} />
                  Install App
                </button>
              )}

              <button
                onClick={() => Swal.fire('Coming Soon!', 'More features coming soon', 'info')}
                className="px-4 py-2 bg-white text-emerald-700 border-2 border-gray-200 rounded-lg font-medium text-sm hover:bg-gray-50 hover:shadow-lg transition"
              >
                Contact
              </button>
            </nav>

            <label className="md:hidden menu-toggle">
              <input
                type="checkbox"
                checked={isMenuOpen}
                onChange={toggleMenu}
              />
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="30" />
                <path className="line--1" d="M0 40h62c13 0 6 28-4 18L35 35" />
                <path className="line--2" d="M0 50h70" />
                <path className="line--3" d="M0 60h62c13 0 6-28-4-18L35 65" />
              </svg>
            </label>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-gray-100 py-4 space-y-3"
              >
                <button onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} className="block text-gray-600 hover:text-gray-900 transition font-medium">Home</button>
                <button onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} className="block text-gray-600 hover:text-gray-900 transition font-medium">Generator</button>
                <button onClick={() => { setCurrentPage('about'); setIsMenuOpen(false); }} className="block text-gray-600 hover:text-gray-900 transition font-medium">About</button>

                {deferredPrompt && (
                  <button
                    onClick={() => {
                      handleInstallClick()
                      setIsMenuOpen(false)
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg font-medium hover:bg-emerald-100 transition"
                  >
                    <Download size={16} />
                    Install App
                  </button>
                )}

                <button
                  onClick={() => {
                    Swal.fire('Coming Soon!', 'More features coming soon', 'info')
                    setIsMenuOpen(false)
                  }}
                  className="w-full px-4 py-2 bg-white text-emerald-700 border-2 border-gray-200 rounded-lg font-medium hover:bg-gray-50 hover:shadow-lg transition"
                >
                  Contact
                </button>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {currentPage === 'home' ? <FontGenerator /> : <About />}
      </main>

      <footer className="bg-gray-50 border-t border-gray-100 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 text-sm">
            <p>Kween Font Generator. All rights reserved.</p>
            <p className="mt-2">Made with ❤️ for beautiful typography</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
