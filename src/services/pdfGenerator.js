import { jsPDF } from 'jspdf'

export const generatePDF = (canvasElement, layout) => {
  const { width, height } = layout
  const pdf = new jsPDF({
    orientation: width > height ? 'landscape' : 'portrait',
    unit: 'mm',
    format: [width, height]
  })

  const imageData = canvasElement.toDataURL('image/png', 1.0)
  pdf.addImage(imageData, 'PNG', 0, 0, width, height, '', 'FAST')

  return pdf
}

export const savePDF = (pdf, filename = 'card_imposition.pdf') => {
  pdf.save(filename)
}

export const addCropMarks = (pdf, layout) => {
  const { width, height, cardPositions, cardWidth, cardHeight } = layout
  const lineLength = 5 // mm
  pdf.setDrawColor(0)
  pdf.setLineWidth(0.1)

  cardPositions.forEach(({ x, y }) => {
    // Top left
    pdf.line(x, y - lineLength, x, y)
    pdf.line(x - lineLength, y, x, y)

    // Top right
    pdf.line(x + cardWidth, y - lineLength, x + cardWidth, y)
    pdf.line(x + cardWidth, y, x + cardWidth + lineLength, y)

    // Bottom left
    pdf.line(x, y + cardHeight, x, y + cardHeight + lineLength)
    pdf.line(x - lineLength, y + cardHeight, x, y + cardHeight)

    // Bottom right
    pdf.line(x + cardWidth, y + cardHeight, x + cardWidth, y + cardHeight + lineLength)
    pdf.line(x + cardWidth, y + cardHeight, x + cardWidth + lineLength, y + cardHeight)
  })

  return pdf
}

export const addBleedLine = (pdf, layout) => {
  const { cardPositions, cardWidth, cardHeight, bleed } = layout
  pdf.setDrawColor(255, 0, 0)
  pdf.setLineWidth(0.1)

  cardPositions.forEach(({ x, y }) => {
    pdf.rect(x - bleed, y - bleed, cardWidth + (2 * bleed), cardHeight + (2 * bleed))
  })

  return pdf
}