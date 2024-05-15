import type { APIRoute } from "astro";
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();

  // フォームデータの取得時に`null`または`undefined`の場合、'未入力'を代入
  const getValue = (key: string) => formData.get(key)?.toString().trim() || '未入力';

  const inquiry = getValue("inquiry");
  const childLastName = getValue("childLastName");
  const childFirstName = getValue("childFirstName");
  const childLastNameKana = getValue("childLastNameKana");
  const childFirstNameKana = getValue("childFirstNameKana");
  const childGender = getValue("childGender");
  const childGrade = getValue("childGrade");
  const schoolType = getValue("schoolType");
  const schoolName = getValue("schoolName");
  const applicantType = getValue("applicantType");
  const postalCode = getValue("postalCode");
  const prefecture = getValue("prefecture");
  const city = getValue("city");
  const streetAddress = getValue("streetAddress");
  const buildingName = getValue("buildingName");
  const phoneNumber = getValue("phoneNumber");
  const email = getValue("email");
  const emailConfirmation = getValue("emailConfirmation");
  const message = getValue("message");
  const privacyPolicy = getValue("privacyPolicy") === '未入力' ? '同意しない' : '同意する';

  // 必須フィールドの検証
  if (inquiry === '未入力' || childLastName === '未入力' || childFirstName === '未入力' || childLastNameKana === '未入力' || childFirstNameKana === '未入力' || childGender === '未入力' || childGrade === '未入力' || phoneNumber === '未入力' || email === '未入力' || emailConfirmation === '未入力') {
    return new Response(
      JSON.stringify({ message: "必須項目が未入力です" }),
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'soroban.chiryu@gmail.com', // 実際のメールアドレスに置き換えてください
      pass: 'qyyqohplpwtsepxo', // 実際のアプリパスワードに置き換えてください
    },
  });


  
// 住所情報を組み立てるロジック
const addressParts = [prefecture, city, streetAddress, buildingName];
const filledAddressParts = addressParts.filter(part => part !== '未入力');
const addressDisplay = filledAddressParts.length > 0 ? filledAddressParts.join(' ') : '未入力';

  // メールオプションの設定
  const mailOptions = {
    from: 'soroban.chiryu@gmail.com', // 送信元のメールアドレス
    to: 'soroban.chiryu@gmail.com', // 送信先のメールアドレス
    subject: '新しいお問い合わせメッセージ',
    text: `
ご用件: ${inquiry}
お子様の名前: ${childLastName} ${childFirstName}
お子様の名前(かな): ${childLastNameKana} ${childFirstNameKana}
お子様の性別: ${childGender}
お子様の学年: ${childGrade}
学校種別: ${schoolType}
学校名: ${schoolName}
申込者種別: ${applicantType}
郵便番号: ${postalCode}
住所: ${addressDisplay}
電話番号: ${phoneNumber}
メールアドレス: ${email}
メールアドレス(確認用): ${emailConfirmation}
メッセージ: ${message}
個人情報の取り扱いについて: ${privacyPolicy}
    `,
    html: `
    <p><b>ご用件:</b> ${inquiry}</p>
    <p><b>お子様の名前:</b> ${childLastName} ${childFirstName}</p>
    <p><b>お子様の名前(カナ):</b> ${childLastNameKana} ${childFirstNameKana}</p>
    <p><b>お子様の性別:</b> ${childGender === 'male' ? '男性' : childGender === 'female' ? '女性' : '未選択'}</p>
    <p><b>お子様の学年:</b> ${childGrade}</p>
    <p><b>学校種別:</b> ${schoolType}</p>
    <p><b>学校名:</b> ${schoolName}</p>
    <p><b>申込者種別:</b> ${applicantType}</p>
    <p><b>郵便番号:</b> ${postalCode}</p>
    <p><b>住所:</b> ${addressDisplay}</p>
    <p><b>電話番号:</b> ${phoneNumber}</p>
    <p><b>メールアドレス:</b> ${email}</p>
    <p><b>メールアドレス(確認用):</b> ${emailConfirmation}</p>
    <p><b>メッセージ:</b> ${message}</p>
    <p><b>個人情報の取り扱いについて:</b> ${privacyPolicy}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ message: "送信に成功しました！" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("メール送信に失敗しました:", error);
    return new Response(
      JSON.stringify({ message: "メールの送信に失敗しました" }),
      { status: 500 }
    );
  }
};

