# 伊豆大島 温室活用プロジェクトサイト

ビルド不要の静的Webサイトです。フォルダごとWebサーバ配下に配置すれば、そのまま動作します。

## 構成

- `index.html`: プロジェクト概要
- `recipes.html`: レシピPDF紹介
- `links.html`: 伊豆大島の便利リンク
- `assets/css/style.css`: 共通スタイル
- `assets/js/main.js`: 共通スクリプト
- `assets/docs/izu-oshima-project-overview.pdf`: 概要PDF
- `assets/recipes/`: レシピPDF配置先

## 設置方法

1. このリポジトリ一式をサーバ上の公開ディレクトリ配下に配置
2. `index.html` にブラウザでアクセス

例: `https://example.ac.jp/project/oshima/index.html`

## レシピPDFの追加方法

1. PDFを `assets/recipes/` にアップロード
2. `recipes.html` にPDFリンクを追記

追記例:

```html
<a href="assets/recipes/suehiro-recipe-vol1.pdf" target="_blank" rel="noopener noreferrer">
  銀座スエヒロ連携レシピ Vol.1（PDF）
</a>
```

## 備考

- フォントはGoogle Fontsを参照しています。学内ネットワーク制限がある場合は、`assets/css/style.css` のフォント設定をローカルフォントに変更してください。
- 外部リンク先の内容・営業情報は変更される可能性があるため、定期的な更新を推奨します。
