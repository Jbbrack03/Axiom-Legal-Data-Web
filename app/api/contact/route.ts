import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key-for-build')

const ContactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  company: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Please provide more detail in your message'),
  recaptchaToken: z.string().min(1, 'Please complete the CAPTCHA'),
})

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  if (!secretKey) {
    throw new Error('RECAPTCHA_SECRET_KEY is not configured')
  }

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${secretKey}&response=${token}`,
  })

  const result = await response.json()
  return result.success && result.score > 0.5
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = ContactSchema.parse(body)

    // Verify reCAPTCHA
    const isValidCaptcha = await verifyRecaptcha(validatedData.recaptchaToken)
    if (!isValidCaptcha) {
      return NextResponse.json(
        { error: 'CAPTCHA verification failed' },
        { status: 400 }
      )
    }

    // Send email notification
    const emailData = {
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: [process.env.TO_EMAIL || 'contact@axiomlegaldata.com'],
      subject: `Contact Form: ${validatedData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0A192F; border-bottom: 3px solid #64FFDA; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0A192F; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            ${validatedData.company ? `<p><strong>Company:</strong> ${validatedData.company}</p>` : ''}
            <p><strong>Subject:</strong> ${validatedData.subject}</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0A192F; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${validatedData.message}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: rgba(100, 255, 218, 0.1); border-left: 4px solid #64FFDA; border-radius: 4px;">
            <p style="margin: 0; color: #0A192F;">
              <strong>Response Required:</strong> Please respond to ${validatedData.email} within 24 hours.
            </p>
          </div>
        </div>
      `,
      replyTo: validatedData.email,
    }

    await resend.emails.send(emailData)

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form submission error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}