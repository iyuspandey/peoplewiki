module.exports = {
  data: [
    // Faculty
    {
      id: 'f001',
      name: 'Dr. Lalit Kumar Awasthi',
      role: 'Director',
      category: 'faculty',
      department: 'Administration',
      position: 'Director',
      email: 'director@nitj.ac.in',
      phone: '+91-XXX-XXXXXXX',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      specialization: 'Computer Science, Distributed Systems',
      achievements: [
        'Ph.D in Computer Science',
        'Former Director at NIT Hamirpur',
        'Published over 100 research papers'
      ],
      bio: 'Dr. Lalit Kumar Awasthi is an accomplished academician with extensive experience in educational administration and research.'
    },
    {
      id: 'f002',
      name: 'Dr. Anish Sachdeva',
      role: 'Professor',
      category: 'faculty',
      department: 'Industrial & Production Engineering',
      position: 'Head of Department',
      email: 'sachdeva.anish@nitj.ac.in',
      phone: '+91-XXX-XXXXXXX',
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      specialization: 'Industrial Engineering, Operations Research',
      achievements: [
        'Ph.D in Industrial Engineering',
        'Published 45+ research papers',
        'Recipient of AICTE grant for research'
      ],
      bio: 'Dr. Anish Sachdeva specializes in industrial engineering with focus on optimization and operations research.'
    },
    {
      id: 'f003',
      name: 'Dr. Monica Sikka',
      role: 'Associate Professor',
      category: 'faculty',
      department: 'Computer Science & Engineering',
      position: 'Associate Professor',
      email: 'sikka.monica@nitj.ac.in',
      phone: '+91-XXX-XXXXXXX',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      specialization: 'Machine Learning, Data Mining',
      achievements: [
        'Ph.D in Computer Science',
        'Published 30+ research papers',
        'Developed ML algorithms for healthcare applications'
      ],
      bio: 'Dr. Monica Sikka is an expert in machine learning and data mining with applications in healthcare and pattern recognition.'
    },

    // Staff
    {
      id: 's001',
      name: 'Rajesh Kumar',
      role: 'Administrative Officer',
      category: 'staff',
      department: 'Administration',
      position: 'Senior Administrative Officer',
      email: 'kumar.rajesh@nitj.ac.in',
      phone: '+91-XXX-XXXXXXX',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      bio: 'Rajesh Kumar has been serving in the administrative department for over 15 years, handling student affairs and institutional operations.'
    },
    {
      id: 's002',
      name: 'Sunita Sharma',
      role: 'Library Assistant',
      category: 'staff',
      department: 'Central Library',
      position: 'Senior Library Assistant',
      email: 'sharma.sunita@nitj.ac.in',
      phone: '+91-XXX-XXXXXXX',
      image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      bio: 'Sunita Sharma manages the library catalog system and assists students with research resources and material access.'
    },

    // Students
    {
      id: 'st001',
      name: 'Arjun Singh',
      role: 'B.Tech Student',
      category: 'student',
      department: 'Computer Science & Engineering',
      year: 4,
      rollNumber: '19CS045',
      email: 'singh.arjun@nitj.ac.in',
      phone: '+91-XXX-XXXXXXX',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      achievements: [
        'GATE 2023 AIR 145',
        'Google Summer of Code 2022',
        'Winner of Smart India Hackathon 2021'
      ],
      bio: 'Arjun is a final year student with expertise in full-stack development and machine learning. He has contributed to several open-source projects.'
    },
    {
      id: 'st002',
      name: 'Priya Sharma',
      role: 'M.Tech Student',
      category: 'student',
      department: 'Electronics & Communication',
      year: 2,
      rollNumber: '21EC021',
      email: 'sharma.priya@nitj.ac.in',
      phone: '+91-XXX-XXXXXXX',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      achievements: [
        'Published paper in IEEE conference',
        'CSIR-NET qualified',
        'Best project award in undergraduate studies'
      ],
      bio: 'Priya is researching VLSI design and embedded systems. She has published her work in reputed international conferences.'
    },
    {
      id: 'st003',
      name: 'Rahul Verma',
      role: 'Ph.D Scholar',
      category: 'student',
      department: 'Mechanical Engineering',
      year: 3,
      rollNumber: '20ME005PhD',
      email: 'verma.rahul@nitj.ac.in',
      phone: '+91-XXX-XXXXXXX',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      specialization: 'Thermal Engineering, Renewable Energy',
      achievements: [
        'PMRF Fellow',
        'Published 5 research papers in SCI journals',
        'Best researcher award 2022'
      ],
      bio: 'Rahul is working on innovative thermal energy storage solutions for renewable energy applications under the Prime Minister Research Fellowship.'
    },
    {
      id: 'st004',
      name: 'Neha Gupta',
      role: 'B.Tech Student',
      category: 'student',
      department: 'Civil Engineering',
      year: 3,
      rollNumber: '21CE078',
      email: 'gupta.neha@nitj.ac.in',
      phone: '+91-XXX-XXXXXXX',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      achievements: [
        'Secretary of Civil Engineering Society',
        'Winner of national level design competition',
        'Internship at L&T Construction'
      ],
      bio: 'Neha is passionate about sustainable construction techniques and has participated in multiple national level design competitions.'
    },
    {
      id: 'st005',
      name: 'Vikram Malhotra',
      role: 'B.Tech Student',
      category: 'student',
      department: 'Information Technology',
      year: 2,
      rollNumber: '22IT103',
      email: 'malhotra.vikram@nitj.ac.in',
      phone: '+91-XXX-XXXXXXX',
      image: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      achievements: [
        'Codechef 5-star coder',
        'Winner of intra-college hackathon',
        'Microsoft Learn Student Ambassador'
      ],
      bio: 'Vikram is a competitive programmer and web developer who has represented the college in various coding competitions.'
    }
  ]
};