import { Html } from '@react-email/html'
import { Text } from '@react-email/text'
import { Section } from '@react-email/section'
import { Container } from '@react-email/container'
import { Img } from '@react-email/img'

interface ConsultationRequestProps {
  name: string
  email: string
  message: string
}

export default function ConsultationRequest({ name, email, message }: ConsultationRequestProps) {
  return (
    <Html>
      <Section style={main}>
        <Container style={container}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Img
            src="https://www.californiacarlaw.com/images/logos/CaliforniaCarLaw-Logo.svg"
            alt="California Car Law"
            width="200"
            style={{ margin: '0 auto', display: 'block' }}
          />
          
          <Text style={heading}>New Consultation Request</Text>
          
          <Section style={contentSection}>
            <Text style={subheading}>Contact Information</Text>
            <Text style={field}>
              <strong>Name:</strong> {name}
            </Text>
            <Text style={field}>
              <strong>Email:</strong> {email}
            </Text>
            
            <Text style={subheading}>Case Description</Text>
            <Text style={messageStyle}>{message}</Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              This request was submitted through the California Car Law website contact form.
            </Text>
          </Section>
        </Container>
      </Section>
    </Html>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  padding: '40px 0',
}

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #f0f0f0',
  borderRadius: '5px',
  margin: '0 auto',
  padding: '20px',
  maxWidth: '600px',
}

const heading = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
}

const subheading = {
  color: '#50ade4',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '20px 0 10px',
}

const contentSection = {
  margin: '20px 0',
  padding: '0 10px',
}

const field = {
  color: '#4a4a4a',
  fontSize: '16px',
  margin: '10px 0',
  lineHeight: '1.5',
}

const messageStyle = {
  color: '#4a4a4a',
  fontSize: '16px',
  margin: '10px 0',
  lineHeight: '1.6',
  whiteSpace: 'pre-wrap' as const,
  backgroundColor: '#f9f9f9',
  padding: '15px',
  borderRadius: '4px',
  border: '1px solid #eee',
}

const footer = {
  borderTop: '1px solid #f0f0f0',
  marginTop: '20px',
  paddingTop: '20px',
}

const footerText = {
  color: '#666',
  fontSize: '14px',
  textAlign: 'center' as const,
}
