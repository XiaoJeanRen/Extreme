const fs = require("fs");
const Player_Hunt = require("../players_party_data.json");
const Player_Material = require("../players_material.json");
const MonsterData = require("../all_monster_data.json");

module.exports = {
    Random_Chance: function () {
        return Math.floor(Math.random() * 100) + 1;
    },

    add_Material_to_Player: function (playerID, MaterialName) {
        switch (MaterialName) {
            case '黏液':
                Player_Material[playerID].黏液 += 1;
                break;
            case '骨頭':
                Player_Material[playerID].骨頭 += 1;
                break;
            case '蜘蛛腿':
                Player_Material[playerID].蜘蛛腿 += 1;
                break;
            case '蜘蛛絲':
                Player_Material[playerID].蜘蛛絲 += 1;
                break;
            case '蜘蛛眼':
                Player_Material[playerID].蜘蛛眼 += 1;
                break;
            case '哥布林的耳朵':
                Player_Material[playerID].哥布林的耳朵 += 1;
                break;
            case '破碎的布料':
                Player_Material[playerID].破碎的布料 += 1;
                break;
            case '箭頭':
                Player_Material[playerID].箭頭 += 1;
                break;
            case '羽毛':
                Player_Material[playerID].羽毛 += 1;
                break;
            case '破損的劍':
                Player_Material[playerID].破損的劍 += 1;
                break;
            case '魔法粉末':
                Player_Material[playerID].魔法粉末 += 1;
                break;
            case '無法食用的牛肉':
                Player_Material[playerID].無法食用的牛肉 += 1;
                break;
            case '破碎的皮革':
                Player_Material[playerID].破碎的皮革 += 1;
                break;
            case '完整的皮革':
                Player_Material[playerID].完整的皮革 += 1;
                break;
            case '邪惡的氣息':
                Player_Material[playerID].邪惡的氣息 += 1;
                break;
            case '無法食用的豬肉':
                Player_Material[playerID].無法食用的豬肉 += 1;
                break;
            case '無法食用的雞肉':
                Player_Material[playerID].無法食用的豬肉 += 1;
                break;
            case '狼肉':
                Player_Material[playerID].狼肉 += 1;
                break;

        }

    },

    Test_Material: function (playerID, MonsterName) {
        console.log("搜刮怪物名稱：" + MonsterName)
        let all_Material = new Array(6);
        let number = 0;
        let MaterialName = "無";
        if (MonsterData[MonsterName].Monster_Drop_Material1 != "無") {
            MaterialName = MonsterData[MonsterName].Monster_Drop_Material1;
            let get_Material_Chance = this.Random_Chance();
            console.log("取得素材機率:" + MonsterData[MonsterName].Monster_Drop_Material1_Chance)
            console.log("系統機率:" + get_Material_Chance)
            if (MonsterData[MonsterName].Monster_Drop_Material1_Chance > get_Material_Chance) {
                this.add_Material_to_Player(playerID, MaterialName);
                console.log("取得素材" + MaterialName)
                all_Material[number] = MaterialName;
                number++;
            }
        }

        if (MonsterData[MonsterName].Monster_Drop_Material2 != "無") {
            MaterialName = MonsterData[MonsterName].Monster_Drop_Material2;
            let get_Material_Chance = this.Random_Chance();
            console.log("取得素材機率:" + MonsterData[MonsterName].Monster_Drop_Material2_Chance)
            console.log("系統機率:" + get_Material_Chance)
            if (MonsterData[MonsterName].Monster_Drop_Material2_Chance > get_Material_Chance) {
                this.add_Material_to_Player(playerID, MaterialName);
                console.log("取得素材" + MaterialName)
                all_Material[number] = MaterialName;
                number++;
            }
        }

        if (MonsterData[MonsterName].Monster_Drop_Material3 != "無") {
            MaterialName = MonsterData[MonsterName].Monster_Drop_Material3;
            let get_Material_Chance = this.Random_Chance();
            console.log("取得素材機率:" + MonsterData[MonsterName].Monster_Drop_Material3_Chance)
            console.log("系統機率:" + get_Material_Chance)
            if (MonsterData[MonsterName].Monster_Drop_Material3_Chance > get_Material_Chance) {
                this.add_Material_to_Player(playerID, MaterialName);
                console.log("取得素材" + MaterialName)
                all_Material[number] = MaterialName;
                number++;
            }
        }

        if (MonsterData[MonsterName].Monster_Drop_Material4 != "無") {
            MaterialName = MonsterData[MonsterName].Monster_Drop_Material4;
            let get_Material_Chance = this.Random_Chance();
            console.log("取得素材機率:" + MonsterData[MonsterName].Monster_Drop_Material4_Chance)
            console.log("系統機率:" + get_Material_Chance)
            if (MonsterData[MonsterName].Monster_Drop_Material4_Chance > get_Material_Chance) {
                this.add_Material_to_Player(playerID, MaterialName);
                console.log("取得素材" + MaterialName)
                all_Material[number] = MaterialName;
                number++;
            }
        }

        if (MonsterData[MonsterName].Monster_Drop_Material5 != "無") {
            MaterialName = MonsterData[MonsterName].Monster_Drop_Material5;
            let get_Material_Chance = this.Random_Chance();
            console.log("取得素材機率:" + MonsterData[MonsterName].Monster_Drop_Material5_Chance)
            console.log("系統機率:" + get_Material_Chance)
            if (MonsterData[MonsterName].Monster_Drop_Material5_Chance > get_Material_Chance) {
                this.add_Material_to_Player(playerID, MaterialName);
                console.log("取得素材" + MaterialName)
                all_Material[number] = MaterialName;
                number++;
            }
        }

        if (MonsterData[MonsterName].Monster_Drop_Material6 != "無") {
            MaterialName = MonsterData[MonsterName].Monster_Drop_Material6;
            let get_Material_Chance = this.Random_Chance();
            console.log("取得素材機率:" + MonsterData[MonsterName].Monster_Drop_Material6_Chance)
            console.log("系統機率:" + get_Material_Chance)
            if (MonsterData[MonsterName].Monster_Drop_Material6_Chance > get_Material_Chance) {
                this.add_Material_to_Player(playerID, MaterialName);
                console.log("取得素材" + MaterialName)
                all_Material[number] = MaterialName;
                number++;
            }
        }

        fs.writeFile("./players_material.json", JSON.stringify(Player_Material), (err) => {});
        return all_Material.join(" ");

    }
}