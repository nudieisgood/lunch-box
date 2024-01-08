<img src="https://res.cloudinary.com/dfvtounam/image/upload/v1700889551/anakedape-logo_neadbn.png"  />

# Description - 概述

此為 RWD 網頁可以在不同裝置上瀏覽操作，你可以在網站上瀏覽品牌最新資訊，預覽或購買商品。在 footer 位置有供網頁管理者進入的入口來查看顧客訂單，並管理訂單是否出貨完成，以及新增及修改商品的內容，亦可管理 features 專欄頁面的文章內容，顧客訂單確定後後端伺服器會管理資料庫中商品的數量等。

本作品前端主要利用 React.js 建立的電子商務平台，使用者分為三類：非會員使用者、會員使用者、商家管理員（Admin），另外後端功能搭配 Node.js / Express.js。

# Live web - 作品連結

您可以瀏覽此作品 : <a target="blank" href="https://anakedape.onrender.com">Live web</a>

可以由 Footer 進入管理者頁面 （點擊即登入）
<img src="https://res.cloudinary.com/dfvtounam/image/upload/v1700889557/anakedape-footer_xnpobd.png"  />

# Features - 功能

- 會員功能

  - 登入登出 (jwt token)
  - 使用者可以註冊成為會員，並作為會員登入
  - Footer 處有進入管理者頁面的接口，點擊會用 admin 帳號登入並轉址到管理者頁面
  - 非會員者也可以購買商品

- 商品頁面

  - 可以瀏覽所有商品及單一商品詳細資訊
  - 可以透過分類瀏覽不同商品
  - 管理者登入後可在所有商品頁面控制商品上下架

- 專欄列表

  - 可以瀏覽所有專欄及單一專欄詳細資訊

- LookBook

  - 在 Visual 頁面 可以瀏覽當季商品的 LookBook

- 購物車

  - 可以將商品加入購物車，瀏覽購物車的內容
  - localStorage 管理購物車
  - 會員可以在購物車中刪除或變動商品數量

- 結帳
  - 跨頁面 / 瀏覽器 分享 checkout 商品清單 (jwt token)
  - 會員成功購買後會轉址到成功購買頁面
  - 若購買失敗（商品數量不足等）會回到購物車
- 管理者頁面
  - 管理者可修改商品, 專欄 - 新增及修改 CRUD
  - 管理者可進行訂單管理 - 訂單狀態

# Content - 作品內容

- 使用者頁面
  <img src="https://res.cloudinary.com/dfvtounam/image/upload/v1700889555/anakedape-%E5%95%86%E5%93%81%E5%80%91_xjkcvp.png"  />
  <img src="https://res.cloudinary.com/dfvtounam/image/upload/v1700889554/anakedape-%E5%95%86%E5%93%81%E9%A0%81%E9%9D%A2_phegsm.png"  />
  <img src="https://res.cloudinary.com/dfvtounam/image/upload/v1700889559/anakedape-checkout_rphuyc.png"  />
  <img src="https://res.cloudinary.com/dfvtounam/image/upload/v1700889559/anakedape-%E8%B3%BC%E7%89%A9%E8%BB%8A_i6kypk.png"  />
  <img src="https://res.cloudinary.com/dfvtounam/image/upload/v1700889558/anakedape-features_fp2pd6.png"  />

- 管理者控制
  <img src="https://res.cloudinary.com/dfvtounam/image/upload/v1700889556/%E7%AE%A1%E7%90%86%E8%80%85%E5%95%86%E5%93%81%E5%80%91_ke8n42.png"  />
  <img src="https://res.cloudinary.com/dfvtounam/image/upload/v1700889559/anakedape-%E7%AE%A1%E7%90%86%E8%A8%82%E5%96%AE_aspncd.png"  />
  <img src="https://res.cloudinary.com/dfvtounam/image/upload/v1700889566/anakedape-%E6%96%B0%E5%A2%9E%E5%95%86%E5%93%81_jbzoo8.png"  />

# Folders - 資料夾說明

- 前端 / client folder

  - assets - 靜態資源
  - components - 頁面零組件 / 組件 scss 與該資料夾一起
  - pages - 主要畫面組件 / 畫面 scss 與該資料夾一起
  - context - 上層 state 管理
  - utilities - 其他 helper function 及 靜態資料
  - styles - 通用 scss 檔案

- 伺服器端
  - controllers - 邏輯控制器
  - models - 資料庫檔案結構
  - routes - 路由控制
  - server - 初始啟動伺服器邏輯

# Tech - 技術

- 前端

  - React.js
  - react-router-dom
  - axios
  - framer-motion

- 伺服器端
  - Node.js
  - express
  - mongoose
  - jsonwebtoken
  - validator

# Third Party - 第三方服務

- cloudinary

- mongoDB

# Declaration - 聲明

本作品之商品圖片、內容等，純粹為演示用圖，不做任何商業用途。
