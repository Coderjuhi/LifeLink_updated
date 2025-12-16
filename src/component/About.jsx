import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    text: "LifeLink helped us find a blood donor in just 20 minutes during an emergency. Truly a life-saving platform!",
    name: "Ananya Sharma",
    role: "Patient’s Sister",
  },
  {
    text: "As a donor, I always wanted to contribute but didn’t know how. LifeLink made the process simple and meaningful.",
    name: "Rahul Mehta",
    role: "Registered Donor",
  },
  {
    text: "Our hospital now manages blood stock and donor requests easily through LifeLink. It has improved our emergency response time.",
    name: "Dr. Priya Nair",
    role: "City Hospital",
  },
  {
    text: "Thanks to LifeLink, I was able to donate blood for the first time. It feels amazing to make a difference.",
    name: "Amit Kumar",
    role: "First-Time Donor",
  },
];

const About = () => {
  const [index, setIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <>
      <section className="max-w-7xl mx-auto p-6 pt-20">
  <div className="bg-linear-to-r from-red-400 via-red-300 to-red-400 shadow-lg overflow-hidden flex flex-col items-center justify-center min-h-[40vh] text-center px-4 py-10 rounded-xl">
    <h3 className="text-2xl md:text-3xl font-bold mb-6 text-red-500 ">
      Who We Are?
    </h3>
    <p className="text-base md:text-lg font-medium text-white max-w-2xl">
      LifeLink is a digital platform dedicated to connecting blood and organ
      donors, hospitals, and patients in need. Our mission is simple – to
      ensure that no life is lost due to the unavailability of blood or organs.
    </p>
  </div>
</section>


      {/* //second container */}
      <section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left Side - Text */}
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <p className="text-lg text-gray-600 mb-6">
          LifeLink was founded with a simple yet powerful vision: to create a world where
          no one dies waiting for blood or organ donations. We leverage cutting-edge technology
          to connect donors with recipients instantly, ensuring that help arrives when it's needed most.
        </p>
        <p className="text-lg text-gray-600 mb-8">
          Every day, thousands of people need blood transfusions and organ transplants.
          Our platform eliminates barriers, reduces wait times, and saves lives by building
          the largest network of verified donors and healthcare providers.
        </p>
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">0K+</div>
            <div className="text-gray-600">Active Donors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">0K+</div>
            <div className="text-gray-600">Lives Saved</div>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="relative">
        <img
          src="https://www.toomed.com/blog/wp-content/uploads/2017/11/stethoscope-1-original.jpg"
          alt="Healthcare Mission"
          className="rounded-lg shadow-xl"
        />
      </div>
    </div>
  </div>
</section>







      {/* //last container */}

      <section className="py-20 bg-gradient-to-br from-gray-50 via-red-50/40 to-gray-100">
        <div className="max-w-5xl mx-auto px-6 text-center relative">
          <h2 className="text-4xl font-bold text-red-400 mb-14">
            What People Say About LifeLink ❤️
          </h2>

          {/* Testimonial Card */}
          <div className="relative w-full max-w-xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="bg-white shadow-xl rounded-2xl px-8 py-10 border-l-8 border-orange-400"
              >
                <p className="text-gray-700 italic text-lg leading-relaxed">
                  “{testimonials[index].text}”
                </p>
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 text-xl">
                    {testimonials[index].name}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {testimonials[index].role}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Left Button */}
            <button
              onClick={handlePrev}
              className="absolute top-1/2 -left-6 -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full shadow-md hover:bg-orange-600 transition"
            >
              <ChevronLeft />
            </button>

            {/* Right Button */}
            <button
              onClick={handleNext}
              className="absolute top-1/2 -right-6 -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full shadow-md hover:bg-orange-600 transition"
            >
              <ChevronRight />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition ${i === index ? "bg-orange-500 scale-125" : "bg-gray-400"
                  }`}
              ></button>
            ))}
          </div>
        </div>
      </section>


    </>
  );
};

export default About;