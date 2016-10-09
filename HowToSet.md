# The Japanese Web Fonts 技術書

以下は、源真ゴシック Type X を設定する場合の解説を行います。M+フォントもだいたい同じ要領でできます。

~~ぶっちゃけここまで適当に話を進めても分かる人にだけWebフォントを扱ってほしい~~

## フォントの設定方法

### head内に加えてください Add this tag into head.

    <link rel="stylesheet" type="text/css" href="css/GenJpFont-X.css" />

### cssを設定します Set css like this

- **ある程度把握しておきたいcssの知識として**
  - フォントは前から順に読み込まれます。
    - 後ろに書かれたフォントは必要なければ表示されませんし、読み込まれません。
  - Webフォントは、@font-faceで同じフォント名にウェイトが複数書かれていても、必要なウェイトだけダウンロードしてくれます。
- 以下は、標準的な設定の例です。
  - 欧文フォントをRobotoに設定しています。このコードをそのまま転用する場合は、別途RobotoをWebフォントとして読み込んでください。このホームページで設定されているものとは違います。
  - 読み込み軽量化の範囲を広げるため、源ノ角ゴシックではないウェイト多めのフォントも読み込んでいます。気に入らなければ削除してください。

適当なソースを放置しておきます

    TAG,.class,#id {
    font-family: 'Roboto', 'Noto Sans CJK JP', '源ノ角ゴシック', 'Source Han Sans', '源真ゴシック', 'GenShinGothic', 'M+ 2c', 'Mgen+ 2c', 'Hiragino Sans', 'ヒラギノ角ゴシック', 'ヒラギノ角ゴ Pro W3' ,'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ ProN W3', 'Hiragino Kaku Gothic ProN', 'GenShinGothic-A-w', 'GenShinGothic-w', sans-serif;
    font-weight: 400; /*任意のウェイトを指定します。私は400が好きですが、世界標準は500らしいです。*/
    }

### 【高速化】その他のフォントの設定方法

- リンク先のcssの内容をhtmlに直打ちする。
- link rel="preload"を使う。
  - 詳しくは[gist](https://gist.github.com/tamaina/73ccf1f807bb4531c069da43112bd61c)を参考にしてください
- あったら教えてください
