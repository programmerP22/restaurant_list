## Ｍy Restaurant 我的餐廳清單

### 功能介紹
- 查看目前已有的收藏餐廳清單
- 搜尋清單中的特定餐廳
- 新增餐廳至收藏餐廳清單
- 點擊瀏覽餐廳的詳細資訊
- 點擊修改餐廳的資訊
- 將餐廳從清單中刪除

### 專案畫面

- 首頁
![Index page about Restaurant List](./public/image/snapshot_index.png)

- 餐廳資訊
![Information page of clicked restaurant](./public/image/snapshot_detail.png)

- 搜尋頁面
![Search page about certain restaurant](./public/image/snapshot_search.png)

- 修改頁面
![Edit page about certain restaurant](./public/image/snapshot_edit.png)

### 安裝

1. 透過終端機(Terminal)，先將此專案存放至本地位置

2. 在本地開啟之後，透過終端機進入資料夾，輸入：

   ```bash
   npm install
   ```

3. 安裝完畢後，繼續輸入：

   ```bash
   npm run dev
   ```

4. 若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址

   ```bash
   Listening on http://localhost:3000
   ```

5. 若欲暫停使用

   ```bash
   ctrl + c
   ```

## 開發工具

- Node.js 10.15.0
- Express 4.18.1
- Express-Handlebars 3.0.0
- Bootstrap 4.3.1
- body-parser 1.20.1
- mongoose 5.9.7
- MongoDB
