"use client"

import { memo } from 'react'

const TESTIMONIALS = [
  {
    name: "Sarah J.",
    type: "INFJ",
    content: "This assessment helped me understand why I approach problems the way I do. The career suggestions were spot on and helped me find a job that truly fits my personality."
  },
  {
    name: "Michael T.",
    type: "ENTJ",
    content: "The entrepreneur insights were incredibly valuable for my business. I now understand my leadership style better and have built a team that complements my strengths and weaknesses."
  },
  {
    name: "Aisha K.",
    type: "ISFP",
    content: "The relationship insights helped me understand patterns in my interactions with others. I've improved my communication with my partner and colleagues significantly."
  }
]

export const TestimonialsSection = memo(() => (
  <section className="py-16 px-4 bg-white">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-rose-800 mb-4">What Our Users Say</h2>
        <p className="text-xl text-rose-700 max-w-3xl mx-auto">
          Thousands of people have gained valuable insights through our personality assessment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((testimonial, index) => (
          <div key={`testimonial-${index}`} className="bg-rose-50 rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-rose-200 rounded-full mr-4"></div>
              <div>
                <h4 className="font-semibold text-rose-800">{testimonial.name}</h4>
                <p className="text-rose-600 text-sm">{testimonial.type}</p>
              </div>
            </div>
            <p className="text-rose-700">{testimonial.content}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
))

TestimonialsSection.displayName = 'TestimonialsSection'
