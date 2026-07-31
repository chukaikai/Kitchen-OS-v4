# Kitchen OS v4.1 — 101 Weekly

包含「101 Cold、S1、S2、Pizza」四個 Weekly 盤點分頁。

## 功能

- 依照 Excel 原始列順序顯示：Cold 69 項、S1 53 項、S2 41 項、Pizza 21 項
- 工作站頁籤快速切換，各站盤點資料分開保存
- 品項代碼不顯示
- 欄位：品項、單位、儲位、站上、TOTAL
- TOTAL 自動計算為「儲位 + 站上」，且不可編輯
- 空白數值以 0 計算
- 品項與單位搜尋
- LocalStorage 自動儲存
- 手機與電腦版介面

## 本機開啟

直接開啟 `index.html` 即可使用。

## 部署到 GitHub Pages

1. 建立一個新的 GitHub repository。
2. 將本資料夾內的 `index.html`、`styles.css`、`app.js` 上傳到 repository 根目錄。
3. 到 repository 的 **Settings → Pages**。
4. 在 **Build and deployment** 選擇 **Deploy from a branch**。
5. Branch 選擇 `main`，資料夾選擇 `/ (root)`，按 **Save**。

GitHub 完成部署後，即可用 Pages 網址開啟。
