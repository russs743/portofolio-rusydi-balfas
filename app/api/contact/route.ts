import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend('re_bY8G8ds1_Ekx2gumzdkkS6gh4Pj7exRvS');

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'rusydibalfas@gmail.com',
      subject: `New Contact from ${name}`,
      html: `
        <h2>New Message from Portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
