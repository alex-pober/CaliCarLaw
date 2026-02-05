import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();

    // Read the PDF template
    const pdfPath = path.join(process.cwd(), 'public', 'Trial-by-Declaration.pdf');
    console.log('Looking for PDF at:', pdfPath);

    // Check if file exists
    if (!fs.existsSync(pdfPath)) {
      console.error('PDF template not found at:', pdfPath);
      return NextResponse.json(
        { error: 'PDF template file not found. Please add Trial-by-Declaration.pdf to the public directory.' },
        { status: 500 }
      );
    }

    const pdfBytes = fs.readFileSync(pdfPath);
    
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();

    // Get all form fields for debugging
    const fields = form.getFields();
    const fieldNames = fields.map(f => f.getName());
    console.log('=== PDF FORM DEBUG ===');
    console.log('Total fields found:', fields.length);
    console.log('Field names:', fieldNames);
    console.log('Form data received:', Object.keys(formData));

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
            console.log(`✓ Set ${fieldName}`);
          } catch (error) {
            console.log(`✗ Error setting text field ${fieldName}:`, error.message);
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
            console.log(`✓ Checked ${fieldName}`);
          } else {
            field.uncheck();
          }
        } catch (error) {
          console.log(`✗ Error setting checkbox ${fieldName}:`, error.message);
        }
      });

    } catch (error) {
      console.log('Error filling form fields:', error);
    }

    // Save the modified PDF
    const modifiedPdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(modifiedPdfBytes), {
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
