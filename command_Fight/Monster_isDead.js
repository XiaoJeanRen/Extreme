const userData = require("../players_data.json");
module.exports = {
    isMonsterDead: function (Party_Info){
        if (Party_Info.Monster_HP <= 0){
            return true
        }else{
            return false
        }
    }
}