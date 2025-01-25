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
      image: "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
    },
    {
      name: "Michael Chen",
      role: "Graphic Designer",
      rating: 4,
      review:
        "Incredibly versatile tool. The style variations and customization options are exactly what I needed for my projects.",
      image: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
    },
    {
      name: "Emma Williams",
      role: "Content Creator",
      rating: 5,
      review:
        "The ease of use and quick results make this my go-to choice for generating unique images. Absolutely love it!",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Hb5xzFZJCTW4cMqmPwsgfw-gILUV7QevvQ&s",
    },
    {
      name: "David Miller",
      role: "UI/UX Designer",
      rating: 5,
      review:
        "Outstanding results every time. The AI understands exactly what I'm looking for and delivers consistently.",
      image: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=",
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
                  src={testimonial.image}
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
