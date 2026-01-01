import jsPDF from 'jspdf'
import { CVData } from '@/types/cv'
import { CVTemplate } from '@/types/cv'
import { getTemplateById } from './templates'

export async function exportToPDF(cvData: CVData, templateId: string): Promise<Blob> {
  const template = getTemplateById(templateId)
  if (!template) {
    throw new Error('Template not found')
  }

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 15
  let yPosition = margin

  // Set colors from template
  const primaryColor = template.config.colorScheme.primary
  const textColor = template.config.colorScheme.text

  // Helper function to add text with word wrap
  const addText = (text: string, x: number, y: number, options: {
    fontSize?: number
    fontStyle?: string
    color?: string
    maxWidth?: number
    align?: 'left' | 'center' | 'right'
  } = {}) => {
    const {
      fontSize = 11,
      fontStyle = 'normal',
      color = textColor,
      maxWidth = pageWidth - 2 * margin,
      align = 'left'
    } = options

    doc.setFontSize(fontSize)
    doc.setFont('helvetica', fontStyle)
    doc.setTextColor(color)

    const lines = doc.splitTextToSize(text, maxWidth)
    doc.text(lines, x, y, { align })
    return lines.length * (fontSize * 0.4) + 2
  }

  // Header with name
  doc.setFillColor(primaryColor)
  doc.rect(0, 0, pageWidth, 40, 'F')

  const fullName = `${cvData.personalInfo.firstName} ${cvData.personalInfo.lastName}`
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor('#FFFFFF')
  doc.text(fullName, margin, 25, { align: 'left' })

  yPosition = 50

  // Contact information
  const contactInfo = [
    cvData.personalInfo.email,
    cvData.personalInfo.phone,
    cvData.personalInfo.location
  ].filter(Boolean).join(' • ')

  if (contactInfo) {
    yPosition += addText(contactInfo, margin, yPosition, {
      fontSize: 10,
      color: '#666666'
    })
    yPosition += 5
  }

  // Professional Summary
  if (cvData.summary) {
    yPosition += 5
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(primaryColor)
    doc.text('Professional Summary', margin, yPosition)
    yPosition += 8

    yPosition += addText(cvData.summary, margin, yPosition, {
      fontSize: 11,
      maxWidth: pageWidth - 2 * margin
    })
    yPosition += 5
  }

  // Work Experience
  if (cvData.experience.length > 0) {
    if (yPosition > pageHeight - 40) {
      doc.addPage()
      yPosition = margin
    }

    yPosition += 5
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(primaryColor)
    doc.text('Work Experience', margin, yPosition)
    yPosition += 8

    cvData.experience.forEach(exp => {
      if (yPosition > pageHeight - 50) {
        doc.addPage()
        yPosition = margin
      }

      // Job title and company
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(textColor)
      doc.text(exp.jobTitle, margin, yPosition)
      
      const companyText = `${exp.company}${exp.location ? `, ${exp.location}` : ''}`
      doc.setFontSize(11)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor('#666666')
      doc.text(companyText, margin, yPosition + 5)

      // Date range
      const dateRange = exp.current
        ? `${exp.startDate} - Present`
        : `${exp.startDate} - ${exp.endDate}`
      doc.text(dateRange, pageWidth - margin, yPosition, { align: 'right' })
      yPosition += 10

      // Description bullets
      exp.description.forEach(bullet => {
        if (yPosition > pageHeight - 30) {
          doc.addPage()
          yPosition = margin
        }
        yPosition += addText(`• ${bullet}`, margin + 5, yPosition, {
          fontSize: 10,
          maxWidth: pageWidth - 2 * margin - 10
        })
      })

      yPosition += 5
    })
  }

  // Education
  if (cvData.education.length > 0) {
    if (yPosition > pageHeight - 40) {
      doc.addPage()
      yPosition = margin
    }

    yPosition += 5
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(primaryColor)
    doc.text('Education', margin, yPosition)
    yPosition += 8

    cvData.education.forEach(edu => {
      if (yPosition > pageHeight - 30) {
        doc.addPage()
        yPosition = margin
      }

      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(textColor)
      doc.text(edu.degree, margin, yPosition)
      
      doc.setFontSize(11)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor('#666666')
      doc.text(`${edu.institution}${edu.location ? `, ${edu.location}` : ''}`, margin, yPosition + 5)
      
      const eduDateRange = edu.endDate
        ? `${edu.startDate} - ${edu.endDate}`
        : edu.startDate
      doc.text(eduDateRange, pageWidth - margin, yPosition, { align: 'right' })
      yPosition += 10
    })
  }

  // Skills
  if (cvData.skills.length > 0) {
    if (yPosition > pageHeight - 40) {
      doc.addPage()
      yPosition = margin
    }

    yPosition += 5
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(primaryColor)
    doc.text('Skills', margin, yPosition)
    yPosition += 8

    const skillsText = cvData.skills.map(s => s.name).join(' • ')
    yPosition += addText(skillsText, margin, yPosition, {
      fontSize: 11,
      maxWidth: pageWidth - 2 * margin
    })
    yPosition += 5
  }

  // Languages
  if (cvData.languages.length > 0) {
    if (yPosition > pageHeight - 30) {
      doc.addPage()
      yPosition = margin
    }

    yPosition += 5
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(primaryColor)
    doc.text('Languages', margin, yPosition)
    yPosition += 8

    cvData.languages.forEach(lang => {
      if (yPosition > pageHeight - 20) {
        doc.addPage()
        yPosition = margin
      }
      doc.setFontSize(11)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(textColor)
      doc.text(`${lang.name} - ${lang.proficiency}`, margin, yPosition)
      yPosition += 6
    })
  }

  // Generate blob
  const pdfBlob = doc.output('blob')
  return pdfBlob
}

export async function exportToWord(cvData: CVData, templateId: string): Promise<Blob> {
  // Create HTML content
  const htmlContent = generateWordHTML(cvData, templateId)
  
  // Convert to blob
  const blob = new Blob([htmlContent], {
    type: 'application/msword'
  })

  return blob
}

export async function exportToPlainText(cvData: CVData): Promise<Blob> {
  let text = ''
  
  // Header
  text += `${cvData.personalInfo.firstName} ${cvData.personalInfo.lastName}\n`
  text += `${cvData.personalInfo.email} | ${cvData.personalInfo.phone} | ${cvData.personalInfo.location}\n`
  if (cvData.personalInfo.linkedin) text += `LinkedIn: ${cvData.personalInfo.linkedin}\n`
  if (cvData.personalInfo.website) text += `Website: ${cvData.personalInfo.website}\n`
  text += '\n' + '='.repeat(50) + '\n\n'
  
  // Summary
  if (cvData.summary) {
    text += 'PROFESSIONAL SUMMARY\n'
    text += '-'.repeat(50) + '\n'
    text += cvData.summary + '\n\n'
  }
  
  // Experience
  if (cvData.experience.length > 0) {
    text += 'WORK EXPERIENCE\n'
    text += '-'.repeat(50) + '\n'
    cvData.experience.forEach(exp => {
      text += `${exp.jobTitle}\n`
      text += `${exp.company}${exp.location ? `, ${exp.location}` : ''}\n`
      text += `${exp.current ? `${exp.startDate} - Present` : `${exp.startDate} - ${exp.endDate}`}\n`
      exp.description.forEach(bullet => {
        text += `  • ${bullet}\n`
      })
      text += '\n'
    })
  }
  
  // Education
  if (cvData.education.length > 0) {
    text += 'EDUCATION\n'
    text += '-'.repeat(50) + '\n'
    cvData.education.forEach(edu => {
      text += `${edu.degree}\n`
      text += `${edu.institution}${edu.location ? `, ${edu.location}` : ''}\n`
      text += `${edu.endDate ? `${edu.startDate} - ${edu.endDate}` : edu.startDate}\n\n`
    })
  }
  
  // Skills
  if (cvData.skills.length > 0) {
    text += 'SKILLS\n'
    text += '-'.repeat(50) + '\n'
    text += cvData.skills.map(s => s.name).join(', ') + '\n\n'
  }
  
  // Languages
  if (cvData.languages.length > 0) {
    text += 'LANGUAGES\n'
    text += '-'.repeat(50) + '\n'
    cvData.languages.forEach(lang => {
      text += `${lang.name}: ${lang.proficiency}\n`
    })
  }
  
  const blob = new Blob([text], { type: 'text/plain' })
  return blob
}

export async function exportToJSON(cvData: CVData): Promise<Blob> {
  const json = JSON.stringify(cvData, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  return blob
}

function generateWordHTML(cvData: CVData, templateId: string): string {
  const template = getTemplateById(templateId)
  const primaryColor = template?.config.colorScheme.primary || '#0056B3'
  const textColor = template?.config.colorScheme.text || '#1F2937'

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Calibri', Arial, sans-serif;
      color: ${textColor};
      line-height: 1.6;
      margin: 40px;
    }
    .header {
      background-color: ${primaryColor};
      color: white;
      padding: 30px;
      margin: -40px -40px 30px -40px;
    }
    h1 {
      margin: 0;
      font-size: 28px;
    }
    h2 {
      color: ${primaryColor};
      border-bottom: 2px solid ${primaryColor};
      padding-bottom: 5px;
      margin-top: 25px;
    }
    .contact-info {
      color: #666;
      margin-top: 10px;
    }
    .experience-item, .education-item {
      margin-bottom: 20px;
    }
    .job-title {
      font-weight: bold;
      font-size: 14px;
    }
    .company, .institution {
      color: #666;
      font-size: 12px;
    }
    .date {
      float: right;
      color: #666;
    }
    ul {
      margin-top: 5px;
      padding-left: 20px;
    }
    .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .skill-tag {
      background-color: #f0f0f0;
      padding: 5px 10px;
      border-radius: 3px;
      font-size: 11px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${cvData.personalInfo.firstName} ${cvData.personalInfo.lastName}</h1>
    <div class="contact-info">
      ${[cvData.personalInfo.email, cvData.personalInfo.phone, cvData.personalInfo.location].filter(Boolean).join(' • ')}
    </div>
  </div>

  ${cvData.summary ? `
  <h2>Professional Summary</h2>
  <p>${cvData.summary}</p>
  ` : ''}

  ${cvData.experience.length > 0 ? `
  <h2>Work Experience</h2>
  ${cvData.experience.map(exp => `
    <div class="experience-item">
      <div class="job-title">${exp.jobTitle}</div>
      <div class="company">${exp.company}${exp.location ? `, ${exp.location}` : ''}</div>
      <div class="date">${exp.current ? `${exp.startDate} - Present` : `${exp.startDate} - ${exp.endDate}`}</div>
      <ul>
        ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
      </ul>
    </div>
  `).join('')}
  ` : ''}

  ${cvData.education.length > 0 ? `
  <h2>Education</h2>
  ${cvData.education.map(edu => `
    <div class="education-item">
      <div class="job-title">${edu.degree}</div>
      <div class="company">${edu.institution}${edu.location ? `, ${edu.location}` : ''}</div>
      <div class="date">${edu.endDate ? `${edu.startDate} - ${edu.endDate}` : edu.startDate}</div>
    </div>
  `).join('')}
  ` : ''}

  ${cvData.skills.length > 0 ? `
  <h2>Skills</h2>
  <div class="skills">
    ${cvData.skills.map(skill => `<span class="skill-tag">${skill.name}</span>`).join('')}
  </div>
  ` : ''}

  ${cvData.languages.length > 0 ? `
  <h2>Languages</h2>
  <ul>
    ${cvData.languages.map(lang => `<li>${lang.name} - ${lang.proficiency}</li>`).join('')}
  </ul>
  ` : ''}
</body>
</html>`
}

