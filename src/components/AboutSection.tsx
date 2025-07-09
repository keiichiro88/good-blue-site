import React from 'react';
import { Flower2, Dog, Coffee, MapPin } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section className="relative py-16 bg-good-blue-light overflow-hidden">
      {/* 右側に控えめな円形装飾 */}
      <div className="absolute top-20 right-0 w-32 h-32 -mr-16">
        <div className="w-full h-full rounded-full bg-good-blue-gold/5"></div>
      </div>
      {/* 左側に控えめな円形装飾 */}
      <div className="absolute bottom-20 left-0 w-24 h-24 -ml-12">
        <div className="w-full h-full rounded-full bg-good-blue-brown/5"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
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
          {/* 山野草の魅力 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Flower2 className="h-8 w-8 text-good-blue-gold mr-3" />
              <h3 className="text-xl font-semibold text-good-blue-brown">希少な山野草が彩る</h3>
            </div>
            <p className="text-good-blue-brown/80 text-sm leading-relaxed">
              当店で取り扱う品種の中心は、九重・くじゅうの大自然に自生する希少な山野草です。一般的な園芸種とは違い、派手さはないけれど、つつましくて上品な草花がたくさん揃っています。
            </p>
          </div>

          {/* ドッグラン */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Dog className="h-8 w-8 text-good-blue-gold mr-3" />
              <h3 className="text-xl font-semibold text-good-blue-brown">ドッグラン完備</h3>
            </div>
            <p className="text-good-blue-brown/80 text-sm leading-relaxed">
              愛犬と一緒に楽しめる広々としたドッグランを完備。青空の下、自然豊かな環境で愛犬との特別な時間をお過ごしいただけます。カフェスペースもワンちゃん同伴OK！
            </p>
          </div>

          {/* カフェ */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Coffee className="h-8 w-8 text-good-blue-gold mr-3" />
              <h3 className="text-xl font-semibold text-good-blue-brown">くつろぎのカフェ</h3>
            </div>
            <p className="text-good-blue-brown/80 text-sm leading-relaxed">
              花々に囲まれた店内で、こだわりのコーヒーと手作りスイーツをお楽しみください。自然の環境に近い落ち着いた空間で、ゆっくりとした時間をお過ごしいただけます。
            </p>
          </div>
        </div>

        {/* 青空の下で過ごす良い時間 */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-good-blue-gold/10 to-good-blue-gold/5 rounded-lg p-12">
            <h3 className="text-2xl font-bold text-good-blue-brown mb-6">
              『青空の下で過ごす良い時間』
            </h3>
            <p className="text-good-blue-brown/80 max-w-3xl mx-auto leading-relaxed">
              お庭に植えた苗の成長を青空の下で感じていただき、<br />
              翌年の同じ季節に新芽を出し、綺麗な花を咲かせる喜びを。<br />
              その先何年も続く、良い時間をお届けします。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;