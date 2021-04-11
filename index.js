const { argv } = require('process');
const readline = require('readline');
const { rHistory, wHistory } = require('./history');
const { spawn } = require('child_process');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const main = () => {
    console.log(`Masukkan data pesanan :`)
    var lines = ``;
    rl.on('line', (line) => {
        if (line !== '') {
            lines += line;
        } else {
            processData(lines);
        }
    });
}
main();

const processData = (lines) => {
    try {
        var data = JSON.parse(lines);

        let totalAmount = 0;
        let totalItems = 0;

        data.products.map(v => {
            totalAmount += v.price * v.qty;
            totalItems += v.qty;
        })

        const totalPoints = (totalAmount / 10000) * multiplier(data.user);

        wHistory({ user: data.user, total_amount_transacon: totalAmount });
        console.log("=============================== HASIL ================================");
        console.log({ totalAmount, totalItems, totalPoints });
        console.log("======================================================================");
        process.exit();
    } catch (err) {
        failProccess();
    }
}

const failProccess = () => {
    console.log('pastikan data diinput dengan benar');
    console.log()
    // main()
    process.exit()
}

const multiplier = (user) => {
    const history = rHistory(user);
    let total = 0;
    history.map(v => {
        total += v.total_amount_transacon
    })
    if (total > 40000000) {
        x = 1.4;
    } else if (total > 30000000) {
        x = 1.3;
    } else if (total > 20000000) {
        x = 1.2;
    } else if (total > 10000000) {
        x = 1.1;
    } else if (total > 1000000) {
        x = 1.05;
    } else {
        x = 1;
    }
    console.log(total + ' ' + x);
    return x;
}