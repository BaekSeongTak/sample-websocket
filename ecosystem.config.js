module.exports = {
  apps: [{
    name: 'pm2-test001',
    script: './app.js', //실행 위치 확인하고, 미실행 시 절대 경로 입력
    instances: 3, //CPU가 4일 때, 가정
    exec_mode: "cluster",
    merge_logs: true,
  }]
}
