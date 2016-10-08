# THE 日本語Webフォント
# THE Japanese Web Fonts

## 概要 About

Source Han Sans / Noto Sans CJK JP / 源ノ角ゴシック と呼ばれるものを、Webフォントとして利用したいと思い作りました。

源ノ角ゴシックは、7種類のウェイト(太さ)を持った非常に優秀な無料日本語フォントです(中国語、ハングルと共同で開発されました)。詳細は[Wikipedia](https://ja.wikipedia.org/wiki/Source_Han_Sans)

このWebフォントでは、源ノ角ゴシックから派生した[源真ゴシック](http://jikasei.me/font/genshin/)をサブセット化し、なるべく軽量に、使いやすくしました。

いろは角クラシックのひらがなを使えるアドオンがあります。

## 使い方 How to use

1. ウェイトパックのタイプを下から選んで、css「GenJpFont-[Type].css」にlinkしてください。
    - 「Type A 文書」だったら「GenJpFont-A.css」
    - cdnとかは今の所ないので、すべてのファイルをダウンロードしてサーバーに直接アップロードしてください。
2. フォント名は「GenShinGothic-w」 です。お好きなセレクタのfont-family内に書き加えてください。

## ソース例

### head内に加えてください Add this tag into head.

    <link rel="stylesheet" href="css/GenJpFont-[Type].css" />
    <!-- [Type]には後述するアルファベットが入ります。
         Type Aなら GenJpFont-A.css と書かれることになります。 -->

### cssを設定します Set css like this

　※欧文フォントをRobotoに設定しています。このコードをそのまま転用する場合は、別途RobotoをWebフォントとして読み込んでください。

　※読み込み軽量化の範囲を広げるため、源ノ角ゴシックではないウェイト多めのフォントも読み込んでいます。気に入らなければ削除してください。

    TAG,.class,#id {
        font-family: 'Roboto', 'Noto Sans CJK JP', '源ノ角ゴシック', 'Source Han Sans', '源真ゴシック', 'GenShinGothic', 'M+ 2c', 'Mgen+ 2c', 'Hiragino Sans', 'ヒラギノ角ゴシック', 'ヒラギノ角ゴ Pro W3' ,'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ ProN W3', 'Hiragino Kaku Gothic ProN', 'GenShinGothic-w', sans-serif;
        font-weight: 400; //任意のウェイトを指定します。
    }

## ダウンロード Download

https://github.com/tamaina/The-Japanese-Web-Fonts/releases

## ウェイト Weights

|Number|Name                   |IROHA|NASU |
|-----:|:----------------------|:---:|:---:|
|100   |(none)                 |     |     |
|200   |ExtraLight または Thin |○   |     |
|300   |Light                  |○   |     |
|400   |Normal                 |     |     |
|500   |Regular                |○   |○   |
|600   |Medium                 |○   |     |
|700   |Bold                   |○   |○   |
|800   |(none)                 |     |     |
|900   |Heavy                  |     |     |

IROHAとNASUについては後述しています。

### タイプ Weights-packs

1. Type A 文書
    - Weights:500,700
    - デザイン目的ではなく、文書表示用として源真ゴシックが使いたい場合にご使用ください。
2. Type C 薄い
    - Weights:200,400,700
3. Type D バランス(多め)
    - Weights:200,500,700
4. Type F 濃い
    - Weights:500,700,900
5. Type G バランス(多め)
    - Weights:200,400,500,700,900
6. Type I いろは角用
    - Weights:200,300,500,600,700
6. Type X すべて All
    - Weights:200,300,400,500,600,700,900
7. 単体 One Weight CSS
    - Typeはウェイト表のNameの一番最初の文字 (ExtraLight・200ならcss「GenJpFont-E.css」)
    - GenJpFont-[The First Character].css 
      - ex.No.200 ExtraLight : GenJpFont-E.css

## 仕様
- 元のフォント Source
  - 源真ゴシック GenShinGothic
  - http://jikasei.me/font/genshin/
- 表示可能文字
  - かな・漢字(教漢、第1水準漢字、第2水準漢字)・全角記号
  - 英数字と半角記号、第2水準漢字より上の漢字は含まれていません。他のフォントと組み合わせてご利用ください。
  - You have to set another fonts that have alphanumeric.
- 形式 Extensions
  - ttf,otf,woff2,woff

# 派生
# Derived Fonts

## 使い方

- font-familyの値指定については、日本語フォントの前に書き加えてください。
- In the property font-family, add the value before Japanese fonts like as "GenShinGothic-w".

## いろは角クラシック

ウェイトが5種類ある、行書の面影が残る、ゴシック体です。

かなのみ収録しておりますので、

- http://modi.jpn.org/font_irohakakuc.php
- href="IrohaKakuKanaJpFont-[Type].css"
- font-family:"irohakakuC-w";

### タイプ Weights-packs

1. Type A Regular and Bold
    - Weights:500,700
2. Type X すべて All
    - Weights:200,300,500,600,700
3. 単体 One Weight CSS
    - Typeはウェイト表のNameの一番最初の文字 (ExtraLight・200ならcss「IrohaKakuKanaJpFont-E.css」)
        - ex.No.200 ExtraLight : IrohaKakuKanaJpFont-E.css

## Nasu

改良版です。機械的な印象があります。

- http://itouhiro.hatenablog.com/entry/20140917/font
- href="NasuSSJpFont-[Type].css"
- font-family:"Nasu-w";

### タイプ CSSes

1. Type X Regular and Bold
    - Weights:500,700
2. Type R Regular
    - Weight :500
3. Type B Bold
    - Weight :700

# ライセンス License

付属のファイル「License」を御覧ください。

- NasuフォントはApache License 2.0
- その他のフォントはSIL OPEN FONT LICENSE Version 1.1
- CSSとかはWTFPL