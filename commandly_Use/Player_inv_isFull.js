module.exports = {
    invfull: function (myinv_info, playerID) {
        if (myinv_info.inv_1.itemID != "000" &&
            myinv_info.inv_2.itemID != "000" &&
            myinv_info.inv_3.itemID != "000" &&
            myinv_info.inv_4.itemID != "000" &&
            myinv_info.inv_5.itemID != "000" &&
            myinv_info.inv_6.itemID != "000" &&
            myinv_info.inv_7.itemID != "000" &&
            myinv_info.inv_8.itemID != "000" &&
            myinv_info.inv_9.itemID != "000" &&
            myinv_info.inv_10.itemID != "000") {
            console.log(`使用者(ID: ${playerID})背包已滿.`)
            return true;
        }
    }
}