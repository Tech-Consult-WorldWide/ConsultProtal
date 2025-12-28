import React from 'react';

export default function About() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <header className="bg-white shadow">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">About ConsultProtal</h1>
                    <p className="mt-2 text-gray-600">Trusted consultants, measurable outcomes.</p>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-8 shadow-lg">
                    <div className="md:flex md:items-center md:justify-between">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold">We help organizations move faster and smarter</h2>
                            <p className="mt-3 text-blue-100 max-w-2xl">Connect with vetted consultants who deliver strategy, product, operations and finance expertise — tailored to your goals.</p>
                            <div className="mt-6 flex gap-3">
                                <a href="/booking" className="inline-block bg-white text-blue-700 px-5 py-2 rounded-md font-medium shadow hover:opacity-95">Book a call</a>
                                <a href="#services" className="inline-block border border-white/30 text-white px-5 py-2 rounded-md hover:bg-white/10">Our services</a>
                            </div>
                        </div>
                        <div className="mt-6 md:mt-0">
                            <img src={`${process.env.PUBLIC_URL}/Assets/team-illustration.svg`} alt="Consulting" className="w-56 h-40 object-contain opacity-95" onError={(e)=>{e.target.style.display='none'}} />
                        </div>
                    </div>
                </section>

                <section id="services" className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-xl font-semibold">Strategy</h3>
                        <p className="mt-2 text-gray-600">Market entry, growth strategy and business model design to unlock value.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-xl font-semibold">Product</h3>
                        <p className="mt-2 text-gray-600">Product discovery, roadmaps and go-to-market planning focused on customers.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-xl font-semibold">Operations</h3>
                        <p className="mt-2 text-gray-600">Operational scaling, process design and performance improvements.</p>
                    </div>
                </section>

                <section className="mt-12 bg-white rounded-lg shadow p-6">
                    <h3 className="text-2xl font-bold">Our mission</h3>
                    <p className="mt-3 text-gray-600">To deliver practical, data-informed consulting that helps teams ship faster, cut waste, and grow sustainably.</p>

                    <div className="mt-6 grid sm:grid-cols-2 gap-4">
                        <div className="p-4 border rounded">
                            <h4 className="font-semibold">Outcome-focused</h4>
                            <p className="text-gray-600 mt-1">We define clear success metrics and link our work to measurable impact.</p>
                        </div>
                        <div className="p-4 border rounded">
                            <h4 className="font-semibold">Collaborative</h4>
                            <p className="text-gray-600 mt-1">We work alongside your team and transfer knowledge for long-term gains.</p>
                        </div>
                    </div>
                </section>

                <section className="mt-12">
                    <h3 className="text-2xl font-bold">Meet a few of our consultants</h3>
                    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="mx-auto w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-2xl font-semibold text-blue-700">AK</div>
                            <h4 className="mt-4 font-semibold">Dr. Aisha Khan</h4>
                            <p className="text-sm text-gray-500 mt-1">Lead Strategy Consultant — startups & scaleups</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="mx-auto w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-2xl font-semibold text-blue-700">MA</div>
                            <h4 className="mt-4 font-semibold">Michael Adeyemi</h4>
                            <p className="text-sm text-gray-500 mt-1">Product & Ops Advisor</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="mx-auto w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-2xl font-semibold text-blue-700">SP</div>
                            <h4 className="mt-4 font-semibold">Sara Park</h4>
                            <p className="text-sm text-gray-500 mt-1">Finance & Risk Specialist</p>
                        </div>
                    </div>
                </section>

                <section className="mt-12 bg-white rounded-lg shadow p-6">
                    <h3 className="text-2xl font-bold">Contact & booking</h3>
                    <p className="mt-3 text-gray-600">Email us at <a className="text-blue-600" href="mailto:info@consultportal.com">info@consultportal.com</a> or book a discovery call.</p>
                    <div className="mt-4">
                        <a href="/booking" className="inline-block bg-blue-600 text-white px-5 py-2 rounded-md shadow hover:bg-blue-700">Book a discovery call</a>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-900 text-gray-300 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p>© {new Date().getFullYear()} ConsultProtal — Trusted consultants, measurable outcomes.</p>
                </div>
            </footer>
        </div>
    );
}