module.exports = {
    lootMoney: function (number){
        switch (number) {
            case "001":
                return Math.floor(Math.random() * 20) + 10;
            case "002":
                return Math.floor(Math.random() * 50) + 20;
            default:
                break;
        }
    }
}