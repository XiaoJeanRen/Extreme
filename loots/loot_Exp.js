module.exports = {
    lootExp: function (number){
        switch (number) {
            case "001":
                return Math.floor(Math.random() * 50) + 10;
            case "002":
                return Math.floor(Math.random() * 100) + 150;
            default:
                break;
        }
    }
}