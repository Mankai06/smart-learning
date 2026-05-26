import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { studentEmail, studentName, course, date, time } = await req.json();

  try {
    // Email to student
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: studentEmail,
      subject: '✅ Booking Confirmed — Smart Learning',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0F4C5C; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0;">Smart Learning 🎓</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 12px 12px;">
            <h2 style="color: #0F4C5C;">Hi ${studentName}! Your booking is confirmed 🎉</h2>
            <p style="color: #666;">Here are your session details:</p>
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Course:</strong> ${course}</p>
              <p><strong>Date:</strong> ${date}</p>
              <p><strong>Time:</strong> ${time}</p>
            </div>
            <p style="color: #666;">We'll contact you shortly with the meeting link!</p>
            <p style="color: #666;">WhatsApp: <a href="https://wa.me/919342530010">+91 9342530010</a></p>
          </div>
        </div>
      `
    });

    // Email to you (Shree)
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'shreedevamankai06@gmail.com',
      subject: '🔔 New Booking — Smart Learning',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #F97316; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0;">New Booking Alert! 🔔</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 12px 12px;">
            <h2 style="color: #0F4C5C;">A new student just booked a session!</h2>
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Student Name:</strong> ${studentName}</p>
              <p><strong>Student Email:</strong> ${studentEmail}</p>
              <p><strong>Course:</strong> ${course}</p>
              <p><strong>Date:</strong> ${date}</p>
              <p><strong>Time:</strong> ${time}</p>
            </div>
            <p style="color: #666;">Login to your admin dashboard to confirm!</p>
          </div>
        </div>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}