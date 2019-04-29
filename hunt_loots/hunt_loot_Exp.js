module.exports = {
    lootExp: function (number){
        switch (number) {
            case "1000":
                return Math.floor(Math.random() * 50) + 10;
            case "2000":
                return Math.floor(Math.random() * 100) + 150;
            default:
                break;
        }
    }
}