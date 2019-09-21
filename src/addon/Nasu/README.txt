Nasu（ナス）フォント
====================

Adobeのオープンソースフォント「源ノ角ゴシック」の改変フォントです。
より正確には、源ノ角ゴシックを改変した「源真ゴシック」を元に改変しました。


収録フォント
------------

以下の2種類のフォントを含みます。

- Nasu（ナス）　　　　　半角英数字はプロポーショナル、全角文字は等幅
- NasuM（ナス・エム） 　等幅フォント

それぞれ Regular, Bold のウェイトがあります。
Regularに対して太字を指定したときBoldが使われるので、
MS WordやWebブラウザーで使いやすくなっています。



このフォントの目的
------------------

- 見た目が似ていてまちがいやすい文字・見た目が同じだが違う文字を判別しやすくすること



具体的な変更点
--------------

- 濁点文字・半濁点文字を区別できるよう、ぱぴぷぺぽパピプペポ の半濁点を大きくする。
- 数字ゼロ・大文字オーを区別できるよう、全角・半角数字ゼロ 0０ にスラッシュを入れる。
- 大文字アイ・小文字エル・数字１を区別できるよう、大文字アイ IＩ には横棒追加、数字 1１ の下端横棒を削除。
- カ力 エ工 ロ口 ー一 ニ二 タ夕 ト卜（カタカナ・漢字）を区別できるよう、字形を加工する。
- へヘ（ひらがな・カタカナ）を区別できるよう、カタカナの字形を加工する。
- 「ほんらい濁点・半濁点がつかない全角ひらがな・全角カタカナ」に合成用濁点・半濁点 U+3099,U+309Aをつけたとき、1文字幅で表示されるようにした。
- ～〜（FULLWIDTH TILDE U+FF5E・WAVE DASH U+301C）を区別できるよう、U+FF5Eを縦に伸ばす。
- 全角ローマ数字ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫに横棒をつける。
- ―（U+2015 HORIZONTAL BAR）を横に伸ばす。
- （NasuMのみ） 行間を狭くする。 { } を横に伸ばす。 ~ を縦に伸ばす。



変更履歴
--------

- version 2014.1215
  - U+002D - (HYPHEN-MINUS)を微調整。横方向に長く。
  - U+003D = (EQUALS SIGN) を微調整。横方向に短く。
  - 全角大文字アイ I を微調整。横方向に短く。
  - NasuMのみ { } を微調整。横方向に長く。
  - NasuMのみ半角大文字アイ I を微調整。横方向に短く。

- version 2014.0925
  - 源ノ角ゴシック ver1.001の全角ひらがな・全角カタカナを取り入れた。
  - 全角カタカナの「タ ダ」は源ノ角ゴシック ver1.001の字形。
  - U+3099, U+309A（合成用濁点, 合成用半濁点）を源ノ角ゴシック ver1.001を取り入れて修正。
  - 全角ひらがな・カタカナとU+3099, U+309A（合成用濁点, 合成用半濁点）を組み合わせた字形を用意した。
  - U+301C「〜」（WAVEDASH）は上下反転していたが、オリジナルに戻す。
  - U+FF5E「～」（FULLWIDTH TILDE）を縦に伸ばす。
  - U+2015「―」（HORIZONTAL BAR）を横に伸ばす。
  - Nasuのみ半角大文字アイ I を修正。

- version 2014.0917
  - 半角英数字がプロポーショナルなNasuフォントを追加。
  - 等幅のフォント名をNasuMに変更。
  - Boldを追加。
  - 全角カタカナの「タ ダ」を源暎ゴシック Ver 1.000.140830 から取り込ませていただく。
  - 漢字の「夕」は源ノ角ゴシックから変更しない。
  - カタカナの「へべぺ」の字形を修正。
  - 全角ローマ数字「ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ」に横棒をつける。
  - 半角カタカナの「ﾟ ｰ」の字形を変更。
  - 大文字アイ IＩ には横棒追加（全角アイには最初からついていたが横棒を短くした）。
  - 数字 1１ の下端横棒を削除。
  - NatuMのみ「 { } 」を横に伸ばす。「 ~ 」を縦に伸ばす。
  - NatuMのみ行間を狭くする。
  - ベースフォントを源真ゴシック Version 1.058.20140828 に変更。

- version 2014.0812
  - 最初のリリース。等幅のみ。
  - ベースフォントは源真ゴシック Version 1.058.20140807。



作成環境
--------

- Windows 7 64bit
- unofficial fontforge-cygwin 2014_01_04 (FontForge 2.0.20140101＋縦書きパッチ）
- TTX/FontTools (WinTTX-2.4-git-behdad-20140317-11580c55bb)
- Source Han Sans（源ノ角ゴシック）ver 1.001
　　ver 1.001で変更された全角ひらがな・全角カタカナを取り入れました。
- 源真ゴシック Version 1.058.20140828（源ノ角ゴシック ver 1.000） http://jikasei.me/
　　「源真ゴシック Regular/Bold, 源真ゴシック等幅 Regular/Bold」を改変のベースにさせていただきました。



ライセンス
----------

- Nasuフォントは、Apache 2.0 License のもとで使用することができます。
- 「源ノ角ゴシック」由来の文字グリフの著作権は Adobe 様が所有しています。
 　　等幅の半角英数字形は、源ノ角ゴシックに含まれる Source Code Pro ベースのものです。
- 「源真ゴシック」由来の文字グリフの著作権は 自家製フォント工房 様が所有しています。
- 「M+ OUTLINE FONTS」由来の文字グリフの著作権は M+ FONTS PROJECT 様が所有しています。

    Copyright 2014 itouhiro

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

  Apache 2.0 License の日本語訳は、以下から参照することができます。
  http://sourceforge.jp/projects/opensource/wiki/licenses%2FApache_License_2.0

-- 
itouhiro <itouhiro at users sourceforge dot jp>
