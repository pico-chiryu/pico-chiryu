import type { APIRoute } from 'astro';

// POSTリクエストを処理するための関数
export const POST: APIRoute = async ({ request }) => {
  try {
    // フォームデータを取得
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // ここでフォームデータを使用して、例えばメール送信、データベースに保存、などの処理を行う
    // 以下は仮の処理の例
    console.log({ name, email, subject, message });

    // 処理が成功した場合は、適切なレスポンスを返す
    return new Response(JSON.stringify({ message: 'Form submitted successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // エラーが発生した場合は、エラーメッセージとともにレスポンスを返す
    return new Response(JSON.stringify({ error: 'Form submission failed' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
