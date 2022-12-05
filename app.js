// 디렉터리 관리를 위해 path 모듈 사용
const path = require("path");


// HTTP 서버(express) 생성 및 구동

// 1. express 객체 생성
const express = require('express');
const { WebSocketServer } = require('ws');
const app = express();

// 2. "/" 경로 라우팅 처리
app.use("/", (req, res)=>{
    res.sendFile(path.join(__dirname, './index.html')); // index.html 파일 응답
})

// 3. 30001 port에서 서버 구동
const HTTPServer = app.listen(3030, ()=>{
    console.log("Server is open at port:3030");
});


// 웹소켓 서버 생성

const wss = new WebSocketServer({ port: 30001 })

// broadcast 메소드 추가
wss.broadcast = (message) => {
  wss.clients.forEach((client) => {
    client.send(message);
  });
};

wss.on("connection", (ws, request) => {
  ws.on("message", (data) => {
    wss.broadcast(data.toString());
  });

  ws.on("close", () => {
    wss.broadcast(`유저 한명이 떠났습니다. 현재 유저 ${wss.clients.size} 명`);
  });

  wss.clients.forEach((client) => {
    wss.broadcast(
      `새로운 유저가 접속했습니다. 현재 유저 ${wss.clients.size} 명`);
  });
});

