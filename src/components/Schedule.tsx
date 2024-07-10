import React from 'react';

const Schedule = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-[#01AD9F]">おけいこスケジュール</h1>
      
      <p className="mb-8 text-lg">
        お子様の成長をサポートする定期的なおけいこを実施しています。
      </p>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-[#01AD9F]">おけいこの日時</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#01AD9F] text-white">
              <th className="border p-2">曜日</th>
              <th className="border p-2">時間帯</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">毎週水曜日・金曜日</td>
              <td className="border p-2">
                1コマ目: 16:00〜16:50<br />
                2コマ目: 17:00〜17:50
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-[#01AD9F]">柔軟な振替制度</h3>
          <p>
            ご家庭の事情でおけいこに参加できない場合、同月内の別の日程への振替が可能です。お子様の学習の継続性を大切にしています。
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-[#01AD9F]">長期休暇中のスケジュール調整</h3>
          <p>
            夏休みや冬休みなどの長期休校期間中は、お子様の生活リズムに合わせてスケジュールを調整いたします。変更がある場合は、事前に保護者の皆様へご連絡いたします。
          </p>
        </div>
      </div>

      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-[#01AD9F]">個別ケアの充実</h3>
        <p>
          2コマ制を採用することで、学校の下校時間に合わせた学習の習慣化をサポートします。
        </p>
      </div>

      <div className="mt-8 text-center">
        <p className="text-lg mb-4">
          お子様の可能性を最大限に引き出すおけいこにぜひご参加ください。
        </p>
        <a href="/contact-form" className="bg-[#01AD9F] text-white font-bold py-2 px-4 rounded hover:bg-[#018F84] transition duration-300">
          お問い合わせ
        </a>
      </div>
    </div>
  );
};

export default Schedule;