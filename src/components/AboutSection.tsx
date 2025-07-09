import React from 'react';
import { Flower2 } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* 背景テクスチャ */}
      <div className="absolute inset-0 bg-good-blue-light">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(139, 115, 85, 0.05) 2px,
              rgba(139, 115, 85, 0.05) 4px
            )`,
            backgroundSize: '4px 100%'
          }}
        />
      </div>
      
      {/* 右側に控えめな円形装飾 */}
      <div className="absolute top-20 right-0 w-32 h-32 -mr-16 z-10">
        <div className="w-full h-full rounded-full bg-good-blue-gold/5"></div>
      </div>
      {/* 左側に控えめな円形装飾 */}
      <div className="absolute bottom-20 left-0 w-24 h-24 -ml-12 z-10">
        <div className="w-full h-full rounded-full bg-good-blue-brown/5"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        {/* 店主からのメッセージ */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-good-blue-brown text-center mb-8">店主からのメッセージ</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img 
                  src="/images/about/owner.jpg" 
                  alt="店主 的場達郎" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:w-2/3">
                <p className="text-good-blue-brown/80 leading-relaxed mb-6">
                  九重町の大自然に魅了されて移住をし、2023年に花屋＆カフェ「goodblue」をOPENしました。この素晴らしい土地で育つ山野草の魅力を、一人でも多くの方にお届けしたい。そんな想いから、このオンラインショップを開設いたしました。
                </p>
                <p className="text-good-blue-brown/80 leading-relaxed mb-6">
                  九重の澄んだ空気と豊かな自然の中で育った花苗たちは、都会では味わえない生命力に満ちています。遠方にお住まいで九重まで足を運ぶことが難しい方にも、この地で大切に育てた花苗をお届けし、ご自宅のお庭で『青空の下で過ごす良い時間』を感じていただければ幸いです。
                </p>
                <p className="text-good-blue-brown/80 leading-relaxed mb-6">
                  私たちがお届けするのは、ただの花苗ではありません。九重の大地の恵みと、四季の移ろいを感じられる特別な苗です。翌年の同じ季節に新芽を出し、年を重ねるごとに美しく成長する姿を通じて、九重の自然とつながる喜びを感じていただけることを願っています。どうぞ、画面越しではありますが、九重の風を感じながらお買い物をお楽しみください。
                </p>
                <p className="text-right text-good-blue-brown font-medium">
                  goodblue 店主　的場達郎
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 特徴セクション */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* オンラインショップの魅力 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Flower2 className="h-8 w-8 text-good-blue-gold mr-3" />
              <h3 className="text-xl font-semibold text-good-blue-brown">九重から全国へお届け</h3>
            </div>
            <p className="text-good-blue-brown/80 text-sm leading-relaxed">
              九重の大自然で育った希少な山野草を、オンラインで全国へお届けします。量販店では手に入らない、つつましくて上品な草花との出会いをお楽しみください。プロが厳選した健康な苗だけを、大切に梱包してお送りします。
            </p>
          </div>

          {/* 安心の品質 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <svg className="h-8 w-8 text-good-blue-gold mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="text-xl font-semibold text-good-blue-brown">安心の品質保証</h3>
            </div>
            <p className="text-good-blue-brown/80 text-sm leading-relaxed">
              標高700mの清涼な環境で育った健康な苗のみを厳選。植物のプロが一つ一つ丁寧に梱包し、最良の状態でお届けします。到着後の育て方サポートも充実しています。
            </p>
          </div>

          {/* 限定品種 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <svg className="h-8 w-8 text-good-blue-gold mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              <h3 className="text-xl font-semibold text-good-blue-brown">ここだけの限定品種</h3>
            </div>
            <p className="text-good-blue-brown/80 text-sm leading-relaxed">
              九重・くじゅうの山々に自生する希少種を中心に、他では手に入らない山野草を多数取り揃え。季節限定の品種もあり、訪れるたびに新しい出会いがあります。
            </p>
          </div>
        </div>

        {/* 青空の下で過ごす良い時間 */}
        <div className="mt-16 text-center">
          <div className="relative bg-gradient-to-r from-good-blue-gold/10 to-good-blue-gold/5 rounded-lg p-8 md:p-12 overflow-hidden">
            {/* 内部テクスチャ */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 10px,
                  rgba(139, 115, 85, 0.03) 10px,
                  rgba(139, 115, 85, 0.03) 20px
                )`
              }}
            />
            <div className="relative z-10">
            {/* ロゴ */}
            <div className="mb-6">
              <img 
                src="/images/logo.png" 
                alt="GOOD BLUE FLOWER & CAFE" 
                className="h-20 md:h-24 w-auto mx-auto"
              />
            </div>
            
            {/* タイトルと装飾 */}
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-6">
              <img 
                src="/images/header_deco_l.png" 
                alt="" 
                className="h-8 md:h-10 w-auto opacity-50"
              />
              <h3 className="text-xl md:text-2xl font-bold text-good-blue-brown whitespace-nowrap">
                『青空の下で過ごす良い時間』
              </h3>
              <img 
                src="/images/header_deco_r.png" 
                alt="" 
                className="h-8 md:h-10 w-auto opacity-50"
              />
            </div>
            
            <p className="text-good-blue-brown/80 max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
              九重の大地で育った苗をあなたのお庭へ。<br />
              植えた瞬間から始まる、自然とつながる暮らし。<br />
              毎年花開く喜びが、あなたの日常に彩りを添えます。
            </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;