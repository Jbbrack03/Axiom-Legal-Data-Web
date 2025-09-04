import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key-for-build')

const PilotProgramSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  workEmail: z.string().email('Valid email is required'),
  companyName: z.string().min(1, 'Company name is required'),
  role: z.string().min(1, 'Role is required'),
  dataNeeds: z.string().min(10, 'Please describe your data needs in more detail'),
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
    console.log('Pilot program API endpoint called')
    const body = await request.json()
    console.log('Request body received:', { ...body, recaptchaToken: '[REDACTED]' })
    const validatedData = PilotProgramSchema.parse(body)

    // Verify reCAPTCHA
    console.log('Verifying reCAPTCHA token...')
    const isValidCaptcha = await verifyRecaptcha(validatedData.recaptchaToken)
    console.log('reCAPTCHA verification result:', isValidCaptcha)
    if (!isValidCaptcha) {
      console.log('reCAPTCHA verification failed')
      return NextResponse.json(
        { error: 'CAPTCHA verification failed' },
        { status: 400 }
      )
    }

    // Send email notification
    console.log('Email config check:', {
      hasResendKey: !!process.env.RESEND_API_KEY,
      fromEmail: process.env.FROM_EMAIL || 'no-reply@axiomlegaldata.com',
      toEmail: process.env.TO_EMAIL || 'contact@axiomlegaldata.com'
    })
    
    const emailData = {
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: [process.env.TO_EMAIL || 'contact@axiomlegaldata.com'],
      subject: `New Pilot Program Application - ${validatedData.companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0A192F; border-bottom: 3px solid #64FFDA; padding-bottom: 10px;">
            New Pilot Program Application
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0A192F; margin-top: 0;">Applicant Information</h3>
            <p><strong>Full Name:</strong> ${validatedData.fullName}</p>
            <p><strong>Email:</strong> ${validatedData.workEmail}</p>
            <p><strong>Company:</strong> ${validatedData.companyName}</p>
            <p><strong>Role:</strong> ${validatedData.role}</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0A192F; margin-top: 0;">Data Requirements</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${validatedData.dataNeeds}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #64FFDA; background-color: rgba(100, 255, 218, 0.1); border-left: 4px solid #64FFDA; border-radius: 4px;">
            <p style="margin: 0; color: #0A192F;">
              <strong>Next Steps:</strong> Review the application and respond within 24 hours to maintain our professional standard.
            </p>
          </div>
        </div>
      `,
    }

    console.log('Sending email notification...')
    const emailResult = await resend.emails.send(emailData)
    console.log('Email send result:', emailResult)

    return NextResponse.json(
      { message: 'Application submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Pilot program submission error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    )
  }
}