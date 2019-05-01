module.exports = {
    WeaponCheck: function (Player_info, Monster_info) {
        if (equip[Player_Equip_info.Weapon1].Equip_Shape == "單手劍" ||
            equip[Player_Equip_info.Weapon1].Equip_Shape == "長柄武器" ||
            equip[Player_Equip_info.Weapon1].Equip_Shape == "弓弩" ||
            equip[Player_Equip_info.Weapon1].Equip_Shape == "匕首"
        ) {
            return "刺"
        } else if (equip[Player_Equip_info.Weapon1].Equip_Shape == "巨斧" ||
            equip[Player_Equip_info.Weapon1].Equip_Shape == "單手刀" ||
            equip[Player_Equip_info.Weapon1].Equip_Shape == "單手斧"
        ) {
            return "斬"
        } else if (equip[Player_Equip_info.Weapon1].Equip_Shape == "雙手鈍器" ||
            equip[Player_Equip_info.Weapon1].Equip_Shape == "拳套" ||
            equip[Player_Equip_info.Weapon1].Equip_Shape == "單手鈍器" ||
            equip[Player_Equip_info.Weapon1].Equip_Shape == "杖"
        ) {
            return "打"
        } else {
            return "打"
        }
    }
}