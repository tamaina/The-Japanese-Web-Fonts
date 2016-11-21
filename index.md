# THE Japanese Web Fonts - 日本語Webフォント

**[Google Fonts + Japanese Early Access](https://googlefonts.github.io/japanese/)**

↑を試してみてなんか違うと思ったらこれを使ってみてください。(問題点について下に書いてあります)

## 概要

About

tamainaが纏めたフリーウェブフォントセットです。安直な名前ですがお許し下さい。

**Source Han Sans / Noto Sans CJK JP / 源ノ角ゴシック** (配布元により呼び方にばらつきがあります) 及び **M+フォント**を、**Webフォント**として利用したいと思い作りました。

**Source Han Sans / Noto Sans CJK JP / 源ノ角ゴシック** は、7種類のウェイト(太さ)を持った非常に優秀な無料日本語フォントです(中国語、ハングルと共同で開発されました)。詳細は[Wikipedia](https://ja.wikipedia.org/wiki/Source_Han_Sans)

このWebフォントでは、源ノ角ゴシックから派生した**[源真ゴシック](http://jikasei.me/font/genshin/)をサブセット化**し、なるべく軽量に、使いやすくしました。

**M+フォント**は、7種類のウェイト(太さ)を持った非常に優秀な無料日本語フォントです(中国語、ハングルと共同で開発されました)。詳細は[M+フォントのホームページ](http://mplus-fonts.osdn.jp/)

このWebフォントでは、M+フォントから派生した**[Mgen+(ムゲンプラス)](http://jikasei.me/font/mgenplus/)をサブセット化**し、なるべく軽量に、使いやすくしました。

この2種類のフォントをベースに、**様々なアドオンフォント**を用意しております。また、有償無償問わず、様々なかなWebフォントの漢字補完に最適です。

とりあえず**[デモページを見ればわかります。](https://tamaina.github.io/The-Japanese-Web-Fonts/)**

## 特徴

***人はこれを煩雑さという***

- JIS第2水準漢字まで対応。
  - 第2水準漢字の例:煌,穢,靄,箒,箋,翔,巒,鵺~~,橳~~
- 無駄に記号が多い。
  - 記号フォントが分離しています。
- 欧文と日本語が別れています。
  - 欧文M+ c,日本語Noto Sans CJK JPとかいう変なことができます。

記事を書いていた人はここで寝てしまいました。

## 文書

[基本的な使い方](HowToSet.md)

[源真ゴシック](Gen.md)

[Mgen+](Mplus.md)

[アドオン一覧](Addons.md)

## ダウンロード

Download

https://github.com/tamaina/The-Japanese-Web-Fonts/releases

## ウェイト

Weights

|Number|Noto Sans  |M+       |IROHA|
|-----:|:----------|:--------|:---:|
|100   |ExtraLight |Thin     |○   |
|200   |Light      |Light    |○   |
|300   |Normal     |-        |     |
|400   |Regular    |Regular  |○   |
|500   |Medium     |Medium   |○   |
|600   |-          |-        |     |
|700   |Bold       |Bold     |○   |
|800   |Heavy      |**Heavy**|     |
|900   |-          |**Black**|     |

- 実際にcssで`font-weight`を指定するときは、Number(100~900)を指定することを推奨します。
- M+で太字の箇所は、M+ m および M+ mnに収録されていません。
- IROHAはアドオンフォント「いろは角ゴシック」収録のウェイトです。

## ライセンス

License

付属のファイル「License」を御覧ください。

## 免責事項

一連の文書を参考にした行動について、私は一切の責任を負いません。自己責任でお願いします。

いかなる問題に対しても、金銭・物品的な対応はしません。技術的なサポートは出来る限りやろうと思います。

連絡先[twitter@t_ma1n](twitter.com/t_ma1n)

## 裏話

- ぶっちゃけて言うと、Google Web FontsからNoto Sans CJK Jpのラインナップが消え去ったと思い込んでいたので、自分で作ってしまいました。
  - 第2水準漢字対応は、やたらと難しい漢字を使う案件が多かったためです。
- M+フォントを分離できたのも、個人的にけっこう良いかなと思ってます。
- Google Fonts + Japanese Early Accessの悪いところ : フリーフォントが配布されたそのまま入っていること。
  - 証拠･･････F12キーのネットワークタブから、それぞれのフォントのサイズを確認することができます。サイズを見ればだいたいの収録文字範囲がわかります。あとは察してください。
  - 問.https://twitter.com/MobileHackerz/status/682959464366870528 左記のツイートの発言の内容には、問題点がある。その理由と内容を答えよ。
    - 解答例.素のM+フォントは、第2水準漢字の一部までしか含まれていない。テレビで放送する上で、表示できない文字があるのは避けるべきである。