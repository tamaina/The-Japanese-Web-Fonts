# 【基本フォント】M+ (Mgen+)

Mgen+は、M+フォントベースのフォントです。

- M+は第2水準漢字が未完成なので、源ノ角ゴシックで補完しています。
- M+は種類が多いです。
  - しかし、後述のように部位を分けることで結果として種類を少なくしています。CSSならではの手法です。

- http://jikasei.me/font/mgenplus/
- href="MgenP-X.css"
- font-family:
  1. 記号部分［共通］
      -  "mgenplus-S-w"
  2. 欧文部分
      1. "mgenplus-c-w"
      2. "mgenplus-p-w"
      3. "mgenplus-m-w"
      3. "mgenplus-mn-w"
  3. 日本語部分
      1. "mgenplus-1-w"
      2. "mgenplus-2-w"
  - 記号部分、日本語部分、欧文部分を併せて使ってはじめてフォントが完成します。
    - 欧文・日本語部分の種類の違いは、上の方のURLで解説してくださってるのでそちらで御覧ください。
    - 欧文部分は源真ゴシックに挿げ替えが可能です。
- 形式 Extensions
  - ttf,eot,woff2,woff

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