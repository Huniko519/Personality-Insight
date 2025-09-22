"use client"

import { memo } from "react"

const OurApproachSection = memo(() => (
  <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-rose-800 mb-2">Our Approach</h2>
      <div className="w-24 h-1 bg-rose-500 mx-auto mb-4"></div>
      <p className="text-rose-700 max-w-3xl mx-auto">
        PersonaIQ is based on the Myers-Briggs Type Indicator (MBTI), one of the most widely used
        personality assessments in the world, combined with modern psychological research and data science.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-rose-50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-rose-800 mb-4">The Science Behind Our Assessment</h3>
        <p className="text-rose-700 mb-4">
          The MBTI identifies 16 distinct personality types based on four dimensions of personality:
        </p>
        <ul className="list-disc list-inside space-y-2 text-rose-700 mb-6">
          <li>
            <strong>Extraversion (E) vs. Introversion (I):</strong> Where you focus your attention and get your
            energy
          </li>
          <li>
            <strong>Sensing (S) vs. Intuition (N):</strong> How you take in information and what you pay
            attention to
          </li>
          <li>
            <strong>Thinking (T) vs. Feeling (F):</strong> How you make decisions
          </li>
          <li>
            <strong>Judging (J) vs. Perceiving (P):</strong> How you deal with the outer world
          </li>
        </ul>
        <p className="text-rose-700">
          While the MBTI has its critics in academic psychology, we recognize its value as a practical tool for
          self-awareness and personal development when used appropriately.
        </p>
      </div>

      <div className="bg-rose-50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-rose-800 mb-4">Our Methodology</h3>
        <p className="text-rose-700 mb-4">
          Our assessment goes beyond traditional MBTI questionnaires by incorporating:
        </p>
        <ul className="list-disc list-inside space-y-2 text-rose-700">
          <li>Advanced psychometric techniques to improve reliability</li>
          <li>Machine learning algorithms that refine results based on response patterns</li>
          <li>Nuanced scoring that recognizes the spectrum nature of personality traits</li>
          <li>Contextual questions that account for different environments and situations</li>
          <li>Regular updates based on the latest research in personality psychology</li>
        </ul>
      </div>
    </div>
  </div>
))

OurApproachSection.displayName = 'OurApproachSection'

export { OurApproachSection }
