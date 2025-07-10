import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Wind, Utensils, Scissors, Sun, CheckCircle, ArrowRight } from 'lucide-react';

interface CareGuidePageProps {
  onCategoryChange: (category: string) => void;
}

const CareGuidePage: React.FC<CareGuidePageProps> = ({ onCategoryChange }) => {
  return (
    <div className="min-h-screen bg-good-blue-cream">
      {/* ファーストビュー */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
        <div className="container-base pt-16 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-8">
              この夏、ベランダが楽園に変わる！<br className="hidden md:block" />
              初心者でも絶対きれいに咲かせられる、夏の花苗かんたん育成術
            </h1>
            
            <div className="space-y-4 text-lg text-gray-700 mb-8">
              <p className="italic">
                「うだるような暑い夏。でも、お家に帰ったとき、<br className="hidden md:block" />
                窓の外に涼しげでカラフルな花々が咲いていたら…？<br className="hidden md:block" />
                きっと心が和みますよね。」
              </p>
              
              <div className="bg-white/50 rounded-lg p-4 my-6">
                <p className="text-gray-600 mb-2">『でも、夏は水やりやお手入れが大変そう…』</p>
                <p className="text-gray-600">『すぐに枯らしてしまったらどうしよう…』</p>
              </div>
              
              <p className="text-2xl font-bold text-good-blue-gold">その心配、ご無用です！</p>
              
              <p className="text-base md:text-lg">
                実は、夏のガーデニングは３つの鉄則さえ守れば、<br className="hidden md:block" />
                誰でも簡単にお花を元気に育てられるんです。<br />
                このページでは、夏にぴったりの花苗の選び方から、<br className="hidden md:block" />
                プロが実践する育て方のコツまで、余すところなくお教えします！
              </p>
            </div>
          </motion.div>
          
          {/* メイン画像 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 rounded-2xl overflow-hidden shadow-xl"
          >
            <img 
              src="/images/summer-garden-hero.jpg" 
              alt="夏の花々が咲き誇るベランダ" 
              className="w-full h-96 object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Chapter 1: 夏の苗選び */}
      <section className="py-16 bg-white">
        <div className="container-base">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              <span className="text-good-blue-gold">Chapter 1</span><br />
              夏の苗選びはココが違う！<br />
              プロが教える「夏顔べっぴん苗」の見つけ方
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center">
              元気な苗を選ぶのが成功への一番の近道！<br />
              暑い夏を乗り切る力を持った「夏顔べっぴん苗」を見分けるポイントはこちらです。
            </p>

            <div className="space-y-8">
              {/* Point 1 */}
              <div className="bg-good-blue-light rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-good-blue-gold flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Point 1：「ひょろ長」より「がっしり」体型！
                    </h3>
                    <p className="text-gray-700">
                      茎が間延びせず、根本からがっしりしていて、節と節の間がキュッと詰まっている苗を選びましょう。
                      夏の強い日差しにも負けない体力があります。
                    </p>
                  </div>
                </div>
              </div>

              {/* Point 2 */}
              <div className="bg-good-blue-light rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-good-blue-gold flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Point 2：株元の「下葉」をチェック！
                    </h3>
                    <p className="text-gray-700">
                      意外と見落としがちなのが株元の葉っぱ。ここが黄色くなっていたり、枯れていたりすると蒸れに弱いサインかも。
                      地面に近い部分の葉まで青々としているのが理想です。
                    </p>
                  </div>
                </div>
              </div>

              {/* 比較画像プレースホルダー */}
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <p className="text-gray-500">
                  [OKな苗（左）と注意な苗（右）の比較画像]
                </p>
              </div>

              {/* Point 3 */}
              <div className="bg-good-blue-light rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-good-blue-gold flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Point 3：「蕾（つぼみ）」の数で未来を買う！
                    </h3>
                    <p className="text-gray-700">
                      満開の花も魅力的ですが、これから長く楽しむなら蕾がたくさんついている苗が断然おトク！
                      お家に連れて帰ってから次々と花開く、成長のワクワク感も楽しめます。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chapter 2: 水・風・ごはんの3つの鉄則 */}
      <section className="py-16 bg-gradient-to-b from-blue-50/30 to-transparent">
        <div className="container-base">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              <span className="text-good-blue-gold">Chapter 2</span><br />
              夏のお世話はこれだけ！<br />
              「水・風・ごはん」３つの鉄則
            </h2>
            
            <p className="text-lg text-gray-700 mb-12 text-center">
              「毎日あれこれ大変そう…」いえいえ、夏のお世話はポイントを絞ればとってもシンプル。<br />
              この３つの鉄則を守るだけでOKです！
            </p>

            <div className="space-y-12">
              {/* 鉄則1: 水 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Droplets className="h-8 w-8 text-blue-500" />
                  <h3 className="text-2xl font-bold text-gray-800">
                    鉄則１：お水は「朝夕の涼しい時間」に「土の底から流れるまで」
                  </h3>
                </div>
                <p className="text-gray-700 mb-4">
                  一番やってはいけないのが、日中の水やり。熱せられた土の中でお湯がかかったようになり、根が弱ってしまいます。
                  お水やりは、人間も過ごしやすい朝か夕方の涼しい時間帯に。
                  そして、「土の表面が乾いたのを確認してから、たっぷりと」が合言葉です！
                </p>
                <div className="bg-blue-50 rounded-lg p-4 mt-4">
                  <p className="text-sm text-blue-800 italic">
                    💡 ワンポイント：「根っこも夏バテするんだ…」
                  </p>
                </div>
              </motion.div>

              {/* 鉄則2: 風 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Wind className="h-8 w-8 text-green-500" />
                  <h3 className="text-2xl font-bold text-gray-800">
                    鉄則２：いちばんのご馳走は「さわやかな風」
                  </h3>
                </div>
                <p className="text-gray-700 mb-4">
                  夏の植物トラブルで多いのが「蒸れ」。湿度が高くなると病気の原因になります。
                  鉢と鉢の間はこぶし一つ分あける、プランタースタンドで高さを出してあげるなど、
                  風の通り道を作ってあげましょう。
                </p>
                <button 
                  onClick={() => onCategoryChange('seedlings')}
                  className="mt-4 bg-good-blue-gold text-white px-6 py-3 rounded-lg hover:bg-good-blue-brown transition-colors"
                >
                  おしゃれに風通し改善！プランタースタンドはこちら
                </button>
              </motion.div>

              {/* 鉄則3: ごはん */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Utensils className="h-8 w-8 text-orange-500" />
                  <h3 className="text-2xl font-bold text-gray-800">
                    鉄則３：ごはんは「夏バテさせない」やさしさで
                  </h3>
                </div>
                <p className="text-gray-700 mb-4">
                  私たちも夏バテすると食欲が落ちますよね。植物も同じで、猛暑が続く時期に濃い肥料をあげると逆に弱ってしまいます（肥料焼け）。
                  夏の間は、水で薄める液体肥料を、いつもよりさらに少し薄めにして、週に１回程度与えるのがおすすめです。
                </p>
                <button 
                  onClick={() => onCategoryChange('seedlings')}
                  className="mt-4 bg-good-blue-gold text-white px-6 py-3 rounded-lg hover:bg-good-blue-brown transition-colors"
                >
                  夏でも安心！速効チャージ液体肥料はこちら
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chapter 3: プロのひと手間 */}
      <section className="py-16 bg-white">
        <div className="container-base">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              <span className="text-good-blue-gold">Chapter 3</span><br />
              プロのひと手間！<br />
              夏中ずっと花いっぱいにする魔法
            </h2>
            
            <p className="text-lg text-gray-700 mb-12 text-center">
              基本のお世話にプラスワン！<br />
              このひと手間で、秋までずっとお花が咲き続けます。
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* 魔法1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-pink-50 rounded-lg p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Scissors className="h-6 w-6 text-pink-600" />
                  <h3 className="text-xl font-bold text-gray-800">
                    魔法１：「花がら摘み」で若さをキープ！
                  </h3>
                </div>
                <p className="text-gray-700 mb-4">
                  咲き終わった花をそのままにしておくと、種を作るのに体力を使ってしまい、次の花が咲きにくくなります。
                  終わったお花は、こまめに茎の付け根から摘み取ってあげましょう。病気の予防にもなりますよ。
                </p>
                <p className="text-sm text-pink-700 italic">
                  「ありがとう、また咲いてね」
                </p>
              </motion.div>

              {/* 魔法2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-purple-50 rounded-lg p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Scissors className="h-6 w-6 text-purple-600" />
                  <h3 className="text-xl font-bold text-gray-800">
                    魔法２：勇気の「切り戻し」でリフレッシュ！
                  </h3>
                </div>
                <p className="text-gray-700 mb-4">
                  「なんだか花の勢いがなくなってきたな…」と感じたら、それはリフレッシュのサイン！
                  思い切って、株全体の高さが半分〜1/3くらいになるように、ハサミでカット（切り戻し）してみてください。
                </p>
                <p className="text-sm text-purple-700 font-bold">
                  約３週間後…再び満開に！
                </p>
              </motion.div>
            </div>

            <div className="mt-8 text-center">
              <button 
                onClick={() => onCategoryChange('seedlings')}
                className="bg-good-blue-gold text-white px-6 py-3 rounded-lg hover:bg-good-blue-brown transition-colors"
              >
                切れ味抜群！園芸用ハサミはこちら
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chapter 4: おすすめ花苗 */}
      <section className="py-16 bg-gradient-to-b from-yellow-50/30 to-transparent">
        <div className="container-base">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              <span className="text-good-blue-gold">Chapter 4</span><br />
              この夏、主役はどれにする？<br />
              当店自慢の「夏うまれ」花苗コレクション！
            </h2>
            
            <p className="text-lg text-gray-700 mb-12 text-center">
              さあ、育て方がわかったら、いよいよ主役選び！<br />
              夏の暑さや乾燥に強く、初心者さんでも育てやすい、<br />
              とびきり元気な花苗たちをご紹介します。
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* 日々草 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="h-48 bg-pink-100 flex items-center justify-center">
                  <Sun className="h-16 w-16 text-pink-400" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    太陽大好き！日々草（ニチニチソウ）
                  </h3>
                  <p className="text-gray-600 mb-4">
                    とにかく丈夫で、少しくらい水やりを忘れてもへっちゃら！夏のガーデニングの頼れる味方です。
                  </p>
                  <button 
                    onClick={() => onCategoryChange('seedlings')}
                    className="text-good-blue-gold hover:text-good-blue-brown font-medium flex items-center gap-2"
                  >
                    日々草の苗をチェック！
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>

              {/* アメリカンブルー */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="h-48 bg-blue-100 flex items-center justify-center">
                  <Wind className="h-16 w-16 text-blue-400" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    涼しげな青に癒される アメリカンブルー
                  </h3>
                  <p className="text-gray-600 mb-4">
                    地面を這うように広がり、爽やかなブルーの小花を次々と咲かせます。ハンギングにもぴったり。
                  </p>
                  <button 
                    onClick={() => onCategoryChange('seedlings')}
                    className="text-good-blue-gold hover:text-good-blue-brown font-medium flex items-center gap-2"
                  >
                    アメリカンブルーの苗をチェック！
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>

              {/* ペチュニア */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="h-48 bg-purple-100 flex items-center justify-center">
                  <Droplets className="h-16 w-16 text-purple-400" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    夏の定番！ペチュニア＆サフィニア
                  </h3>
                  <p className="text-gray-600 mb-4">
                    品種が豊富で、育てる楽しさNo.1！切り戻しをすれば、驚くほどたくさんの花で応えてくれます。
                  </p>
                  <button 
                    onClick={() => onCategoryChange('seedlings')}
                    className="text-good-blue-gold hover:text-good-blue-brown font-medium flex items-center gap-2"
                  >
                    ペチュニアの苗をチェック！
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* まとめ */}
      <section className="py-16 bg-white">
        <div className="container-base">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8">まとめ</h2>
            
            <div className="space-y-4 text-lg text-gray-700 mb-8">
              <p>さあ、準備はできましたか？</p>
              <p>
                正しい育て方さえ知っていれば、夏のガーデニングは最高の趣味になります。<br />
                お気に入りの花を育て、その成長を日々見守る時間は、<br />
                きっとあなたの暮らしに潤いと喜びをもたらしてくれるはず。
              </p>
              <p className="text-xl font-bold text-good-blue-gold">
                この夏、あなただけの小さな楽園づくり、<br />
                私たちGOOD BLUE FLOWER & CAFEが全力で応援します！
              </p>
            </div>

            {/* 最終画像プレースホルダー */}
            <div className="mt-8 bg-gray-100 rounded-lg p-16">
              <p className="text-gray-500">
                [夕暮れ時のベランダガーデンの画像]
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* リンクバナー */}
      <section className="py-16 bg-good-blue-light">
        <div className="container-base">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            ▼ガーデニングデビューに必要なのはこちら！▼
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-lg p-6 text-center cursor-pointer"
              onClick={() => onCategoryChange('seedlings')}
            >
              <div className="h-24 bg-green-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-green-600 font-bold">送料無料</span>
              </div>
              <p className="font-bold text-gray-800">
                土も鉢も肥料も！<br />
                初心者さん応援ガーデニングセット
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-lg p-6 text-center cursor-pointer"
              onClick={() => onCategoryChange('seedlings')}
            >
              <div className="h-24 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-blue-600 font-bold">夏のお悩み解決</span>
              </div>
              <p className="font-bold text-gray-800">
                当店おすすめの<br />
                活力剤・殺虫剤
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-lg p-6 text-center cursor-pointer"
              onClick={() => onCategoryChange('seedlings')}
            >
              <div className="h-24 bg-purple-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-purple-600 font-bold">センスアップ</span>
              </div>
              <p className="font-bold text-gray-800">
                おしゃれな<br />
                鉢・プランター特集
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareGuidePage;