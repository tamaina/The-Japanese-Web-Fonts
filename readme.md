# the Japanese Web Fonts
the Japanese Web Fontsは、日本語フリーフォントを集めたWebフォントセットです。  
日本語用にサブセットしています。

使い方は https://a9z.dev/The-Japanese-Web-Fonts/ を参照してください。

## ビルド方法
### 依存ソフト
ビルドには以下のソフトウェアを使用しますので、インストールしてください。

- Node.js v12
- [fonttools](https://github.com/fonttools/fonttools) v4
  * Python 3

そして、パッケージのインストールのために以下を実行します。

```
npx yarn install
```

### ビルドコマンド
```
npm start
```

私のパソコンだと20分程度かかります。  
パソコンの性能に応じて適宜`script/index.js`の1行目の`concurrency`（サブセット処理の最大並行処理数）を変更してください。
