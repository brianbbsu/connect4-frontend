# [109-1] Web Programming Final

(Group 102) 具備 AI 模式之屏風式四子棋即時線上對弈遊戲

Deploy 連結：https://connect4.brian.su/

Demo 影片：https://www.youtube.com/watch?v=un634_PDaZc&feature=youtu.be

## Github Link

- 前端：https://github.com/brianbbsu/connect4-frontend
- 後端：https://github.com/brianbbsu/connect4-backend

## 緣起及願景

我們主要受 Lichess[^lichess] 之類的西洋棋網站啟發，實作了一個屏風式四子棋（Connect 4[^connect4]）的線上對戰網站。選用屏風式四子棋的原因有二，其一是屏風式四子棋的規則簡單，另外我們在高中時有 train 了一個屏風式四子棋的 AI 可以讓使用者不需要等待另一位使用者的加入即可開始遊戲。這個網站主要是一個 Proof of Concept，將來要換成其他規則較為複雜的遊戲時，是可以簡單抽換的。

## 功能簡介

我們的網站有註冊、登入 / 登出、線上對戰、挑戰 AI、觀戰、棋譜紀錄、聊天室、User Profile 的功能。**不過本網站對手機的支援度極低，請盡量透過電腦使用本網站。**

### 註冊 & 登入 / 登出

進行對戰、在聊天室留言等功能必須是註冊的使用者才能使用。沒有登入的訪客仍然可以使用觀戰、查看棋譜、查看使用者等功能。

### 線上對戰 & 挑戰 AI & 觀戰

使用者可以選擇由我們的伺服器安排與另一位使用者對戰，或是選擇挑戰我們的 AI。其他使用者或訪客可以進行觀戰。

### 棋譜紀錄

對戰中，我們會實時紀錄棋譜，供使用者（包含玩家和觀戰者）以及訪客在對戰中及對戰後查看。

### 聊天室

在對戰 / 棋譜頁面，兩位玩家以及有登入的觀戰者可以在專屬於該對戰的聊天室裡留言。

### User Profile

我們會紀錄每個使用者的對戰紀錄，並統計其勝敗場數等資訊，供使用者以及訪客查看。

## 使用方式

初次的使用者進入網站時，會是訪客的身份，而且會看到首頁，有簡單的規則說明。可以由左上角的按鈕切換到遊戲列表、使用者列表的頁面，也可以由右上角的按鈕進行登入或註冊。

![](https://i.imgur.com/TGJ5rKA.png)

初次的使用者可以由註冊的頁面進行註冊。

![](https://i.imgur.com/eOg5Bsq.png)

已經有帳號的使用者可以由登入的頁面進行登入。

![](https://i.imgur.com/HeSA2N1.png)

登入後的首頁，有歡迎訊息，可以選擇跟其他使用者或 AI 進行對戰。

![](https://i.imgur.com/9zWS14z.png)

等待對戰對手配對的頁面。

![](https://i.imgur.com/KaizwHy.png)

對戰剛開始的頁面，有聊天室功能。

![](https://i.imgur.com/X9xCCuO.png)

對戰過程以及聊天室訊息。

![](https://i.imgur.com/3fUnR8A.png)

可以倒帶回去看之前的盤面。

![](https://i.imgur.com/tmx4NHl.png)

對戰結束的頁面。

![](https://i.imgur.com/XDbAlcf.png)

![](https://i.imgur.com/e2SvScW.png)

遊戲紀錄的頁面，可以點選結束的遊戲來進入棋譜查看，或是進行中的遊戲來繼續對戰（對戰玩家） / 觀戰（其他使用者或訪客）。

![](https://i.imgur.com/b0MgGoD.png)

可以選擇只看自己的遊戲。

![](https://i.imgur.com/73bwh4F.png)

使用者列表，點選可以進入該使用者的 User Profile。

![](https://i.imgur.com/xhuYSXS.png)

User Profile 頁面

![](https://i.imgur.com/uJbsp4V.png)

登入的使用者點選右上角的使用者名稱會出現一個下拉式選單，可以選擇前往自己的 User Profile 或是登出。

![](https://i.imgur.com/Q5k0cgJ.png)

## 使用套件 / 框架

- 前端
    - react
    - react router
    - axios
    - material-ui（CSS 框架）
    - moment（時間格式化）
    - socket.io-client（實時更新棋盤跟聊天室）
- 後端
    - express
    - mongoose（連接 Mongo DB）
    - bcrypt（Hash 使用者的密碼，我們不會以明文儲存）
    - socket.io（實時推播棋盤跟聊天室）
    - tensorflow.js（用來執行 AI 模型）
    - babel
    - 其他小型工具 Library（lodash, cors, dotenv, etc.）
- 資料庫
    - Mongo DB（儲存所有資料）

## 部屬方式

### 前端

前端是使用 Netlify 這個平台來部屬，這個平台可以支援 React Router 的路徑格式，並且也可以讓我們使用自己的網址。基本上就是把 GitHub Repo Link 起來就直接會 Work 了。

### 後端

後端跟資料庫的部份都是架設在資工系的工作站上，我們有自行簽署 SSL 憑證來達到前後端間的加密傳輸。

## 其他說明

### 前端

我們用 react router，讓我們的 single page app 中的網址仍是有意義的，而且可以進行上一頁、下一頁的操作。

我們特別處理了對戰中，網路不穩等原因的斷線時，重新連線的問題。

為了安全性，我們在使用者選擇登出時，會將該使用者其他分頁進行的對戰強制跳回首頁。

### 後端

**完整後端 API Document**：https://hackmd.io/@briansu/connect4-api

本次的後端是結合 Node.js Express 跟 Socket.io 兩個套件來達到基本的 RESTful 功能跟即時的遊戲 / 訊息反饋。我們除了確保制定的 API 架構能夠達成前端的功能所需，我們撰寫程式的時候還有確保資料的安全性、正確性跟一致性都是有受到保障的：

- 安全性：
    - 最基本的，使用者註冊的密碼有經過 bcrypt 演算法雜湊，並非明文存入資料庫
    - 我們的前後端都有完整使用 HTTPS 傳輸（後端使用的是自己簽署的 Let's encrypt 憑證）
    - 後端有正確的設定 CORS 保護，只允許來自前端網站發送的請求
    - 後端 API 與 Socket 都有做完善的 Token 驗證，避免被惡意使用者偽造其他使用者的請求。
- 正確性
    - 當要對資料庫內的 Document 做修改時，我們有妥善使用 Mongoose 提供的 atomic function，避免各種可能的 Race Condition 發生
    - 使用 Optimistic concurrency control 來在無法使用 atomic function 時確保不受 Race condition 影響資料的正確性
- 一致性
    - 當使用者在前端進行遊戲的動作時，我們會先將結果傳回後端驗證，確保使用者沒有開兩個視窗但是做不一樣的動作，導致同一場遊戲有不同的結果。


## 心得

在這一次的專題，為了達成我們的目標，我們實際運用了上課所教的知識，整合了多個套件。開發過程有遇到一些困難。以前端的部份來說，像是要讓 react 同時結合 axios 的 http request 跟 socket.io，由於 react 的繪製有自己的狀態週期，axios 跟 socket.io 也有很多非同步的狀態改變，同時又要處理使用者的登入狀態跟 react router 的歷史紀錄，要讓這些套件能夠一起運作，花了我們不小的功夫。我們也體驗到比 hackathon 跟作業規模還要大一個程度的 web project 的開發流程，以及跟隊友溝通跟分工合作的過程。

## 分工表
- 袁昕德
    - 圖案設計（棋盤、icon 等等）
    - 前端部分頁面美工
    - 支援前、後端的部分功能
- 蘇柏瑄
    - 後端（全）
    - 前端部份頁面設計
    - 前後端部屬
    - 確保前後端安全性
- 邱俊茗
    - 大部分前端
    - 影片錄製

## 之前作品的延伸

我們的屏風式四子棋 AI 是組員在高二時所作的專題研究中所 train 出來的，實力略強於一般人認真下的水準。

原本的 AI model 是用 Python 的 Tensorflow 套件訓練出來的，本次使用前有先將其升級至夠新版本的 Tensorflow，並且用原生的工具轉成 Tensorflow.js 的格式，其後便能直接在 Node.js 中使用此 model。

[^connect4]: https://en.wikipedia.org/wiki/Connect_Four
[^lichess]: https://lichess.org/
