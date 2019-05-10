const fs = require("fs");
const All_Maps_Data = require("../all_maps_data.json");
const Player_Material = require("../players_material.json");

module.exports = {
    Random_Chance: function () {
        return Math.floor(Math.random() * 100) + 1;
    },

    add_Material_to_Player: function (playerID, MaterialName) {
        switch (MaterialName) {
            case '泥土':
                Player_Material[playerID].泥土 += 1;
                break;
            case '沙子':
                Player_Material[playerID].沙子 += 1;
                break;
            case '銅礦石':
                Player_Material[playerID].銅礦石 += 1;
                break;
            case '鐵礦石':
                Player_Material[playerID].鐵礦石 += 1;
                break;
            case '金礦石':
                Player_Material[playerID].金礦石 += 1;
                break;

        }

    },

    Test_Material: function (playerID, MapsName) {
        console.log("探索地圖名稱：" + MapsName)
        let all_Material = new Array(10);
        let number = 0;
        let MaterialName = "無";
        if (All_Maps_Data[MapsName].Maps_Drop_Material1 != "無") {
            MaterialName = All_Maps_Data[MapsName].Maps_Drop_Material1;
            let get_Material_Chance = this.Random_Chance();
            console.log("取得素材機率:" + All_Maps_Data[MapsName].Maps_Drop_Material1_Chance)
            console.log("系統機率:" + get_Material_Chance)
            if (All_Maps_Data[MapsName].Maps_Drop_Material1_Chance > get_Material_Chance) {
                this.add_Material_to_Player(playerID, MaterialName);
                console.log("取得素材" + MaterialName)
                all_Material[number] = MaterialName;
                number++;
            }
        }

        if (All_Maps_Data[MapsName].Maps_Drop_Material2 != "無") {
            MaterialName = All_Maps_Data[MapsName].Maps_Drop_Material2;
            let get_Material_Chance = this.Random_Chance();
            console.log("取得素材機率:" + All_Maps_Data[MapsName].Maps_Drop_Material2_Chance)
            console.log("系統機率:" + get_Material_Chance)
            if (All_Maps_Data[MapsName].Maps_Drop_Material2_Chance > get_Material_Chance) {
                this.add_Material_to_Player(playerID, MaterialName);
                console.log("取得素材" + MaterialName)
                all_Material[number] = MaterialName;
                number++;
            }
        }

        if (All_Maps_Data[MapsName].Maps_Drop_Material3 != "無") {
            MaterialName = All_Maps_Data[MapsName].Maps_Drop_Material3;
            let get_Material_Chance = this.Random_Chance();
            console.log("取得素材機率:" + All_Maps_Data[MapsName].Maps_Drop_Material3_Chance)
            console.log("系統機率:" + get_Material_Chance)
            if (All_Maps_Data[MapsName].Maps_Drop_Material3_Chance > get_Material_Chance) {
                this.add_Material_to_Player(playerID, MaterialName);
                console.log("取得素材" + MaterialName)
                all_Material[number] = MaterialName;
                number++;
            }
        }

        if (All_Maps_Data[MapsName].Maps_Drop_Material4 != "無") {
            MaterialName = All_Maps_Data[MapsName].Maps_Drop_Material4;
            let get_Material_Chance = this.Random_Chance();
            console.log("取得素材機率:" + All_Maps_Data[MapsName].Maps_Drop_Material4_Chance)
            console.log("系統機率:" + get_Material_Chance)
            if (All_Maps_Data[MapsName].Maps_Drop_Material4_Chance > get_Material_Chance) {
                this.add_Material_to_Player(playerID, MaterialName);
                console.log("取得素材" + MaterialName)
                all_Material[number] = MaterialName;
                number++;
            }
        }

        if (All_Maps_Data[MapsName].Maps_Drop_Material5 != "無") {
            MaterialName = All_Maps_Data[MapsName].Maps_Drop_Material5;
            let get_Material_Chance = this.Random_Chance();
            console.log("取得素材機率:" + All_Maps_Data[MapsName].Maps_Drop_Material5_Chance)
            console.log("系統機率:" + get_Material_Chance)
            if (All_Maps_Data[MapsName].Maps_Drop_Material5_Chance > get_Material_Chance) {
                this.add_Material_to_Player(playerID, MaterialName);
                console.log("取得素材" + MaterialName)
                all_Material[number] = MaterialName;
                number++;
            }
        }

        if (All_Maps_Data[MapsName].Maps_Drop_Material6 != "無") {
            MaterialName = All_Maps_Data[MapsName].Maps_Drop_Material6;
            let get_Material_Chance = this.Random_Chance();
            console.log("取得素材機率:" + All_Maps_Data[MapsName].Maps_Drop_Material6_Chance)
            console.log("系統機率:" + get_Material_Chance)
            if (All_Maps_Data[MapsName].Maps_Drop_Material6_Chance > get_Material_Chance) {
                this.add_Material_to_Player(playerID, MaterialName);
                console.log("取得素材" + MaterialName)
                all_Material[number] = MaterialName;
                number++;
            }
        }

        if (All_Maps_Data[MapsName].Maps_Drop_Material7 != "無") {
            MaterialName = All_Maps_Data[MapsName].Maps_Drop_Material7;
            let get_Material_Chance = this.Random_Chance();
            console.log("取得素材機率:" + All_Maps_Data[MapsName].Maps_Drop_Material7_Chance)
            console.log("系統機率:" + get_Material_Chance)
            if (All_Maps_Data[MapsName].Maps_Drop_Material7_Chance > get_Material_Chance) {
                this.add_Material_to_Player(playerID, MaterialName);
                console.log("取得素材" + MaterialName)
                all_Material[number] = MaterialName;
                number++;
            }
        }

        if (All_Maps_Data[MapsName].Maps_Drop_Material8 != "無") {
            MaterialName = All_Maps_Data[MapsName].Maps_Drop_Material8;
            let get_Material_Chance = this.Random_Chance();
            console.log("取得素材機率:" + All_Maps_Data[MapsName].Maps_Drop_Material8_Chance)
            console.log("系統機率:" + get_Material_Chance)
            if (All_Maps_Data[MapsName].Maps_Drop_Material8_Chance > get_Material_Chance) {
                this.add_Material_to_Player(playerID, MaterialName);
                console.log("取得素材" + MaterialName)
                all_Material[number] = MaterialName;
                number++;
            }
        }

        if (All_Maps_Data[MapsName].Maps_Drop_Material9 != "無") {
            MaterialName = All_Maps_Data[MapsName].Maps_Drop_Material9;
            let get_Material_Chance = this.Random_Chance();
            console.log("取得素材機率:" + All_Maps_Data[MapsName].Maps_Drop_Material9_Chance)
            console.log("系統機率:" + get_Material_Chance)
            if (All_Maps_Data[MapsName].Maps_Drop_Material9_Chance > get_Material_Chance) {
                this.add_Material_to_Player(playerID, MaterialName);
                console.log("取得素材" + MaterialName)
                all_Material[number] = MaterialName;
                number++;
            }
        }

        if (All_Maps_Data[MapsName].Maps_Drop_Material10 != "無") {
            MaterialName = All_Maps_Data[MapsName].Maps_Drop_Material10;
            let get_Material_Chance = this.Random_Chance();
            console.log("取得素材機率:" + All_Maps_Data[MapsName].Maps_Drop_Material10_Chance)
            console.log("系統機率:" + get_Material_Chance)
            if (All_Maps_Data[MapsName].Maps_Drop_Material10_Chance > get_Material_Chance) {
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