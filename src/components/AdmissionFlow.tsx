import React from 'react';
// ライブラリ全体をデフォルトインポート
import pkg from 'react-vertical-timeline-component';
// 必要なコンポーネントを抽出
const { VerticalTimeline, VerticalTimelineElement } = pkg;
import 'react-vertical-timeline-component/style.min.css';

const AdmissionFlow = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-2">ご入塾の流れ</h2>
  <div className="h-1 bg-customGreen mb-4"></div>
  <VerticalTimeline>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: '#01AD9F', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid #01AD9F' }}
    iconStyle={{ background: '#01AD9F', color: '#fff' }}
    visible={true}
  >
    <h3 className="vertical-timeline-element-title text-white text-xl font-bold mb-2">STEP1 無料体験の予約</h3>
    <p className="text-white">
      お電話またはWebから無料体験の予約をお取りください。ご都合の良い曜日と時間帯を選択できます。
    </p>
  </VerticalTimelineElement>

  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: '#01AD9F', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid #01AD9F' }}
    iconStyle={{ background: '#01AD9F', color: '#fff' }}
    visible={true}
  >
    <h3 className="vertical-timeline-element-title text-white text-xl font-bold mb-2">STEP2 無料体験授業</h3>
    <p className="text-white">
      無料体験では、そろばんの基本的な使い方と簡単な計算を体験します。未就学児の場合は、数字の読み書きができるかを確認します。
    </p>
  </VerticalTimelineElement>

  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: '#01AD9F', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid #01AD9F' }}
    iconStyle={{ background: '#01AD9F', color: '#fff' }}
    visible={true}
  >
    <h3 className="vertical-timeline-element-title text-white text-xl font-bold mb-2">STEP3 入塾の手続き</h3>
    <p className="text-white">
      体験授業を経て入塾をご希望の場合、通塾日数と時間を決めて入塾手続きを行います。正式に授業がスタートします。
    </p>
  </VerticalTimelineElement>
</VerticalTimeline>

      </div>
    </div>
  );
};

export default AdmissionFlow;


