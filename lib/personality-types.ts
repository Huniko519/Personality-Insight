export const personalityTypes: Record<string, PersonalityType> = {
  INTJ: {
    name: "The Architect",
    nickname: "Strategic, independent, and analytical",
    shortDescription: "Innovative thinkers with a thirst for knowledge and a clear vision for the future.",
    description:
      "INTJs are strategic thinkers with a talent for planning and a drive for constant improvement. They combine imagination and logic to develop innovative solutions to complex problems. Independent and decisive, they set high standards for themselves and others.",
    traits: ["Strategic planning", "Analytical thinking", "Independent", "Perfectionist", "Determined"],
    values: ["Knowledge", "Competence", "Efficiency", "Intellectual growth", "Autonomy"],
    strengths: [
      "Excellent at strategic planning and long-term thinking",
      "Highly analytical and logical problem-solving abilities",
      "Independent and self-sufficient",
      "Constantly seeking to improve systems and processes",
      "Able to see the big picture and anticipate future outcomes",
    ],
    weaknesses: [
      "May come across as overly critical or judgmental",
      "Can be perfectionistic to a fault",
      "Might struggle with expressing emotions or understanding others' feelings",
      "Sometimes dismissive of ideas that seem impractical",
      "May have difficulty working in highly collaborative environments",
    ],
    careers: [
      "Scientific Researcher",
      "Systems Analyst",
      "Strategic Planner",
      "Investment Banker",
      "Software Architect",
      "Management Consultant",
      "University Professor",
      "Entrepreneur",
    ],
    famousPeople: ["Elon Musk", "Stephen Hawking", "Mark Zuckerberg", "Michelle Obama", "Nikola Tesla", "Isaac Newton"],
    compatibility: {
      best: ["ENFP", "ENTP"],
      good: ["INFJ", "INFP", "ENTJ"],
    },
    relationships: {
      communication:
        "INTJs communicate directly and prefer substantive conversations focused on ideas rather than small talk. They value intellectual discussions and may need to work on expressing emotions.",
      asFriends:
        "As friends, INTJs are loyal and thoughtful, offering insightful advice and engaging in meaningful activities. They prefer quality over quantity in friendships.",
      asPartners:
        "In romantic relationships, INTJs are committed and dedicated partners who value intellectual connection. They show love through thoughtful actions rather than emotional expressions.",
    },
    cognitiveFunctions: [
      {
        name: "Introverted Intuition (Ni)",
        description: "Perceiving patterns and developing long-range visions",
      },
      {
        name: "Extraverted Thinking (Te)",
        description: "Organizing and structuring the external world logically",
      },
      {
        name: "Introverted Feeling (Fi)",
        description: "Evaluating according to personal values and ethics",
      },
      {
        name: "Extraverted Sensing (Se)",
        description: "Experiencing and interacting with the immediate environment",
      },
    ],
  },
  INTP: {
    name: "The Logician",
    nickname: "Innovative, logical, and curious",
    shortDescription: "Analytical problem-solvers who seek to understand the fundamental principles of everything.",
    description:
      "INTPs are innovative thinkers with a thirst for knowledge and a talent for logical analysis. They excel at spotting patterns and inconsistencies, constantly questioning existing systems and developing new theories. Independent and curious, they prefer to work with ideas rather than people.",
    traits: ["Logical reasoning", "Conceptual thinking", "Intellectual curiosity", "Objective analysis", "Adaptable"],
    values: ["Truth", "Knowledge", "Innovation", "Logical consistency", "Intellectual freedom"],
    strengths: [
      "Exceptional logical and analytical abilities",
      "Creative problem-solving from unique perspectives",
      "Ability to recognize patterns and connections others miss",
      "Intellectual curiosity and love of learning",
      "Open-mindedness and adaptability to new information",
    ],
    weaknesses: [
      "May struggle with practical implementation of ideas",
      "Can become detached from emotions and social dynamics",
      "Might procrastinate or get lost in theoretical possibilities",
      "Sometimes neglect routine tasks or administrative details",
      "May have difficulty explaining complex thoughts to others",
    ],
    careers: [
      "Computer Programmer",
      "Data Scientist",
      "Physicist",
      "Mathematician",
      "Systems Analyst",
      "Philosopher",
      "Research Scientist",
      "Game Designer",
    ],
    famousPeople: ["Albert Einstein", "Bill Gates", "Marie Curie", "Charles Darwin", "Larry Page", "Immanuel Kant"],
    compatibility: {
      best: ["ENTJ", "ESTJ"],
      good: ["INFJ", "ENFJ", "ENTP"],
    },
    relationships: {
      communication:
        "INTPs communicate in a precise, logical manner and enjoy theoretical discussions. They may struggle with emotional expression and need to work on recognizing others' feelings.",
      asFriends:
        "As friends, INTPs are intellectually stimulating companions who enjoy exploring ideas and concepts. They're loyal but may need space and independence.",
      asPartners:
        "In romantic relationships, INTPs are devoted partners who value intellectual connection. They show love through problem-solving and supporting their partner's independence.",
    },
    cognitiveFunctions: [
      {
        name: "Introverted Thinking (Ti)",
        description: "Analyzing and categorizing information based on internal logical frameworks",
      },
      {
        name: "Extraverted Intuition (Ne)",
        description: "Seeing possibilities, connections, and patterns in the external world",
      },
      {
        name: "Introverted Sensing (Si)",
        description: "Recalling and comparing past experiences and detailed information",
      },
      {
        name: "Extraverted Feeling (Fe)",
        description: "Connecting with others and considering group harmony",
      },
    ],
  },
  ENTJ: {
    name: "The Commander",
    nickname: "Decisive, strategic, and efficient",
    shortDescription: "Natural leaders who excel at organizing people and resources to achieve long-term goals.",
    description:
      "ENTJs are strategic leaders with a talent for organizing people and resources to achieve ambitious goals. They combine vision with practical execution, making them effective at implementing large-scale plans. Decisive and direct, they value efficiency and competence above all.",
    traits: ["Strategic leadership", "Decisive action", "Efficiency-focused", "Direct communication", "Ambitious"],
    values: ["Achievement", "Competence", "Leadership", "Efficiency", "Strategic vision"],
    strengths: [
      "Natural leadership abilities and strategic vision",
      "Excellent at organizing people and resources",
      "Decisive and efficient decision-making",
      "Strong drive to implement ideas and achieve goals",
      "Ability to see the big picture while managing details",
    ],
    weaknesses: [
      "May come across as overly dominant or controlling",
      "Can be impatient with inefficiency or incompetence",
      "Might overlook emotional considerations in decision-making",
      "Sometimes struggle with personal relationships",
      "May have difficulty accepting criticism or alternative viewpoints",
    ],
    careers: [
      "Executive or CEO",
      "Management Consultant",
      "Entrepreneur",
      "Business Strategist",
      "Attorney",
      "Political Leader",
      "Financial Advisor",
      "Project Manager",
    ],
    famousPeople: [
      "Steve Jobs",
      "Margaret Thatcher",
      "Franklin D. Roosevelt",
      "Gordon Ramsay",
      "Jim Carrey",
      "Harrison Ford",
    ],
    compatibility: {
      best: ["INTP", "ISTP"],
      good: ["INTJ", "ENTP", "ENFP"],
    },
    relationships: {
      communication:
        "ENTJs communicate directly and efficiently, preferring straightforward discussions focused on solutions. They may need to develop patience and emotional awareness.",
      asFriends:
        "As friends, ENTJs are loyal and stimulating companions who enjoy intellectual discussions and activities. They often take leadership roles in social groups.",
      asPartners:
        "In romantic relationships, ENTJs are committed partners who show love through actions and achievement. They benefit from partners who help them develop emotional awareness.",
    },
    cognitiveFunctions: [
      {
        name: "Extraverted Thinking (Te)",
        description: "Organizing and structuring the external world logically",
      },
      {
        name: "Introverted Intuition (Ni)",
        description: "Perceiving patterns and developing long-range visions",
      },
      {
        name: "Extraverted Sensing (Se)",
        description: "Experiencing and interacting with the immediate environment",
      },
      {
        name: "Introverted Feeling (Fi)",
        description: "Evaluating according to personal values and ethics",
      },
    ],
  },
  ENTP: {
    name: "The Debater",
    nickname: "Innovative, argumentative, and quick-witted",
    shortDescription: "Inventive intellectuals who enjoy challenging conventions and exploring possibilities.",
    description:
      "ENTPs are innovative thinkers with a love for intellectual debate and creative problem-solving. They excel at generating ideas and spotting connections between seemingly unrelated concepts. Quick-witted and adaptable, they enjoy challenging conventional wisdom and exploring multiple perspectives.",
    traits: ["Innovative thinking", "Debate skills", "Adaptability", "Quick wit", "Intellectual curiosity"],
    values: ["Innovation", "Knowledge", "Mental stimulation", "Versatility", "Intellectual freedom"],
    strengths: [
      "Exceptional creativity and innovative thinking",
      "Excellent debating and communication skills",
      "Ability to see multiple perspectives and possibilities",
      "Quick adaptation to new situations and challenges",
      "Enthusiasm for brainstorming and idea generation",
    ],
    weaknesses: [
      "May struggle with follow-through and implementation",
      "Can become bored with routine or detailed work",
      "Might engage in debates for sport rather than resolution",
      "Sometimes neglect practical considerations",
      "May have difficulty with long-term commitments",
    ],
    careers: [
      "Entrepreneur",
      "Lawyer",
      "Creative Director",
      "Marketing Strategist",
      "Inventor",
      "Political Consultant",
      "Systems Analyst",
      "Venture Capitalist",
    ],
    famousPeople: [
      "Leonardo da Vinci",
      "Benjamin Franklin",
      "Richard Feynman",
      "Robert Downey Jr.",
      "Celine Dion",
      "Tom Hanks",
    ],
    compatibility: {
      best: ["INTJ", "INFJ"],
      good: ["ENTJ", "ENFJ", "INTP"],
    },
    relationships: {
      communication:
        "ENTPs communicate in a lively, engaging manner and enjoy intellectual sparring. They're quick-witted but may need to develop sensitivity to others' communication styles.",
      asFriends:
        "As friends, ENTPs are stimulating and entertaining companions who bring energy and new ideas to relationships. They enjoy exploring concepts and possibilities with others.",
      asPartners:
        "In romantic relationships, ENTPs are playful and intellectually engaging partners who value mental connection. They need partners who appreciate their need for independence and mental stimulation.",
    },
    cognitiveFunctions: [
      {
        name: "Extraverted Intuition (Ne)",
        description: "Seeing possibilities, connections, and patterns in the external world",
      },
      {
        name: "Introverted Thinking (Ti)",
        description: "Analyzing and categorizing information based on internal logical frameworks",
      },
      {
        name: "Extraverted Feeling (Fe)",
        description: "Connecting with others and considering group harmony",
      },
      {
        name: "Introverted Sensing (Si)",
        description: "Recalling and comparing past experiences and detailed information",
      },
    ],
  },
  INFJ: {
    name: "The Advocate",
    nickname: "Insightful, principled, and complex",
    shortDescription: "Quiet visionaries driven by deep convictions and a desire to help others.",
    description:
      "INFJs are insightful visionaries with a deep sense of idealism and commitment to their values. They combine creativity with empathy, allowing them to understand people and situations with remarkable depth. Private yet passionate, they work quietly to realize their vision of a better world.",
    traits: ["Insightful understanding", "Idealistic vision", "Deep empathy", "Creative thinking", "Principled action"],
    values: ["Authenticity", "Harmony", "Personal growth", "Meaningful connection", "Helping others"],
    strengths: [
      "Deep insight into people and situations",
      "Strong sense of empathy and compassion",
      "Commitment to personal values and growth",
      "Creative problem-solving abilities",
      "Ability to inspire and influence others",
    ],
    weaknesses: [
      "May be overly idealistic or perfectionistic",
      "Can become overwhelmed by others' emotions",
      "Might struggle with practical details or implementation",
      "Sometimes avoid conflict to maintain harmony",
      "May have difficulty setting boundaries",
    ],
    careers: [
      "Counselor or Therapist",
      "Writer",
      "Non-profit Director",
      "HR Development Specialist",
      "Professor",
      "Life Coach",
      "Social Worker",
      "Religious Leader",
    ],
    famousPeople: ["Martin Luther King Jr.", "Nelson Mandela", "Plato", "Carl Jung", "Taylor Swift", "Nicole Kidman"],
    compatibility: {
      best: ["ENTP", "ENFP"],
      good: ["INTJ", "INFP", "ENFJ"],
    },
    relationships: {
      communication:
        "INFJs communicate with depth and insight, preferring meaningful conversations over small talk. They're good listeners who seek to understand others' perspectives.",
      asFriends:
        "As friends, INFJs are supportive and insightful companions who value authentic connections. They're selective about friendships but deeply loyal to those in their inner circle.",
      asPartners:
        "In romantic relationships, INFJs are devoted partners who seek profound emotional and intellectual connection. They show love through understanding and supporting their partner's growth.",
    },
    cognitiveFunctions: [
      {
        name: "Introverted Intuition (Ni)",
        description: "Perceiving patterns and developing long-range visions",
      },
      {
        name: "Extraverted Feeling (Fe)",
        description: "Connecting with others and considering group harmony",
      },
      {
        name: "Introverted Thinking (Ti)",
        description: "Analyzing and categorizing information based on internal logical frameworks",
      },
      {
        name: "Extraverted Sensing (Se)",
        description: "Experiencing and interacting with the immediate environment",
      },
    ],
  },
  INFP: {
    name: "The Mediator",
    nickname: "Idealistic, compassionate, and creative",
    shortDescription: "Sensitive idealists driven by personal values and a desire for authenticity.",
    description:
      "INFPs are idealistic individuals with a deep sense of compassion and creativity. They are guided by their core values and seek meaning in all aspects of life. Authentic and original, they strive to stay true to themselves while helping others reach their potential.",
    traits: [
      "Idealistic vision",
      "Authentic expression",
      "Creative thinking",
      "Empathetic understanding",
      "Value-driven",
    ],
    values: ["Authenticity", "Creativity", "Personal growth", "Compassion", "Harmony"],
    strengths: [
      "Strong sense of empathy and understanding",
      "Creative approach to problems and situations",
      "Commitment to personal values and authenticity",
      "Ability to see potential in others",
      "Open-mindedness and adaptability",
    ],
    weaknesses: [
      "May struggle with practical details or implementation",
      "Can be overly idealistic or impractical",
      "Might avoid conflict or criticism",
      "Sometimes too perfectionistic about personal projects",
      "May have difficulty with structure and deadlines",
    ],
    careers: [
      "Writer or Editor",
      "Counselor or Therapist",
      "Artist or Designer",
      "Teacher",
      "Social Worker",
      "Musician",
      "Non-profit Worker",
      "HR Specialist",
    ],
    famousPeople: [
      "William Shakespeare",
      "J.R.R. Tolkien",
      "Princess Diana",
      "John Lennon",
      "Audrey Hepburn",
      "Johnny Depp",
    ],
    compatibility: {
      best: ["ENFJ", "ENTJ"],
      good: ["INFJ", "INTJ", "ENFP"],
    },
    relationships: {
      communication:
        "INFPs communicate with authenticity and depth, preferring meaningful conversations that explore values and ideas. They're good listeners who seek to understand others' perspectives.",
      asFriends:
        "As friends, INFPs are supportive and understanding companions who value authentic connections. They're loyal to those who respect their values and sensitivity.",
      asPartners:
        "In romantic relationships, INFPs are devoted partners who seek deep emotional connection. They show love through understanding and supporting their partner's authentic self.",
    },
    cognitiveFunctions: [
      {
        name: "Introverted Feeling (Fi)",
        description: "Evaluating according to personal values and ethics",
      },
      {
        name: "Extraverted Intuition (Ne)",
        description: "Seeing possibilities, connections, and patterns in the external world",
      },
      {
        name: "Introverted Sensing (Si)",
        description: "Recalling and comparing past experiences and detailed information",
      },
      {
        name: "Extraverted Thinking (Te)",
        description: "Organizing and structuring the external world logically",
      },
    ],
  },
  ENFJ: {
    name: "The Protagonist",
    nickname: "Charismatic, inspiring, and empathetic",
    shortDescription: "Natural leaders who inspire and motivate others to reach their potential.",
    description:
      "ENFJs are charismatic leaders with a talent for inspiring others and bringing out their potential. They combine empathy with organizational skills, making them effective at mobilizing people toward shared goals. Warm and persuasive, they are driven by a desire to help others grow and develop.",
    traits: [
      "Charismatic leadership",
      "Empathetic understanding",
      "Inspirational motivation",
      "Organized action",
      "People-focused",
    ],
    values: ["Connection", "Growth", "Harmony", "Authenticity", "Making a difference"],
    strengths: [
      "Natural ability to inspire and motivate others",
      "Strong empathy and understanding of people's needs",
      "Excellent communication and persuasion skills",
      "Organizational abilities to turn vision into reality",
      "Commitment to helping others develop and grow",
    ],
    weaknesses: [
      "May be overly concerned with others' approval",
      "Can neglect their own needs while focusing on others",
      "Might be too idealistic about people and situations",
      "Sometimes struggle with making tough decisions",
      "May have difficulty handling criticism",
    ],
    careers: [
      "Teacher or Professor",
      "Corporate Trainer",
      "Human Resources Manager",
      "Non-profit Director",
      "Life Coach",
      "Counselor",
      "Public Relations Specialist",
      "Politician",
    ],
    famousPeople: [
      "Barack Obama",
      "Oprah Winfrey",
      "Nelson Mandela",
      "Maya Angelou",
      "Ben Affleck",
      "Jennifer Lawrence",
    ],
    compatibility: {
      best: ["INFP", "ISFP"],
      good: ["ENFP", "INFJ", "INTJ"],
    },
    relationships: {
      communication:
        "ENFJs communicate warmly and persuasively, with a focus on understanding others and building consensus. They're excellent at reading people and adapting their communication style.",
      asFriends:
        "As friends, ENFJs are supportive and encouraging companions who invest deeply in relationships. They often take on mentoring roles and help friends develop their potential.",
      asPartners:
        "In romantic relationships, ENFJs are devoted partners who prioritize harmony and growth. They show love through acts of service and emotional support.",
    },
    cognitiveFunctions: [
      {
        name: "Extraverted Feeling (Fe)",
        description: "Connecting with others and considering group harmony",
      },
      {
        name: "Introverted Intuition (Ni)",
        description: "Perceiving patterns and developing long-range visions",
      },
      {
        name: "Extraverted Sensing (Se)",
        description: "Experiencing and interacting with the immediate environment",
      },
      {
        name: "Introverted Thinking (Ti)",
        description: "Analyzing and categorizing information based on internal logical frameworks",
      },
    ],
  },
  ENFP: {
    name: "The Campaigner",
    nickname: "Enthusiastic, creative, and sociable",
    shortDescription: "Free spirits who love exploring possibilities and connecting with people.",
    description:
      "ENFPs are enthusiastic innovators with a contagious zest for life and new possibilities. They combine creativity with people skills, making them excellent at generating ideas and rallying others around a cause. Spontaneous and expressive, they are driven by a desire to understand people and help them fulfill their potential.",
    traits: [
      "Enthusiastic energy",
      "Creative thinking",
      "People-oriented",
      "Adaptable approach",
      "Expressive communication",
    ],
    values: ["Authenticity", "Freedom", "Connection", "Growth", "Creativity"],
    strengths: [
      "Exceptional creativity and innovative thinking",
      "Natural enthusiasm that inspires others",
      "Strong empathy and people skills",
      "Adaptability and openness to new experiences",
      "Ability to see potential and possibilities",
    ],
    weaknesses: [
      "May struggle with follow-through and practical details",
      "Can become easily distracted or bored",
      "Might have difficulty with routine or structure",
      "Sometimes overly optimistic or impractical",
      "May avoid conflict or difficult decisions",
    ],
    careers: [
      "Entrepreneur",
      "Creative Director",
      "Counselor or Therapist",
      "Journalist",
      "Marketing Specialist",
      "Actor",
      "Teacher",
      "Event Planner",
    ],
    famousPeople: [
      "Robin Williams",
      "Walt Disney",
      "Mark Twain",
      "Ellen DeGeneres",
      "Sandra Bullock",
      "Robert Downey Jr.",
    ],
    compatibility: {
      best: ["INTJ", "INFJ"],
      good: ["ENFJ", "ENTJ", "INFP"],
    },
    relationships: {
      communication:
        "ENFPs communicate expressively and enthusiastically, with a focus on possibilities and connections. They're engaging conversationalists who enjoy exploring ideas with others.",
      asFriends:
        "As friends, ENFPs are fun and supportive companions who bring energy to relationships. They value authentic connections and help friends see new possibilities.",
      asPartners:
        "In romantic relationships, ENFPs are passionate partners who seek deep connection and growth. They show love through enthusiasm, creativity, and emotional support.",
    },
    cognitiveFunctions: [
      {
        name: "Extraverted Intuition (Ne)",
        description: "Seeing possibilities, connections, and patterns in the external world",
      },
      {
        name: "Introverted Feeling (Fi)",
        description: "Evaluating according to personal values and ethics",
      },
      {
        name: "Extraverted Thinking (Te)",
        description: "Organizing and structuring the external world logically",
      },
      {
        name: "Introverted Sensing (Si)",
        description: "Recalling and comparing past experiences and detailed information",
      },
    ],
  },
  ISTJ: {
    name: "The Logistician",
    nickname: "Practical, reliable, and organized",
    shortDescription: "Dependable organizers who value tradition, order, and attention to detail.",
    description:
      "ISTJs are practical organizers with a strong sense of responsibility and commitment to duty. They combine attention to detail with logical thinking, making them excellent at maintaining systems and ensuring reliability. Reserved yet resolute, they are driven by a desire to create order and uphold traditions.",
    traits: ["Practical approach", "Reliable execution", "Detail-oriented", "Logical thinking", "Responsible action"],
    values: ["Responsibility", "Tradition", "Order", "Honesty", "Practicality"],
    strengths: [
      "Exceptional reliability and follow-through",
      "Strong organizational and planning abilities",
      "Attention to detail and accuracy",
      "Practical approach to problem-solving",
      "Commitment to responsibilities and obligations",
    ],
    weaknesses: [
      "May be resistant to change or new ideas",
      "Can be overly focused on rules and procedures",
      "Might struggle with abstract or theoretical concepts",
      "Sometimes inflexible or stubborn",
      "May have difficulty expressing emotions",
    ],
    careers: [
      "Accountant",
      "Military Officer",
      "Financial Analyst",
      "Project Manager",
      "Lawyer",
      "Database Administrator",
      "Logistics Manager",
      "Quality Assurance Specialist",
    ],
    famousPeople: [
      "Queen Elizabeth II",
      "George Washington",
      "Warren Buffett",
      "Jeff Bezos",
      "Natalie Portman",
      "Denzel Washington",
    ],
    compatibility: {
      best: ["ESFP", "ESTP"],
      good: ["ISTJ", "ESTJ", "ISFJ"],
    },
    relationships: {
      communication:
        "ISTJs communicate in a straightforward and practical manner, preferring clear and specific information. They may need to work on expressing emotions and understanding others' feelings.",
      asFriends:
        "As friends, ISTJs are loyal and dependable companions who value consistency. They show friendship through practical help and keeping commitments.",
      asPartners:
        "In romantic relationships, ISTJs are committed partners who show love through reliability and practical support. They value stability and clear expectations.",
    },
    cognitiveFunctions: [
      {
        name: "Introverted Sensing (Si)",
        description: "Recalling and comparing past experiences and detailed information",
      },
      {
        name: "Extraverted Thinking (Te)",
        description: "Organizing and structuring the external world logically",
      },
      {
        name: "Introverted Feeling (Fi)",
        description: "Evaluating according to personal values and ethics",
      },
      {
        name: "Extraverted Intuition (Ne)",
        description: "Seeing possibilities, connections, and patterns in the external world",
      },
    ],
  },
  ISFJ: {
    name: "The Defender",
    nickname: "Protective, loyal, and traditional",
    shortDescription: "Dedicated caretakers who value security, tradition, and meeting others' needs.",
    description:
      "ISFJs are dedicated protectors with a strong sense of responsibility and commitment to helping others. They combine practical skills with personal warmth, making them excellent at providing for people's needs and maintaining traditions. Quiet yet dependable, they are driven by a desire to serve and support those they care about.",
    traits: ["Practical support", "Detailed memory", "Loyal dedication", "Nurturing care", "Traditional values"],
    values: ["Security", "Harmony", "Tradition", "Service", "Responsibility"],
    strengths: [
      "Strong sense of responsibility and dedication",
      "Excellent practical support and caregiving abilities",
      "Attention to detail and exceptional memory",
      "Loyalty and commitment to relationships",
      "Ability to create comfortable and stable environments",
    ],
    weaknesses: [
      "May have difficulty saying no or setting boundaries",
      "Can be overly focused on others' needs at their own expense",
      "Might resist change or new approaches",
      "Sometimes avoid conflict to maintain harmony",
      "May struggle with expressing their own needs",
    ],
    careers: [
      "Nurse",
      "Elementary School Teacher",
      "Social Worker",
      "Administrative Assistant",
      "Librarian",
      "Customer Service Representative",
      "Veterinarian",
      "Interior Designer",
    ],
    famousPeople: [
      "Mother Teresa",
      "Queen Elizabeth II",
      "Kate Middleton",
      "Rosa Parks",
      "Christopher Walken",
      "Beyoncé",
    ],
    compatibility: {
      best: ["ESFP", "ESTP"],
      good: ["ISFJ", "ISTJ", "ESTJ"],
    },
    relationships: {
      communication:
        "ISFJs communicate in a warm and practical manner, focusing on details and personal experiences. They're good listeners who may need encouragement to express their own needs.",
      asFriends:
        "As friends, ISFJs are loyal and supportive companions who remember important details and provide practical help. They value long-term, consistent friendships.",
      asPartners:
        "In romantic relationships, ISFJs are devoted partners who show love through acts of service and creating comfortable environments. They value security and appreciation.",
    },
    cognitiveFunctions: [
      {
        name: "Introverted Sensing (Si)",
        description: "Recalling and comparing past experiences and detailed information",
      },
      {
        name: "Extraverted Feeling (Fe)",
        description: "Connecting with others and considering group harmony",
      },
      {
        name: "Introverted Thinking (Ti)",
        description: "Analyzing and categorizing information based on internal logical frameworks",
      },
      {
        name: "Extraverted Intuition (Ne)",
        description: "Seeing possibilities, connections, and patterns in the external world",
      },
    ],
  },
  ESTJ: {
    name: "The Executive",
    nickname: "Efficient, practical, and traditional",
    shortDescription: "Practical organizers who value order, structure, and clear standards.",
    description:
      "ESTJs are efficient organizers with a talent for implementing systems and upholding standards. They combine practical thinking with decisive action, making them excellent at managing people and resources. Direct and structured, they are driven by a desire to create order and ensure things run smoothly.",
    traits: [
      "Efficient organization",
      "Practical implementation",
      "Clear communication",
      "Decisive action",
      "Traditional values",
    ],
    values: ["Order", "Tradition", "Efficiency", "Responsibility", "Practical results"],
    strengths: [
      "Excellent organizational and administrative abilities",
      "Practical approach to problem-solving",
      "Clear and direct communication style",
      "Strong work ethic and reliability",
      "Ability to implement systems and maintain order",
    ],
    weaknesses: [
      "May be inflexible or resistant to change",
      "Can be overly focused on rules and procedures",
      "Might be insensitive to emotions or alternative viewpoints",
      "Sometimes judgmental or critical",
      "May struggle with ambiguity or theoretical concepts",
    ],
    careers: [
      "Business Manager",
      "Military Officer",
      "Judge",
      "Financial Advisor",
      "School Principal",
      "Police Officer",
      "Project Manager",
      "Government Official",
    ],
    famousPeople: [
      "Michelle Obama",
      "Judge Judy",
      "Lyndon B. Johnson",
      "Billy Graham",
      "Sonia Sotomayor",
      "Frank Sinatra",
    ],
    compatibility: {
      best: ["ISFP", "ISTP"],
      good: ["ESTJ", "ISTJ", "ESFJ"],
    },
    relationships: {
      communication:
        "ESTJs communicate directly and clearly, focusing on practical information and expectations. They may need to develop patience and sensitivity to others' feelings.",
      asFriends:
        "As friends, ESTJs are reliable and organized companions who enjoy structured activities. They show friendship through practical support and organizing social events.",
      asPartners:
        "In romantic relationships, ESTJs are committed partners who show love through reliability and creating stable environments. They value clear expectations and traditional roles.",
    },
    cognitiveFunctions: [
      {
        name: "Extraverted Thinking (Te)",
        description: "Organizing and structuring the external world logically",
      },
      {
        name: "Introverted Sensing (Si)",
        description: "Recalling and comparing past experiences and detailed information",
      },
      {
        name: "Extraverted Intuition (Ne)",
        description: "Seeing possibilities, connections, and patterns in the external world",
      },
      {
        name: "Introverted Feeling (Fi)",
        description: "Evaluating according to personal values and ethics",
      },
    ],
  },
  ESFJ: {
    name: "The Consul",
    nickname: "Supportive, social, and organized",
    shortDescription: "Caring organizers who value harmony, connection, and meeting others' needs.",
    description:
      "ESFJs are caring organizers with a talent for bringing people together and meeting their needs. They combine practical skills with interpersonal warmth, making them excellent at creating harmony and providing support. Sociable and responsible, they are driven by a desire to help others and maintain valued traditions.",
    traits: [
      "Supportive care",
      "Social connection",
      "Practical organization",
      "Responsible action",
      "Traditional values",
    ],
    values: ["Harmony", "Connection", "Service", "Tradition", "Security"],
    strengths: [
      "Strong interpersonal skills and emotional intelligence",
      "Excellent at creating harmony and resolving conflicts",
      "Practical organizational and planning abilities",
      "Reliability and follow-through on commitments",
      "Ability to anticipate and meet others' needs",
    ],
    weaknesses: [
      "May be overly concerned with social approval",
      "Can be inflexible about traditions or established methods",
      "Might avoid necessary conflict to maintain harmony",
      "Sometimes take criticism too personally",
      "May struggle with change or unconventional ideas",
    ],
    careers: [
      "Healthcare Administrator",
      "Elementary School Teacher",
      "Human Resources Specialist",
      "Event Planner",
      "Social Worker",
      "Nurse",
      "Customer Service Manager",
      "Sales Representative",
    ],
    famousPeople: ["Bill Clinton", "Taylor Swift", "Jennifer Lopez", "Hugh Jackman", "Sally Field", "Steve Harvey"],
    compatibility: {
      best: ["ISFP", "ISTP"],
      good: ["ESFJ", "ISFJ", "ESTJ"],
    },
    relationships: {
      communication:
        "ESFJs communicate warmly and responsively, with a focus on maintaining harmony and connection. They're attentive listeners who remember personal details.",
      asFriends:
        "As friends, ESFJs are supportive and organized companions who enjoy bringing people together. They show friendship through practical help and emotional support.",
      asPartners:
        "In romantic relationships, ESFJs are devoted partners who show love through acts of service and creating harmonious environments. They value appreciation and emotional connection.",
    },
    cognitiveFunctions: [
      {
        name: "Extraverted Feeling (Fe)",
        description: "Connecting with others and considering group harmony",
      },
      {
        name: "Introverted Sensing (Si)",
        description: "Recalling and comparing past experiences and detailed information",
      },
      {
        name: "Extraverted Thinking (Te)",
        description: "Organizing and structuring the external world logically",
      },
      {
        name: "Introverted Intuition (Ni)",
        description: "Perceiving patterns and developing long-range visions",
      },
    ],
  },
  ISTP: {
    name: "The Virtuoso",
    nickname: "Practical, adaptable, and analytical",
    shortDescription:
      "Skilled troubleshooters who excel at understanding how things work and solving practical problems.",
    description:
      "ISTPs are practical problem-solvers with a talent for understanding how things work and responding to immediate needs. They combine analytical thinking with hands-on skills, making them excellent at troubleshooting and crafting solutions. Independent and adaptable, they are driven by a desire to master tools and techniques while maintaining personal freedom.",
    traits: [
      "Practical problem-solving",
      "Adaptable approach",
      "Technical understanding",
      "Logical analysis",
      "Action-oriented",
    ],
    values: ["Efficiency", "Freedom", "Practicality", "Skill mastery", "Self-reliance"],
    strengths: [
      "Exceptional technical and mechanical abilities",
      "Practical problem-solving skills",
      "Adaptability and responsiveness to immediate needs",
      "Calm approach to crisis situations",
      "Ability to understand how systems and tools work",
    ],
    weaknesses: [
      "May be reluctant to commit or plan for the future",
      "Can be perceived as detached or aloof",
      "Might struggle with long-term planning",
      "Sometimes risk-taking or impulsive",
      "May have difficulty expressing emotions or empathizing",
    ],
    careers: [
      "Engineer",
      "Mechanic",
      "Pilot",
      "Forensic Scientist",
      "Carpenter",
      "Emergency Medical Technician",
      "Computer Programmer",
      "Electrician",
    ],
    famousPeople: [
      "Tom Cruise",
      "Michael Jordan",
      "Clint Eastwood",
      "Bruce Lee",
      "Scarlett Johansson",
      "Milla Jovovich",
    ],
    compatibility: {
      best: ["ESTJ", "ESFJ"],
      good: ["ISTP", "ESTP", "ISTJ"],
    },
    relationships: {
      communication:
        "ISTPs communicate in a straightforward and concise manner, focusing on practical information. They may need to work on expressing emotions and maintaining regular communication.",
      asFriends:
        "As friends, ISTPs are loyal and easygoing companions who enjoy shared activities. They show friendship through practical help and respecting others' independence.",
      asPartners:
        "In romantic relationships, ISTPs are adaptable partners who show love through actions rather than words. They value personal space and appreciate partners who don't demand constant emotional expression.",
    },
    cognitiveFunctions: [
      {
        name: "Introverted Thinking (Ti)",
        description: "Analyzing and categorizing information based on internal logical frameworks",
      },
      {
        name: "Extraverted Sensing (Se)",
        description: "Experiencing and interacting with the immediate environment",
      },
      {
        name: "Introverted Intuition (Ni)",
        description: "Perceiving patterns and developing long-range visions",
      },
      {
        name: "Extraverted Feeling (Fe)",
        description: "Connecting with others and considering group harmony",
      },
    ],
  },
  ISFP: {
    name: "The Adventurer",
    nickname: "Artistic, sensitive, and spontaneous",
    shortDescription: "Gentle creatives who value authenticity, personal freedom, and living in the moment.",
    description:
      "ISFPs are artistic individuals with a strong sense of aesthetics and a desire for authentic expression. They combine creativity with practicality, making them excellent at crafting beautiful or useful things. Gentle and spontaneous, they are driven by a desire to experience life fully while staying true to their values.",
    traits: ["Artistic expression", "Authentic action", "Practical creativity", "Gentle approach", "Present-focused"],
    values: ["Authenticity", "Freedom", "Beauty", "Harmony", "Experience"],
    strengths: [
      "Strong aesthetic sense and creativity",
      "Practical approach to artistic expression",
      "Adaptability and living in the present moment",
      "Sensitivity to others' feelings and needs",
      "Commitment to personal values and authenticity",
    ],
    weaknesses: [
      "May avoid conflict or difficult conversations",
      "Can be overly sensitive to criticism",
      "Might struggle with long-term planning",
      "Sometimes reluctant to lead or take charge",
      "May have difficulty with abstract or theoretical concepts",
    ],
    careers: [
      "Artist or Designer",
      "Chef",
      "Fashion Designer",
      "Photographer",
      "Veterinarian",
      "Physical Therapist",
      "Landscape Architect",
      "Massage Therapist",
    ],
    famousPeople: ["Bob Dylan", "Frida Kahlo", "Michael Jackson", "Britney Spears", "David Beckham", "Lana Del Rey"],
    compatibility: {
      best: ["ESTJ", "ESFJ"],
      good: ["ISFP", "ESFP", "ISFJ"],
    },
    relationships: {
      communication:
        "ISFPs communicate authentically and expressively, though often through actions rather than words. They're good listeners who may need encouragement to share their own thoughts and feelings.",
      asFriends:
        "As friends, ISFPs are loyal and easygoing companions who enjoy shared experiences. They show friendship through practical support and accepting others as they are.",
      asPartners:
        "In romantic relationships, ISFPs are devoted partners who show love through thoughtful gestures and creating beautiful experiences. They value personal space and authentic connection.",
    },
    cognitiveFunctions: [
      {
        name: "Introverted Feeling (Fi)",
        description: "Evaluating according to personal values and ethics",
      },
      {
        name: "Extraverted Sensing (Se)",
        description: "Experiencing and interacting with the immediate environment",
      },
      {
        name: "Introverted Intuition (Ni)",
        description: "Perceiving patterns and developing long-range visions",
      },
      {
        name: "Extraverted Thinking (Te)",
        description: "Organizing and structuring the external world logically",
      },
    ],
  },
  ESTP: {
    name: "The Entrepreneur",
    nickname: "Energetic, practical, and spontaneous",
    shortDescription: "Action-oriented risk-takers who excel at solving immediate problems and seizing opportunities.",
    description:
      "ESTPs are energetic problem-solvers with a talent for thinking on their feet and responding to immediate challenges. They combine practical skills with social savvy, making them excellent at negotiating and finding opportunities. Bold and adaptable, they are driven by a desire to experience life fully and make an impact through action.",
    traits: ["Energetic action", "Practical problem-solving", "Adaptable approach", "Risk-taking", "Present-focused"],
    values: ["Freedom", "Excitement", "Practicality", "Impact", "Experience"],
    strengths: [
      "Exceptional ability to respond to immediate challenges",
      "Practical problem-solving and troubleshooting skills",
      "Social intelligence and persuasive abilities",
      "Adaptability and quick thinking",
      "Energy and enthusiasm for action",
    ],
    weaknesses: [
      "May be impulsive or take unnecessary risks",
      "Can be insensitive to long-term consequences",
      "Might struggle with long-term commitments",
      "Sometimes blunt or tactless",
      "May have difficulty with abstract concepts or theories",
    ],
    careers: [
      "Entrepreneur",
      "Sales Representative",
      "Emergency Responder",
      "Detective",
      "Athletic Coach",
      "Construction Manager",
      "Paramedic",
      "Stockbroker",
    ],
    famousPeople: ["Donald Trump", "Madonna", "Jack Nicholson", "Eddie Murphy", "Samuel L. Jackson", "Megan Fox"],
    compatibility: {
      best: ["ISFJ", "ISTJ"],
      good: ["ESTP", "ISTP", "ESFP"],
    },
    relationships: {
      communication:
        "ESTPs communicate directly and energetically, with a focus on practical matters and immediate concerns. They're engaging conversationalists who may need to develop patience for deeper discussions.",
      asFriends:
        "As friends, ESTPs are fun and exciting companions who enjoy shared activities and adventures. They show friendship through practical help and creating memorable experiences.",
      asPartners:
        "In romantic relationships, ESTPs are exciting partners who show love through action and shared experiences. They value freedom and appreciate partners who enjoy living in the moment.",
    },
    cognitiveFunctions: [
      {
        name: "Extraverted Sensing (Se)",
        description: "Experiencing and interacting with the immediate environment",
      },
      {
        name: "Introverted Thinking (Ti)",
        description: "Analyzing and categorizing information based on internal logical frameworks",
      },
      {
        name: "Extraverted Feeling (Fe)",
        description: "Connecting with others and considering group harmony",
      },
      {
        name: "Introverted Intuition (Ni)",
        description: "Perceiving patterns and developing long-range visions",
      },
    ],
  },
  ESFP: {
    name: "The Entertainer",
    nickname: "Enthusiastic, social, and spontaneous",
    shortDescription: "Fun-loving performers who enjoy bringing people together and living in the moment.",
    description:
      "ESFPs are enthusiastic entertainers with a talent for bringing joy to others and creating memorable experiences. They combine practical skills with social charm, making them excellent at engaging people and responding to their needs. Spontaneous and expressive, they are driven by a desire to enjoy life fully and help others do the same.",
    traits: [
      "Enthusiastic energy",
      "Social connection",
      "Practical creativity",
      "Adaptable approach",
      "Present-focused",
    ],
    values: ["Enjoyment", "Connection", "Freedom", "Aesthetics", "Experience"],
    strengths: [
      "Natural ability to entertain and engage others",
      "Practical problem-solving in the moment",
      "Adaptability and spontaneity",
      "Generosity and warmth toward others",
      "Ability to create enjoyable experiences",
    ],
    weaknesses: [
      "May avoid difficult situations or conversations",
      "Can be impulsive or shortsighted",
      "Might struggle with long-term planning",
      "Sometimes overly focused on social approval",
      "May have difficulty with abstract concepts or theories",
    ],
    careers: [
      "Event Planner",
      "Sales Representative",
      "Public Relations Specialist",
      "Chef",
      "Tour Guide",
      "Performer",
      "Flight Attendant",
      "Elementary School Teacher",
    ],
    famousPeople: ["Marilyn Monroe", "Elvis Presley", "Jamie Oliver", "Adele", "Will Smith", "Miley Cyrus"],
    compatibility: {
      best: ["ISFJ", "ISTJ"],
      good: ["ESFP", "ISFP", "ESTP"],
    },
    relationships: {
      communication:
        "ESFPs communicate expressively and enthusiastically, with a focus on sharing experiences and connecting emotionally. They're engaging conversationalists who enjoy storytelling.",
      asFriends:
        "As friends, ESFPs are fun and generous companions who bring energy to relationships. They show friendship through creating enjoyable experiences and providing emotional support.",
      asPartners:
        "In romantic relationships, ESFPs are passionate partners who show love through affection and creating special moments. They value appreciation and emotional connection.",
    },
    cognitiveFunctions: [
      {
        name: "Extraverted Sensing (Se)",
        description: "Experiencing and interacting with the immediate environment",
      },
      {
        name: "Introverted Feeling (Fi)",
        description: "Evaluating according to personal values and ethics",
      },
      {
        name: "Extraverted Thinking (Te)",
        description: "Organizing and structuring the external world logically",
      },
      {
        name: "Introverted Intuition (Ni)",
        description: "Perceiving patterns and developing long-range visions",
      },
    ],
  },
}

export interface PersonalityType {
  name: string
  nickname: string
  shortDescription: string
  description: string
  traits: string[]
  values: string[]
  strengths: string[]
  weaknesses: string[]
  careers: string[]
  famousPeople: string[]
  compatibility: {
    best: string[]
    good: string[]
  }
  relationships: {
    communication: string
    asFriends: string
    asPartners: string
  }
  cognitiveFunctions: {
    name: string
    description: string
  }[]
}
