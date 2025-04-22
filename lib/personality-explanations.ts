export const dimensionExplanations = {
  EI: {
    title: "Extraversion vs. Introversion",
    description: "This dimension reflects where you focus your attention and get your energy.",
    details: `
      <p><strong>Extraversion (E)</strong> means you tend to focus on the outer world of people and activities. You direct your energy and attention outward and receive energy from interacting with people and from taking action.</p>

      <p><strong>Introversion (I)</strong> means you tend to focus on your inner world of ideas and experiences. You direct your energy and attention inward and receive energy from reflecting on your thoughts, memories, and feelings.</p>

      <p>This dimension isn't simply about being social or shy. Extraverts can be shy, and introverts can be socially confident. The key difference is where you get your energy and where your attention naturally flows.</p>
    `,
    characteristics: {
      E: [
        "Energized by social interaction",
        "Tend to think out loud",
        "Broader interests, less depth",
        "More outwardly expressive",
        "Learn by doing or discussing",
      ],
      I: [
        "Energized by solitude",
        "Tend to think internally first",
        "Deeper interests, less breadth",
        "More reserved in expression",
        "Learn by reflection and mental practice",
      ],
    },
    development: {
      E: "Extraverts can develop by cultivating deeper focus, practicing reflection, and becoming comfortable with solitude.",
      I: "Introverts can develop by expanding their social comfort zone, practicing external communication, and engaging more with the external world.",
    },
  },
  SN: {
    title: "Sensing vs. Intuition",
    description: "This dimension reflects how you take in information and what you pay attention to.",
    details: `
      <p><strong>Sensing (S)</strong> means you primarily collect information through your five senses and focus on what actually exists. You tend to be practical, detail-oriented, and focused on the present reality.</p>

      <p><strong>Intuition (N)</strong> means you primarily collect information through patterns and impressions, focusing on possibilities and meanings. You tend to be imaginative, future-oriented, and interested in the big picture.</p>

      <p>This dimension isn't about intelligence or creativity but about what kind of information you naturally notice and trust. Sensors can be highly creative, and intuitives can be very practical when needed.</p>
    `,
    characteristics: {
      S: [
        "Focus on concrete facts and details",
        "Trust experience and precedent",
        "Present-oriented",
        "Step-by-step approach",
        "Practical application of ideas",
      ],
      N: [
        "Focus on patterns and possibilities",
        "Trust insights and hunches",
        "Future-oriented",
        "Leap between concepts",
        "Theoretical understanding of ideas",
      ],
    },
    development: {
      S: "Sensors can develop by practicing abstract thinking, considering future implications, and looking for patterns and connections.",
      N: "Intuitives can develop by paying more attention to details, focusing on practical applications, and grounding ideas in reality.",
    },
  },
  TF: {
    title: "Thinking vs. Feeling",
    description: "This dimension reflects how you make decisions and come to conclusions.",
    details: `
      <p><strong>Thinking (T)</strong> means you tend to make decisions based on logical analysis, objective criteria, and principle-based reasoning. You value consistency, fairness, and truth in decision-making.</p>

      <p><strong>Feeling (F)</strong> means you tend to make decisions based on values, harmony, and how choices affect people. You value empathy, compassion, and personal connection in decision-making.</p>

      <p>This dimension isn't about intelligence or emotional capacity. Thinkers can be very emotional, and Feelers can be highly logical. The difference is in what factors you prioritize when making decisions.</p>
    `,
    characteristics: {
      T: [
        "Prioritize logic and consistency",
        "Analyze impersonally",
        "Value fairness as equality",
        "May appear detached",
        "Focus on finding the truth",
      ],
      F: [
        "Prioritize harmony and values",
        "Consider impact on people",
        "Value fairness as individual needs",
        "May appear emotionally involved",
        "Focus on supporting others",
      ],
    },
    development: {
      T: "Thinkers can develop by considering emotional impacts, practicing empathy, and recognizing the importance of values in decision-making.",
      F: "Feelers can develop by strengthening logical analysis, practicing objectivity, and making decisions independent of others' approval when necessary.",
    },
  },
  JP: {
    title: "Judging vs. Perceiving",
    description: "This dimension reflects how you approach the external world and deal with structure.",
    details: `
      <p><strong>Judging (J)</strong> means you prefer a planned, organized approach to life and like to have things settled. You tend to be structured, decisive, and focused on completion.</p>

      <p><strong>Perceiving (P)</strong> means you prefer a flexible, adaptable approach to life and like to keep your options open. You tend to be spontaneous, curious, and focused on exploration.</p>

      <p>This dimension isn't about being judgmental or perceptive. It's about your preferred way of living in the external world—whether you prefer things to be decided or open to new information and possibilities.</p>
    `,
    characteristics: {
      J: [
        "Prefer structure and planning",
        "Work steadily toward deadlines",
        "Seek closure and resolution",
        "Prefer clear expectations",
        "Focus on completing tasks",
      ],
      P: [
        "Prefer flexibility and spontaneity",
        "Work in bursts of energy",
        "Keep options open",
        "Adapt to changing circumstances",
        "Focus on starting new projects",
      ],
    },
    development: {
      J: "Judgers can develop by practicing flexibility, becoming more comfortable with uncertainty, and remaining open to new information.",
      P: "Perceivers can develop by implementing more structure, practicing follow-through, and making timely decisions when necessary.",
    },
  },
}

export const cognitiveExplanations = {
  title: "Cognitive Functions",
  description: "Each personality type uses eight cognitive functions in a specific order of preference.",
  details: `
    <p>Cognitive functions are the mental processes we use to take in information and make decisions. Each personality type has a unique stack of eight cognitive functions, with the top four being the most conscious and influential.</p>

    <p>There are eight cognitive functions in total, created by combining each letter (S, N, T, F) with either an introverted (i) or extraverted (e) orientation:</p>

    <ul>
      <li><strong>Se (Extraverted Sensing)</strong>: Experiencing and interacting with the immediate environment</li>
      <li><strong>Si (Introverted Sensing)</strong>: Recalling and comparing past experiences and detailed information</li>
      <li><strong>Ne (Extraverted Intuition)</strong>: Seeing possibilities, connections, and patterns in the external world</li>
      <li><strong>Ni (Introverted Intuition)</strong>: Perceiving patterns and developing long-range visions</li>
      <li><strong>Te (Extraverted Thinking)</strong>: Organizing and structuring the external world logically</li>
      <li><strong>Ti (Introverted Thinking)</strong>: Analyzing and categorizing information based on internal logical frameworks</li>
      <li><strong>Fe (Extraverted Feeling)</strong>: Connecting with others and considering group harmony</li>
      <li><strong>Fi (Introverted Feeling)</strong>: Evaluating according to personal values and ethics</li>
    </ul>

    <p>Your dominant and auxiliary functions are your strongest and most developed. Your tertiary and inferior functions are less developed but still conscious. The remaining four functions (called "shadow functions") are largely unconscious but can emerge under stress.</p>
  `,
  functionDescriptions: {
    Se: {
      name: "Extraverted Sensing",
      description: "Experiencing and interacting with the immediate environment",
      details:
        "Focuses on concrete details in the present moment, physical experiences, and practical realities. People with strong Se are often observant, action-oriented, and responsive to their surroundings.",
    },
    Si: {
      name: "Introverted Sensing",
      description: "Recalling and comparing past experiences and detailed information",
      details:
        "Focuses on storing and retrieving detailed information, comparing present to past experiences, and maintaining traditions. People with strong Si often have excellent memory for details and value reliability and consistency.",
    },
    Ne: {
      name: "Extraverted Intuition",
      description: "Seeing possibilities, connections, and patterns in the external world",
      details:
        "Focuses on generating possibilities, making connections between ideas, and exploring multiple perspectives. People with strong Ne are often creative, curious, and enjoy brainstorming.",
    },
    Ni: {
      name: "Introverted Intuition",
      description: "Perceiving patterns and developing long-range visions",
      details:
        "Focuses on synthesizing information to form insights, envisioning future possibilities, and understanding underlying meanings. People with strong Ni often have a clear vision of the future and can see how events will unfold.",
    },
    Te: {
      name: "Extraverted Thinking",
      description: "Organizing and structuring the external world logically",
      details:
        "Focuses on creating efficient systems, making objective decisions, and implementing logical plans. People with strong Te are often organized, decisive, and focused on achieving goals efficiently.",
    },
    Ti: {
      name: "Introverted Thinking",
      description: "Analyzing and categorizing information based on internal logical frameworks",
      details:
        "Focuses on understanding principles, analyzing problems, and creating internal logical frameworks. People with strong Ti are often analytical, precise, and seek logical consistency in their understanding.",
    },
    Fe: {
      name: "Extraverted Feeling",
      description: "Connecting with others and considering group harmony",
      details:
        "Focuses on understanding and responding to others' emotions, maintaining social harmony, and adhering to shared values. People with strong Fe are often empathetic, socially aware, and concerned with the well-being of the group.",
    },
    Fi: {
      name: "Introverted Feeling",
      description: "Evaluating according to personal values and ethics",
      details:
        "Focuses on understanding one's own values, making authentic decisions, and staying true to personal ethics. People with strong Fi are often principled, individualistic, and deeply in touch with their own emotions and values.",
    },
  },
}

export const typeExplanations = {
  title: "Type Development",
  description: "Personality type development occurs throughout life as we grow and mature.",
  details: `
    <p>While your basic personality preferences remain relatively stable, how you express and develop them changes throughout life. Healthy development involves becoming more balanced and skilled with all eight cognitive functions, while still honoring your natural preferences.</p>

    <p>In early life, most people develop their dominant function first, followed by their auxiliary function in adolescence and early adulthood. The tertiary function often develops in mid-life, and the inferior function may become more accessible in later life.</p>

    <p>Growth often involves:</p>
    <ul>
      <li>Becoming more skilled and nuanced in using your preferred functions</li>
      <li>Developing your less-preferred functions for use when appropriate</li>
      <li>Recognizing when your dominant approach isn't working and flexibly shifting to another approach</li>
      <li>Integrating the positive aspects of your opposite type while maintaining your authentic self</li>
    </ul>

    <p>Stress, trauma, or major life changes can sometimes lead to being "in the grip" of your inferior function, where you may act uncharacteristically and struggle with the aspects of personality you typically find most challenging.</p>
  `,
}

export const applicationExplanations = {
  title: "Practical Applications",
  description: "Understanding personality type can be applied in many areas of life.",
  details: `
    <p>Personality type insights can be valuable in numerous contexts:</p>

    <h4>Career Development</h4>
    <p>Different types tend to thrive in different work environments and roles. Understanding your type can help you identify careers that align with your natural strengths and preferences, though any type can succeed in any field with sufficient development and motivation.</p>

    <h4>Relationships</h4>
    <p>Type awareness can improve communication and reduce conflict by helping you understand different perspectives and needs. It can explain why some relationships feel effortless while others require more conscious work to bridge differences.</p>

    <h4>Learning and Education</h4>
    <p>Different types tend to learn best through different approaches. Understanding your learning style preferences can help you adapt your study methods for better results and less frustration.</p>

    <h4>Team Dynamics</h4>
    <p>Teams benefit from diverse perspectives. Type awareness can help teams leverage their diversity by recognizing the value each member brings and adapting communication and work processes to accommodate different styles.</p>

    <h4>Personal Growth</h4>
    <p>Understanding your type can highlight areas for development and provide a roadmap for becoming more balanced and effective while still honoring your authentic self.</p>
  `,
}
