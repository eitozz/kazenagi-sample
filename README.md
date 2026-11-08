# 風凪の旅 — GitHub Pages 移行キット

ココナラ出品サンプル（風凪の旅 | デザインサンプル）を、chatgpt.site から GitHub Pages へ移すための一式。

## サイトの構成（2026-11-08 に現行サイトで確認済み）

全部で7ファイルだけの静的サイト。全て相対パス参照なので、そのまま置けば動く。

| ファイル | 状態 |
|---|---|
| `assets/coast.webp`（1600×900） | ✅ 回収済み（原物） |
| `assets/museum.webp`（1024×1536） | ✅ 回収済み（原物） |
| `assets/garden.webp`（1600×900） | ✅ 回収済み（原物） |
| `assets/artisan.webp`（1600×900） | ✅ 回収済み（原物） |
| `styles.css` | ✅ ブラウザ表示の全文転記で復元 |
| `app.js` | ✅ 全文転記で復元（下記の注記あり） |
| `index.html` | ✅ 表示内容から再構築 |

機能：日付タブ切替（2027-04-14〜17の4日間）、カウントダウン、持ち物チェックの localStorage 保存（キー `fictional-journey-packing-v1`）、モバイルメニュー、新着情報の開閉。外部フォント・外部ライブラリなし。

## 復元についての注記（2026-11-08）

- 元サイトのファイルダウンロードができなかったため、`styles.css` と `app.js` はブラウザに表示された全文を転記して復元した。`app.js` の文字化けした日本語文字列は、ページ表示で確認できた文言（「あと157日」など）で復旧済み。
- 日付タブ切替は元の `app.js` には無く、元サイトでは HTML 内のインラインスクリプトだったとみられる。移行版では同じ動作を `app.js` の末尾に再実装した（コメント付き）。
- `index.html` は元の生ソースが取得できなかったため、公開ページの表示内容（文言・日程・持ち物リスト等）をもとに、元の CSS クラス構成に合わせて再構築したもの。文言は表示どおりだが、細部のマークアップは原物と異なる場合がある。

## GitHub Pages 公開手順

1. GitHub で新規リポジトリ `kazenagi-sample` を **Public** で作る（アカウント：eitozz）。
2. このフォルダの中身一式（`index.html` / `styles.css` / `app.js` / `assets/` / `.nojekyll`）をアップロードして commit。
   - 手元でやる場合：フォルダで `git init` → `git add .` → `git commit -m "Kazenagi sample"` → `git remote add origin https://github.com/eitozz/kazenagi-sample.git` → `git push -u origin main`
3. リポジトリの Settings → Pages → Source を「Deploy from a branch」/ `main` / `/ (root)` にして Save。
4. 数分後に公開： **https://eitozz.github.io/kazenagi-sample/**
5. 表示とタブ切替・持ち物チェックを確認したら、ココナラ出品ページ（サービスID 4493200）のサンプルURLをこのURLに差し替える。

## 注意

- GitHub のインポーターは使わない（移行元が git リポジトリではないため失敗する。2026-11-07 の eito インポート失敗と同じ原因）。
- `.nojekyll` は Pages の処理を素通しにするための空ファイル。そのまま置く。
