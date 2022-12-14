## Ｍy Restaurant 我的餐廳清單

### 功能介紹
- 提供會員註冊、登入功能，每位使用者有獨立的蒐藏清單
- 查看目前已有的收藏餐廳清單
- 搜尋清單中的特定餐廳
- 新增餐廳至收藏餐廳清單
- 點擊瀏覽餐廳的詳細資訊
- 點擊修改餐廳的資訊
- 將餐廳從清單中刪除
- 可依不同選擇排序餐廳
### 專案畫面

- 首頁
![Index page about Restaurant List](./public/image/snapshot_index.png)

- 餐廳資訊
![Information page of clicked restaurant](./public/image/snapshot_detail.png)

- 搜尋頁面
![Search page about certain restaurant](./public/image/snapshot_search.png)

- 修改頁面
![Edit page about certain restaurant](./public/image/snapshot_edit.png)

- 註冊會員頁面
![Register page](./public/image/snapshot_register.png)

- 登入會員頁面
![login page](./public/image/snapshot_login.png)


### 安裝

1. 透過終端機(Terminal)，先將此專案存放至本地位置

2. 在本地開啟之後，透過終端機進入資料夾，輸入：

   ```bash
   npm install // 安裝套件
   ```

3. 安裝完畢後，建立檔案.env，並設定環境變數(請參考.env.example)

4. 寫入種子資料
   ```bash
   npm run seed
   ```

5. 開啟程式
   ```bash
   npm run dev
   ```

4. 若看見以下訊息則代表順利運行，打開瀏覽器進入到以下網址

   ```bash
   Express is listening on localhost:3000
   mongodb connected!
   ```
   請至 http://localhost:3000 開啟網站
   
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
- method-override 3.0.0
- bcryptjs 2.4.3
- connect-flash 0.1.1 
- dotenv 8.2.0
- passport 0.4.1
- passport-facebook 3.0.0
- passport-local 1.0.0
- express-session 1.17.1
