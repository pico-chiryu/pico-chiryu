import type { APIRoute } from "astro";
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 }
    );
  }

  // nodemailer を使用してメール送信の設定を行う
  const transporter = nodemailer.createTransport({
    service: 'gmail', // 使っているメールサービス
    auth: {
      user: 'snj.hirato@gmail.com', // あなたのメールアドレス
      pass: 'qtrzhpsylkearbsg', // あなたのメールパスワード
    },
  });

  const mailOptions = {
    from: 'snj.hirato@gmail.com',
    to: 'snj.hirato@gmail.com', // 受信者のメールアドレス
    subject: 'New Contact Message',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
  };

  try {
    // メール送信
    await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ message: "Success!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to send email:", error);
    return new Response(
      JSON.stringify({ message: "Failed to send email" }),
      { status: 500 }
    );
  }
};
