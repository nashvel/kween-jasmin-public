import { useState, useRef, useEffect } from 'react'
import { Copy, Download, RotateCcw, Sparkles, Sliders, Settings2 } from 'lucide-react'
import React from 'react'
import Swal from 'sweetalert2'
import { motion, AnimatePresence } from 'framer-motion'
import html2canvas from 'html2canvas'

interface FontImage {
  char: string
  src: string
}

const FontGenerator = () => {
  const [inputText, setInputText] = useState('NACHT')
  const [fontImages, setFontImages] = useState<FontImage[]>([])
  const [loading, setLoading] = useState(false)
  const [imageSize, setImageSize] = useState(100)
  const [showSettings, setShowSettings] = useState(true)
  const gridRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (fontImages.length > 0 && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [fontImages])

  const generateFonts = async () => {
    if (!inputText.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Empty Input',
        text: 'Please enter some text to generate fonts',
        confirmButtonColor: '#10b981',
      })
      return
    }

    setLoading(true)
    const images: FontImage[] = []

    try {
      const upperText = inputText.toUpperCase()

      for (const char of upperText) {
        if (char === ' ') {
          images.push({ char: ' ', src: '' })
          continue
        }

        if (/[A-Z]/.test(char)) {
          const imagePath = `/kweenfont/${char}.jpg`
          images.push({ char, src: imagePath })
        }
      }

      setFontImages(images)

      if (images.length > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: `Generated ${images.length} font characters`,
          confirmButtonColor: '#10b981',
          timer: 1500,
          showConfirmButton: false,
          returnFocus: false
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to generate fonts',
        confirmButtonColor: '#10b981',
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    const text = inputText.toUpperCase()
    navigator.clipboard.writeText(text)
    Swal.fire({
      icon: 'success',
      title: 'Copied!',
      text: 'Text copied to clipboard',
      timer: 1500,
      showConfirmButton: false,
      confirmButtonColor: '#10b981',
    })
  }

  const downloadImages = async () => {
    if (fontImages.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No Images',
        text: 'Generate fonts first before downloading',
        confirmButtonColor: '#10b981',
      })
      return
    }

    try {
      if (gridRef.current) {
        const canvas = await html2canvas(gridRef.current, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
          onclone: (clonedDoc) => {
            const clonedGrid = clonedDoc.querySelector('[data-id="font-grid"]') as HTMLElement
            if (clonedGrid) {
              clonedGrid.style.width = 'max-content'
              clonedGrid.style.height = 'auto'
              clonedGrid.style.minHeight = '0'
              clonedGrid.style.padding = '0'
              clonedGrid.style.overflow = 'visible'
              clonedGrid.style.flexWrap = 'nowrap'
              clonedGrid.style.gap = '0'

              // Ensure all items are at their full size
              const items = clonedGrid.children
              for (let i = 0; i < items.length; i++) {
                const item = items[i] as HTMLElement
                item.style.width = `${imageSize}px`
                item.style.flexShrink = '0'
              }
            }
          }
        })

        const link = document.createElement('a')
        link.href = canvas.toDataURL('image/png')
        link.download = `kween-font-${inputText.toUpperCase()}-${Date.now()}.png`
        link.click()

        Swal.fire({
          icon: 'success',
          title: 'Downloaded!',
          text: 'Your font image has been downloaded',
          timer: 2000,
          showConfirmButton: false,
          confirmButtonColor: '#10b981',
        })
      }
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Download Failed',
        text: 'Failed to download the image',
        confirmButtonColor: '#10b981',
      })
    }
  }

  const resetForm = () => {
    setInputText('NACHT')
    setFontImages([])
    setImageSize(100)
    Swal.fire({
      icon: 'info',
      title: 'Reset',
      text: 'Form has been reset',
      timer: 1000,
      showConfirmButton: false,
      confirmButtonColor: '#10b981',
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      generateFonts()
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 mb-8"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
          Font Generator
        </h2>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
          Transform your text into beautiful Kween font characters. Type anything and watch the magic happen!
        </p>
      </motion.div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <label className="block text-lg font-semibold text-gray-900">
          Enter Your Text
        </label>
        <div className="relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value.toUpperCase())}
            onKeyPress={handleKeyPress}
            placeholder="Type something like 'Nacht Handsome'"
            className="w-full px-4 sm:px-6 py-3 sm:py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition bg-white shadow-sm"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-md">
            {inputText.length} chars
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={generateFonts}
          disabled={loading}
          className="col-span-1 sm:col-span-2 px-6 py-3 bg-white text-gray-700 border-2 border-gray-200 font-semibold rounded-xl hover:bg-gray-50 hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <Sparkles className="animate-spin text-emerald-600" size={20} />
          ) : (
            <Sparkles className="text-emerald-600" size={20} />
          )}
          {loading ? 'Generating...' : 'Generate Fonts'}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={copyToClipboard}
          className="px-4 py-3 bg-white text-gray-700 border-2 border-gray-200 font-semibold rounded-xl hover:bg-gray-50 hover:shadow-lg transition flex items-center justify-center gap-2"
        >
          <Copy className="text-emerald-600" size={18} />
          <span>Copy Text</span>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {fontImages.length > 0 && (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-gray-900">Generated Result</h3>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                    {fontImages.length} CHARS
                  </span>
                </div>

                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition text-sm font-medium ${showSettings
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                >
                  <Settings2 size={16} />
                  <span>Display Settings</span>
                </button>
              </div>

              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 mt-4 border-t border-gray-200">
                      <div className="flex items-center gap-4 max-w-md">
                        <Sliders size={20} className="text-gray-400" />
                        <div className="flex-1">
                          <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium text-gray-700">Image Size</label>
                            <span className="text-xs text-gray-500">{imageSize}px</span>
                          </div>
                          <input
                            type="range"
                            min="20"
                            max="200"
                            value={imageSize}
                            onChange={(e) => setImageSize(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-gray-100 shadow-sm overflow-hidden">
              <div
                ref={gridRef}
                data-id="font-grid"
                className="flex flex-nowrap justify-center items-center gap-1 overflow-x-auto min-h-[200px] py-4"
              >
                {fontImages.map((img, idx) => (
                  <motion.div
                    layout
                    key={`${idx}-${img.char}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: idx * 0.02
                    }}
                    style={{
                      width: imageSize,
                      flexShrink: 1,
                      maxWidth: '100%'
                    }}
                    className="group relative"
                  >
                    {img.src ? (
                      <div className="relative overflow-hidden rounded-lg bg-transparent hover:shadow-md transition-all duration-200">
                        <img
                          src={img.src}
                          alt={img.char}
                          className="w-full aspect-square object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect fill=%22%23f3f4f6%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%22 y=%2250%22 font-size=%2240%22 fill=%22%23999%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3E?%3C/text%3E%3C/svg%3E'
                          }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          {imageSize > 60 && (
                            <span className="text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md">
                              {img.char}
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="w-full aspect-square bg-transparent"></div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={downloadImages}
                className="px-4 py-3 bg-white text-gray-700 border-2 border-gray-200 font-semibold rounded-xl hover:bg-gray-50 hover:shadow-lg transition flex items-center justify-center gap-2"
              >
                <Download className="text-emerald-600" size={18} />
                <span>Download Image</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetForm}
                className="px-4 py-3 bg-white text-emerald-700 border-2 border-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 hover:shadow-lg transition flex items-center justify-center gap-2"
              >
                <RotateCcw className="text-emerald-600" size={18} />
                <span>Reset All</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {fontImages.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 sm:py-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200"
        >
          <div className="mb-4 flex justify-center">
            <div className="bg-white p-4 rounded-full shadow-sm">
              <Sparkles size={40} className="text-emerald-500" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Create?</h3>
          <p className="text-gray-500 text-base max-w-md mx-auto">
            Enter your text above and click "Generate Fonts" to create your unique Kween font message.
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default FontGenerator
