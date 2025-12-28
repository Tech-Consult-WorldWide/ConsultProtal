import React from 'react';

const About: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
                    <p className="text-xl text-gray-600">
                        Your trusted consulting platform
                    </p>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
                    {/* Mission */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                            Our Mission
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            We are dedicated to providing expert consulting services that help
                            businesses and individuals achieve their goals through strategic
                            guidance and innovative solutions.
                        </p>
                    </section>

                    {/* Vision */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                            Our Vision
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            To be the leading consulting platform that transforms ideas into
                            reality and empowers our clients to reach new heights of success.
                        </p>
                    </section>

                    {/* Values */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            Our Values
                        </h2>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-3">✓</span>
                                <span>Excellence in every engagement</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-3">✓</span>
                                <span>Client-centric approach</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-3">✓</span>
                                <span>Integrity and transparency</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-3">✓</span>
                                <span>Innovation and continuous improvement</span>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default About;