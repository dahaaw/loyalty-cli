var fs = require('fs');
const crypto = require('crypto');
const histories = JSON.parse(fs.readFileSync('./history.json', 'utf8'));

exports.rHistory = (user) => {
    const userHistories = histories.filter((history) => history.user === user);
    const currentMonth = '0' + (new Date().getMonth() + 1);
    // currentMonth = '02';
    const currentYear = new Date().getFullYear();
    const thisMonthHistory = userHistories.filter((e) => {
        const dateStr = currentYear + '-' + currentMonth;
        return (e.transacon_date.indexOf(dateStr) !== -1)
    });
    return thisMonthHistory;
};

exports.wHistory = (data) => {
    const userHistories = histories.filter((history) => history.user === data.user);
    data.id = userHistories[0] ? userHistories[0].id : crypto.randomBytes(20).toString('hex');
    data.transacon_date = new Date();

    histories.push(data);
    fs.writeFileSync('history.json', JSON.stringify(histories))
}