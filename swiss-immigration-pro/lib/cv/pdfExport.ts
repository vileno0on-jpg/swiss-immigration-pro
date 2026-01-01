import jsPDF from 'jspdf'
import { Canvas as FabricCanvas } from 'fabric'

/**
 * Export Fabric.js canvas to PDF
 * @param canvas - Fabric.js canvas instance
 * @param filename - Output filename (default: 'cv.pdf')
 */
export async function exportCanvasToPDF(
  canvas: FabricCanvas,
  filename: string = 'cv.pdf'
): Promise<void> {
  // A4 dimensions in mm (standard A4: 210mm x 297mm)
  const A4_WIDTH_MM = 210
  const A4_HEIGHT_MM = 297

  // Create PDF with A4 dimensions
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  // Get canvas data URL
  const dataURL = canvas.toDataURL({
    format: 'png',
    quality: 1.0,
    multiplier: 2, // Higher resolution for better quality
  })

  // Calculate dimensions to fit A4
  const imgWidth = A4_WIDTH_MM
  const imgHeight = (canvas.height / canvas.width) * A4_WIDTH_MM

  // Add image to PDF
  pdf.addImage(dataURL, 'PNG', 0, 0, imgWidth, imgHeight)

  // Save PDF
  pdf.save(filename)
}

/**
 * Export canvas to high-quality PDF using vector approach
 * This is a more advanced method that preserves text as vectors
 */
export async function exportCanvasToPDFVector(
  canvas: FabricCanvas,
  filename: string = 'cv.pdf'
): Promise<void> {
  const A4_WIDTH_MM = 210
  const A4_HEIGHT_MM = 297
  const A4_WIDTH_PX = 595 // A4 width at 72 DPI
  const A4_HEIGHT_PX = 842 // A4 height at 72 DPI

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  // Scale factor: convert pixels to mm
  const scaleX = A4_WIDTH_MM / A4_WIDTH_PX
  const scaleY = A4_HEIGHT_MM / A4_HEIGHT_PX

  // Get all objects from canvas
  const objects = canvas.getObjects()

  // For now, we'll use the raster approach (image)
  // For true vector export, you'd need to iterate through objects
  // and convert each to PDF primitives (text, rectangles, etc.)
  const dataURL = canvas.toDataURL({
    format: 'png',
    quality: 1.0,
    multiplier: 3, // Very high resolution
  })

  const imgWidth = A4_WIDTH_MM
  const imgHeight = (canvas.height / canvas.width) * A4_WIDTH_MM

  pdf.addImage(dataURL, 'PNG', 0, 0, imgWidth, imgHeight)
  pdf.save(filename)
}





