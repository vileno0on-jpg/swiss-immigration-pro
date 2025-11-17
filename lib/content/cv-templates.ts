// 20 Complete CV Templates for Swiss Immigration Pro

export interface CVTemplate {
  id: string
  name: string
  category: string
  description: string
  layout: 'modern' | 'classic' | 'creative' | 'technical'
  sections: {
    header: {
      fullName: string
      title: string
      email: string
      phone: string
      location: string
      linkedin?: string
      portfolio?: string
    }
    summary: string
    experience: Array<{
      title: string
      company: string
      location: string
      dates: string
      bulletPoints: string[]
    }>
    education: Array<{
      degree: string
      institution: string
      location: string
      dates: string
      gpa?: string
    }>
    skills: {
      technical: string[]
      languages: string[]
      soft: string[]
    }
    certifications?: Array<{
      name: string
      issuer: string
      date: string
    }>
  }
}

export const CV_TEMPLATES: CVTemplate[] = [
  // TECH & IT (5 templates)
  {
    id: 'tech-software-engineer',
    name: 'Software Engineer (Modern)',
    category: 'Tech & IT',
    description: 'ATS-optimized template for software developers, developers, and engineers',
    layout: 'modern',
    sections: {
      header: {
        fullName: 'Anna Mueller',
        title: 'Full Stack Software Engineer',
        email: 'anna.mueller@email.com',
        phone: '+41 79 XXX XX XX',
        location: 'Zurich, Switzerland',
        linkedin: 'linkedin.com/in/annamueller',
        portfolio: 'annamueller.ch'
      },
      summary: 'Experienced Full Stack Software Engineer with 6+ years developing scalable web applications. Expert in React, Node.js, and cloud technologies. Passionate about clean code, test-driven development, and building products that solve real problems.',
      experience: [
        {
          title: 'Senior Software Engineer',
          company: 'SwissTech Solutions AG',
          location: 'Zurich, Switzerland',
          dates: '2021 - Present',
          bulletPoints: [
            'Led development of microservices architecture handling 1M+ API requests daily',
            'Built responsive React applications with 40% performance improvement',
            'Mentored team of 5 junior developers on best practices and code quality',
            'Implemented CI/CD pipelines reducing deployment time by 60%'
          ]
        },
        {
          title: 'Software Engineer',
          company: 'TechStart GmbH',
          location: 'Basel, Switzerland',
          dates: '2018 - 2021',
          bulletPoints: [
            'Developed RESTful APIs using Node.js and Express.js',
            'Created responsive UIs with React and TypeScript',
            'Collaborated with cross-functional teams in Agile environment',
            'Reduced bug rate by 45% through comprehensive testing'
          ]
        }
      ],
      education: [
        {
          degree: 'BSc Computer Science',
          institution: 'ETH Zurich',
          location: 'Zurich, Switzerland',
          dates: '2014 - 2018',
          gpa: '5.4/6.0'
        }
      ],
      skills: {
        technical: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL', 'MongoDB', 'Git'],
        languages: ['German (Native)', 'English (C2)', 'French (B2)'],
        soft: ['Team Leadership', 'Problem Solving', 'Agile Methodologies', 'Code Review']
      },
      certifications: [
        { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: '2023' },
        { name: 'Scrum Master Certification', issuer: 'Scrum Alliance', date: '2022' }
      ]
    }
  },
  {
    id: 'tech-devops',
    name: 'DevOps Engineer (Technical)',
    category: 'Tech & IT',
    description: 'Professional template for DevOps, SRE, and cloud engineers',
    layout: 'technical',
    sections: {
      header: {
        fullName: 'Thomas Weiss',
        title: 'DevOps Engineer',
        email: 'thomas.weiss@email.com',
        phone: '+41 78 XXX XX XX',
        location: 'Bern, Switzerland',
        linkedin: 'linkedin.com/in/thomasweiss'
      },
      summary: 'Results-driven DevOps Engineer with expertise in cloud infrastructure, containerization, and CI/CD automation. Proven track record of improving system reliability by 99.9% uptime.',
      experience: [
        {
          title: 'DevOps Engineer',
          company: 'CloudSwiss AG',
          location: 'Bern, Switzerland',
          dates: '2020 - Present',
          bulletPoints: [
            'Architected multi-cloud infrastructure (AWS, Azure) serving 500K+ users',
            'Implemented Kubernetes clusters reducing infrastructure costs by 35%',
            'Automated CI/CD pipelines using Jenkins and GitLab CI',
            'Improved monitoring and alerting reducing MTTR by 70%'
          ]
        },
        {
          title: 'Systems Administrator',
          company: 'DataCenter Solutions',
          location: 'Geneva, Switzerland',
          dates: '2017 - 2020',
          bulletPoints: [
            'Managed Linux/Windows server infrastructure',
            'Implemented backup and disaster recovery solutions',
            'Reduced system downtime by 50% through automation',
            'Performed capacity planning and resource optimization'
          ]
        }
      ],
      education: [
        {
          degree: 'MSc Information Technology',
          institution: 'University of Bern',
          location: 'Bern, Switzerland',
          dates: '2015 - 2017'
        }
      ],
      skills: {
        technical: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'Terraform', 'Ansible', 'Jenkins', 'Prometheus', 'Grafana', 'Linux'],
        languages: ['German (Native)', 'English (C1)', 'French (B2)'],
        soft: ['Incident Management', 'Team Collaboration', 'Documentation', 'Mentoring']
      }
    }
  },
  {
    id: 'tech-data-analyst',
    name: 'Data Analyst (Classic)',
    category: 'Tech & IT',
    description: 'Clean template for data analysts and business intelligence roles',
    layout: 'classic',
    sections: {
      header: {
        fullName: 'Sarah Fischer',
        title: 'Data Analyst',
        email: 'sarah.fischer@email.com',
        phone: '+41 76 XXX XX XX',
        location: 'Geneva, Switzerland',
        linkedin: 'linkedin.com/in/sarahfischer'
      },
      summary: 'Detail-oriented Data Analyst with 4 years of experience transforming raw data into actionable business insights. Expert in SQL, Python, and data visualization tools.',
      experience: [
        {
          title: 'Data Analyst',
          company: 'FinanceSwiss SA',
          location: 'Geneva, Switzerland',
          dates: '2020 - Present',
          bulletPoints: [
            'Analyzed financial datasets resulting in 15% revenue increase',
            'Created interactive dashboards using Tableau and Power BI',
            'Built predictive models with Python and scikit-learn',
            'Collaborated with stakeholders to define KPIs and metrics'
          ]
        },
        {
          title: 'Junior Data Analyst',
          company: 'RetailData GmbH',
          location: 'Basel, Switzerland',
          dates: '2019 - 2020',
          bulletPoints: [
            'Performed exploratory data analysis on customer behavior',
            'Generated weekly reports for management team',
            'Maintained data quality and integrity',
            'Assisted in database management and optimization'
          ]
        }
      ],
      education: [
        {
          degree: 'MSc Statistics & Data Science',
          institution: 'University of Geneva',
          location: 'Geneva, Switzerland',
          dates: '2017 - 2019'
        }
      ],
      skills: {
        technical: ['SQL', 'Python', 'R', 'Tableau', 'Power BI', 'Excel', 'Pandas', 'NumPy', 'scikit-learn'],
        languages: ['French (Native)', 'English (C2)', 'German (B2)'],
        soft: ['Statistical Analysis', 'Data Visualization', 'Report Writing', 'Stakeholder Management']
      }
    }
  },
  {
    id: 'tech-product-manager',
    name: 'Product Manager (Creative)',
    category: 'Tech & IT',
    description: 'Strategic template for product managers and PM roles',
    layout: 'creative',
    sections: {
      header: {
        fullName: 'Michael Chen',
        title: 'Product Manager',
        email: 'michael.chen@email.com',
        phone: '+41 77 XXX XX XX',
        location: 'Lausanne, Switzerland',
        linkedin: 'linkedin.com/in/michaelchen'
      },
      summary: 'Strategic Product Manager with 5+ years leading cross-functional teams to deliver innovative products. Expert in Agile, user-centered design, and data-driven decision making.',
      experience: [
        {
          title: 'Senior Product Manager',
          company: 'InnovateCH AG',
          location: 'Lausanne, Switzerland',
          dates: '2021 - Present',
          bulletPoints: [
            'Managed product roadmap for SaaS platform with 100K+ users',
            'Increased customer retention by 30% through feature optimization',
            'Led user research and A/B testing initiatives',
            'Collaborated with engineering, design, and marketing teams'
          ]
        },
        {
          title: 'Product Manager',
          company: 'StartupHub SA',
          location: 'Zurich, Switzerland',
          dates: '2019 - 2021',
          bulletPoints: [
            'Launched 3 new products achieving $2M ARR',
            'Defined product requirements and user stories',
            'Conducted market research and competitive analysis',
            'Coordinated sprints and releases'
          ]
        }
      ],
      education: [
        {
          degree: 'MBA',
          institution: 'University of Lausanne (HEC)',
          location: 'Lausanne, Switzerland',
          dates: '2017 - 2019'
        }
      ],
      skills: {
        technical: ['Product Strategy', 'Agile/Scrum', 'User Research', 'Analytics', 'Figma', 'Jira', 'Confluence'],
        languages: ['English (Native)', 'French (C1)', 'German (B2)', 'Mandarin (B2)'],
        soft: ['Leadership', 'Stakeholder Management', 'Strategic Thinking', 'Communication']
      }
    }
  },
  {
    id: 'tech-cybersecurity',
    name: 'Cybersecurity Specialist',
    category: 'Tech & IT',
    description: 'Security-focused template for cybersecurity professionals',
    layout: 'technical',
    sections: {
      header: {
        fullName: 'Julia Hoffmann',
        title: 'Cybersecurity Specialist',
        email: 'julia.hoffmann@email.com',
        phone: '+41 79 XXX XX XX',
        location: 'St. Gallen, Switzerland',
        linkedin: 'linkedin.com/in/juliahoffmann'
      },
      summary: 'Certified Cybersecurity Specialist with 6 years protecting enterprise systems. Expert in penetration testing, incident response, and security architecture.',
      experience: [
        {
          title: 'Cybersecurity Specialist',
          company: 'SecureSwiss GmbH',
          location: 'St. Gallen, Switzerland',
          dates: '2020 - Present',
          bulletPoints: [
            'Conducted security audits identifying 150+ vulnerabilities',
            'Implemented zero-trust architecture reducing breach risk by 80%',
            'Led incident response team handling 5 major security events',
            'Developed security training programs for 200+ employees'
          ]
        },
        {
          title: 'Security Analyst',
          company: 'BankSecurity AG',
          location: 'Zurich, Switzerland',
          dates: '2018 - 2020',
          bulletPoints: [
            'Monitored network traffic detecting potential threats',
            'Performed vulnerability assessments and penetration testing',
            'Analyzed malware and security incidents',
            'Maintained SIEM and IDS/IPS systems'
          ]
        }
      ],
      education: [
        {
          degree: 'MSc Cybersecurity',
          institution: 'University of St. Gallen',
          location: 'St. Gallen, Switzerland',
          dates: '2016 - 2018'
        }
      ],
      skills: {
        technical: ['Penetration Testing', 'SIEM', 'Firewalls', 'IDS/IPS', 'Wireshark', 'Metasploit', 'OWASP', 'NIST Framework', 'ISO 27001'],
        languages: ['German (Native)', 'English (C2)', 'French (B1)'],
        soft: ['Risk Assessment', 'Incident Response', 'Communication', 'Training & Mentoring']
      },
      certifications: [
        { name: 'CISSP', issuer: 'ISC²', date: '2021' },
        { name: 'CEH', issuer: 'EC-Council', date: '2020' },
        { name: 'CISM', issuer: 'ISACA', date: '2019' }
      ]
    }
  },

  // FINANCE & BANKING (4 templates)
  {
    id: 'finance-analyst',
    name: 'Financial Analyst',
    category: 'Finance & Banking',
    description: 'Professional template for financial analysts',
    layout: 'classic',
    sections: {
      header: {
        fullName: 'David Roth',
        title: 'Financial Analyst',
        email: 'david.roth@email.com',
        phone: '+41 79 XXX XX XX',
        location: 'Zurich, Switzerland',
        linkedin: 'linkedin.com/in/davidroth'
      },
      summary: 'Analytical Financial Analyst with 5 years experience in investment analysis, financial modeling, and risk assessment. Strong background in equity research and portfolio management.',
      experience: [
        {
          title: 'Financial Analyst',
          company: 'SwissBank Investment Group',
          location: 'Zurich, Switzerland',
          dates: '2020 - Present',
          bulletPoints: [
            'Analyzed investment opportunities in European markets',
            'Built financial models and DCF valuations',
            'Prepared quarterly earnings reports and equity research',
            'Supported portfolio managers in investment decisions'
          ]
        },
        {
          title: 'Junior Analyst',
          company: 'Private Banking Ltd',
          location: 'Geneva, Switzerland',
          dates: '2019 - 2020',
          bulletPoints: [
            'Conducted market research and competitor analysis',
            'Assisted in client portfolio reviews',
            'Prepared presentations for senior management',
            'Maintained financial databases and systems'
          ]
        }
      ],
      education: [
        {
          degree: 'MSc Finance',
          institution: 'University of Zurich',
          location: 'Zurich, Switzerland',
          dates: '2017 - 2019'
        },
        {
          degree: 'BSc Business Administration',
          institution: 'University of Geneva',
          location: 'Geneva, Switzerland',
          dates: '2013 - 2017'
        }
      ],
      skills: {
        technical: ['Financial Modeling', 'Excel', 'Bloomberg Terminal', 'Python', 'VBA', 'SQL', 'PowerPoint', 'Portfolio Management'],
        languages: ['French (Native)', 'English (C2)', 'German (C1)'],
        soft: ['Financial Analysis', 'Risk Assessment', 'Report Writing', 'Client Relationship Management']
      },
      certifications: [
        { name: 'CFA Level II', issuer: 'CFA Institute', date: '2021' },
        { name: 'Series 7 License', issuer: 'FINRA', date: '2020' }
      ]
    }
  },
  {
    id: 'finance-auditor',
    name: 'Internal Auditor',
    category: 'Finance & Banking',
    description: 'Template for auditors and compliance professionals',
    layout: 'classic',
    sections: {
      header: {
        fullName: 'Laura Schneider',
        title: 'Internal Auditor',
        email: 'laura.schneider@email.com',
        phone: '+41 78 XXX XX XX',
        location: 'Bern, Switzerland',
        linkedin: 'linkedin.com/in/lauraschneider'
      },
      summary: 'Detail-oriented Internal Auditor with 4 years ensuring compliance with regulations and internal policies. Expert in risk assessment and process improvement.',
      experience: [
        {
          title: 'Internal Auditor',
          company: 'ComplianceSwiss AG',
          location: 'Bern, Switzerland',
          dates: '2020 - Present',
          bulletPoints: [
            'Conducted audits across 15 departments identifying $500K in savings',
            'Evaluated internal controls and compliance with regulations',
            'Prepared audit reports with actionable recommendations',
            'Collaborated with management to implement improvements'
          ]
        },
        {
          title: 'Junior Auditor',
          company: 'Audit Partners SA',
          location: 'Basel, Switzerland',
          dates: '2019 - 2020',
          bulletPoints: [
            'Performed testing of internal controls',
            'Assisted in financial and operational audits',
            'Documented audit procedures and findings',
            'Supported senior auditors in audit planning'
          ]
        }
      ],
      education: [
        {
          degree: 'MSc Accounting',
          institution: 'University of Bern',
          location: 'Bern, Switzerland',
          dates: '2017 - 2019'
        }
      ],
      skills: {
        technical: ['Audit Standards', 'Excel', 'Audit Tools', 'SAP', 'Risk Assessment', 'SOX Compliance', 'Internal Controls'],
        languages: ['German (Native)', 'English (C2)', 'French (B2)'],
        soft: ['Attention to Detail', 'Analytical Thinking', 'Report Writing', 'Collaboration']
      },
      certifications: [
        { name: 'CIA (Certified Internal Auditor)', issuer: 'IIA', date: '2021' },
        { name: 'CPA Equivalent', issuer: 'Swiss Institute of Certified Accountants', date: '2020' }
      ]
    }
  },
  {
    id: 'finance-tax-advisor',
    name: 'Tax Advisor',
    category: 'Finance & Banking',
    description: 'Professional template for tax advisors',
    layout: 'classic',
    sections: {
      header: {
        fullName: 'Robert Meier',
        title: 'Tax Advisor',
        email: 'robert.meier@email.com',
        phone: '+41 76 XXX XX XX',
        location: 'Geneva, Switzerland',
        linkedin: 'linkedin.com/in/robertmeier'
      },
      summary: 'Experienced Tax Advisor specializing in Swiss and international tax law. 7 years helping individuals and businesses optimize tax strategies.',
      experience: [
        {
          title: 'Tax Advisor',
          company: 'TaxExperts SA',
          location: 'Geneva, Switzerland',
          dates: '2018 - Present',
          bulletPoints: [
            'Managed tax planning for 200+ clients saving average 15% in taxes',
            'Prepared corporate and individual tax returns',
            'Advised on international tax treaties and double taxation',
            'Represented clients in tax audits and disputes'
          ]
        },
        {
          title: 'Junior Tax Consultant',
          company: 'Financial Services Ltd',
          location: 'Lausanne, Switzerland',
          dates: '2017 - 2018',
          bulletPoints: [
            'Assisted with tax return preparation',
            'Researched tax legislation and regulations',
            'Maintained client documentation',
            'Supported senior advisors on complex cases'
          ]
        }
      ],
      education: [
        {
          degree: 'MSc Tax Law',
          institution: 'University of Geneva',
          location: 'Geneva, Switzerland',
          dates: '2015 - 2017'
        }
      ],
      skills: {
        technical: ['Swiss Tax Law', 'International Tax', 'Excel', 'Tax Software', 'Research', 'Regulatory Compliance'],
        languages: ['French (Native)', 'English (C2)', 'German (C1)'],
        soft: ['Client Consultation', 'Problem Solving', 'Attention to Detail', 'Communication']
      },
      certifications: [
        { name: 'Swiss Certified Tax Advisor', issuer: 'Swiss Tax Association', date: '2019' }
      ]
    }
  },
  {
    id: 'finance-investment-banker',
    name: 'Investment Banking Analyst',
    category: 'Finance & Banking',
    description: 'Prestigious template for investment banking roles',
    layout: 'classic',
    sections: {
      header: {
        fullName: 'Alexander Weber',
        title: 'Investment Banking Analyst',
        email: 'alex.weber@email.com',
        phone: '+41 79 XXX XX XX',
        location: 'Zurich, Switzerland',
        linkedin: 'linkedin.com/in/alexanderweber'
      },
      summary: 'High-performing Investment Banking Analyst with expertise in M&A transactions and capital markets. Strong analytical and modeling skills.',
      experience: [
        {
          title: 'Investment Banking Analyst',
          company: 'Zurich Capital Markets',
          location: 'Zurich, Switzerland',
          dates: '2021 - Present',
          bulletPoints: [
            'Executed M&A transactions worth CHF 500M+',
            'Built complex financial models and valuations',
            'Prepared pitch books and transaction materials',
            'Coordinated due diligence processes'
          ]
        },
        {
          title: 'Analyst Intern',
          company: 'Credit Suisse',
          location: 'Zurich, Switzerland',
          dates: '2020',
          bulletPoints: [
            'Supported senior bankers on live transactions',
            'Performed company and industry research',
            'Assisted in financial analysis and modeling',
            'Attended client meetings and calls'
          ]
        }
      ],
      education: [
        {
          degree: 'MSc Business Administration',
          institution: 'HSG St. Gallen',
          location: 'St. Gallen, Switzerland',
          dates: '2019 - 2021',
          gpa: '5.8/6.0'
        }
      ],
      skills: {
        technical: ['Financial Modeling', 'M&A', 'Capital Markets', 'Excel', 'Bloomberg', 'PowerPoint', 'Valuation', 'DCF'],
        languages: ['German (Native)', 'English (C2)', 'French (C1)'],
        soft: ['Analytical Skills', 'Working Under Pressure', 'Attention to Detail', 'Communication']
      }
    }
  },

  // MEDICINE & HEALTHCARE (3 templates)
  {
    id: 'medicine-doctor',
    name: 'Medical Doctor',
    category: 'Medicine & Healthcare',
    description: 'Professional template for physicians and doctors',
    layout: 'classic',
    sections: {
      header: {
        fullName: 'Dr. Maria Sanchez',
        title: 'General Practitioner',
        email: 'maria.sanchez@email.com',
        phone: '+41 79 XXX XX XX',
        location: 'Basel, Switzerland',
        linkedin: 'linkedin.com/in/drmariasanchez'
      },
      summary: 'Licensed General Practitioner with 8 years clinical experience. Specialized in preventive care, chronic disease management, and patient-centered medicine.',
      experience: [
        {
          title: 'General Practitioner',
          company: 'SwissHealth Clinic',
          location: 'Basel, Switzerland',
          dates: '2018 - Present',
          bulletPoints: [
            'Provided primary care to 1,500+ patients',
            'Diagnosed and treated acute and chronic conditions',
            'Conducted preventive health screenings',
            'Collaborated with specialists and healthcare teams'
          ]
        },
        {
          title: 'Resident Physician',
          company: 'University Hospital Basel',
          location: 'Basel, Switzerland',
          dates: '2016 - 2018',
          bulletPoints: [
            'Completed residency in internal medicine',
            'Managed inpatient and outpatient cases',
            'Participated in medical rounds and conferences',
            'Supervised medical students'
          ]
        }
      ],
      education: [
        {
          degree: 'MD (Doctor of Medicine)',
          institution: 'University of Basel',
          location: 'Basel, Switzerland',
          dates: '2010 - 2016'
        }
      ],
      skills: {
        technical: ['Primary Care', 'Preventive Medicine', 'Chronic Disease Management', 'Clinical Assessment', 'Electronic Medical Records'],
        languages: ['Spanish (Native)', 'German (C2)', 'French (C1)', 'English (C2)'],
        soft: ['Patient Communication', 'Empathy', 'Clinical Decision Making', 'Team Collaboration']
      },
      certifications: [
        { name: 'Swiss Medical License', issuer: 'FMH (Swiss Medical Association)', date: '2016' }
      ]
    }
  },
  {
    id: 'medicine-nurse',
    name: 'Registered Nurse',
    category: 'Medicine & Healthcare',
    description: 'Compassionate template for nurses',
    layout: 'classic',
    sections: {
      header: {
        fullName: 'Sandra Baumgartner',
        title: 'Registered Nurse',
        email: 'sandra.baumgartner@email.com',
        phone: '+41 78 XXX XX XX',
        location: 'Bern, Switzerland',
        linkedin: 'linkedin.com/in/sandrab Baumgartner'
      },
      summary: 'Compassionate Registered Nurse with 10 years experience providing patient-centered care. Expert in critical care, patient advocacy, and healthcare coordination.',
      experience: [
        {
          title: 'Registered Nurse (ICU)',
          company: 'Cantonal Hospital Bern',
          location: 'Bern, Switzerland',
          dates: '2018 - Present',
          bulletPoints: [
            'Provided intensive care to critically ill patients',
            'Administered medications and monitoring vital signs',
            'Collaborated with multidisciplinary healthcare team',
            'Trained new nursing staff on ICU protocols'
          ]
        },
        {
          title: 'Registered Nurse',
          company: 'General Hospital',
          location: 'Thun, Switzerland',
          dates: '2014 - 2018',
          bulletPoints: [
            'Delivered patient care on medical-surgical unit',
            'Conducted patient assessments and care planning',
            'Educated patients and families on health management',
            'Documented patient care and treatment outcomes'
          ]
        }
      ],
      education: [
        {
          degree: 'BSc Nursing',
          institution: 'Bern University of Applied Sciences',
          location: 'Bern, Switzerland',
          dates: '2011 - 2014'
        }
      ],
      skills: {
        technical: ['Patient Care', 'Medication Administration', 'IV Therapy', 'Wound Care', 'Patient Monitoring', 'Critical Care', 'Electronic Health Records'],
        languages: ['German (Native)', 'French (B2)', 'English (C1)'],
        soft: ['Compassion', 'Patient Advocacy', 'Stress Management', 'Teamwork']
      },
      certifications: [
        { name: 'Swiss Registered Nurse', issuer: 'Swiss Red Cross', date: '2014' },
        { name: 'Advanced Cardiac Life Support', issuer: 'American Heart Association', date: '2021' }
      ]
    }
  },
  {
    id: 'medicine-physiotherapist',
    name: 'Physiotherapist',
    category: 'Medicine & Healthcare',
    description: 'Professional template for physiotherapists',
    layout: 'classic',
    sections: {
      header: {
        fullName: 'Christoph Huber',
        title: 'Physiotherapist',
        email: 'christoph.huber@email.com',
        phone: '+41 76 XXX XX XX',
        location: 'Lucerne, Switzerland',
        linkedin: 'linkedin.com/in/christophhuber'
      },
      summary: 'Experienced Physiotherapist specializing in sports rehabilitation and orthopedic therapy. 6 years helping patients recover from injuries and improve mobility.',
      experience: [
        {
          title: 'Physiotherapist',
          company: 'SportClinic Lucerne',
          location: 'Lucerne, Switzerland',
          dates: '2019 - Present',
          bulletPoints: [
            'Treated 300+ athletes recovering from sports injuries',
            'Developed personalized rehabilitation programs',
            'Utilized manual therapy and exercise prescription',
            'Collaborated with physicians and sports coaches'
          ]
        },
        {
          title: 'Junior Physiotherapist',
          company: 'Rehab Center',
          location: 'Zurich, Switzerland',
          dates: '2018 - 2019',
          bulletPoints: [
            'Assisted in patient treatment and rehabilitation',
            'Conducted initial assessments and evaluations',
            'Maintained patient records and progress notes',
            'Supported senior therapists in complex cases'
          ]
        }
      ],
      education: [
        {
          degree: 'BSc Physiotherapy',
          institution: 'University of Applied Sciences Zurich',
          location: 'Zurich, Switzerland',
          dates: '2014 - 2018'
        }
      ],
      skills: {
        technical: ['Manual Therapy', 'Exercise Prescription', 'Sports Rehabilitation', 'Orthopedic Assessment', 'Injury Prevention', 'Therapeutic Techniques'],
        languages: ['German (Native)', 'English (C1)', 'Italian (B2)'],
        soft: ['Patient Empathy', 'Communication', 'Patience', 'Analytical Thinking']
      },
      certifications: [
        { name: 'Swiss Licensed Physiotherapist', issuer: 'Physioswiss', date: '2018' },
        { name: 'Sports Physiotherapy Certificate', issuer: 'International Sport Physiotherapy', date: '2020' }
      ]
    }
  },

  // ENGINEERING (3 templates)
  {
    id: 'eng-mechanical',
    name: 'Mechanical Engineer',
    category: 'Engineering',
    description: 'Technical template for mechanical engineers',
    layout: 'technical',
    sections: {
      header: {
        fullName: 'Daniel Keller',
        title: 'Mechanical Engineer',
        email: 'daniel.keller@email.com',
        phone: '+41 79 XXX XX XX',
        location: 'Winterthur, Switzerland',
        linkedin: 'linkedin.com/in/danielkeller'
      },
      summary: 'Innovative Mechanical Engineer with 7 years designing and optimizing mechanical systems. Expert in CAD, FEA, and product development.',
      experience: [
        {
          title: 'Mechanical Engineer',
          company: 'SwissMachines AG',
          location: 'Winterthur, Switzerland',
          dates: '2019 - Present',
          bulletPoints: [
            'Designed precision mechanical components reducing production costs by 20%',
            'Performed FEA analysis and simulations',
            'Led product development projects from concept to production',
            'Collaborated with manufacturing teams on optimization'
          ]
        },
        {
          title: 'Junior Engineer',
          company: 'Engineering Solutions Ltd',
          location: 'Baden, Switzerland',
          dates: '2017 - 2019',
          bulletPoints: [
            'Assisted in CAD design and drafting',
            'Conducted testing and quality control',
            'Prepared technical documentation',
            'Supported senior engineers on projects'
          ]
        }
      ],
      education: [
        {
          degree: 'MSc Mechanical Engineering',
          institution: 'ETH Zurich',
          location: 'Zurich, Switzerland',
          dates: '2015 - 2017'
        }
      ],
      skills: {
        technical: ['CAD/CAM', 'SOLIDWORKS', 'ANSYS', 'AutoCAD', 'FEA', 'GD&T', 'Materials Science', 'Manufacturing Processes', 'CNC'],
        languages: ['German (Native)', 'English (C2)', 'French (B2)'],
        soft: ['Problem Solving', 'Project Management', 'Technical Writing', 'Collaboration']
      }
    }
  },
  {
    id: 'eng-electrical',
    name: 'Electrical Engineer',
    category: 'Engineering',
    description: 'Technical template for electrical engineers',
    layout: 'technical',
    sections: {
      header: {
        fullName: 'Lisa Schmid',
        title: 'Electrical Engineer',
        email: 'lisa.schmid@email.com',
        phone: '+41 78 XXX XX XX',
        location: 'Zurich, Switzerland',
        linkedin: 'linkedin.com/in/lisaschmid'
      },
      summary: 'Experienced Electrical Engineer specializing in power systems and automation. 5 years designing and implementing electrical solutions.',
      experience: [
        {
          title: 'Electrical Engineer',
          company: 'PowerGrid Solutions',
          location: 'Zurich, Switzerland',
          dates: '2020 - Present',
          bulletPoints: [
            'Designed electrical systems for industrial facilities',
            'Developed PLC programs and automation solutions',
            'Performed power system analysis and load calculations',
            'Managed electrical installation projects'
          ]
        },
        {
          title: 'Junior Electrical Engineer',
          company: 'Automation Systems SA',
          location: 'Basel, Switzerland',
          dates: '2019 - 2020',
          bulletPoints: [
            'Assisted in circuit design and testing',
            'Created electrical drawings and schematics',
            'Supported field installation and commissioning',
            'Troubleshot electrical issues'
          ]
        }
      ],
      education: [
        {
          degree: 'MSc Electrical Engineering',
          institution: 'ETH Zurich',
          location: 'Zurich, Switzerland',
          dates: '2017 - 2019'
        }
      ],
      skills: {
        technical: ['Circuit Design', 'PLC Programming', 'Power Systems', 'AutoCAD Electrical', 'MATLAB', 'Simulink', 'VFD', 'SCADA', 'Electrical Safety'],
        languages: ['German (Native)', 'English (C2)', 'French (B1)'],
        soft: ['Analytical Thinking', 'Technical Documentation', 'Project Coordination', 'Safety Awareness']
      }
    }
  },
  {
    id: 'eng-biomedical',
    name: 'Biomedical Engineer',
    category: 'Engineering',
    description: 'Innovative template for biomedical engineers',
    layout: 'technical',
    sections: {
      header: {
        fullName: 'Emma Richards',
        title: 'Biomedical Engineer',
        email: 'emma.richards@email.com',
        phone: '+41 77 XXX XX XX',
        location: 'Geneva, Switzerland',
        linkedin: 'linkedin.com/in/emmarichards'
      },
      summary: 'Innovative Biomedical Engineer combining engineering and medical expertise to develop life-saving medical devices. 4 years in medical device development.',
      experience: [
        {
          title: 'Biomedical Engineer',
          company: 'MedDevice Innovation SA',
          location: 'Geneva, Switzerland',
          dates: '2020 - Present',
          bulletPoints: [
            'Developed cardiac monitoring device reducing false alarms by 40%',
            'Led regulatory submissions and compliance testing',
            'Collaborated with clinicians on device requirements',
            'Optimized device performance and reliability'
          ]
        },
        {
          title: 'R&D Engineer Intern',
          company: 'Healthcare Technologies',
          location: 'Lausanne, Switzerland',
          dates: '2019',
          bulletPoints: [
            'Assisted in prototype development and testing',
            'Conducted literature reviews and research',
            'Supported clinical studies and data collection',
            'Prepared technical reports and documentation'
          ]
        }
      ],
      education: [
        {
          degree: 'MSc Biomedical Engineering',
          institution: 'EPFL',
          location: 'Lausanne, Switzerland',
          dates: '2017 - 2019'
        }
      ],
      skills: {
        technical: ['Medical Devices', 'Biomechanics', 'Signal Processing', 'MATLAB', 'CAD', 'Regulatory Compliance', 'Quality Systems', 'ISO 13485'],
        languages: ['English (Native)', 'French (C2)', 'German (B2)'],
        soft: ['Research', 'Problem Solving', 'Regulatory Knowledge', 'Interdisciplinary Collaboration']
      },
      certifications: [
        { name: 'ISO 13485 Internal Auditor', issuer: 'ISO', date: '2021' }
      ]
    }
  },

  // CONSULTING (2 templates)
  {
    id: 'consulting-management',
    name: 'Management Consultant',
    category: 'Consulting',
    description: 'Strategic template for management consultants',
    layout: 'modern',
    sections: {
      header: {
        fullName: 'Sophie Dubois',
        title: 'Management Consultant',
        email: 'sophie.dubois@email.com',
        phone: '+41 79 XXX XX XX',
        location: 'Geneva, Switzerland',
        linkedin: 'linkedin.com/in/sophiedubois'
      },
      summary: 'Results-driven Management Consultant with 6 years helping organizations improve performance and achieve strategic objectives. Expert in business transformation.',
      experience: [
        {
          title: 'Senior Consultant',
          company: 'StrategySwiss AG',
          location: 'Geneva, Switzerland',
          dates: '2020 - Present',
          bulletPoints: [
            'Led digital transformation project generating CHF 5M savings',
            'Developed go-to-market strategies for 3 clients',
            'Conducted market research and competitive analysis',
            'Presented findings to C-level executives'
          ]
        },
        {
          title: 'Consultant',
          company: 'Business Excellence Group',
          location: 'Zurich, Switzerland',
          dates: '2018 - 2020',
          bulletPoints: [
            'Managed operational improvement initiatives',
            'Analyzed business processes and identified inefficiencies',
            'Developed recommendations and implementation roadmaps',
            'Facilitated client workshops and interviews'
          ]
        }
      ],
      education: [
        {
          degree: 'MBA',
          institution: 'IMD Business School',
          location: 'Lausanne, Switzerland',
          dates: '2016 - 2018'
        }
      ],
      skills: {
        technical: ['Business Strategy', 'Market Analysis', 'Process Improvement', 'Financial Modeling', 'Project Management', 'Data Analysis'],
        languages: ['French (Native)', 'English (C2)', 'German (C1)'],
        soft: ['Strategic Thinking', 'Client Management', 'Presentation Skills', 'Problem Solving']
      }
    }
  },
  {
    id: 'consulting-hr',
    name: 'HR Consultant',
    category: 'Consulting',
    description: 'People-focused template for HR consultants',
    layout: 'modern',
    sections: {
      header: {
        fullName: 'Julia Zimmermann',
        title: 'HR Consultant',
        email: 'julia.zimmermann@email.com',
        phone: '+41 76 XXX XX XX',
        location: 'Bern, Switzerland',
        linkedin: 'linkedin.com/in/juliazimmermann'
      },
      summary: 'Experienced HR Consultant specializing in talent management, organizational development, and HR strategy. 5 years transforming HR functions.',
      experience: [
        {
          title: 'HR Consultant',
          company: 'PeopleStrategy SA',
          location: 'Bern, Switzerland',
          dates: '2020 - Present',
          bulletPoints: [
            'Designed talent acquisition strategies reducing time-to-hire by 30%',
            'Developed compensation and benefits frameworks',
            'Implemented HRIS systems and processes',
            'Conducted organizational culture assessments'
          ]
        },
        {
          title: 'HR Advisor',
          company: 'Human Resources Solutions',
          location: 'Basel, Switzerland',
          dates: '2019 - 2020',
          bulletPoints: [
            'Managed employee relations and conflict resolution',
            'Developed HR policies and procedures',
            'Conducted recruitment and selection',
            'Delivered HR training programs'
          ]
        }
      ],
      education: [
        {
          degree: 'MSc Human Resource Management',
          institution: 'University of Bern',
          location: 'Bern, Switzerland',
          dates: '2017 - 2019'
        }
      ],
      skills: {
        technical: ['Talent Management', 'HR Strategy', 'Compensation Design', 'HRIS', 'Talent Acquisition', 'Performance Management', 'Training & Development'],
        languages: ['German (Native)', 'English (C2)', 'French (C1)'],
        soft: ['Interpersonal Skills', 'Conflict Resolution', 'Stakeholder Management', 'Communication']
      },
      certifications: [
        { name: 'SHRM-CP', issuer: 'SHRM', date: '2021' }
      ]
    }
  },

  // LEGAL (1 template)
  {
    id: 'legal-lawyer',
    name: 'Corporate Lawyer',
    category: 'Legal',
    description: 'Professional template for lawyers',
    layout: 'classic',
    sections: {
      header: {
        fullName: 'Alexander Schneider',
        title: 'Corporate Lawyer',
        email: 'alexander.schneider@lawfirm.ch',
        phone: '+41 79 XXX XX XX',
        location: 'Zurich, Switzerland',
        linkedin: 'linkedin.com/in/alexanderschneider'
      },
      summary: 'Experienced Corporate Lawyer with 8 years specializing in M&A transactions and corporate governance. Expert in Swiss corporate law.',
      experience: [
        {
          title: 'Senior Associate',
          company: 'Alpine Legal Partners',
          location: 'Zurich, Switzerland',
          dates: '2019 - Present',
          bulletPoints: [
            'Led M&A transactions worth CHF 100M+',
            'Advised clients on corporate governance and compliance',
            'Drafted complex commercial contracts and agreements',
            'Represented clients in negotiations'
          ]
        },
        {
          title: 'Associate Lawyer',
          company: 'Corporate Law Firm',
          location: 'Geneva, Switzerland',
          dates: '2017 - 2019',
          bulletPoints: [
            'Assisted with due diligence and transaction documentation',
            'Researched legal issues and case law',
            'Drafted legal memoranda and opinions',
            'Supported partners on client matters'
          ]
        }
      ],
      education: [
        {
          degree: 'Master of Law (MLaw)',
          institution: 'University of Zurich',
          location: 'Zurich, Switzerland',
          dates: '2012 - 2016'
        }
      ],
      skills: {
        technical: ['Corporate Law', 'M&A', 'Contract Law', 'Commercial Law', 'Legal Research', 'Due Diligence', 'Corporate Governance'],
        languages: ['German (Native)', 'English (C2)', 'French (C1)'],
        soft: ['Legal Analysis', 'Negotiation', 'Client Relations', 'Attention to Detail']
      },
      certifications: [
        { name: 'Swiss Bar Admission', issuer: 'Zurich Bar Association', date: '2017' }
      ]
    }
  },

  // MARKETING & SALES (2 templates)
  {
    id: 'marketing-manager',
    name: 'Marketing Manager',
    category: 'Marketing & Sales',
    description: 'Creative template for marketing professionals',
    layout: 'creative',
    sections: {
      header: {
        fullName: 'Nina Jensen',
        title: 'Marketing Manager',
        email: 'nina.jensen@email.com',
        phone: '+41 78 XXX XX XX',
        location: 'Basel, Switzerland',
        linkedin: 'linkedin.com/in/ninajensen',
        portfolio: 'ninajensen.ch'
      },
      summary: 'Creative Marketing Manager with 5 years driving brand growth and customer acquisition. Expert in digital marketing, brand strategy, and campaign management.',
      experience: [
        {
          title: 'Marketing Manager',
          company: 'BrandSwiss AG',
          location: 'Basel, Switzerland',
          dates: '2020 - Present',
          bulletPoints: [
            'Increased brand awareness by 60% through integrated campaigns',
            'Managed digital marketing budget of CHF 500K',
            'Launched 3 successful product campaigns',
            'Led team of 4 marketing specialists'
          ]
        },
        {
          title: 'Marketing Specialist',
          company: 'E-commerce Solutions',
          location: 'Zurich, Switzerland',
          dates: '2019 - 2020',
          bulletPoints: [
            'Developed social media strategies increasing engagement 80%',
            'Created marketing content and copy',
            'Managed email marketing campaigns',
            'Analyzed marketing metrics and KPIs'
          ]
        }
      ],
      education: [
        {
          degree: 'MSc Marketing & Communications',
          institution: 'University of Basel',
          location: 'Basel, Switzerland',
          dates: '2017 - 2019'
        }
      ],
      skills: {
        technical: ['Digital Marketing', 'Brand Strategy', 'Social Media', 'SEO/SEM', 'Google Analytics', 'Adobe Creative Suite', 'Content Marketing', 'Email Marketing', 'CRM'],
        languages: ['Norwegian (Native)', 'English (C2)', 'German (C1)', 'French (B2)'],
        soft: ['Creativity', 'Strategic Thinking', 'Team Leadership', 'Communication']
      }
    }
  },
  {
    id: 'sales-manager',
    name: 'Sales Manager',
    category: 'Marketing & Sales',
    description: 'Results-driven template for sales professionals',
    layout: 'modern',
    sections: {
      header: {
        fullName: 'Marco Rossi',
        title: 'Sales Manager',
        email: 'marco.rossi@email.com',
        phone: '+41 79 XXX XX XX',
        location: 'Geneva, Switzerland',
        linkedin: 'linkedin.com/in/marcorossi'
      },
      summary: 'Top-performing Sales Manager with 7 years exceeding targets and building high-performing sales teams. Expert in B2B sales and account management.',
      experience: [
        {
          title: 'Sales Manager',
          company: 'Enterprise Sales Solutions',
          location: 'Geneva, Switzerland',
          dates: '2020 - Present',
          bulletPoints: [
            'Exceeded annual sales targets by average 120%',
            'Managed key accounts worth CHF 10M+',
            'Led sales team generating CHF 15M annual revenue',
            'Developed new business opportunities and partnerships'
          ]
        },
        {
          title: 'Senior Sales Representative',
          company: 'TechSales SA',
          location: 'Lausanne, Switzerland',
          dates: '2017 - 2020',
          bulletPoints: [
            'Generated CHF 5M+ in annual sales',
            'Built and maintained client relationships',
            'Presented products and solutions to clients',
            'Negotiated contracts and agreements'
          ]
        }
      ],
      education: [
        {
          degree: 'BSc Business Administration',
          institution: 'University of Geneva',
          location: 'Geneva, Switzerland',
          dates: '2013 - 2017'
        }
      ],
      skills: {
        technical: ['B2B Sales', 'Account Management', 'CRM Systems', 'Sales Forecasting', 'Proposal Development', 'Contract Negotiation', 'Market Analysis'],
        languages: ['Italian (Native)', 'French (C2)', 'English (C2)', 'German (B2)'],
        soft: ['Relationship Building', 'Negotiation', 'Persuasion', 'Team Leadership']
      }
    }
  }
]

