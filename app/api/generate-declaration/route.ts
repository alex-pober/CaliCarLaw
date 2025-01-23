import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();
    
    // Read the PDF template
    const pdfPath = path.join(process.cwd(), 'public', 'Trial-by-Declaration.pdf');
    const pdfBytes = fs.readFileSync(pdfPath);
    
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();

    // Get all form fields for debugging
    const fields = form.getFields();
    console.log('Available PDF form fields:', fields.map(f => f.getName()));

    try {
      // Fill text fields
      const textFields = [
        'NameOfCourt',
        'CourtStreetAddress',
        'CourtMailingAddress',
        'CourtCityAndZipcode',
        'CourtBranchName',
        'CitationNumber',
        'Defendant',
        'CaseNumber',
        'DefendantAddress',
        'StatementOfFacts',
        'PagesAttached',
        'Date',
        'PhotographsAmount',
        'OtherSpecified'
      ];

      textFields.forEach(fieldName => {
        if (formData[fieldName]) {
          try {
            const field = form.getTextField(fieldName);
            // Convert Defendant name to uppercase
            const value = fieldName === 'Defendant' 
              ? formData[fieldName].toUpperCase() 
              : formData[fieldName];
            field.setText(value);
          } catch (error) {
            console.log(`Error setting text field ${fieldName}:`, error);
          }
        }
      });

      // Fill checkboxes
      const checkboxFields = [
        'Photographs',
        'MedicalRecord',
        'RegistrationDocuments',
        'InspectionCertificate',
        'Diagram',
        'CarRepairRecepit',
        'InsuranceDocuments',
        'Other'
      ];

      checkboxFields.forEach(fieldName => {
        try {
          const field = form.getCheckBox(fieldName);
          if (formData[fieldName]) {
            field.check();
          } else {
            field.uncheck();
          }
        } catch (error) {
          console.log(`Error setting checkbox ${fieldName}:`, error);
        }
      });

    } catch (error) {
      console.log('Error filling form fields:', error);
    }

    // Save the modified PDF
    const modifiedPdfBytes = await pdfDoc.save();

    return new NextResponse(modifiedPdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Trial-by-Declaration.pdf"',
      },
    });
  } catch (error) {
    console.log('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
