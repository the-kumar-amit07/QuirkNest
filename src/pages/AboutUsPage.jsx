    /* eslint-disable no-unused-vars */
    import React from "react";
    import { motion } from "framer-motion";

    const AboutPage = () => {
    return (
        <div className="max-w-7xl mx-auto p-6">
            <motion.h1 
                className="text-4xl font-bold text-center mb-6" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }}
            >
                About Us
            </motion.h1>
            
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }}
            >
                <div className="p-4">
                    <h2 className="text-2xl font-semibold">Our Story</h2>
                    <p className="mt-2 text-gray-700">
                        We are passionate about sharing knowledge and insights through our blog. Our journey began with a simple idea: to create a platform where ideas flourish and creativity thrives.
                    </p>
                    <img src="https://img.freepik.com/free-vector/forming-team-leadership-concept-illustration_114360-13973.jpg?t=st=1727024045~exp=1727027645~hmac=bfa5c4794bdeab8d4fb3e8b7958772ebd72b124b7c0dedc38d8c7c49eecd0d1b&w=1800" alt="Our Story" className="mt-4 rounded-lg shadow-lg"/>
                </div>

                <div className="p-4">
                    <h2 className="text-2xl font-semibold">AI Generation Feature</h2>
                    <p className="mt-2 text-gray-700">
                        Our blog harnesses the power of AI to generate insightful content that resonates with our readers. This innovative feature ensures that we provide you with the most relevant and engaging articles.
                    </p>
                    <img src="https://img.freepik.com/free-vector/programmers-chatbot-processing-natural-language-natural-language-processing-chatbot-natural-language-natural-language-scince-concept_335657-1872.jpg?t=st=1727024265~exp=1727027865~hmac=83f9c294887cfc3c0809185f048a06f9430759a240b40ad47ba0f76a16f8f526&w=1800" alt="AI Generation" className="mt-4 rounded-lg shadow-lg"/>
                </div>
            </motion.div>

            <motion.div 
                className="mt-6 text-center" 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-semibold">Join Us</h2>
                <p className="mt-2 text-gray-700">
                    Follow our journey and be a part of our growing community. Together, lets explore the endless possibilities of knowledge!
                </p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    Contact Us
                </button>
            </motion.div>
        </div>
    );
};

    export default AboutPage;
