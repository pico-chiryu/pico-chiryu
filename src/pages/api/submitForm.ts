import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {


  try {
    // リクエストからフォームデータを取得
    const data = await request.formData();
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");

    // 入力データの検証
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          message: "Missing required fields",
        }),
        { status: 400, headers: {'Content-Type': 'application/json'} }
      );
    }

    // ここでデータに対する何かしらの処理を行う
    // 例えば、データベースへの保存、メール送信など

    // 処理が成功したら、成功レスポンスを返す
    return new Response(
      JSON.stringify({
        message: "Success!",
        // 処理結果や追加データを含めることができる
      }),
      { status: 200, headers: {'Content-Type': 'application/json'} }
    );
  } catch (error) {
    // エラー発生時の処理
    return new Response(
      JSON.stringify({
        message: `Server error: ${error}`,
      }),
      { status: 500, headers: {'Content-Type': 'application/json'} }
    );
  }
};