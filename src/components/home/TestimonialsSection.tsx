
import React from 'react';

const testimonials = [
  {
    quote: "SmartHeal helped me find a specialist doctor quickly when I needed urgent care. The appointment system is very easy to use.",
    author: "Rahul Sharma",
    role: "Patient"
  },
  {
    quote: "The AI health assistant provided valuable information about my medication and potential side effects. Very convenient!",
    author: "Priya Patel",
    role: "Patient"
  },
  {
    quote: "As a doctor, I appreciate how SmartHeal makes it easy for patients to find and connect with healthcare providers in their area.",
    author: "Dr. Arjun Reddy",
    role: "Cardiologist"
  }
];

const TestimonialsSection = () => {
  return (
    <div className="py-16 bg-healSmart-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What People Say</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Read testimonials from patients and healthcare providers who have used our platform.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="mb-4">
                <svg className="h-8 w-8 text-healSmart-blue opacity-50" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">{testimonial.quote}</p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
