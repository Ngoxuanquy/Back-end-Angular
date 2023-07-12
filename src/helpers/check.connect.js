
const mongoose = require("mongoose")
const os = require('os')
const process = require('process')
const _Seconds = 5000;

//Đếm số lượng kết nối db
const checkConnect = () => {
    const muConnect = mongoose.connect.length
    console.log("Số kết nối DB là ", muConnect)
}

//check sự quá tải
const chechOverLoad = () => {
    setInterval(() => {
        const numConnect = mongoose.connect.length
        const numCore = os.cpus().length;
        const memoryUsgae = process.memoryUsage().rss;

        const maxConnect = numCore * 5;

        console.log("numConnect", numConnect)
        console.log("memoryUsgae", memoryUsgae / 1024 / 1024)


        if (numConnect > maxConnect) {
            console.log('Quas tải')
        }

    }, _Seconds) //
}

module.exports = {
    checkConnect,
    chechOverLoad
}