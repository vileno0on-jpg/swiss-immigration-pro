'use client'

import { CVData } from '@/types/cv'
import { getTemplateById } from '@/lib/cv/templates'

interface CVPreviewProps {
  cvData: CVData
}

export default function CVPreview({ cvData }: CVPreviewProps) {
  const template = getTemplateById(cvData.templateId)
  const primaryColor = template?.config.colorScheme.primary || '#0056B3'
  const textColor = template?.config.colorScheme.text || '#1F2937'
  const bgColor = template?.config.colorScheme.background || '#FFFFFF'

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-4xl mx-auto border-2 border-blue-100" style={{ backgroundColor: bgColor }}>
      {/* Header */}
      <div className="mb-8" style={{ borderBottom: `3px solid ${primaryColor}`, paddingBottom: '20px' }}>
        <h1
          className="text-4xl font-bold mb-2"
          style={{ color: primaryColor }}
        >
          {cvData.personalInfo.firstName} {cvData.personalInfo.lastName}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm font-medium" style={{ color: textColor }}>
          {cvData.personalInfo.email && <span className="flex items-center"><span className="mr-1.5">📧</span>{cvData.personalInfo.email}</span>}
          {cvData.personalInfo.phone && <span className="flex items-center"><span className="mr-1.5">📱</span>{cvData.personalInfo.phone}</span>}
          {cvData.personalInfo.location && <span className="flex items-center"><span className="mr-1.5">📍</span>{cvData.personalInfo.location}</span>}
        </div>
        <div className="flex flex-wrap gap-4 text-sm mt-3">
          {cvData.personalInfo.linkedin && (
            <a href={cvData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: primaryColor }} className="font-semibold hover:underline transition-all">
              🔗 LinkedIn
            </a>
          )}
          {cvData.personalInfo.website && (
            <a href={cvData.personalInfo.website} target="_blank" rel="noopener noreferrer" style={{ color: primaryColor }} className="font-semibold hover:underline transition-all">
              🌐 Website
            </a>
          )}
          {cvData.personalInfo.github && (
            <a href={cvData.personalInfo.github} target="_blank" rel="noopener noreferrer" style={{ color: primaryColor }} className="font-semibold hover:underline transition-all">
              💻 GitHub
            </a>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {cvData.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: primaryColor }}>
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: textColor }}>
            {cvData.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {cvData.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
            Work Experience
          </h2>
          <div className="space-y-6">
            {cvData.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg" style={{ color: textColor }}>
                      {exp.jobTitle}
                    </h3>
                    <p className="text-sm font-semibold" style={{ color: primaryColor }}>
                      {exp.company}
                      {exp.location && ` • ${exp.location}`}
                    </p>
                  </div>
                  <div className="text-sm" style={{ color: '#666' }}>
                    {exp.current
                      ? `${exp.startDate} - Present`
                      : `${exp.startDate} - ${exp.endDate}`}
                  </div>
                </div>
                {exp.description.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4" style={{ color: textColor }}>
                    {exp.description.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {cvData.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
            Education
          </h2>
          <div className="space-y-4">
            {cvData.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold" style={{ color: textColor }}>
                    {edu.degree}
                  </h3>
                  <p className="text-sm" style={{ color: '#666' }}>
                    {edu.institution}
                    {edu.location && `, ${edu.location}`}
                  </p>
                </div>
                <div className="text-sm" style={{ color: '#666' }}>
                  {edu.endDate ? `${edu.startDate} - ${edu.endDate}` : edu.startDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {cvData.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {cvData.skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: `${primaryColor}20`,
                  color: primaryColor
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {cvData.languages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
            Languages
          </h2>
          <div className="space-y-2">
            {cvData.languages.map((lang) => (
              <div key={lang.id} className="flex justify-between items-center">
                <span style={{ color: textColor }}>{lang.name}</span>
                <span className="text-sm" style={{ color: '#666' }}>
                  {lang.proficiency}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {cvData.certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
            Certifications
          </h2>
          <div className="space-y-3">
            {cvData.certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="font-semibold" style={{ color: textColor }}>
                  {cert.name}
                </h3>
                <p className="text-sm" style={{ color: '#666' }}>
                  {cert.issuer} • {cert.issueDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {cvData.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
            Projects
          </h2>
          <div className="space-y-4">
            {cvData.projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-semibold" style={{ color: textColor }}>
                  {project.name}
                </h3>
                <p className="text-sm mb-2" style={{ color: '#666' }}>
                  {project.description}
                </p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#f0f0f0', color: textColor }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

