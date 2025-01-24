import React from "react";
import { FaStar } from "react-icons/fa";
import { testimonialsData } from "../assets/assets";
const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Digital Artist",
      rating: 5,
      review:
        "This AI image generator has completely transformed my creative workflow. The quality and speed are unmatched!",
      image: "/avatar1.jpg",
    },
    {
      name: "Michael Chen",
      role: "Graphic Designer",
      rating: 4,
      review:
        "Incredibly versatile tool. The style variations and customization options are exactly what I needed for my projects.",
      image: "/avatar2.jpg",
    },
    {
      name: "Emma Williams",
      role: "Content Creator",
      rating: 5,
      review:
        "The ease of use and quick results make this my go-to choice for generating unique images. Absolutely love it!",
      image: "/avatar3.jpg",
    },
    {
      name: "David Miller",
      role: "UI/UX Designer",
      rating: 5,
      review:
        "Outstanding results every time. The AI understands exactly what I'm looking for and delivers consistently.",
      image: "/avatar4.jpg",
    },
  ];

  return (
    <div className=" px-4 w-full min-h-screen bg-cover bg-center bg-fixed text-white py-16 lg:px-0 backdrop-blur-sm"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')",
    }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-400 text-lg">
            Don't just take our word for it - hear from our satisfied users
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="backdrop-blur-lg bg-white/10 rounded-xl p-6 transform hover:scale-105 transition-all duration-300 border border-gray-700"
            >
              {/* User Info */}
              <div className="flex items-center mb-4">
                <img
                  src={testimonialsData.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-white font-semibold">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`${
                      i < testimonial.rating
                        ? "text-yellow-400"
                        : "text-gray-600"
                    } w-5 h-5`}
                  />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-300 text-sm leading-relaxed">
                "{testimonial.review}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
