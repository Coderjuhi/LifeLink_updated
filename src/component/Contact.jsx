import React from 'react'
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react';

function Contact() {
  return (
    <>
      <section className="max-w-7xl mx-auto p-6 pt-20">
        <div className="bg-gradient-to-r from-red-400 via-red-300 to-red-400 shadow-lg overflow-hidden flex flex-col items-center justify-center min-h-[30vh] text-center px-4 py-10 rounded-xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-red-500 ">
            Contact
          </h3>
          <p className="text-base md:text-lg font-medium text-white max-w-2xl">
            At LifeLink, we’re always here to help.
            Whether you’re a donor looking to contribute,
            a hospital wanting to collaborate, or a recipient in need of urgent assistance,
            our team is just a message away
          </p>
        </div>
      </section>
      {/* //second  */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start shadow-lg rounded-xl p-8">

            {/* Left Side - Contact Info */}
            <div className="space-y-4">
              <p className="flex items-center gap-3 text-gray-700">
                <MapPin className="text-red-600 text-xl" />
                <span><strong>Address:</strong> LifeLink HQ, New Delhi, India</span>
              </p>
              <p className="flex items-center gap-3 text-gray-700">
                <Phone className="text-red-600 text-xl" />
                <span><strong>Phone:</strong> +91 98xxxxxxx</span>
              </p>
              <p className="flex items-center gap-3 text-gray-700">
                <Mail className="text-red-600 text-xl" />
                <span><strong>Email:</strong> support@lifelink.org</span>
              </p>
              <p className="mt-4 text-gray-600 flex items-center justify-center lg:justify-start gap-2">
                <MessageCircle className="text-red-600" size={18} aria-hidden="true" />
                <span>
                  Fill out the form, and our team will get back to you within{' '}
                  <span className="font-semibold">24 hours</span>.
                </span>
              </p>
            </div>

            {/* Right Side - Contact Form */}
            <div>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    rows="4"
                    placeholder="Your Message"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-300"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg shadow-md transition"
                >
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>


    </>
  )
}

export default Contact
