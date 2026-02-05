'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import ConsultationRequest from '../components/emails/ConsultationRequest'

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
  // Honeypot field - should always be empty
  website: z.string().max(0, 'Bot detected'),
  // Timestamp for timing validation
  _timestamp: z.string().min(1, 'Invalid submission'),
})

// type ContactFormData = z.infer<typeof formSchema>


export async function submitContactForm(formData: FormData) {
  try {
    // Validate all fields including honeypot
    const validatedFields = formSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      website: formData.get('website'), // Honeypot - should be empty
      _timestamp: formData.get('_timestamp'),
    })

    // Check honeypot - if filled, silently reject (pretend success to bot)
    if (validatedFields.website && validatedFields.website.length > 0) {
      console.log('🤖 Bot detected via honeypot:', {
        email: validatedFields.email,
        timestamp: new Date().toISOString(),
      })
      // Return success to fool the bot
      return { success: true }
    }

    // Check timing - submissions under 3 seconds are likely bots
    const submissionTime = Date.now()
    const formLoadTime = parseInt(validatedFields._timestamp)
    const timeDiff = (submissionTime - formLoadTime) / 1000 // seconds

    if (timeDiff < 3) {
      console.log('🤖 Bot detected via timing (too fast):', {
        email: validatedFields.email,
        timeDiff: `${timeDiff}s`,
        timestamp: new Date().toISOString(),
      })
      // Return success to fool the bot
      return { success: true }
    }

    // Send email notification
    await resend.emails.send({
      from: 'California Car Law <notifications@californiacarlaw.com>',
      to: ['poberezhskiy.a@gmail.com'], // Replace with your email
      subject: `New Consultation Request from ${validatedFields.name}`,
      react: ConsultationRequest({
        name: validatedFields.name,
        email: validatedFields.email,
        message: validatedFields.message,
      }),
    })

    // Send confirmation email to the client
    await resend.emails.send({
      from: 'California Car Law <notifications@californiacarlaw.com>',
      to: [validatedFields.email],
      subject: 'We received your consultation request',
      react: (
        <div>
          <h1>Thank you for contacting California Car Law</h1>
          <p>Dear {validatedFields.name},</p>
          <p>
            We have received your consultation request and will get back to you shortly.
            If you need immediate assistance, please call or text us at (657) 522-5292.
          </p>
          <p>Best regards,<br />California Car Law Team</p>
        </div>
      ),
    })

    console.log('Form submission:', {
      name: validatedFields.name,
      email: validatedFields.email,
      message: validatedFields.message,
      timestamp: new Date().toISOString(),
    })

    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log('Validation error details:', JSON.stringify(error.issues, null, 2))
      return {
        success: false,
        errors: error.issues.reduce((acc: Record<string, string>, curr) => {
          const path = curr.path[0]
          if (typeof path === 'string') {
            acc[path] = curr.message
          }
          return acc
        }, {})
      }
    }

    console.error('Form submission error:', error)
    return {
      success: false,
      errors: { form: 'Something went wrong. Please try again.' }
    }
  }
}
