module.exports = {
    lootMoney: function (number){
        switch (number) {
            case "1000":
                return Math.floor(Math.random() * 20) + 10;
            case "2000":
                return Math.floor(Math.random() * 50) + 20;
            default:
            return 1;
        }
    }
}