# アドオン

Add-ons

源ノ角ゴシックやM+フォントの普及によって、多くのデザイナーによって作られた派生フォントが出ています。

そこで、軽量化のために、漢字部分は源真ゴシックやMgen+に任せ、アドオンとして必要な文字だけ抜き出しました。

## 使い方

- 上記のデモページでプレビューして確認できます。
  - デモページでは、推奨されるCSSを出力しています。ご利用ください。
- font-familyの値指定については、日本語フォントの前に書き加えてください。

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

## 欧文フォント

Google Fontsに載ってない可哀想なフォント。

### Linux Biolinum

源暎フォントの欧文部分で使われているフォントです。

- http://www.linuxlibertine.org/index.php?id=91&L=1
- `font-family:"LinBiolinum-w";`
- Weights : 400,700


## かな(+欧文)フォント

かなや英数が収録されています。Noto Sans ・ 源ノ角ゴシック、M+ 両方でお使いいただけます。

### いろは角クラシック

ウェイトが5種類ある、行書の面影が残る、ゴシック体です。

- http://modi.jpn.org/font_irohakakuc.php
- `font-family:"irohakakuC-w";`
- Weights: 100,200,400,500,700

### コーポレート・ロゴ

フォントを言葉で表すのは難しいので説明できません。

- http://logotype.jp/corporate-logo-font-dl.html
- `font-family:"CorporateLogo-w";`
- Weights: 500,700

### 刻ゴシック

さわやか系。

- http://freefonts.jp/font-koku-go.html
- `font-family:"KokuGothic-w";`
- Weight : 200

### 源暎フォント

**源暎アンチック**は、漫画に使われる、かなが明朝体で漢字がゴシック体のフォント。

**源暎ラテゴ**は、まあ、見てもらえればわかります。font-weightが500しかありません。

Linux Biolinumをカスタムした英数字も用意されています。

- http://okoneya.jp/font/
- `font-family:`
  - 源暎アンチック `"GenEiAntiqueN-w"`
  - 源暎ラテゴ `"GenEiLateGo"`
- Weights: 500,700

### やさしさゴシック

- http://www.fontna.com/category/gallery/
- `font-family:"YasashisaGothic-w"`
- Weights: 400,700
  - やさしさゴシックボールドをウェイト700の同一フォントとして扱います。

### ロゴたいぷゴシック

- http://www.fontna.com/category/gallery/
- `font-family:"LogoTypeGothic-w"`
- Weight: 400 or 500 (normal)

### ラノベPOP

- http://www.fontna.com/category/gallery/
- `font-family:"LiNovePOP-w"`
- Weight: 800

### JapanSans

- http://webfontfan.com/japansans/?p=20
- `font-family:"JapanSans□"`
  - □には{70,80,90,100}のどれかが入ります。
  - 数字は横幅(%)を意味します。
- Weight: 400 (normal)

## 源真ゴシック拡張

源真ゴシック専用です。

### Nasu

- http://itouhiro.hatenablog.com/entry/20140917/font
- `font-family:"Nasu-w";`
- font-weight: 400,700