import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface TermsOfServiceProps {
  onCategoryChange: (category: string) => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onCategoryChange }) => {
  return (
    <div className="min-h-screen bg-good-blue-cream py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 戻るボタン */}
        <button
          onClick={() => onCategoryChange('all')}
          className="flex items-center text-good-blue-brown hover:text-good-blue-gold transition-colors mb-8"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          <span>トップページに戻る</span>
        </button>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-good-blue-brown mb-8 text-center">利用規約</h1>
          
          <div className="space-y-6 text-good-blue-brown/80">
            <p className="text-sm text-good-blue-brown/60">最終更新日: 2025年7月10日</p>
            
            <section>
              <p>
                この利用規約（以下、「本規約」といいます。）は、花とカフェ goodblue（以下、「当店」といいます。）が
                このウェブサイト上で提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。
                ご利用の皆様（以下、「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-good-blue-brown mb-3">第1条（適用）</h2>
              <p>
                本規約は、ユーザーと当店との間の本サービスの利用に関わる一切の関係に適用されるものとします。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-good-blue-brown mb-3">第2条（利用登録）</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>登録希望者が当店の定める方法によって利用登録を申請し、当店がこれを承認することによって、利用登録が完了するものとします。</li>
                <li>当店は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあります。
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
                    <li>本規約に違反したことがある者からの申請である場合</li>
                    <li>その他、当店が利用登録を相当でないと判断した場合</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-good-blue-brown mb-3">第3条（商品の購入）</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>ユーザーは、本サービスにおいて商品の購入を申し込む場合、当店が定める方法により正確な情報を提供するものとします。</li>
                <li>売買契約は、ユーザーの注文に対して当店が承諾の通知を発信した時点で成立するものとします。</li>
                <li>商品の所有権は、商品の引渡し時にユーザーに移転するものとします。</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-good-blue-brown mb-3">第4条（支払方法）</h2>
              <p>
                ユーザーは、商品の代金を以下のいずれかの方法で支払うものとします。
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>クレジットカード決済</li>
                <li>代金引換</li>
                <li>銀行振込</li>
                <li>コンビニエンスストア決済</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-good-blue-brown mb-3">第5条（配送）</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>当店は、ユーザーが指定した配送先に商品を配送します。</li>
                <li>配送料は、別途定める料金表に従うものとします。</li>
                <li>天候、交通事情その他やむを得ない事由により、配送が遅延する場合があります。</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-good-blue-brown mb-3">第6条（返品・交換）</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>商品の返品・交換は、商品到着後7日以内に限り受け付けます。</li>
                <li>以下の場合は返品・交換をお受けできません。
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>ユーザーの責任により商品が破損・汚損した場合</li>
                    <li>植物の場合で、ユーザーの管理不足により枯れた場合</li>
                    <li>食品の場合で、開封後の商品</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-good-blue-brown mb-3">第7条（禁止事項）</h2>
              <p>ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>当店のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                <li>当店のサービスの運営を妨害するおそれのある行為</li>
                <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                <li>他のユーザーに成りすます行為</li>
                <li>当店のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
                <li>その他、当店が不適切と判断する行為</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-good-blue-brown mb-3">第8条（本サービスの提供の停止等）</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>当店は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                    <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
                    <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                    <li>その他、当店が本サービスの提供が困難と判断した場合</li>
                  </ul>
                </li>
                <li>当店は、本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害について、理由を問わず一切の責任を負わないものとします。</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-good-blue-brown mb-3">第9条（免責事項）</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>当店の債務不履行責任は、当店の故意または重過失によらない場合には免責されるものとします。</li>
                <li>当店は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-good-blue-brown mb-3">第10条（サービス内容の変更等）</h2>
              <p>
                当店は、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、
                これによってユーザーに生じた損害について一切の責任を負いません。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-good-blue-brown mb-3">第11条（利用規約の変更）</h2>
              <p>
                当店は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。
                変更後の本規約は、当店ウェブサイトに掲示された時点から効力を生じるものとします。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-good-blue-brown mb-3">第12条（通知または連絡）</h2>
              <p>
                ユーザーと当店との間の通知または連絡は、当店の定める方法によって行うものとします。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-good-blue-brown mb-3">第13条（準拠法・裁判管轄）</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>本規約の解釈にあたっては、日本法を準拠法とします。</li>
                <li>本サービスに関して紛争が生じた場合には、当店の本店所在地を管轄する裁判所を専属的合意管轄とします。</li>
              </ol>
            </section>

            <div className="mt-12 pt-8 border-t">
              <p className="text-center text-good-blue-brown">
                花とカフェ goodblue<br />
                〒879-4911 大分県玖珠郡九重町田野1672-18<br />
                TEL: 090-3013-7032
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;