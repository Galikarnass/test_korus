let invoice =
    {
        "customer": "MDT",
        "performance": [
            {
                "playId": "Гамлет",
                "audience": 55,
                "type": "tragedy"
            },
            {
                "playId": "Ромео и Джульетта",
                "audience": 35,
                "type": "tragedy"
            },
            {
                "playId": "Отелло",
                "audience": 40,
                "type": "comedy"
            }
        ]
    };

function statement(invoice) {
    let thisAmount = 0;
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = 'Счет для ' + invoice.customer + ':\n';
    const format = new Intl.NumberFormat("ru-RU",
        {
            style: "currency", currency: "RUB",
            minimumFractionDigits: 2
        }).format;
    let arr = [];

    for (let perf of invoice.performance) {
        switch (perf.type) {
            case "tragedy":
                thisAmount = 40000;
                if (perf.audience > 30) {
                    thisAmount += 1000 * (perf.audience - 30);
                }

                break;
            case "comedy":
                thisAmount = 30000 + 300 * perf.audience;
                if (perf.audience > 20) {
                    thisAmount += 10000 + 500 * (perf.audience - 20);
                }
                arr.push(perf.type);
                break;
            default:
                throw new Error('Неизвестный тип: ' + perf.type);
        }

        // Добавление бонусов
        volumeCredits += Math.max(perf.audience - 30, 0);

        // Дополнительный бонус за каждые 10 комедий
        if (Math.floor(arr.length / 10)) {
            arr = [];
            volumeCredits += Math.floor(perf.audience / 5); // Непонятно, как должен расчитываться бонус за 10 комедий @ Roman Ger
        }

        // Вывод строки счета
        result += perf.playId + ': ' + (format(thisAmount)) + '\n';
        result += perf.audience + ' мест\n';
        totalAmount += thisAmount;
    }
    result += 'Вы заработали ' + volumeCredits + ' бонусов\n';
    result += 'Итого с вас: ' + (format(totalAmount)) + '\n';
    return result
}

console.log(statement(invoice));