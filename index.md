# THE Japanese Web Fonts - 日本語Webフォント

## 概要

About

なんとなくサブセット化してみました。

**Source Han Sans / Noto Sans CJK JP / 源ノ角ゴシック** (配布元により呼び方にばらつきがあります) 及び **M+フォント**を、**Webフォント**として利用したいと思い作りました。

**Source Han Sans / Noto Sans CJK JP / 源ノ角ゴシック** は、7種類のウェイト(太さ)を持った非常に優秀な無料日本語フォントです(中国語、ハングルと共同で開発されました)。詳細は[Wikipedia](https://ja.wikipedia.org/wiki/Source_Han_Sans)

このサブセットでは、源ノ角ゴシックから派生した**[源真ゴシック](http://jikasei.me/font/genshin/)をサブセット化**し、なるべく軽量に、使いやすくしました。

**M+フォント**は、7種類のウェイト(太さ)を持った非常に優秀な無料日本語フォントです。詳細は[M+フォントのホームページ](http://mplus-fonts.osdn.jp/)

このWebフォントでは、M+フォントから派生した**[Mgen+(ムゲンプラス)](http://jikasei.me/font/mgenplus/)をサブセット化**し、なるべく軽量に、使いやすくしました。

この2種類のフォントをベースに、**様々なアドオンフォント**を用意しております。有償無償問わず、様々なかなWebフォントの漢字補完に最適です。

とりあえず**[デモページを見てみる](https://tamaina.github.io/The-Japanese-Web-Fonts/)**

## 特徴

- JIS第2水準漢字まで対応。
  - 第2水準漢字の例:煌,穢,靄,箒,箋,翔,巒,鵺~~,橳~~
- 記号フォントが分離
- 欧文と日本語が別れています。
  - 欧文M+ c,日本語Noto Sans CJK JPとかいうこともできます。

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

## Author

[aqz(tamaina) @aqz@misskey.xyz](https://misskey.xyz/@aqz)
