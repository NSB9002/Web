(function($) {

    $.su = $.su || {};
    $.su.CHAR = $.su.CHAR || {};
    /* Modified by Zhao Mengqing, $.su.CHAR.LANGUAGE仅保留EN_US元素，其他元素根据编译宏定义决定是否添加，修复未支持多国语言时，浏览器配置为其中某种语言导致WebUI加载失败的问题 */
    $.su.CHAR.LANGUAGE = {
        //        BG_BG:                        "Български",//保加利亚文
        //        CS_CZ:                        "Čeština", //捷克文
        //        DA_DK:                        "Dansk",  //丹麦
        //DE_DE: "Deutsch", //德文
        // EL_GR: "Ελληνική", //希腊语
        EN_US: "English",
        // ES_ES: "Español", //西班牙
        // ES_LA: "El español de América", //拉美西班牙
        //        FI_FI:                        "Suomi",//芬兰
        // FR_FR: "Français", //法文
        //IT_IT: "Italiano", //意大利
        //        KO_KR:                        "한국어",//韩国
        //        NL_NL:                        "Nederlands",//荷兰
        //        NO_NO:                        "Norsk",//挪威
        //PL_PL: "Polski", //波兰
        //        PT_PT:                        "Português",//葡萄牙
        // PT_BR: "Portugués", //葡萄牙（巴西）
        //        RO_RO:                        "Română",//罗马尼亚
        //RU_RU: "Русский", //俄文
        //        SK_SK:                        "Slovenskýjazyk",//
        //        SV_SE:                        "svenska",//瑞典
        // TH_TH: "ภาษาไทย", //泰国
        //TR_TR: "Türkçe"//土耳其
        //        UK_UA:                        "Українці",//乌克兰
        //        VI_VN:                        "Tiếng Việt",//越南
        //        ZH_CN:                        "简体中文",
        //        ZH_TW:                        "繁體中文"
    };
    if (INCLUDE_LANGUAGE_DE_DE) {
        $.su.CHAR.LANGUAGE.DE_DE = "Deutsch";
    }
    if (INCLUDE_LANGUAGE_IT_IT) {
        $.su.CHAR.LANGUAGE.IT_IT = "Italiano";
    }
    if (INCLUDE_LANGUAGE_PL_PL) {
        $.su.CHAR.LANGUAGE.PL_PL = "Polski";
    }
    if (INCLUDE_LANGUAGE_RU_RU) {
        $.su.CHAR.LANGUAGE.RU_RU = "Русский";
    }
    if (INCLUDE_LANGUAGE_TR_TR) {
        $.su.CHAR.LANGUAGE.TR_TR = "Türkçe";
    }
    if (INCLUDE_LANGUAGE_PT_PT) {
        $.su.CHAR.LANGUAGE.PT_PT = "Português";
    }
    if (INCLUDE_LANGUAGE_ES_ES) {
        $.su.CHAR.LANGUAGE.ES_ES = "Español";
    }

    $.su.CHAR.SUPPORT = {
        BG_BG: "http://www.tp-link.bg/Support/",
        CS_CZ: "http://www.tp-link.com/cz/Support/",
        DA_DK: "http://www.tp-link.com/dk/Support/",
        DE_DE: "http://www.tp-link.com.de/Support",
        EN_US: "http://www.tp-link.com/support/",
        ES_ES: "http://www.tp-link.com/es/Support/",
        FI_FI: "http://www.tp-link.com/fi/Support/",
        FR_FR: "http://www.tp-link.com/fr/Support/",
        IT_IT: "http://www.tp-link.com/it/Support/",
        KO_KR: "http://www.tp-link.com/kr/Support/",
        NL_NL: "http://www.tp-link.com/nl/Support/",
        NO_NO: "http://www.tp-link.com/no/Support/",
        PL_PL: "http://www.tp-link.com/pl/Support/",
        PT_PT: "http://www.tp-link.com/pt/Support/",
        RO_RO: "http://www.tp-link.com/ro/Support/",
        RU_RU: "http://www.tp-link.com/ru/Support/",
        SK_SK: "http://www.tp-link.sk/Support/",
        SV_SE: "http://www.tp-link.com/se/Support/",
        TH_TH: "http://www.tp-link.com/th/Support/",
        TR_TR: "http://www.tp-link.com/tr/Support/",
        UK_UA: "http://www.tp-link.com/uk/Support/",
        VI_VN: "http://www.tp-link.com/vn/Support/",
        ZH_CN: "http://www.tp-link.com/ch/Support/",
        ZH_TW: "http://www.tp-link.com/tw/Support/"
    };
})(jQuery);