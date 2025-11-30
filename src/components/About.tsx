import { motion } from 'framer-motion'

const About = () => {
    return (
        <div className="min-h-screen bg-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6 mb-12"
            >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">
                    About Kween Font Generator
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                    Transform your text into beautiful, stylized Kween font characters with ease.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 sm:p-8 mb-12 border-2 border-gray-100"
            >
                <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Created By</h3>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="https://www.facebook.com/github.nacht"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:shadow-lg transition font-medium"
                        >
                            <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            <span>fb.com/github.nacht</span>
                        </a>
                        <a
                            href="http://nacht-get.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:shadow-lg transition font-medium"
                        >
                            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                            <span>Visit Portfolio</span>
                        </a>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white border-2 border-gray-200 rounded-3xl p-8 sm:p-12 mb-12"
            >
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-white text-emerald-600 border-2 border-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                            1
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Enter Text</h4>
                        <p className="text-sm text-gray-600">Type your message in the input field</p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-white text-emerald-600 border-2 border-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                            2
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Generate</h4>
                        <p className="text-sm text-gray-600">Click the generate button</p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-white text-emerald-600 border-2 border-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                            3
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Customize</h4>
                        <p className="text-sm text-gray-600">Adjust size to your preference</p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-white text-emerald-600 border-2 border-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                            4
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Download</h4>
                        <p className="text-sm text-gray-600">Save your creation as an image</p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center bg-white rounded-3xl p-12 border-2 border-gray-100"
            >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Create?</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                    Start transforming your text into beautiful Kween font characters today.
                </p>
                <a
                    href="/"
                    className="inline-block px-8 py-4 bg-white text-emerald-600 border-2 border-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 hover:shadow-lg transition"
                >
                    Try Font Generator
                </a>
            </motion.div>
        </div>
    )
}

export default About
