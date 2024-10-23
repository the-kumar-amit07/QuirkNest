    /* eslint-disable no-unused-vars */
    import React from "react";
    import { Link } from "react-router-dom";
    import Observation from "../assets/Observation.png";
    import Banner from "../assets/banner-blog.png";
import { Footer } from "../components";

    function HomePage() {
    return (
        <div className="w-full bg-white mx-auto">
        {/* Animated Banner */}
        <div className="relative px-6 pt-10 h-screen bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800">
            <div className="container px-4 flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left lg:w-1/2">
                <h1 className="text-3xl lg:text-4xl font-semibold mb-4">
                Welcome to QuirkNest
                </h1>
                <p className="text-base lg:text-lg mb-6 text-gray-600">
                Discover a wide range of insightful posts and stories curated for
                you.
                </p>
                <Link
                to="/add-post"
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-all duration-300"
                >
                Get Started
                </Link>
            </div>
            <div className="lg:w-1/2 flex justify-center lg:justify-end h-full mt-8 lg:mt-0">
                <img
                src={Banner}
                alt="Blog Banner"
                className="w-full h-auto object-contain rounded-md drop-shadow-md"
                />
            </div>
            </div>
        </div>

        {/* Features Section */}
        <div className="h-screen w-full py-8 px-4 bg-white rounded-lg mb-8">
            <div className="px-4 py-6 md:px-8 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Unleash Your Creativity
                </h2>
                <p className="text-gray-600 mb-6 text-justify">
                Welcome to a cutting-edge blog platform where you can effortlessly
                craft, publish, and connect with your audience. Utilize advanced
                tools that streamline post creation, provide insightful analytics,
                and foster deeper engagement with your readers.
                </p>
                <Link
                to="/explore"
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-all duration-300"
                >
                Explore Our Platform
                </Link>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end mt-6 md:mt-0">
                <img
                src={Observation}
                alt="Creative Features"
                className="w-full h-auto object-cover rounded-md drop-shadow-md"
                />
            </div>
            </div>
        </div>

        {/* Additional Features Section */}
        <div className="w-full py-8 px-4 bg-white border-2 shadow-lg rounded-lg mb-8">
            <div className="py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
                Our Features
            </h2>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
                <div className="bg-white rounded-lg border-2 shadow-lg p-8 w-full sm:w-1/2 md:w-1/3">
                <h3 className="text-xl font-semibold text-purple-600 mb-4">
                    High-Quality Content
                </h3>
                <p className="text-gray-600">
                    Enjoy well-researched and engaging articles on a variety of
                    topics.
                </p>
                </div>
                <div className="bg-white rounded-lg border-2  shadow-lg p-8 w-full sm:w-1/2 md:w-1/3">
                <h3 className="text-xl font-semibold text-purple-600 mb-4">
                    Interactive Community
                </h3>
                <p className="text-gray-600">
                    Connect with like-minded individuals through our blog and
                    community forum.
                </p>
                </div>
                <div className="bg-white rounded-lg border-2  shadow-lg p-8 w-full sm:w-1/2 md:w-1/3">
                <h3 className="text-xl font-semibold text-purple-600 mb-4">
                    Personalized Experience
                </h3>
                <p className="text-gray-600">
                    Tailor your experience based on your interests and preferences.
                </p>
                </div>
            </div>
            </div>
        </div>

        {/* CTA Section */}
        <div className="w-full py-8 bg-purple-600 text-white shadow-lg rounded-lg mb-8">
            <div className="px-4 py-6 md:px-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">
                Ready to Share Your Story?
            </h2>
            <p className="text-base mb-6">
                Join our community and start sharing your insights, ideas, and
                stories with the world.
            </p>
            <Link
                to="/signup"
                className="inline-block bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300"
            >
                Join Now
            </Link>
            </div>
            </div>
            <Footer/>
        </div>
    );
    }

    export default HomePage;