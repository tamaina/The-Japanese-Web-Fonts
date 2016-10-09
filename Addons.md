# アドオン Add-ons

源ノ角ゴシックやM+フォントの普及によって、多くのデザイナーによって作られた派生フォントが出ています。

そこで、軽量化のために、漢字部分は源真ゴシックやMgen+に任せ、アドオンとして必要な文字だけ抜き出しました。

## 使い方

- font-familyの値指定については、日本語フォントの前に書き加えてください。
- In the property font-family, add the value before Japanese fonts like as "GenShinGothic-w".

## ウェイト Weights

|Number|GenShin    |M+       |IROHA|NASU |Antique|
|-----:|:----------|:--------|:---:|:---:|:-----:|
|100   |ExtraLight |Thin     |○   |     |       |
|200   |Light      |Light    |○   |     |       |
|300   |Normal     |(Light)  |     |     |       |
|400   |Regular    |Regular  |○   |○   |       |
|500   |Medium     |Medium   |○   |     |○     |
|600   |(Bold)     |(Bold)   |○   |○   |       |
|700   |Bold       |Bold     |○   |○   |○     |
|800   |Heavy      |**Heavy**|     |     |       |
|900   |           |**Black**|     |     |       |

## かな(英数)フォント

かなや英数が収録されています。源真ゴシック、Mgen+両方でお使いいただけます。

### いろは角クラシック

かなフォント。

ウェイトが5種類ある、行書の面影が残る、ゴシック体です。

- http://modi.jpn.org/font_irohakakuc.php
- href="IrohaKakuKanaJpFont-X.css"
- font-family:"irohakakuC-w";

### 源暎フォント

**源暎アンチック**は、漫画に使われる、かなが明朝体で漢字がゴシック体のフォント。

**源暎ラテゴ**は、まあ、見てもらえればわかります。font-weightが500しかありません。

Linux Bioliumをカスタムした英数字も用意されています。

- http://okoneya.jp/font/
- href="GenEi-X.css"
- font-family:
  - 源暎アンチック "GenEiAntiqueN-w"
  - 源暎ラテゴ "GenEiLateGo"

## 源真ゴシック拡張

源真ゴシック専用です。

### Nasu

改良版です。機械的な印象があります。

- http://itouhiro.hatenablog.com/entry/20140917/font
- href="NasuSSJpFont-X.css"
- font-family:"Nasu-w";