# 叶内健大 Portfolio

静的サイトです（ビルド不要）。Three.js は CDN から読み込みます。

## 構成
- `index.html` ページ本体
- `css/style.css` デザイン（色は冒頭の `:root` で一括変更）
- `js/data.js` **内容はすべてここで編集**：名前・メール・フォーム送信先、実績、サービス・料金、対応技術
- `js/main.js` 実績の絞り込み・ギャラリー・フォーム
- `js/hero3d.js` トップの3D（ノートPC・タブレット・スマホ）
- `images/services/` サービス・料金カードの画像
- `images/works/<実績ID>/` 実績画像の置き場所
- `images/loader/01.jpg`〜`10.jpg` ローディング画面の横長画像（880×600px）
- `IMAGES.md` 差し替える画像の一覧

## 画像の差し替え
すべての画像枠に仮の画像が入っています。`IMAGES.md` の一覧どおり、同じ場所・同じファイル名で上書き保存すると置き換わります。
実績の画像を増やすときは `js/data.js` の該当実績の `images` に `{ file: '05.jpg', caption: '説明' }` を追加して、画像を置いてください。

## 実績の追加
`js/data.js` の `WORKS` に1件コピーして追加。`category` は `web / ec / system / 3d / ai` のいずれか。

## 確認方法
`python3 -m http.server` をこのフォルダで実行し、http://localhost:8000 を開く（ES Modules のため、ファイルを直接開くのではなくサーバー経由で）。

## 公開
Netlify / Vercel / GitHub Pages / さくらのレンタルサーバーなど、静的ファイルを置ける場所ならそのまま公開できます。
お問い合わせフォームは FormSubmit 経由で `js/data.js` のメールアドレスに届きます（`formEndpoint`）。最初の1通目で届く有効化メールのリンクを一度押してください。
