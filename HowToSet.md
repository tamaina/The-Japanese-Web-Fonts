# The Japanese Web Fonts 使い方

## 導入

~~**cdnとかはない**ので、自分でダウンロードして自分のサーバーにアップしてください。~~

~~zipで100MBあるのでcdnを使いましょう。~~

githubのダウンロードが爆速になったため、その心配はなくなりました。お持ちのサーバーの回線速度に自信のある方はサーバーにアップロードして使用してください。

- 暫定的にrawgitを使用しています。

ダウンロードは : https://github.com/tamaina/The-Japanese-Web-Fonts/releases

**Source code (zip)**がリンクです。

- アップロードするのは、cssフォルダとfontフォルダだけでいいです。
- 不必要なフォントとcssは除いていただいて結構です。

## フォントの設定方法

### head内の上の方に加えてください

Add these tags into `<head> ~ </head>`.

   ~~~
    <link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/tamaina/The-Japanese-Web-Fonts/master/css/JPWF-Addons.css"/> <!-- JpWF Addons -->
    <link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/tamaina/The-Japanese-Web-Fonts/master/css/GenJpFont-X.css"/> <!-- JpWF GenShin -->
    <link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/tamaina/The-Japanese-Web-Fonts/master/css/MgenP-X.css"/> <!-- JpWF Mgen+ -->
   ~~~
### cssを設定します

- **ある程度把握しておきたいcssの知識として**
  - 必要のないフォントはダウンロードされません
    - サイトを早くする
    - 後ろに書かれたフォントは必要なければ表示されませんし、読み込まれません。
  - Webフォントは、@font-faceで同じフォント名にウェイトが複数書かれていても、必要なウェイトだけダウンロードしてくれます。
- 以下のコードは、設定の例です。
  - デモなので、欧文部分をM+ c、日本語などその他の部分をNoto Sansにしています。

   ~~~
     TAG,.class,#id {
     font-family: 'mgenplus-c-w', 'Noto Sans CJK JP', '源ノ角ゴシック', 'Source Han Sans', '源真ゴシック', 'GenShinGothic', 'M+ 2c', 'Mgen+ 2c', 'Hiragino Sans', 'ヒラギノ角ゴシック', 'ヒラギノ角ゴ Pro W3' ,'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ ProN W3', 'Hiragino Kaku Gothic ProN', 'GenShinGothic-w', sans-serif;
     font-weight: 400; /*任意のウェイトを指定します。私は400が好きですが、世界標準は500らしいです。*/
     }
   ~~~

### 【高速化】その他のフォントの設定方法

- **Webフォント用cssの内容をhtmlに直打ちする。**
  - フォントのみcdnを使用する場合は適宜アドレスを修正してください。
- **`link rel="preload"`を使う。**
  - 詳しくは[gist](https://gist.github.com/tamaina/73ccf1f807bb4531c069da43112bd61c)を参考にしてください
- **font-familyを指定する部分の前にWebフォント用cssを読み込む。**
  - この逆を行うと、再描画が発生します。
    - 「こんなやつら知らねぇよ。標準のフォントで描画じゃオラ」
    - 「おっ、見つかったやん。めんどっちいけど、ダウンロードして描画しよ」
- **ウェイトを減らす。**
  - 1ウェイトごとに1MB増えます。
    - 日本語部分フォントファイルは、1つ900kbあります。※woff2の場合。
      - 第2水準漢字対応の代償です。
    - 英語部分フォントファイルは50kbです。
  - 個人的には3ウェイトが限度だと思います。
    - LTE高速下ならまだしも、200kb制限下だと厳しいことになります。
- **英字部分だけを使う、ひらがなを自分でサブセット化して使う。**
  - 指定しなかった範囲の文字は、自動で補完されます。
    - font-familyの最後にsans-serifを付けましょう。
- **フォント以外の部分を軽量化する。**
  - 画面サイズごとに読み込む画像サイズを変えます。
    - html5.1で<picture><source>要素が追加されました。詳細はググってください。
    - 嫌であれば、imgタグをdivタグで代用し、そのdivに@media screenでbackground-imageを適用します。
    - htmlがマークアップ言語であるという観点から、これは非推奨です。
  - とにかく読み込むファイルの数を少なくします。
    - ファイル数が多いと、サーバーへリクエストするぶん無駄な時間が発生します。
  - cdnのサービスを1つにまとめます。
    - 名前解決の手間を省きます。
    - [cdnjs](cdnjs.com)がおすすめです。


## 興味がある人だけ聞いて(ry

- 【基本フォント】の「英語部分」は、【Roboto】が収録しているグリフを踏襲してサブセット化しています。
  - RobotoよりM+ cが好き。
- woff2もあります。
  - 武蔵システムさんありがとう。
- どこまで互換性があるかは知りませんが、IE4互換はしたつもりです。
  - 私はIE11から。