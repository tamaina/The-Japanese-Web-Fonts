# The Japanese Web Fonts 使い方

## 導入
### CDN
**jsdelivr**を利用することで、CDNから利用できます。

`https://cdn.jsdelivr.net/gh/tamaina/The-Japanese-Web-Fonts@v6.0.0/fonts/`

### ダウンロード
ダウンロードする : https://github.com/tamaina/The-Japanese-Web-Fonts/releases

**Source code (zip)** がリンクです。

cssフォルダとfontフォルダのなかから、選択して必要なフォントファイルをコピーしてください。

## cssを設定する

### 1. @font-faceを書く

複数のファイルを、1つのフォントとしてまとめて指定します。こうすることで早くフォントを表示することができます。

以下は、YakuHanJPを利用しながら「wf-c」というフォントファミリーを作成するsassの例です。

1. font-familyでフォント名を指定します
2. srcでフォントの参照先を指定します
3. font-weightでフォントの太さを指定します。  
   フォントの太さを複数指定する場合は、そのぶんだけfont-weightの値とsrcのurlを変えながら@font-faceを書きます。
4. font-displayでは、フォントが読み込まれないときにどのようにするかを指定します。
5. unicode-langeは、その@font-faceでUnicodeのどの範囲の文字を表示するかを定めます。
   https://github.com/tamaina/The-Japanese-Web-Fonts/tree/master/text 内のサブセット文字一覧を参考に指定してください。

```
@font-face
  font-family: wf-c
  src: url('https://cdn.jsdelivr.net/npm/yakuhanjp@3.0.0/dist/fonts/YakuHanJP/YakuHanJP-Light.woff2') format('woff2'), url('https://cdn.jsdelivr.net/npm/yakuhanjp@3.0.0/dist/fonts/YakuHanJP/YakuHanJP-Light.woff') format('woff')
  font-weight: 200
  font-display: fallback
  /* YakuHanの範囲 */
  unicode-range: U+3001, U+3002, U+3008-3011, U+3014, U+3015, U+30fb, U+ff01, U+ff1f, U+ff08, U+ff09, U+ff1a, U+ff1b, U+ff3b, U+ff3d, U+ff5b, U+ff5d

@font-face
  font-family: wf-c
  src: url('https://cdn.jsdelivr.net/gh/tamaina/The-Japanese-Web-Fonts@v6.0.0/fonts/mgenplus-c-light.woff2') format('woff2'), url('/files/fonts/mgenplus-c-light.woff') format('woff'), url('/files/fonts/mgenplus-c-light.ttf') format('truetype')
  font-weight: 200
  font-display: fallback
  /* ラテン文字 */
  unicode-range: U+000-5FF, U+FF02-FF07, U+FF0A-FF19, U+FF1C-FF1E, U+FF20-FF5A, U+FF5C

@font-face
  font-family: wf-c
  font-style: normal
  font-weight: 200
  font-display: fallback
  src: url('https://cdn.jsdelivr.net/gh/tamaina/The-Japanese-Web-Fonts@v6.0.0/fonts/GenShinGothic-Light.woff2') format('woff2'), url('/files/fonts/GenShinGothic-Light.woff') format('woff'), url('/files/fonts/GenShinGothic-Light.ttf') format('truetype')
  /* 第二水準漢字まで */
  unicode-range: U+3000, U+3003-3007, U+3012, U+3013, U+3016-30fa, U+30fc-9FFF
```

### 2. font-familyで指定する
以下は、さきほど指定した「wf-c」を最優先に描画するfont-familyの設定の例です。

```
font-family: wf-c, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", -apple-system, BlinkMacSystemFont, "Yu Gothic", "メイリオ", Meiryo, sans-serif
```

### 参考

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
