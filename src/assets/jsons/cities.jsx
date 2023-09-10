const cities = [
    {
        id: 1,
        name: "آباده",
        province_id: 1,
    },
    {
        id: 2,
        name: "آباده طشک",
        province_id: 1,
    },
    {
        id: 3,
        name: "آباده،ايزدخواست،بهمن،صغاد",
        province_id: 1,
    },
    {
        id: 4,
        name: "اردکان(سپيدان)",
        province_id: 1,
    },
    {
        id: 5,
        name: "ارسنجان",
        province_id: 1,
    },
    {
        id: 6,
        name: "استهبان",
        province_id: 1,
    },
    {
        id: 7,
        name: "استهبان،رونيز",
        province_id: 1,
    },
    {
        id: 8,
        name: "اشکنان",
        province_id: 1,
    },
    {
        id: 9,
        name: "افزر",
        province_id: 1,
    },
    {
        id: 10,
        name: "اقليد",
        province_id: 1,
    },
    {
        id: 11,
        name: "اقليد،سده",
        province_id: 1,
    },
    {
        id: 12,
        name: "اوز",
        province_id: 1,
    },
    {
        id: 13,
        name: "اهل",
        province_id: 1,
    },
    {
        id: 14,
        name: "ايج",
        province_id: 1,
    },
    {
        id: 15,
        name: "ايزد خواست",
        province_id: 1,
    },
    {
        id: 16,
        name: "باب انار",
        province_id: 1,
    },
    {
        id: 17,
        name: "بالاده",
        province_id: 1,
    },
    {
        id: 18,
        name: "بنارويه",
        province_id: 1,
    },
    {
        id: 19,
        name: "بوانات",
        province_id: 1,
    },
    {
        id: 20,
        name: "بوانات(سوريان)،کره ای",
        province_id: 1,
    },
    {
        id: 21,
        name: "بهمن",
        province_id: 1,
    },
    {
        id: 22,
        name: "بيرم",
        province_id: 1,
    },
    {
        id: 23,
        name: "بيضا",
        province_id: 1,
    },
    {
        id: 24,
        name: "جنت شهر",
        province_id: 1,
    },
    {
        id: 25,
        name: "جويم",
        province_id: 1,
    },
    {
        id: 26,
        name: "جهرم",
        province_id: 1,
    },
    {
        id: 27,
        name: "جهرم،باب انار،خاوران،قطب آباد",
        province_id: 1,
    },
    {
        id: 28,
        name: "حاجی آباد(زرين دشت)",
        province_id: 1,
    },
    {
        id: 29,
        name: "خاوران",
        province_id: 1,
    },
    {
        id: 30,
        name: "خرام",
        province_id: 1,
    },
    {
        id: 31,
        name: "خرامه",
        province_id: 1,
    },
    {
        id: 32,
        name: "خرم بيد",
        province_id: 1,
    },
    {
        id: 33,
        name: "خشت",
        province_id: 1,
    },
    {
        id: 34,
        name: "خنج",
        province_id: 1,
    },
    {
        id: 35,
        name: "خور",
        province_id: 1,
    },
    {
        id: 36,
        name: "داراب",
        province_id: 1,
    },
    {
        id: 37,
        name: "داراب،جنت شهر",
        province_id: 1,
    },
    {
        id: 38,
        name: "داريان",
        province_id: 1,
    },
    {
        id: 39,
        name: "دبيران",
        province_id: 1,
    },
    {
        id: 40,
        name: "رونيز",
        province_id: 1,
    },
    {
        id: 41,
        name: "زاهد شهر",
        province_id: 1,
    },
    {
        id: 42,
        name: "زرقان",
        province_id: 1,
    },
    {
        id: 43,
        name: "زرين دشت،حاجی آباد",
        province_id: 1,
    },
    {
        id: 44,
        name: "سپيدان،اردکان،بيضا",
        province_id: 1,
    },
    {
        id: 45,
        name: "سده",
        province_id: 1,
    },
    {
        id: 46,
        name: "سروستان",
        province_id: 1,
    },
    {
        id: 47,
        name: "سعادت شهر",
        province_id: 1,
    },
    {
        id: 48,
        name: "سورمق",
        province_id: 1,
    },
    {
        id: 49,
        name: "سيدان",
        province_id: 1,
    },
    {
        id: 50,
        name: "ششده",
        province_id: 1,
    },
    {
        id: 51,
        name: "شهرپير",
        province_id: 1,
    },
    {
        id: 52,
        name: "شيراز",
        province_id: 1,
    },
    {
        id: 53,
        name: "شيراز،داريان،زرقان،لپوئی،کوار",
        province_id: 1,
    },
    {
        id: 54,
        name: "صغاد",
        province_id: 1,
    },
    {
        id: 55,
        name: "صفاشهر",
        province_id: 1,
    },
    {
        id: 56,
        name: "صفاشهر،قادرآباد",
        province_id: 1,
    },
    {
        id: 57,
        name: "علامرودشت",
        province_id: 1,
    },
    {
        id: 58,
        name: "فتح آباد",
        province_id: 1,
    },
    {
        id: 59,
        name: "فراشبند",
        province_id: 1,
    },
    {
        id: 60,
        name: "فسا",
        province_id: 1,
    },
    {
        id: 61,
        name: "فسا،ششده،زاهد شهر",
        province_id: 1,
    },
    {
        id: 62,
        name: "فيروزآباد",
        province_id: 1,
    },
    {
        id: 63,
        name: "فيروزآباد،فراشبند،ميمند",
        province_id: 1,
    },
    {
        id: 64,
        name: "قادرآباد",
        province_id: 1,
    },
    {
        id: 65,
        name: "قانميه",
        province_id: 1,
    },
    {
        id: 66,
        name: "قطب آباد",
        province_id: 1,
    },
    {
        id: 67,
        name: "قيروکارزين",
        province_id: 1,
    },
    {
        id: 68,
        name: "قيروکارزين،فتح آباد",
        province_id: 1,
    },
    {
        id: 69,
        name: "کازرون",
        province_id: 1,
    },
    {
        id: 70,
        name: "کازرون،قائميه،بالاده،خشت،نودان",
        province_id: 1,
    },
    {
        id: 71,
        name: "کامفيروز",
        province_id: 1,
    },
    {
        id: 72,
        name: "کره ای",
        province_id: 1,
    },
    {
        id: 73,
        name: "کنارتخته",
        province_id: 1,
    },
    {
        id: 74,
        name: "کوار",
        province_id: 1,
    },
    {
        id: 75,
        name: "گراش",
        province_id: 1,
    },
    {
        id: 76,
        name: "گله دار",
        province_id: 1,
    },
    {
        id: 77,
        name: "لار",
        province_id: 1,
    },
    {
        id: 78,
        name: "لار،لارستان،بيرم،جويم،بنارويه",
        province_id: 1,
    },
    {
        id: 79,
        name: "لارستان",
        province_id: 1,
    },
    {
        id: 159,
        name: "محی آباد",
        province_id: 2,
    },
    {
        id: 160,
        name: "مردهک",
        province_id: 2,
    },
    {
        id: 161,
        name: "مس سرچشمه",
        province_id: 2,
    },
    {
        id: 162,
        name: "منوجان",
        province_id: 2,
    },
    {
        id: 164,
        name: "نجف شهر",
        province_id: 2,
    },
    {
        id: 165,
        name: "نرمانشير(رستم اباد)",
        province_id: 2,
    },
    {
        id: 166,
        name: "نظام شهر",
        province_id: 2,
    },
    {
        id: 167,
        name: "نگار",
        province_id: 2,
    },
    {
        id: 168,
        name: "نودژ",
        province_id: 2,
    },
    {
        id: 169,
        name: "نوق",
        province_id: 2,
    },
    {
        id: 170,
        name: "هجدک",
        province_id: 2,
    },
    {
        id: 171,
        name: "يزدان شهر",
        province_id: 2,
    },
    {
        id: 172,
        name: "ابوموسی",
        province_id: 3,
    },
    {
        id: 173,
        name: "بستک",
        province_id: 3,
    },
    {
        id: 174,
        name: "بندرجاسک",
        province_id: 3,
    },
    {
        id: 175,
        name: "بندرجاسک",
        province_id: 3,
    },
    {
        id: 176,
        name: "بندرچارک",
        province_id: 3,
    },
    {
        id: 177,
        name: "بندرخمير",
        province_id: 3,
    },
    {
        id: 178,
        name: "بندرعباس",
        province_id: 3,
    },
    {
        id: 179,
        name: "بندرعباس،فين",
        province_id: 3,
    },
    {
        id: 180,
        name: "بندرلنگه",
        province_id: 3,
    },
    {
        id: 181,
        name: "بندرلنگه،کنگ،بندرچارک،کيش،....",
        province_id: 3,
    },
    {
        id: 182,
        name: "پارسيان",
        province_id: 3,
    },
    {
        id: 183,
        name: "جناح",
        province_id: 3,
    },
    {
        id: 184,
        name: "حاجی آباد",
        province_id: 3,
    },
    {
        id: 185,
        name: "خمير",
        province_id: 3,
    },
    {
        id: 186,
        name: "درگهان",
        province_id: 3,
    },
    {
        id: 187,
        name: "دهبارز",
        province_id: 3,
    },
    {
        id: 188,
        name: "رودان",
        province_id: 3,
    },
    {
        id: 189,
        name: "رودان،دهباز",
        province_id: 3,
    },
    {
        id: 190,
        name: "زيارتعلی",
        province_id: 3,
    },
    {
        id: 191,
        name: "سوزا",
        province_id: 3,
    },
    {
        id: 192,
        name: "سيريک",
        province_id: 3,
    },
    {
        id: 193,
        name: "فارغان",
        province_id: 3,
    },
    {
        id: 194,
        name: "فين",
        province_id: 3,
    },
    {
        id: 195,
        name: "قشم",
        province_id: 3,
    },
    {
        id: 196,
        name: "قشم،سوزا،هرمز",
        province_id: 3,
    },
    {
        id: 197,
        name: "کنگ",
        province_id: 3,
    },
    {
        id: 198,
        name: "کيش",
        province_id: 3,
    },
    {
        id: 199,
        name: "لردگان",
        province_id: 3,
    },
    {
        id: 200,
        name: "ميناب",
        province_id: 3,
    },
    {
        id: 202,
        name: "هرمز",
        province_id: 3,
    },
    {
        id: 203,
        name: "ازنا",
        province_id: 4,
    },
    {
        id: 204,
        name: "ازنا،مومن آباد",
        province_id: 4,
    },
    {
        id: 205,
        name: "اشترينان",
        province_id: 4,
    },
    {
        id: 206,
        name: "الشتر",
        province_id: 4,
    },
    {
        id: 207,
        name: "الشتر(سلسله)،فيروزآباد",
        province_id: 4,
    },
    {
        id: 208,
        name: "اليگودرز",
        province_id: 4,
    },
    {
        id: 209,
        name: "بروجرد",
        province_id: 4,
    },
    {
        id: 210,
        name: "بروجرد،اشترينان",
        province_id: 4,
    },
    {
        id: 211,
        name: "پلدختر",
        province_id: 4,
    },
    {
        id: 212,
        name: "پلدختر،معمولان",
        province_id: 4,
    },
    {
        id: 213,
        name: "چالانچولان",
        province_id: 4,
    },
    {
        id: 214,
        name: "چغلوندی",
        province_id: 4,
    },
    {
        id: 215,
        name: "چقابل",
        province_id: 4,
    },
    {
        id: 216,
        name: "خرم آباد",
        province_id: 4,
    },
    {
        id: 217,
        name: "خرم آباد،سپيددشت،چغلوندی،.....",
        province_id: 4,
    },
    {
        id: 218,
        name: "درب گنبد",
        province_id: 4,
    },
    {
        id: 219,
        name: "دلقان(نورآباد)",
        province_id: 4,
    },
    {
        id: 220,
        name: "دورود",
        province_id: 4,
    },
    {
        id: 221,
        name: "دورود،چالانچولان",
        province_id: 4,
    },
    {
        id: 222,
        name: "زاغه",
        province_id: 4,
    },
    {
        id: 223,
        name: "سپيددشت",
        province_id: 4,
    },
    {
        id: 224,
        name: "سراب دوره",
        province_id: 4,
    },
    {
        id: 225,
        name: "فيروز آباد",
        province_id: 4,
    },
    {
        id: 226,
        name: "کونانی",
        province_id: 4,
    },
    {
        id: 227,
        name: "کوه دشت،چقابل،گراب،کونانی",
        province_id: 4,
    },
    {
        id: 228,
        name: "کوهدشت",
        province_id: 4,
    },
    {
        id: 229,
        name: "گراب",
        province_id: 4,
    },
    {
        id: 230,
        name: "محمودوند",
        province_id: 4,
    },
    {
        id: 231,
        name: "معمولان",
        province_id: 4,
    },
    {
        id: 232,
        name: "مومن آباد",
        province_id: 4,
    },
    {
        id: 234,
        name: "نورآباد",
        province_id: 4,
    },
    {
        id: 235,
        name: "آبادان",
        province_id: 5,
    },
    {
        id: 236,
        name: "آغاجاری",
        province_id: 5,
    },
    {
        id: 237,
        name: "اروند کنار",
        province_id: 5,
    },
    {
        id: 238,
        name: "الوان",
        province_id: 5,
    },
    {
        id: 239,
        name: "اميديه",
        province_id: 5,
    },
    {
        id: 321,
        name: "گيوي(کوثر)",
        province_id: 6,
    },
    {
        id: 322,
        name: "لاهرود",
        province_id: 6,
    },
    {
        id: 323,
        name: "مشکين شهر",
        province_id: 6,
    },
    {
        id: 324,
        name: "مشکين شهر،رضی،لاهرود",
        province_id: 6,
    },
    {
        id: 326,
        name: "نمين",
        province_id: 6,
    },
    {
        id: 327,
        name: "نمين،آبی بيگلو،عنبران",
        province_id: 6,
    },
    {
        id: 328,
        name: "نير",
        province_id: 6,
    },
    {
        id: 329,
        name: "هشتجين",
        province_id: 6,
    },
    {
        id: 330,
        name: "هير",
        province_id: 6,
    },
    {
        id: 331,
        name: "احمد آباد",
        province_id: 7,
    },
    {
        id: 332,
        name: "اسجيل",
        province_id: 7,
    },
    {
        id: 333,
        name: "انابد",
        province_id: 7,
    },
    {
        id: 334,
        name: "باجگيران",
        province_id: 7,
    },
    {
        id: 335,
        name: "باخرز",
        province_id: 7,
    },
    {
        id: 336,
        name: "بايک",
        province_id: 7,
    },
    {
        id: 337,
        name: "بجستان",
        province_id: 7,
    },
    {
        id: 338,
        name: "بردسکن",
        province_id: 7,
    },
    {
        id: 339,
        name: "بيدخت",
        province_id: 7,
    },
    {
        id: 340,
        name: "تايباد",
        province_id: 7,
    },
    {
        id: 341,
        name: "تربت جام",
        province_id: 7,
    },
    {
        id: 342,
        name: "تربت حيدريه",
        province_id: 7,
    },
    {
        id: 343,
        name: "جغتای",
        province_id: 7,
    },
    {
        id: 344,
        name: "جنگل",
        province_id: 7,
    },
    {
        id: 345,
        name: "چاپشلو",
        province_id: 7,
    },
    {
        id: 346,
        name: "چشمه گيلاس",
        province_id: 7,
    },
    {
        id: 347,
        name: "چکنه",
        province_id: 7,
    },
    {
        id: 348,
        name: "چناران",
        province_id: 7,
    },
    {
        id: 349,
        name: "خرو",
        province_id: 7,
    },
    {
        id: 350,
        name: "خليل اباد",
        province_id: 7,
    },
    {
        id: 351,
        name: "خواف",
        province_id: 7,
    },
    {
        id: 352,
        name: "خير آباد تربت جام",
        province_id: 7,
    },
    {
        id: 353,
        name: "خير آباد سبزوار",
        province_id: 7,
    },
    {
        id: 354,
        name: "داورزان",
        province_id: 7,
    },
    {
        id: 355,
        name: "درگز",
        province_id: 7,
    },
    {
        id: 356,
        name: "درود",
        province_id: 7,
    },
    {
        id: 357,
        name: "دولت آباد",
        province_id: 7,
    },
    {
        id: 358,
        name: "دولت اباد",
        province_id: 7,
    },
    {
        id: 359,
        name: "رباط سنگ",
        province_id: 7,
    },
    {
        id: 360,
        name: "رشتخوار",
        province_id: 7,
    },
    {
        id: 361,
        name: "رضويه",
        province_id: 7,
    },
    {
        id: 362,
        name: "روداب",
        province_id: 7,
    },
    {
        id: 363,
        name: "ريوش",
        province_id: 7,
    },
    {
        id: 364,
        name: "سبزوار",
        province_id: 7,
    },
    {
        id: 365,
        name: "سرآسياب",
        province_id: 7,
    },
    {
        id: 366,
        name: "سرخس",
        province_id: 7,
    },
    {
        id: 367,
        name: "سفيد سنگ",
        province_id: 7,
    },
    {
        id: 368,
        name: "سلامی",
        province_id: 7,
    },
    {
        id: 369,
        name: "سلطان اباد",
        province_id: 7,
    },
    {
        id: 370,
        name: "سلوگرد (محسن آباد)",
        province_id: 7,
    },
    {
        id: 371,
        name: "سنگان",
        province_id: 7,
    },
    {
        id: 372,
        name: "شانديز",
        province_id: 7,
    },
    {
        id: 373,
        name: "ششتمد",
        province_id: 7,
    },
    {
        id: 374,
        name: "شهرزو",
        province_id: 7,
    },
    {
        id: 375,
        name: "صالح اباد",
        province_id: 7,
    },
    {
        id: 376,
        name: "طرقبه",
        province_id: 7,
    },
    {
        id: 377,
        name: "عشق آباد مشهد",
        province_id: 7,
    },
    {
        id: 378,
        name: "عشق آباد نيشابور",
        province_id: 7,
    },
    {
        id: 379,
        name: "فرهادگرد",
        province_id: 7,
    },
    {
        id: 380,
        name: "فريزی",
        province_id: 7,
    },
    {
        id: 381,
        name: "فريمان",
        province_id: 7,
    },
    {
        id: 382,
        name: "فيروزه",
        province_id: 7,
    },
    {
        id: 383,
        name: "فيض اباد",
        province_id: 7,
    },
    {
        id: 384,
        name: "قاسم اباد",
        province_id: 7,
    },
    {
        id: 385,
        name: "قدمگاه",
        province_id: 7,
    },
    {
        id: 386,
        name: "قره جنگل",
        province_id: 7,
    },
    {
        id: 387,
        name: "قلندراباد",
        province_id: 7,
    },
    {
        id: 388,
        name: "قوچان",
        province_id: 7,
    },
    {
        id: 389,
        name: "کاخک",
        province_id: 7,
    },
    {
        id: 390,
        name: "کاريز",
        province_id: 7,
    },
    {
        id: 391,
        name: "کاريزک ناگهانی",
        province_id: 7,
    },
    {
        id: 392,
        name: "کاشمر",
        province_id: 7,
    },
    {
        id: 393,
        name: "کاهو",
        province_id: 7,
    },
    {
        id: 394,
        name: "کدکن",
        province_id: 7,
    },
    {
        id: 395,
        name: "کلات",
        province_id: 7,
    },
    {
        id: 396,
        name: "کلات نادری",
        province_id: 7,
    },
    {
        id: 397,
        name: "کلاته پايه",
        province_id: 7,
    },
    {
        id: 398,
        name: "کندر",
        province_id: 7,
    },
    {
        id: 399,
        name: "گاوطرنا",
        province_id: 7,
    },
    {
        id: 400,
        name: "گلبهار",
        province_id: 7,
    },
    {
        id: 401,
        name: "گلمکان",
        province_id: 7,
    },
    {
        id: 402,
        name: "گناباد",
        province_id: 7,
    },
    {
        id: 403,
        name: "لطف اباد",
        province_id: 7,
    },
    {
        id: 404,
        name: "محولات (فيض آباد)",
        province_id: 7,
    },
    {
        id: 488,
        name: "شاهين دژ",
        province_id: 9,
    },
    {
        id: 489,
        name: "شاهين دژ،کشاورز",
        province_id: 9,
    },
    {
        id: 490,
        name: "شوط",
        province_id: 9,
    },
    {
        id: 491,
        name: "فيرورق",
        province_id: 9,
    },
    {
        id: 492,
        name: "قره ضياالدين",
        province_id: 9,
    },
    {
        id: 493,
        name: "قره ضياءالدين",
        province_id: 9,
    },
    {
        id: 494,
        name: "قوشچی",
        province_id: 9,
    },
    {
        id: 495,
        name: "کشاورز",
        province_id: 9,
    },
    {
        id: 496,
        name: "گردکشانه",
        province_id: 9,
    },
    {
        id: 497,
        name: "ماکو",
        province_id: 9,
    },
    {
        id: 498,
        name: "ماکو",
        province_id: 9,
    },
    {
        id: 499,
        name: "محمديار",
        province_id: 9,
    },
    {
        id: 500,
        name: "محموداباد",
        province_id: 9,
    },
    {
        id: 501,
        name: "مهاباد",
        province_id: 9,
    },
    {
        id: 502,
        name: "مياندوآب،چهاربرج",
        province_id: 9,
    },
    {
        id: 503,
        name: "مياندواب",
        province_id: 9,
    },
    {
        id: 504,
        name: "ميرآباد",
        province_id: 9,
    },
    {
        id: 505,
        name: "نالوس",
        province_id: 9,
    },
    {
        id: 507,
        name: "نقده",
        province_id: 9,
    },
    {
        id: 508,
        name: "نوشين",
        province_id: 9,
    },
    {
        id: 509,
        name: "ازندريان",
        province_id: 10,
    },
    {
        id: 510,
        name: "اسدآباد",
        province_id: 10,
    },
    {
        id: 511,
        name: "اسدآباد(ابسرد)",
        province_id: 10,
    },
    {
        id: 512,
        name: "برزول",
        province_id: 10,
    },
    {
        id: 513,
        name: "بهار",
        province_id: 10,
    },
    {
        id: 514,
        name: "بهار،صالح آباد،لالجين",
        province_id: 10,
    },
    {
        id: 515,
        name: "تويسرکان",
        province_id: 10,
    },
    {
        id: 516,
        name: "تويسرکان،سرکان،فرسفنج",
        province_id: 10,
    },
    {
        id: 517,
        name: "جورقان",
        province_id: 10,
    },
    {
        id: 518,
        name: "جوکار",
        province_id: 10,
    },
    {
        id: 519,
        name: "دمق",
        province_id: 10,
    },
    {
        id: 520,
        name: "رزن",
        province_id: 10,
    },
    {
        id: 521,
        name: "رزن،دمق،قروه درجزين",
        province_id: 10,
    },
    {
        id: 522,
        name: "زنگنه",
        province_id: 10,
    },
    {
        id: 523,
        name: "سامن",
        province_id: 10,
    },
    {
        id: 524,
        name: "سرکان",
        province_id: 10,
    },
    {
        id: 525,
        name: "شيرين سو",
        province_id: 10,
    },
    {
        id: 526,
        name: "صالح آباد",
        province_id: 10,
    },
    {
        id: 527,
        name: "فامنين",
        province_id: 10,
    },
    {
        id: 528,
        name: "فرسنج",
        province_id: 10,
    },
    {
        id: 529,
        name: "فيروزان",
        province_id: 10,
    },
    {
        id: 530,
        name: "قروه درجزين",
        province_id: 10,
    },
    {
        id: 531,
        name: "قهاوند",
        province_id: 10,
    },
    {
        id: 532,
        name: "کبودرآهنگ",
        province_id: 10,
    },
    {
        id: 533,
        name: "کبودرآهنگ،شيريرن سو،گل تپه",
        province_id: 10,
    },
    {
        id: 534,
        name: "گل تپه",
        province_id: 10,
    },
    {
        id: 535,
        name: "گيان",
        province_id: 10,
    },
    {
        id: 536,
        name: "لالجين",
        province_id: 10,
    },
    {
        id: 537,
        name: "مريانج",
        province_id: 10,
    },
    {
        id: 538,
        name: "ملاير",
        province_id: 10,
    },
    {
        id: 539,
        name: "ملاير،ازندريان،جوکار،سامن",
        province_id: 10,
    },
    {
        id: 541,
        name: "نهاوند",
        province_id: 10,
    },
    {
        id: 542,
        name: "نهاوند،فيروزان",
        province_id: 10,
    },
    {
        id: 543,
        name: "همدان",
        province_id: 10,
    },
    {
        id: 544,
        name: "همدان،جورقان،مريانج،قهاوند،...",
        province_id: 10,
    },
    {
        id: 545,
        name: "ارمرده",
        province_id: 11,
    },
    {
        id: 546,
        name: "بابارشانی",
        province_id: 11,
    },
    {
        id: 547,
        name: "بانه",
        province_id: 11,
    },
    {
        id: 548,
        name: "بانه،آرمرده،کانی سور،بوئين سفل",
        province_id: 11,
    },
    {
        id: 549,
        name: "بوئين سفلی",
        province_id: 11,
    },
    {
        id: 550,
        name: "بيجار",
        province_id: 11,
    },
    {
        id: 551,
        name: "بيجار،بابارشانی،ياسوکند",
        province_id: 11,
    },
    {
        id: 552,
        name: "چناره",
        province_id: 11,
    },
    {
        id: 553,
        name: "دلبران",
        province_id: 11,
    },
    {
        id: 554,
        name: "دهگلادن",
        province_id: 11,
    },
    {
        id: 555,
        name: "دهگلان",
        province_id: 11,
    },
    {
        id: 556,
        name: "ديزج",
        province_id: 11,
    },
    {
        id: 557,
        name: "ديواندره",
        province_id: 11,
    },
    {
        id: 558,
        name: "ديواندره،زرينه",
        province_id: 11,
    },
    {
        id: 559,
        name: "زرينه",
        province_id: 11,
    },
    {
        id: 560,
        name: "سروآباد",
        province_id: 11,
    },
    {
        id: 561,
        name: "سريش آباد",
        province_id: 11,
    },
    {
        id: 562,
        name: "سقز",
        province_id: 11,
    },
    {
        id: 563,
        name: "سقز،صاحب",
        province_id: 11,
    },
    {
        id: 564,
        name: "سنندج",
        province_id: 11,
    },
    {
        id: 565,
        name: "سنندج،شويشه",
        province_id: 11,
    },
    {
        id: 566,
        name: "شويشه",
        province_id: 11,
    },
    {
        id: 567,
        name: "صاحب",
        province_id: 11,
    },
    {
        id: 649,
        name: "رزوه",
        province_id: 13,
    },
    {
        id: 650,
        name: "رضوان شهر",
        province_id: 13,
    },
    {
        id: 651,
        name: "رهنان",
        province_id: 13,
    },
    {
        id: 652,
        name: "زاينده رود",
        province_id: 13,
    },
    {
        id: 653,
        name: "زرين شهر",
        province_id: 13,
    },
    {
        id: 654,
        name: "زرين شهر(لنجان)،چمگردان،......",
        province_id: 13,
    },
    {
        id: 655,
        name: "زواره",
        province_id: 13,
    },
    {
        id: 656,
        name: "زيباشهر",
        province_id: 13,
    },
    {
        id: 657,
        name: "سپاهان شهر",
        province_id: 13,
    },
    {
        id: 658,
        name: "سده لنجان",
        province_id: 13,
    },
    {
        id: 659,
        name: "سفيدشهر",
        province_id: 13,
    },
    {
        id: 660,
        name: "سگزی",
        province_id: 13,
    },
    {
        id: 661,
        name: "سميرم",
        province_id: 13,
    },
    {
        id: 662,
        name: "سميرم،حنا،ونک،کمه",
        province_id: 13,
    },
    {
        id: 663,
        name: "شاهين شهر",
        province_id: 13,
    },
    {
        id: 664,
        name: "شهررضا،منظريه",
        province_id: 13,
    },
    {
        id: 665,
        name: "شهرضا",
        province_id: 13,
    },
    {
        id: 666,
        name: "طالخونه",
        province_id: 13,
    },
    {
        id: 667,
        name: "عسگران",
        province_id: 13,
    },
    {
        id: 668,
        name: "علويچه",
        province_id: 13,
    },
    {
        id: 669,
        name: "فريدن",
        province_id: 13,
    },
    {
        id: 670,
        name: "فريدن(داران)،دامنه،افوس،بوئين.",
        province_id: 13,
    },
    {
        id: 671,
        name: "فريدون شهر",
        province_id: 13,
    },
    {
        id: 672,
        name: "فريدونشهر",
        province_id: 13,
    },
    {
        id: 673,
        name: "فلاورجان",
        province_id: 13,
    },
    {
        id: 674,
        name: "فلاورجان،ابريشم،قهدريجان،.....",
        province_id: 13,
    },
    {
        id: 675,
        name: "فولادشهر",
        province_id: 13,
    },
    {
        id: 676,
        name: "قمصر",
        province_id: 13,
    },
    {
        id: 677,
        name: "قهدريجان",
        province_id: 13,
    },
    {
        id: 678,
        name: "کاشان",
        province_id: 13,
    },
    {
        id: 679,
        name: "کاشان،نياسر،قمصر،جوشقانوک .",
        province_id: 13,
    },
    {
        id: 680,
        name: "کرکوند",
        province_id: 13,
    },
    {
        id: 681,
        name: "کليشاد",
        province_id: 13,
    },
    {
        id: 682,
        name: "کليشادوسورجان",
        province_id: 13,
    },
    {
        id: 683,
        name: "کمشجه",
        province_id: 13,
    },
    {
        id: 684,
        name: "کمه",
        province_id: 13,
    },
    {
        id: 685,
        name: "کوشک",
        province_id: 13,
    },
    {
        id: 686,
        name: "کوهپايه",
        province_id: 13,
    },
    {
        id: 687,
        name: "کهريزسنگ",
        province_id: 13,
    },
    {
        id: 688,
        name: "گز",
        province_id: 13,
    },
    {
        id: 689,
        name: "گلپايگان",
        province_id: 13,
    },
    {
        id: 690,
        name: "گلپايگان،گوگد،گلشهر",
        province_id: 13,
    },
    {
        id: 691,
        name: "گلدشت",
        province_id: 13,
    },
    {
        id: 692,
        name: "گلشهر",
        province_id: 13,
    },
    {
        id: 693,
        name: "گوگد",
        province_id: 13,
    },
    {
        id: 694,
        name: "مبارکه",
        province_id: 13,
    },
    {
        id: 695,
        name: "مبارکه،ديزيچه،طالخونچه،کرکوند",
        province_id: 13,
    },
    {
        id: 696,
        name: "مجلسی",
        province_id: 13,
    },
    {
        id: 697,
        name: "محمدآباد",
        province_id: 13,
    },
    {
        id: 698,
        name: "مشکات",
        province_id: 13,
    },
    {
        id: 699,
        name: "منظريه",
        province_id: 13,
    },
    {
        id: 700,
        name: "مورچه خورت",
        province_id: 13,
    },
    {
        id: 701,
        name: "مهاباد",
        province_id: 13,
    },
    {
        id: 702,
        name: "ميمه",
        province_id: 13,
    },
    {
        id: 703,
        name: "ميمه،حبيب آباد،دولت آباد،وزوان",
        province_id: 13,
    },
    {
        id: 704,
        name: "نائين",
        province_id: 13,

    },
    {
        id: 705,
        name: "نائين،انارک،جندق،خور",
        province_id: 13,
    },
    {
        id: 707,
        name: "نجف آباد",
        province_id: 13,

    },
    {
        id: 708,
        name: "نجف آباد،گلدشت،دهق،علويچه",
        province_id: 13,
    },
    {
        id: 709,
        name: "نصرآباد",
        province_id: 13,
    },
    {
        id: 710,
        name: "نطنز",
        province_id: 13,
    },
    {
        id: 711,
        name: "نوش آباد",
        province_id: 13,
    },
    {
        id: 712,
        name: "نياسر",
        province_id: 13,
    },
    {
        id: 713,
        name: "نيک آباد",
        province_id: 13,
    },
    {
        id: 714,
        name: "ورزنه",
        province_id: 13,
    },
    {
        id: 715,
        name: "ورنامخواست",
        province_id: 13,
    },
    {
        id: 716,
        name: "وزوان",
        province_id: 13,
    },
    {
        id: 717,
        name: "ونک",
        province_id: 13,
    },
    {
        id: 718,
        name: "ويلاشهر",
        province_id: 13,
    },
    {
        id: 719,
        name: "هرند",
        province_id: 13,
    },
    {
        id: 720,
        name: "جعفريه",
        province_id: 14,
    },
    {
        id: 721,
        name: "دستجرد",
        province_id: 14,
    },
    {
        id: 722,
        name: "سلفچکان",
        province_id: 14,
    },
    {
        id: 723,
        name: "سلفچگان",
        province_id: 14,
    },
    {
        id: 724,
        name: "قم،قنوات،جعفريه،دستجرد،کهک",
        province_id: 14,
    },
    {
        id: 725,
        name: "قنوات",
        province_id: 14,
    },
    {
        id: 808,
        name: "اهرام(تنگستان)",
        province_id: 17,
    },
    {
        id: 809,
        name: "اهرم",
        province_id: 17,
    },
    {
        id: 810,
        name: "برازجان",
        province_id: 17,
    },
    {
        id: 811,
        name: "برازجان،دشتستان،دالکی،سعدآباد،",
        province_id: 17,
    },
    {
        id: 812,
        name: "بردخون",
        province_id: 17,
    },
    {
        id: 813,
        name: "بندر دير",
        province_id: 17,
    },
    {
        id: 814,
        name: "بندر ديلم",
        province_id: 17,
    },
    {
        id: 815,
        name: "بندر ريگ",
        province_id: 17,
    },
    {
        id: 816,
        name: "بندر کنگان",
        province_id: 17,
    },
    {
        id: 817,
        name: "بندر گناوه",
        province_id: 17,
    },
    {
        id: 818,
        name: "بندرگناوه،بندرريگ",
        province_id: 17,
    },
    {
        id: 819,
        name: "بنک",
        province_id: 17,
    },
    {
        id: 820,
        name: "بوشهر",
        province_id: 17,
    },
    {
        id: 821,
        name: "بوشهر،چغادک",
        province_id: 17,
    },
    {
        id: 822,
        name: "تنگ ارم",
        province_id: 17,
    },
    {
        id: 823,
        name: "جم",
        province_id: 17,
    },
    {
        id: 824,
        name: "چغادک",
        province_id: 17,
    },
    {
        id: 825,
        name: "خارک",
        province_id: 17,
    },
    {
        id: 826,
        name: "خورموج",
        province_id: 17,
    },
    {
        id: 827,
        name: "دالکی",
        province_id: 17,
    },
    {
        id: 828,
        name: "دشتستان",
        province_id: 17,
    },
    {
        id: 829,
        name: "دشتي(خورموج)،کاکی",
        province_id: 17,
    },
    {
        id: 830,
        name: "دلوار",
        province_id: 17,
    },
    {
        id: 831,
        name: "دير",
        province_id: 17,
    },
    {
        id: 832,
        name: "دير،آبدان،بردخون",
        province_id: 17,
    },
    {
        id: 833,
        name: "ديلم،امام حسن",
        province_id: 17,
    },
    {
        id: 834,
        name: "ريز",
        province_id: 17,
    },
    {
        id: 835,
        name: "سعدآباد",
        province_id: 17,
    },
    {
        id: 836,
        name: "شبانکاره",
        province_id: 17,
    },
    {
        id: 837,
        name: "طاهری",
        province_id: 17,
    },
    {
        id: 838,
        name: "عاليشهر",
        province_id: 17,
    },
    {
        id: 839,
        name: "عسلويه",
        province_id: 17,
    },
    {
        id: 840,
        name: "کاکی",
        province_id: 17,
    },
    {
        id: 841,
        name: "کلمه",
        province_id: 17,
    },
    {
        id: 842,
        name: "کنگان،جم،عسلويه",
        province_id: 17,
    },
    {
        id: 844,
        name: "نخل تقی",
        province_id: 17,
    },
    {
        id: 845,
        name: "وحدتيه",
        province_id: 17,
    },
    {
        id: 846,
        name: "آبسرد",
        province_id: 18,
    },
    {
        id: 847,
        name: "ابعلی",
        province_id: 18,
    },
    {
        id: 848,
        name: "ارجمند",
        province_id: 18,
    },
    {
        id: 849,
        name: "اسلام شهر",
        province_id: 18,
    },
    {
        id: 850,
        name: "اسلامشهر،چهاردانگه",
        province_id: 18,
    },
    {
        id: 851,
        name: "باقرشهر",
        province_id: 18,
    },
    {
        id: 852,
        name: "بومهن",
        province_id: 18,
    },
    {
        id: 853,
        name: "پاکدشت",
        province_id: 18,
    },
    {
        id: 854,
        name: "پاکدشت،شريف آباد",
        province_id: 18,
    },
    {
        id: 855,
        name: "پرديس",
        province_id: 18,
    },
    {
        id: 856,
        name: "پيشوا",
        province_id: 18,
    },
    {
        id: 857,
        name: "تهران- تجريش",
        province_id: 18,
    },
    {
        id: 858,
        name: "تهران،تجريش،ری،حسن آباد،...",
        province_id: 18,
    },
    {
        id: 859,
        name: "جوادآباد",
        province_id: 18,
    },
    {
        id: 860,
        name: "چهاردانگه",
        province_id: 18,
    },
    {
        id: 861,
        name: "حسن آباد",
        province_id: 18,
    },
    {
        id: 862,
        name: "دماوند",
        province_id: 18,
    },
    {
        id: 863,
        name: "دماوند،کيلان،آبسرد",
        province_id: 18,
    },
    {
        id: 864,
        name: "رباط کريم",
        province_id: 18,
    },
    {
        id: 865,
        name: "رباط کريم،نسيم شهر،گلستان",
        province_id: 18,
    },
    {
        id: 866,
        name: "رودهن",
        province_id: 18,
    },
    {
        id: 867,
        name: "ری",
        province_id: 18,
    },
    {
        id: 868,
        name: "شريف آباد",
        province_id: 18,
    },
    {
        id: 869,
        name: "صالح اباد",
        province_id: 18,
    },
    {
        id: 870,
        name: "فردوسيه",
        province_id: 18,
    },
    {
        id: 871,
        name: "فشم",
        province_id: 18,
    },
    {
        id: 872,
        name: "فيروزکوه",
        province_id: 18,
    },
    {
        id: 873,
        name: "فيروزکوه",
        province_id: 18,
    },
    {
        id: 874,
        name: "قرچک",
        province_id: 18,
    },
    {
        id: 875,
        name: "قرچک",
        province_id: 18,
    },
    {
        id: 876,
        name: "کوهسار",
        province_id: 18,
    },
    {
        id: 877,
        name: "کهريزک",
        province_id: 18,
    },
    {
        id: 878,
        name: "کيلان",
        province_id: 18,
    },
    {
        id: 879,
        name: "گلستان",
        province_id: 18,
    },
    {
        id: 880,
        name: "لواسان",
        province_id: 18,
    },
    {
        id: 881,
        name: "مرداباد",
        province_id: 18,
    },
    {
        id: 883,
        name: "نسيم شهر",
        province_id: 18,
    },
    {
        id: 884,
        name: "نصير اباد",
        province_id: 18,
    },
    {
        id: 885,
        name: "ورامين",
        province_id: 18,
    },
    {
        id: 886,
        name: "ورامين،پيشوا،جوادآباد",
        province_id: 18,
    },
    {
        id: 887,
        name: "هويزه",
        province_id: 18,
    },
    {
        id: 968,
        name: "سمنان،شهميرزاد",
        province_id: 20,
    },
    {
        id: 969,
        name: "شاهرود",
        province_id: 20,
    },
    {
        id: 970,
        name: "شاهرود،بسطام،کلاته خيج،مجن،...",
        province_id: 20,
    },
    {
        id: 971,
        name: "شهميرزاد",
        province_id: 20,
    },
    {
        id: 972,
        name: "کلاته خيج",
        province_id: 20,
    },
    {
        id: 973,
        name: "گرمسار",
        province_id: 20,
    },
    {
        id: 974,
        name: "گرمسار،آدران،ايوانکی",
        province_id: 20,
    },
    {
        id: 975,
        name: "مجن",
        province_id: 20,
    },
    {
        id: 976,
        name: "مهدی شهر",
        province_id: 20,
    },
    {
        id: 977,
        name: "ميامی",
        province_id: 20,
    },
    {
        id: 979,
        name: "آذرشهر",
        province_id: 21,
    },
    {
        id: 980,
        name: "آذرشهر،ممقان،گوگان",
        province_id: 21,
    },
    {
        id: 981,
        name: "ابش احمد",
        province_id: 21,
    },
    {
        id: 982,
        name: "ارسباران،ورزقان،خاردانا",
        province_id: 21,
    },
    {
        id: 983,
        name: "اسکو",
        province_id: 21,
    },
    {
        id: 984,
        name: "اسکو،ايلخچی،سهند",
        province_id: 21,
    },
    {
        id: 985,
        name: "اقکند",
        province_id: 21,
    },
    {
        id: 986,
        name: "اهر",
        province_id: 21,
    },
    {
        id: 987,
        name: "اهر،هوراند",
        province_id: 21,
    },
    {
        id: 988,
        name: "ايلخچی",
        province_id: 21,
    },
    {
        id: 989,
        name: "باسمنج",
        province_id: 21,
    },
    {
        id: 990,
        name: "بخشايش",
        province_id: 21,
    },
    {
        id: 991,
        name: "بستان آباد",
        province_id: 21,
    },
    {
        id: 992,
        name: "بستان آباد،تيکمه داش",
        province_id: 21,
    },
    {
        id: 993,
        name: "بناب",
        province_id: 21,
    },
    {
        id: 994,
        name: "بناب جديد(مرند)",
        province_id: 21,
    },
    {
        id: 995,
        name: "تبريز",
        province_id: 21,
    },
    {
        id: 996,
        name: "تبريز,باسمنج,سردرود,خسروشهر",
        province_id: 21,
    },
    {
        id: 997,
        name: "ترک",
        province_id: 21,
    },
    {
        id: 998,
        name: "ترکمانچای",
        province_id: 21,
    },
    {
        id: 999,
        name: "تسوج",
        province_id: 21,
    },
    {
        id: 1000,
        name: "تيکمه داش",
        province_id: 21,
    },
    {
        id: 1001,
        name: "جلفا",
        province_id: 21,
    },
    {
        id: 1002,
        name: "جلفا,سيه رود",
        province_id: 21,
    },
    {
        id: 1003,
        name: "خاروانا",
        province_id: 21,
    },
    {
        id: 1004,
        name: "خامنه",
        province_id: 21,
    },
    {
        id: 1005,
        name: "خراجو",
        province_id: 21,
    },
    {
        id: 1006,
        name: "خسرو شهر",
        province_id: 21,
    },
    {
        id: 1007,
        name: "خمارلو",
        province_id: 21,
    },
    {
        id: 1008,
        name: "خواجه",
        province_id: 21,
    },
    {
        id: 1009,
        name: "دوزدوزان",
        province_id: 21,
    },
    {
        id: 1010,
        name: "زرنق",
        province_id: 21,
    },
    {
        id: 1011,
        name: "زنوز",
        province_id: 21,
    },
    {
        id: 1012,
        name: "سراب",
        province_id: 21,
    },
    {
        id: 1013,
        name: "سراب،مهربان،شربيان،دوزدوزان",
        province_id: 21,
    },
    {
        id: 1014,
        name: "سردرود",
        province_id: 21,
    },
    {
        id: 1015,
        name: "سهند",
        province_id: 21,
    },
    {
        id: 1016,
        name: "سيس",
        province_id: 21,
    },
    {
        id: 1017,
        name: "سيه رود",
        province_id: 21,
    },
    {
        id: 1018,
        name: "شبستر",
        province_id: 21,
    },
    {
        id: 1019,
        name: "شبستر،خامنه،سيس،شرفخانه،شندآبا",
        province_id: 21,
    },
    {
        id: 1020,
        name: "شربيان",
        province_id: 21,
    },
    {
        id: 1021,
        name: "شرفخانه",
        province_id: 21,
    },
    {
        id: 1022,
        name: "شندآباد",
        province_id: 21,
    },
    {
        id: 1023,
        name: "صوفيان",
        province_id: 21,
    },
    {
        id: 1024,
        name: "عجب شير",
        province_id: 21,
    },
    {
        id: 1025,
        name: "قره آغاج",
        province_id: 21,
    },
    {
        id: 1026,
        name: "قره آغاج,چاراويماق",
        province_id: 21,
    },
    {
        id: 1027,
        name: "کشکسرای",
        province_id: 21,
    },
    {
        id: 1028,
        name: "کلبير،خمارلو",
        province_id: 21,
    },
    {
        id: 1029,
        name: "کلوانق",
        province_id: 21,
    },
    {
        id: 1030,
        name: "کليبر",
        province_id: 21,
    },
    {
        id: 1031,
        name: "کوزه کنان",
        province_id: 21,
    },
    {
        id: 1032,
        name: "گاوگان",
        province_id: 21,
    },
    {
        id: 1033,
        name: "گوگان",
        province_id: 21,
    },
    {
        id: 1034,
        name: "ليلان",
        province_id: 21,
    },
    {
        id: 1035,
        name: "مراغه",
        province_id: 21,
    },
    {
        id: 1036,
        name: "مراغه،خراجلو",
        province_id: 21,
    },
    {
        id: 1037,
        name: "مرند",
        province_id: 21,
    },
    {
        id: 1038,
        name: "مرند،زنوز،کشکراي,يامچی",
        province_id: 21,
    },
    {
        id: 1039,
        name: "ملکان",
        province_id: 21,
    },
    {
        id: 1040,
        name: "ملکان,ليلان",
        province_id: 21,
    },
    {
        id: 1041,
        name: "ممقان",
        province_id: 21,
    },
    {
        id: 1042,
        name: "مهربان",
        province_id: 21,
    },
    {
        id: 1043,
        name: "ميانه",
        province_id: 21,
    },
    {
        id: 1044,
        name: "ميانه,ترکمانچاي,آقکند,ترک",
        province_id: 21,
    },
    {
        id: 1127,
        name: "چابهار،نگور،کنارک",
        province_id: 24,
    },
    {
        id: 1128,
        name: "خاش",
        province_id: 24,
    },
    {
        id: 1129,
        name: "خاش،نوک آباد",
        province_id: 24,
    },
    {
        id: 1130,
        name: "دلگان",
        province_id: 24,
    },
    {
        id: 1131,
        name: "دوست محمد",
        province_id: 24,
    },
    {
        id: 1132,
        name: "راسک",
        province_id: 24,
    },
    {
        id: 1133,
        name: "زابل",
        province_id: 24,
    },
    {
        id: 1134,
        name: "زابل،بنجار،اديمی،زهک،محمودآباد",
        province_id: 24,
    },
    {
        id: 1135,
        name: "زابلی",
        province_id: 24,
    },
    {
        id: 1136,
        name: "زاهدان",
        province_id: 24,
    },
    {
        id: 1137,
        name: "زاهدان،ميرجاوه،نصرت آباد",
        province_id: 24,
    },
    {
        id: 1138,
        name: "زهک",
        province_id: 24,
    },
    {
        id: 1139,
        name: "سراوان",
        province_id: 24,
    },
    {
        id: 1140,
        name: "سراوان،سيرکان،جالق،زابلی،سوران",
        province_id: 24,
    },
    {
        id: 1141,
        name: "سرباز",
        province_id: 24,
    },
    {
        id: 1142,
        name: "سرباز،راسک،پيشين",
        province_id: 24,
    },
    {
        id: 1143,
        name: "سوران",
        province_id: 24,
    },
    {
        id: 1144,
        name: "سيرکان",
        province_id: 24,
    },
    {
        id: 1145,
        name: "فنوج",
        province_id: 24,
    },
    {
        id: 1146,
        name: "قصرقند",
        province_id: 24,
    },
    {
        id: 1147,
        name: "کنارک",
        province_id: 24,
    },
    {
        id: 1148,
        name: "گلمورتی",
        province_id: 24,
    },
    {
        id: 1149,
        name: "محمد آباد",
        province_id: 24,
    },
    {
        id: 1150,
        name: "ميرجاوه",
        province_id: 24,
    },
    {
        id: 1152,
        name: "نصرت آباد",
        province_id: 24,
    },
    {
        id: 1153,
        name: "نگور",
        province_id: 24,
    },
    {
        id: 1154,
        name: "نوک آب",
        province_id: 24,
    },
    {
        id: 1155,
        name: "نيک شهر",
        province_id: 24,
    },
    {
        id: 1156,
        name: "نيک شهر،بنت،فنوج،قصر قند،اسپکه",
        province_id: 24,
    },
    {
        id: 1157,
        name: "هيدوچ",
        province_id: 24,
    },
    {
        id: 1158,
        name: "باشت",
        province_id: 25,
    },
    {
        id: 1159,
        name: "چرام",
        province_id: 25,
    },
    {
        id: 1160,
        name: "دنا",
        province_id: 25,
    },
    {
        id: 1161,
        name: "دوگنبدان",
        province_id: 25,
    },
    {
        id: 1162,
        name: "دهدشت",
        province_id: 25,
    },
    {
        id: 1163,
        name: "دهدشت،سوق،قلعه رئيسی،چرام،لنده",
        province_id: 25,
    },
    {
        id: 1164,
        name: "ديشموک",
        province_id: 25,
    },
    {
        id: 1165,
        name: "سوق",
        province_id: 25,
    },
    {
        id: 1166,
        name: "سی سخت",
        province_id: 25,
    },
    {
        id: 1167,
        name: "سی سخت ، دنا",
        province_id: 25,
    },
    {
        id: 1168,
        name: "قلعه رئيسی",
        province_id: 25,
    },
    {
        id: 1169,
        name: "کهکيلويه وبويراحمد",
        province_id: 25,
    },
    {
        id: 1170,
        name: "گچساران",
        province_id: 25,
    },
    {
        id: 1171,
        name: "گچساران (دوگنبدان)،باشت",
        province_id: 25,
    },
    {
        id: 1172,
        name: "گراب سفلی",
        province_id: 25,
    },
    {
        id: 1173,
        name: "لنده",
        province_id: 25,
    },
    {
        id: 1174,
        name: "ليکک",
        province_id: 25,
    },
    {
        id: 1175,
        name: "ليکک",
        province_id: 25,
    },
    {
        id: 1176,
        name: "مارگون",
        province_id: 25,
    },
    {
        id: 1178,
        name: "ياسوج",
        province_id: 25,
    },
    {
        id: 1179,
        name: "ياسوج،مارگون،گراب سفلی",
        province_id: 25,
    },
    {
        id: 1180,
        name: "آبگرم",
        province_id: 26,
    },
    {
        id: 1181,
        name: "آبيک",
        province_id: 26,
    },
    {
        id: 1182,
        name: "ارداق",
        province_id: 26,
    },
    {
        id: 1183,
        name: "اسفرورين",
        province_id: 26,
    },
    {
        id: 1184,
        name: "اقباليه",
        province_id: 26,
    },
    {
        id: 1185,
        name: "الوند",
        province_id: 26,
    },
    {
        id: 1186,
        name: "اوج",
        province_id: 26,
    },
    {
        id: 1187,
        name: "بوئين زهرا",
        province_id: 26,
    },
    {
        id: 1188,
        name: "بوئين زهرا،آبگرم،آوج،شال",
        province_id: 26,
    },
    {
        id: 1189,
        name: "بيدستان",
        province_id: 26,
    },
    {
        id: 1190,
        name: "تاکستان",
        province_id: 26,
    },
    {
        id: 1191,
        name: "تاکستان،اسفرورين،خرمدشت",
        province_id: 26,
    },
    {
        id: 1192,
        name: "خاک علی",
        province_id: 26,
    },
    {
        id: 1193,
        name: "خرمدشت",
        province_id: 26,
    },
    {
        id: 1194,
        name: "دانسفهان",
        province_id: 26,
    },
    {
        id: 1195,
        name: "رازميان",
        province_id: 26,
    },
    {
        id: 1196,
        name: "سگز اباد",
        province_id: 26,
    },
    {
        id: 1197,
        name: "سيردان",
        province_id: 26,
    },
    {
        id: 1198,
        name: "شال",
        province_id: 26,
    },
    {
        id: 1199,
        name: "ضيا آباد",
        province_id: 26,
    },
    {
        id: 1200,
        name: "قزوين",
        province_id: 26,
    },
    {
        id: 1201,
        name: "قزوين،اقباليه،محمديه،محمودآباد",
        province_id: 26,
    },
    {
        id: 1202,
        name: "کوهين",
        province_id: 26,
    },
    {
        id: 1203,
        name: "محمديه",
        province_id: 26,
    },
    {
        id: 1204,
        name: "محمودآباد نمونه",
        province_id: 26,
    },
    {
        id: 1284,
        name: "تفرش",
        province_id: 28,
    },
    {
        id: 1285,
        name: "تفرش،فرمهين",
        province_id: 28,
    },
    {
        id: 1286,
        name: "توره",
        province_id: 28,
    },
    {
        id: 1287,
        name: "خمين",
        province_id: 28,
    },
    {
        id: 1288,
        name: "خنداب",
        province_id: 28,
    },
    {
        id: 1289,
        name: "داوداباد",
        province_id: 28,
    },
    {
        id: 1290,
        name: "دليجان",
        province_id: 28,
    },
    {
        id: 1291,
        name: "دليجان،نراق",
        province_id: 28,
    },
    {
        id: 1292,
        name: "رازقان",
        province_id: 28,
    },
    {
        id: 1293,
        name: "رحيم آباد",
        province_id: 28,
    },
    {
        id: 1294,
        name: "زاويه",
        province_id: 28,
    },
    {
        id: 1295,
        name: "زرنديه",
        province_id: 28,
    },
    {
        id: 1296,
        name: "ساوه",
        province_id: 28,
    },
    {
        id: 1297,
        name: "ساوه،رازقان،رحيم آباد،زاويه،..",
        province_id: 28,
    },
    {
        id: 1298,
        name: "سربند(شازند)،آستانه،شازند،...",
        province_id: 28,
    },
    {
        id: 1299,
        name: "سنجان",
        province_id: 28,
    },
    {
        id: 1300,
        name: "شازند",
        province_id: 28,
    },
    {
        id: 1301,
        name: "شهرصنعتی",
        province_id: 28,
    },
    {
        id: 1302,
        name: "شهرصنعتی ساوه",
        province_id: 28,
    },
    {
        id: 1303,
        name: "غرق آباد",
        province_id: 28,
    },
    {
        id: 1304,
        name: "فرمهين",
        province_id: 28,
    },
    {
        id: 1305,
        name: "قورچی باشی",
        province_id: 28,
    },
    {
        id: 1306,
        name: "کرهرود",
        province_id: 28,
    },
    {
        id: 1307,
        name: "کميجان",
        province_id: 28,
    },
    {
        id: 1308,
        name: "مامونيه",
        province_id: 28,
    },
    {
        id: 1309,
        name: "محلات",
        province_id: 28,
    },
    {
        id: 1310,
        name: "محلات،نيمور",
        province_id: 28,
    },
    {
        id: 1311,
        name: "مهاجران",
        province_id: 28,
    },
    {
        id: 1312,
        name: "ميلاجرد",
        province_id: 28,
    },
    {
        id: 1314,
        name: "نراق",
        province_id: 28,
    },
    {
        id: 1315,
        name: "نوبران",
        province_id: 28,
    },
    {
        id: 1316,
        name: "نيمور",
        province_id: 28,
    },
    {
        id: 1317,
        name: "هندودر",
        province_id: 28,
    },
    {
        id: 1318,
        name: "اسفراين",
        province_id: 29,
    },
    {
        id: 1319,
        name: "اشخانه",
        province_id: 29,
    },
    {
        id: 1320,
        name: "بجنورد",
        province_id: 29,
    },
    {
        id: 1321,
        name: "پيش قلعه",
        province_id: 29,
    },
    {
        id: 1322,
        name: "حصارگرمخان",
        province_id: 29,
    },
    {
        id: 1323,
        name: "درق",
        province_id: 29,
    },
    {
        id: 1324,
        name: "راز",
        province_id: 29,
    },
    {
        id: 1325,
        name: "سنخواست",
        province_id: 29,
    },
    {
        id: 1326,
        name: "شوقان",
        province_id: 29,
    },
    {
        id: 1327,
        name: "شيروان",
        province_id: 29,
    },
    {
        id: 1328,
        name: "صفی اباد",
        province_id: 29,
    },
    {
        id: 1329,
        name: "فاروج",
        province_id: 29,
    },
    {
        id: 1330,
        name: "قاضی",
        province_id: 29,
    },
    {
        id: 1331,
        name: "گرمه",
        province_id: 29,
    },
    {
        id: 1332,
        name: "گرمه جاجرم",
        province_id: 29,
    },
    {
        id: 1333,
        name: "لوجلی",
        province_id: 29,
    },
    {
        id: 1334,
        name: "ارين شهر",
        province_id: 30,
    },
    {
        id: 1335,
        name: "اسديه",
        province_id: 30,
    },
    {
        id: 1336,
        name: "اسفدن",
        province_id: 30,
    },
    {
        id: 1337,
        name: "اسلاميه",
        province_id: 30,
    },
    {
        id: 1338,
        name: "ايسک",
        province_id: 30,
    },
    {
        id: 1339,
        name: "بشرويه",
        province_id: 30,
    },
    {
        id: 1340,
        name: "بيرجند",
        province_id: 30,
    },
    {
        id: 1341,
        name: "حاجی اباد",
        province_id: 30,
    },
    {
        id: 1342,
        name: "خضری دشت بياض",
        province_id: 30,
    },
    {
        id: 1343,
        name: "خوسف",
        province_id: 30,
    },
    {
        id: 1344,
        name: "زهان",
        province_id: 30,
    },
    {
        id: 1345,
        name: "سرايان",
        province_id: 30,
    },
    {
        id: 1346,
        name: "سربيشه",
        province_id: 30,
    },
    {
        id: 1347,
        name: "سه قلعه",
        province_id: 30,
    },
    {
        id: 1348,
        name: "شوسف",
        province_id: 30,
    },
    {
        id: 1349,
        name: "عشق آّباد",
        province_id: 30,
    },
    {
        id: 1350,
        name: "فردوس",
        province_id: 30,
    },
    {
        id: 1351,
        name: "قائن",
        province_id: 30,
    },
    {
        id: 1352,
        name: "مود",
        province_id: 30,
    },
    {
        id: 1353,
        name: "نهبندان",
        province_id: 30,
    },
    {
        id: 1354,
        name: "نيمبلوک",
        province_id: 30,
    },
    {
        id: 1355,
        name: "ابرکوه",
        province_id: 31,
    },
    {
        id: 1356,
        name: "ابرکوه،مهردشت",
        province_id: 31,
    },
    {
        id: 1357,
        name: "احمدآباد",
        province_id: 31,
    },
    {
        id: 1358,
        name: "اردکان",
        province_id: 31,
    },
    {
        id: 1359,
        name: "اردکان،احمدآباد",
        province_id: 31,
    },
    {
        id: 1360,
        name: "اشکذر",
        province_id: 31,
    },
    {
        id: 1361,
        name: "بافق",
        province_id: 31,
    },
    {
        id: 1362,
        name: "بافق،بهاباد",
        province_id: 31,
    },
    {
        id: 1363,
        name: "بهاباد",
        province_id: 31,
    },
    {
        id: 1364,
        name: "تفت",
        province_id: 31,
    },
    {
        id: 1365,
        name: "تفت،نير",
        province_id: 31,
    },
    {
        id: 1366,
        name: "حميديه",
        province_id: 31,
    },
    {
        id: 1367,
        name: "خاتم،هرات،مروست",
        province_id: 31,
    },
    {
        id: 1368,
        name: "خضرآباد",
        province_id: 31,
    },
    {
        id: 1369,
        name: "ديهوگ",
        province_id: 31,
    },
    {
        id: 1370,
        name: "زارچ",
        province_id: 31,
    },
    {
        id: 1371,
        name: "شاهديه",
        province_id: 31,
    },
    {
        id: 1372,
        name: "صدوق",
        province_id: 31,
    },
    {
        id: 1373,
        name: "صدوق،ندوشن،خضرآباد،اشکذر",
        province_id: 31,
    },
    {
        id: 1374,
        name: "طبس",
        province_id: 31,
    },
    {
        id: 1375,
        name: "طبس،عشق آباد",
        province_id: 31,
    },
    {
        id: 1376,
        name: "عشق آباد",
        province_id: 31,
    },
    {
        id: 1377,
        name: "عقدا",
        province_id: 31,
    },
    {
        id: 1378,
        name: "مروست",
        province_id: 31,
    },
    {
        id: 1379,
        name: "مهردشت",
        province_id: 31,
    },
    {
        id: 1380,
        name: "مهريز",
        province_id: 31,
    },
    {
        id: 1381,
        name: "ميبد",
        province_id: 31,
    },
    {
        id: 1383,
        name: "ندوشن",
        province_id: 31,
    },
    {
        id: 1384,
        name: "نير",
        province_id: 31,
    },
    {
        id: 1385,
        name: "هرات",
        province_id: 31,
    },
    {
        id: 1386,
        name: "يزد",
        province_id: 31,
    },
    {
        id: 1387,
        name: "يزد،حميديا،شاهديه،زاچ",
        province_id: 31,
    },
    {
        id: 1388,
        name: "کشور",
        province_id: 32,
    },
    {
        id: 1046,
        name: "نظرکهريزی",
        province_id: 21,
    },
    {
        id: 1047,
        name: "وايقان",
        province_id: 21,
    },
    {
        id: 1048,
        name: "ورزقان",
        province_id: 21,
    },
    {
        id: 1049,
        name: "هاديشهر",
        province_id: 21,
    },
    {
        id: 1050,
        name: "هاديشهر(علمدار)",
        province_id: 21,
    },
    {
        id: 1051,
        name: "هريس",
        province_id: 21,
    },
    {
        id: 1052,
        name: "هريس،بخشايش،زرنق،کلوانق،خواجه",
        province_id: 21,
    },
    {
        id: 1053,
        name: "هشترود",
        province_id: 21,
    },
    {
        id: 1054,
        name: "هوراند",
        province_id: 21,
    },
    {
        id: 1055,
        name: "يامچی",
        province_id: 21,
    },
    {
        id: 1056,
        name: "ابدانان",
        province_id: 22,
    },
    {
        id: 1057,
        name: "ارکواز",
        province_id: 22,
    },
    {
        id: 1058,
        name: "اسمان اباد",
        province_id: 22,
    },
    {
        id: 1059,
        name: "ايلام",
        province_id: 22,
    },
    {
        id: 1060,
        name: "ايلام،چوار",
        province_id: 22,
    },
    {
        id: 1061,
        name: "ايوان",
        province_id: 22,
    },
    {
        id: 1062,
        name: "ايوان،زرنه",
        province_id: 22,
    },
    {
        id: 1063,
        name: "أبدانان",
        province_id: 22,
    },
    {
        id: 1064,
        name: "بدره",
        province_id: 22,
    },
    {
        id: 1065,
        name: "پهله",
        province_id: 22,
    },
    {
        id: 1066,
        name: "توحيد",
        province_id: 22,
    },
    {
        id: 1067,
        name: "چوار",
        province_id: 22,
    },
    {
        id: 1068,
        name: "دره شهر",
        province_id: 22,
    },
    {
        id: 1069,
        name: "دهلران",
        province_id: 22,
    },
    {
        id: 1070,
        name: "دهلران،ميمه،پهله،موسيان",
        province_id: 22,
    },
    {
        id: 1071,
        name: "زرنه",
        province_id: 22,
    },
    {
        id: 1072,
        name: "سرآبله،لومار،شيروان و چرداول",
        province_id: 22,
    },
    {
        id: 1073,
        name: "سرابله",
        province_id: 22,
    },
    {
        id: 1074,
        name: "شيروان و چرداول",
        province_id: 22,
    },
    {
        id: 1075,
        name: "صالح آباد",
        province_id: 22,
    },
    {
        id: 1076,
        name: "کهره(توحيد)",
        province_id: 22,
    },
    {
        id: 1077,
        name: "لومار",
        province_id: 22,
    },
    {
        id: 1078,
        name: "مورموری",
        province_id: 22,
    },
    {
        id: 1079,
        name: "موسيان",
        province_id: 22,
    },
    {
        id: 1080,
        name: "مهران",
        province_id: 22,
    },
    {
        id: 1081,
        name: "مهران،ارکواز،صالح آباد",
        province_id: 22,
    },
    {
        id: 1082,
        name: "ميمه",
        province_id: 22,
    },
    {
        id: 1084,
        name: "اشتهارد",
        province_id: 23,
    },
    {
        id: 1085,
        name: "انديشه",
        province_id: 23,
    },
    {
        id: 1086,
        name: "باغستان",
        province_id: 23,
    },
    {
        id: 1087,
        name: "چهارباغ",
        province_id: 23,
    },
    {
        id: 1088,
        name: "حصارک",
        province_id: 23,
    },
    {
        id: 1089,
        name: "رجايی شهر",
        province_id: 23,
    },
    {
        id: 1090,
        name: "ساوجبلاغ",
        province_id: 23,
    },
    {
        id: 1091,
        name: "شاهدشهر",
        province_id: 23,
    },
    {
        id: 1092,
        name: "شهر جديد هشتگر",
        province_id: 23,
    },
    {
        id: 1093,
        name: "شهريار",
        province_id: 23,
    },
    {
        id: 1094,
        name: "شهريار،شاهدشهر،صفادشت،وحيديه،.",
        province_id: 23,
    },
    {
        id: 1095,
        name: "صباشهر",
        province_id: 23,
    },
    {
        id: 1096,
        name: "صفادشت",
        province_id: 23,
    },
    {
        id: 1097,
        name: "طالقان",
        province_id: 23,
    },
    {
        id: 1098,
        name: "فرديس",
        province_id: 23,
    },
    {
        id: 1099,
        name: "قدس",
        province_id: 23,
    },
    {
        id: 1100,
        name: "کرج",
        province_id: 23,
    },
    {
        id: 1101,
        name: "کرج،ماهدشت،محمدشهر،مشکين دشت",
        province_id: 23,
    },
    {
        id: 1102,
        name: "کمال شهر",
        province_id: 23,
    },
    {
        id: 1103,
        name: "گرمدره",
        province_id: 23,
    },
    {
        id: 1104,
        name: "مارليک",
        province_id: 23,
    },
    {
        id: 1105,
        name: "ماهدشت",
        province_id: 23,
    },
    {
        id: 1106,
        name: "محمدشهر",
        province_id: 23,
    },
    {
        id: 1107,
        name: "مشکين دشت",
        province_id: 23,
    },
    {
        id: 1108,
        name: "ملارد",
        province_id: 23,
    },
    {
        id: 1109,
        name: "مهرشهر",
        province_id: 23,
    },
    {
        id: 1110,
        name: "مهرويلا",
        province_id: 23,
    },
    {
        id: 1111,
        name: "نظرآباد",
        province_id: 23,
    },
    {
        id: 1112,
        name: "وحيديه",
        province_id: 23,
    },
    {
        id: 1113,
        name: "وردآورد(شهر قدس)",
        province_id: 23,
    },
    {
        id: 1114,
        name: "هشتگرد",
        province_id: 23,
    },
    {
        id: 1115,
        name: "هشتگرد(ساوجبلاغ)",
        province_id: 23,
    },
    {
        id: 1116,
        name: "اديمی",
        province_id: 24,
    },
    {
        id: 1117,
        name: "اسپکه",
        province_id: 24,
    },
    {
        id: 1118,
        name: "ايرانشهر",
        province_id: 24,
    },
    {
        id: 1119,
        name: "ايرانشهر,بزمان،بمپور،گلمورتی",
        province_id: 24,
    },
    {
        id: 1120,
        name: "بزمان",
        province_id: 24,
    },
    {
        id: 1121,
        name: "بمپور",
        province_id: 24,
    },
    {
        id: 1122,
        name: "بنت",
        province_id: 24,
    },
    {
        id: 1123,
        name: "بنجار",
        province_id: 24,
    },
    {
        id: 1124,
        name: "پيشين",
        province_id: 24,
    },
    {
        id: 1125,
        name: "جالق",
        province_id: 24,
    },
    {
        id: 1126,
        name: "چابهار",
        province_id: 24,
    },
    {
        id: 405,
        name: "مزداوند",
        province_id: 7,
    },
    {
        id: 406,
        name: "مشهد",
        province_id: 7,
    },
    {
        id: 407,
        name: "مشهدريزه",
        province_id: 7,
    },
    {
        id: 408,
        name: "ملک اباد",
        province_id: 7,
    },
    {
        id: 409,
        name: "نشتيفان",
        province_id: 7,
    },
    {
        id: 410,
        name: "نصراباد",
        province_id: 7,
    },
    {
        id: 411,
        name: "نقاب",
        province_id: 7,
    },
    {
        id: 412,
        name: "نوبهار",
        province_id: 7,
    },
    {
        id: 413,
        name: "نوخندان",
        province_id: 7,
    },
    {
        id: 414,
        name: "نيشابور",
        province_id: 7,
    },
    {
        id: 415,
        name: "نيل شهر",
        province_id: 7,
    },
    {
        id: 416,
        name: "يونسی",
        province_id: 7,
    },
    {
        id: 417,
        name: "ازگله",
        province_id: 8,
    },
    {
        id: 418,
        name: "اسلام آباد غرب",
        province_id: 8,
    },
    {
        id: 419,
        name: "اسلام آبادغرب،حميل",
        province_id: 8,
    },
    {
        id: 420,
        name: "باينگان",
        province_id: 8,
    },
    {
        id: 421,
        name: "بيستون",
        province_id: 8,
    },
    {
        id: 422,
        name: "پاوه",
        province_id: 8,
    },
    {
        id: 423,
        name: "پاوه،بانگان،نودشه،نوسود",
        province_id: 8,
    },
    {
        id: 424,
        name: "تازه آباد",
        province_id: 8,
    },
    {
        id: 425,
        name: "ثلاث",
        province_id: 8,
    },
    {
        id: 426,
        name: "جوانرود",
        province_id: 8,
    },
    {
        id: 427,
        name: "جوانرود،تازه آباد",
        province_id: 8,
    },
    {
        id: 428,
        name: "حميل",
        province_id: 8,
    },
    {
        id: 429,
        name: "رباط",
        province_id: 8,
    },
    {
        id: 430,
        name: "روانسر",
        province_id: 8,
    },
    {
        id: 431,
        name: "سر پل ذهاب",
        province_id: 8,
    },
    {
        id: 432,
        name: "سرپل ذهاب",
        province_id: 8,
    },
    {
        id: 433,
        name: "سرمست",
        province_id: 8,
    },
    {
        id: 434,
        name: "سطر",
        province_id: 8,
    },
    {
        id: 435,
        name: "سنقر",
        province_id: 8,
    },
    {
        id: 436,
        name: "سومار",
        province_id: 8,
    },
    {
        id: 437,
        name: "شاطر آباد",
        province_id: 8,
    },
    {
        id: 438,
        name: "صحنه",
        province_id: 8,
    },
    {
        id: 439,
        name: "صحنه،ميانراهان",
        province_id: 8,
    },
    {
        id: 440,
        name: "قزانچی",
        province_id: 8,
    },
    {
        id: 441,
        name: "قصر شيرين ، سومار",
        province_id: 8,
    },
    {
        id: 442,
        name: "قصرشيرين",
        province_id: 8,
    },
    {
        id: 443,
        name: "کرمانشاه",
        province_id: 8,
    },
    {
        id: 444,
        name: "کرمانشاه،هلشی،کوزران،رباط",
        province_id: 8,
    },
    {
        id: 445,
        name: "کرند",
        province_id: 8,
    },
    {
        id: 446,
        name: "کرند غرب",
        province_id: 8,
    },
    {
        id: 447,
        name: "کنگاور",
        province_id: 8,
    },
    {
        id: 448,
        name: "کنگاور",
        province_id: 8,
    },
    {
        id: 449,
        name: "کوزران",
        province_id: 8,
    },
    {
        id: 450,
        name: "گواور",
        province_id: 8,
    },
    {
        id: 451,
        name: "گهواره",
        province_id: 8,
    },
    {
        id: 452,
        name: "گيلانغرب",
        province_id: 8,
    },
    {
        id: 453,
        name: "گيلانغرب ، سرمست",
        province_id: 8,
    },
    {
        id: 454,
        name: "ماهيدشت",
        province_id: 8,
    },
    {
        id: 455,
        name: "ميان راهان",
        province_id: 8,
    },
    {
        id: 457,
        name: "نودشه",
        province_id: 8,
    },
    {
        id: 458,
        name: "نوسود",
        province_id: 8,
    },
    {
        id: 459,
        name: "هرسين",
        province_id: 8,
    },
    {
        id: 460,
        name: "هلشی",
        province_id: 8,
    },
    {
        id: 461,
        name: "اروميه",
        province_id: 9,
    },
    {
        id: 462,
        name: "اروميه،نوشين،سيلوانه،سرو",
        province_id: 9,
    },
    {
        id: 463,
        name: "اشنويه",
        province_id: 9,
    },
    {
        id: 464,
        name: "اشنويه،نالوس",
        province_id: 9,
    },
    {
        id: 465,
        name: "اواجيق",
        province_id: 9,
    },
    {
        id: 466,
        name: "ايواوغلی",
        province_id: 9,
    },
    {
        id: 467,
        name: "باروق",
        province_id: 9,
    },
    {
        id: 468,
        name: "بازرگان",
        province_id: 9,
    },
    {
        id: 469,
        name: "بوکان",
        province_id: 9,
    },
    {
        id: 470,
        name: "پلدشت",
        province_id: 9,
    },
    {
        id: 471,
        name: "پيرانشهر",
        province_id: 9,
    },
    {
        id: 472,
        name: "تازه شهر",
        province_id: 9,
    },
    {
        id: 473,
        name: "تکاب",
        province_id: 9,
    },
    {
        id: 474,
        name: "چالدران",
        province_id: 9,
    },
    {
        id: 475,
        name: "چالدران،سيه چشمه",
        province_id: 9,
    },
    {
        id: 476,
        name: "چهاربرج",
        province_id: 9,
    },
    {
        id: 477,
        name: "خوی",
        province_id: 9,
    },
    {
        id: 478,
        name: "خوی،فيروق،ايواوغلی",
        province_id: 9,
    },
    {
        id: 479,
        name: "ربط",
        province_id: 9,
    },
    {
        id: 480,
        name: "سردشت",
        province_id: 9,
    },
    {
        id: 481,
        name: "سردشت،ميرآباد",
        province_id: 9,
    },
    {
        id: 482,
        name: "سرو",
        province_id: 9,
    },
    {
        id: 483,
        name: "سلماس",
        province_id: 9,
    },
    {
        id: 484,
        name: "سلماس،تازه شهر",
        province_id: 9,
    },
    {
        id: 485,
        name: "سيلوانه",
        province_id: 9,
    },
    {
        id: 486,
        name: "سيمينه",
        province_id: 9,
    },
    {
        id: 487,
        name: "سيه چشمه",
        province_id: 9,
    },
    {
        id: 568,
        name: "قروه",
        province_id: 11,
    },
    {
        id: 569,
        name: "قروه،دلبران،سريش آباد،دزج",
        province_id: 11,
    },
    {
        id: 570,
        name: "کامياران",
        province_id: 11,
    },
    {
        id: 571,
        name: "کامياران،موچش",
        province_id: 11,
    },
    {
        id: 572,
        name: "کانی سور",
        province_id: 11,
    },
    {
        id: 573,
        name: "مريوان",
        province_id: 11,
    },
    {
        id: 574,
        name: "مريوان،چناره،سروآباد",
        province_id: 11,
    },
    {
        id: 575,
        name: "موچش",
        province_id: 11,
    },
    {
        id: 577,
        name: "ياسوکند",
        province_id: 11,
    },
    {
        id: 578,
        name: "آب بر",
        province_id: 12,
    },
    {
        id: 579,
        name: "ابهر",
        province_id: 12,
    },
    {
        id: 580,
        name: "ابهر،صائين قلعه،هيدج،سلطانيه",
        province_id: 12,
    },
    {
        id: 581,
        name: "أب برطارم،چورزق",
        province_id: 12,
    },
    {
        id: 582,
        name: "چورزق",
        province_id: 12,
    },
    {
        id: 583,
        name: "حلب",
        province_id: 12,
    },
    {
        id: 584,
        name: "خدابنده",
        province_id: 12,
    },
    {
        id: 585,
        name: "خدابنده(قيدار)،گرماب،زرين رود،",
        province_id: 12,
    },
    {
        id: 586,
        name: "خرمدره",
        province_id: 12,
    },
    {
        id: 587,
        name: "دندی",
        province_id: 12,
    },
    {
        id: 588,
        name: "زرين آباد",
        province_id: 12,
    },
    {
        id: 589,
        name: "زرين رود",
        province_id: 12,
    },
    {
        id: 590,
        name: "زنجان",
        province_id: 12,
    },
    {
        id: 591,
        name: "سجاس",
        province_id: 12,
    },
    {
        id: 592,
        name: "سلطانيه",
        province_id: 12,
    },
    {
        id: 593,
        name: "صانين قلعه",
        province_id: 12,
    },
    {
        id: 594,
        name: "طارم",
        province_id: 12,
    },
    {
        id: 595,
        name: "قيدار",
        province_id: 12,
    },
    {
        id: 596,
        name: "گرماب",
        province_id: 12,
    },
    {
        id: 597,
        name: "ماه نشان",
        province_id: 12,
    },
    {
        id: 599,
        name: "هيدج",
        province_id: 12,
    },
    {
        id: 600,
        name: "آران و بيدگل،نوش آباد،ابوزيد..",
        province_id: 13,
    },
    {
        id: 601,
        name: "ابريشم",
        province_id: 13,
    },
    {
        id: 602,
        name: "ابوزيدآباد",
        province_id: 13,
    },
    {
        id: 603,
        name: "اران و بيدگل",
        province_id: 13,
    },
    {
        id: 604,
        name: "اردستان",
        province_id: 13,
    },
    {
        id: 605,
        name: "اردستان،مهاباد",
        province_id: 13,
    },
    {
        id: 606,
        name: "اژيه",
        province_id: 13,
    },
    {
        id: 607,
        name: "اصفهان",
        province_id: 13,
    },
    {
        id: 608,
        name: "اصفهان،خوراسگان،رهنان،ورزنه،..",
        province_id: 13,
    },
    {
        id: 609,
        name: "افوس",
        province_id: 13,
    },
    {
        id: 610,
        name: "انارک",
        province_id: 13,
    },
    {
        id: 611,
        name: "ايمانشهر",
        province_id: 13,
    },
    {
        id: 612,
        name: "بادرود",
        province_id: 13,
    },
    {
        id: 613,
        name: "باغ بهادران",
        province_id: 13,
    },
    {
        id: 614,
        name: "برزک",
        province_id: 13,
    },
    {
        id: 615,
        name: "برف انبار",
        province_id: 13,
    },
    {
        id: 616,
        name: "بوئين و مياندشت",
        province_id: 13,
    },
    {
        id: 617,
        name: "بهارانشهر",
        province_id: 13,
    },
    {
        id: 618,
        name: "بهارستان",
        province_id: 13,
    },
    {
        id: 619,
        name: "پيربکران",
        province_id: 13,
    },
    {
        id: 620,
        name: "تودشک",
        province_id: 13,
    },
    {
        id: 621,
        name: "تيران",
        province_id: 13,
    },
    {
        id: 622,
        name: "تيران،عسگران",
        province_id: 13,
    },
    {
        id: 623,
        name: "جرقويه",
        province_id: 13,
    },
    {
        id: 624,
        name: "جندق",
        province_id: 13,
    },
    {
        id: 625,
        name: "جوشقان و کامو",
        province_id: 13,
    },
    {
        id: 626,
        name: "چادگان",
        province_id: 13,
    },
    {
        id: 627,
        name: "چرمهين",
        province_id: 13,
    },
    {
        id: 628,
        name: "چمگردان",
        province_id: 13,
    },
    {
        id: 629,
        name: "حبيب آباد",
        province_id: 13,
    },
    {
        id: 630,
        name: "حسن آباد",
        province_id: 13,
    },
    {
        id: 631,
        name: "حنا",
        province_id: 13,
    },
    {
        id: 632,
        name: "خالداباد",
        province_id: 13,
    },
    {
        id: 633,
        name: "خمينی شهر",
        province_id: 13,
    },
    {
        id: 634,
        name: "خمينی شهر،کوشک",
        province_id: 13,
    },
    {
        id: 635,
        name: "خوانسار",
        province_id: 13,
    },
    {
        id: 636,
        name: "خور",
        province_id: 13,
    },
    {
        id: 637,
        name: "خوراسگان",
        province_id: 13,
    },
    {
        id: 638,
        name: "خورزوق",
        province_id: 13,
    },
    {
        id: 639,
        name: "داران",
        province_id: 13,
    },
    {
        id: 640,
        name: "دامنه",
        province_id: 13,
    },
    {
        id: 641,
        name: "درچه",
        province_id: 13,
    },
    {
        id: 642,
        name: "درچه پياز",
        province_id: 13,
    },
    {
        id: 643,
        name: "دستگرد",
        province_id: 13,
    },
    {
        id: 644,
        name: "دستگرد(خورزوق)",
        province_id: 13,
    },
    {
        id: 645,
        name: "دولت آباد",
        province_id: 13,
    },
    {
        id: 646,
        name: "دهاقان",
        province_id: 13,
    },
    {
        id: 647,
        name: "دهق",
        province_id: 13,
    },
    {
        id: 648,
        name: "ديزيچه",
        province_id: 13,
    },
    {
        id: 240,
        name: "اميديه،جايزان",
        province_id: 5,
    },
    {
        id: 241,
        name: "انديمشک",
        province_id: 5,
    },
    {
        id: 242,
        name: "انديمشک",
        province_id: 5,
    },
    {
        id: 243,
        name: "اهواز",
        province_id: 5,
    },
    {
        id: 244,
        name: "اهواز،حميديه،شيبان،ملاثانی،ويس",
        province_id: 5,
    },
    {
        id: 245,
        name: "ايذه",
        province_id: 5,
    },
    {
        id: 246,
        name: "ايذه،دهدز",
        province_id: 5,
    },
    {
        id: 247,
        name: "أبادان،اروندکنار",
        province_id: 5,
    },
    {
        id: 248,
        name: "باغ ملک",
        province_id: 5,
    },
    {
        id: 249,
        name: "باغملک",
        province_id: 5,
    },
    {
        id: 250,
        name: "بستان",
        province_id: 5,
    },
    {
        id: 251,
        name: "بندر ماهشهر",
        province_id: 5,
    },
    {
        id: 252,
        name: "بندرامام خمينی",
        province_id: 5,
    },
    {
        id: 253,
        name: "بهبهان",
        province_id: 5,
    },
    {
        id: 254,
        name: "بهبهان ـ سردشت(زيدون)",
        province_id: 5,
    },
    {
        id: 255,
        name: "بهبهان،آغاجاری،سردشت",
        province_id: 5,
    },
    {
        id: 256,
        name: "جايزان",
        province_id: 5,
    },
    {
        id: 257,
        name: "چمران",
        province_id: 5,
    },
    {
        id: 258,
        name: "حر",
        province_id: 5,
    },
    {
        id: 259,
        name: "حسينيه",
        province_id: 5,
    },
    {
        id: 260,
        name: "حميديه",
        province_id: 5,
    },
    {
        id: 261,
        name: "خرمشهر",
        province_id: 5,
    },
    {
        id: 262,
        name: "خرمشهر،مقاومت،مينوشهر",
        province_id: 5,
    },
    {
        id: 263,
        name: "دزاب",
        province_id: 5,
    },
    {
        id: 264,
        name: "دزفول",
        province_id: 5,
    },
    {
        id: 265,
        name: "دزفول،شريعتی،ميانرود،دزآب،....",
        province_id: 5,
    },
    {
        id: 266,
        name: "دشت آزادگان(سوسنگرد)،بستان،...",
        province_id: 5,
    },
    {
        id: 267,
        name: "دهدز",
        province_id: 5,
    },
    {
        id: 268,
        name: "رامشير",
        province_id: 5,
    },
    {
        id: 269,
        name: "رامهرمز",
        province_id: 5,
    },
    {
        id: 270,
        name: "رامهرمز،هفتگل",
        province_id: 5,
    },
    {
        id: 271,
        name: "رفيع",
        province_id: 5,
    },
    {
        id: 272,
        name: "زهره",
        province_id: 5,
    },
    {
        id: 273,
        name: "سالند",
        province_id: 5,
    },
    {
        id: 274,
        name: "سوسنگرد",
        province_id: 5,
    },
    {
        id: 275,
        name: "شادگان",
        province_id: 5,
    },
    {
        id: 276,
        name: "شريعتی",
        province_id: 5,
    },
    {
        id: 277,
        name: "شوش",
        province_id: 5,
    },
    {
        id: 278,
        name: "شوش،الوان",
        province_id: 5,
    },
    {
        id: 279,
        name: "شوشتر",
        province_id: 5,
    },
    {
        id: 280,
        name: "شوشتر،گتوند",
        province_id: 5,
    },
    {
        id: 281,
        name: "شيبان",
        province_id: 5,
    },
    {
        id: 282,
        name: "صفی اباد",
        province_id: 5,
    },
    {
        id: 283,
        name: "صيدون",
        province_id: 5,
    },
    {
        id: 284,
        name: "قلعه تل",
        province_id: 5,
    },
    {
        id: 285,
        name: "قلعه خواجه",
        province_id: 5,
    },
    {
        id: 286,
        name: "گتوند",
        province_id: 5,
    },
    {
        id: 287,
        name: "لالی",
        province_id: 5,
    },
    {
        id: 288,
        name: "ماهشهر،چمران",
        province_id: 5,
    },
    {
        id: 289,
        name: "مسجدسليمان",
        province_id: 5,
    },
    {
        id: 290,
        name: "مسجدسليمان،لالی",
        province_id: 5,
    },
    {
        id: 291,
        name: "مقاومت",
        province_id: 5,
    },
    {
        id: 292,
        name: "ملاثانی",
        province_id: 5,
    },
    {
        id: 293,
        name: "ميانرود",
        province_id: 5,
    },
    {
        id: 294,
        name: "مينودشت",
        province_id: 5,
    },
    {
        id: 296,
        name: "ويس",
        province_id: 5,
    },
    {
        id: 297,
        name: "هفتگل",
        province_id: 5,
    },
    {
        id: 298,
        name: "هنديجان",
        province_id: 5,
    },
    {
        id: 299,
        name: "هويزه",
        province_id: 5,
    },
    {
        id: 300,
        name: "ابی بيگلو",
        province_id: 6,
    },
    {
        id: 301,
        name: "اردبيل",
        province_id: 6,
    },
    {
        id: 302,
        name: "اردبيل،هير",
        province_id: 6,
    },
    {
        id: 303,
        name: "اصلاندوز",
        province_id: 6,
    },
    {
        id: 304,
        name: "بيله سوار",
        province_id: 6,
    },
    {
        id: 305,
        name: "بيله سوار،جعفرآباد",
        province_id: 6,
    },
    {
        id: 306,
        name: "پارس آباد",
        province_id: 6,
    },
    {
        id: 307,
        name: "پارس آباد،اصلاندوز",
        province_id: 6,
    },
    {
        id: 308,
        name: "تازه کندانگوت",
        province_id: 6,
    },
    {
        id: 309,
        name: "جعفرآباد",
        province_id: 6,
    },
    {
        id: 310,
        name: "خلخال",
        province_id: 6,
    },
    {
        id: 311,
        name: "خلخال،هشتجين،کلور",
        province_id: 6,
    },
    {
        id: 312,
        name: "رضی",
        province_id: 6,
    },
    {
        id: 313,
        name: "سرعين",
        province_id: 6,
    },
    {
        id: 314,
        name: "عنبران",
        province_id: 6,
    },
    {
        id: 315,
        name: "کلور",
        province_id: 6,
    },
    {
        id: 316,
        name: "کوثر",
        province_id: 6,
    },
    {
        id: 317,
        name: "کورايم",
        province_id: 6,
    },
    {
        id: 318,
        name: "گرمی",
        province_id: 6,
    },
    {
        id: 319,
        name: "گرمی،تازه کندانگوت",
        province_id: 6,
    },
    {
        id: 320,
        name: "گيوی",
        province_id: 6,
    },
    {
        id: 80,
        name: "لامرد",
        province_id: 1,
    },
    {
        id: 81,
        name: "لامرد،اشکنان،اهل،علامرودشت",
        province_id: 1,
    },
    {
        id: 82,
        name: "لپونی",
        province_id: 1,
    },
    {
        id: 83,
        name: "مرودشت",
        province_id: 1,
    },
    {
        id: 84,
        name: "مرودشت،سعادت شهر،سيدان",
        province_id: 1,
    },
    {
        id: 85,
        name: "مشکان",
        province_id: 1,
    },
    {
        id: 86,
        name: "مصيری",
        province_id: 1,
    },
    {
        id: 87,
        name: "ممسني(نورآباد)،مصيری",
        province_id: 1,
    },
    {
        id: 88,
        name: "مهر",
        province_id: 1,
    },
    {
        id: 89,
        name: "مهر،گله دار،وراوی",
        province_id: 1,
    },
    {
        id: 90,
        name: "ميمند",
        province_id: 1,
    },
    {
        id: 92,
        name: "نوبندگان",
        province_id: 1,
    },
    {
        id: 93,
        name: "نودان",
        province_id: 1,
    },
    {
        id: 94,
        name: "نورآباد",
        province_id: 1,
    },
    {
        id: 95,
        name: "نی ريز",
        province_id: 1,
    },
    {
        id: 96,
        name: "نيريز،آباده طشک، مشکان",
        province_id: 1,
    },
    {
        id: 97,
        name: "وراوی",
        province_id: 1,
    },
    {
        id: 98,
        name: "اختيارآباد",
        province_id: 2,
    },
    {
        id: 99,
        name: "ارزونيه",
        province_id: 2,
    },
    {
        id: 100,
        name: "ارگ جديد بم",
        province_id: 2,
    },
    {
        id: 101,
        name: "انار",
        province_id: 2,
    },
    {
        id: 102,
        name: "انبرآباد",
        province_id: 2,
    },
    {
        id: 103,
        name: "اندوهجرد",
        province_id: 2,
    },
    {
        id: 104,
        name: "باغين",
        province_id: 2,
    },
    {
        id: 105,
        name: "بافت",
        province_id: 2,
    },
    {
        id: 106,
        name: "بافت،بزنجان،ارزونيه،رابر",
        province_id: 2,
    },
    {
        id: 107,
        name: "بردسير",
        province_id: 2,
    },
    {
        id: 108,
        name: "بردسير،گلزار،نکار",
        province_id: 2,
    },
    {
        id: 109,
        name: "بروات",
        province_id: 2,
    },
    {
        id: 110,
        name: "بزنجان",
        province_id: 2,
    },
    {
        id: 111,
        name: "بم",
        province_id: 2,
    },
    {
        id: 112,
        name: "بم،بروات،محمدآباد،فهرج،نرماشير",
        province_id: 2,
    },
    {
        id: 113,
        name: "بهرمان",
        province_id: 2,
    },
    {
        id: 114,
        name: "پاريز",
        province_id: 2,
    },
    {
        id: 115,
        name: "جبالبارز",
        province_id: 2,
    },
    {
        id: 116,
        name: "جوپار",
        province_id: 2,
    },
    {
        id: 117,
        name: "جيرفت",
        province_id: 2,
    },
    {
        id: 118,
        name: "جيرفت،جبالبارز،درب بهشت",
        province_id: 2,
    },
    {
        id: 119,
        name: "چترود",
        province_id: 2,
    },
    {
        id: 120,
        name: "حسين آباد",
        province_id: 2,
    },
    {
        id: 121,
        name: "خانوک",
        province_id: 2,
    },
    {
        id: 122,
        name: "درب بهشت",
        province_id: 2,
    },
    {
        id: 123,
        name: "دهج",
        province_id: 2,
    },
    {
        id: 124,
        name: "رابر",
        province_id: 2,
    },
    {
        id: 125,
        name: "راور",
        province_id: 2,
    },
    {
        id: 126,
        name: "راين",
        province_id: 2,
    },
    {
        id: 127,
        name: "رفسنجان",
        province_id: 2,
    },
    {
        id: 128,
        name: "رفسنجان،حسين آباد،بهرمان",
        province_id: 2,
    },
    {
        id: 129,
        name: "رودبار",
        province_id: 2,
    },
    {
        id: 130,
        name: "ريحان شهر",
        province_id: 2,
    },
    {
        id: 131,
        name: "زرند",
        province_id: 2,
    },
    {
        id: 132,
        name: "زرند،خانوک،کياشهر،کوهبنان",
        province_id: 2,
    },
    {
        id: 133,
        name: "زنگی آباد",
        province_id: 2,
    },
    {
        id: 134,
        name: "زيد آباد",
        province_id: 2,
    },
    {
        id: 135,
        name: "سرچشمه",
        province_id: 2,
    },
    {
        id: 136,
        name: "سيرجان",
        province_id: 2,
    },
    {
        id: 137,
        name: "سيرجان،زيدآباد،نجف شهر",
        province_id: 2,
    },
    {
        id: 138,
        name: "شهداد",
        province_id: 2,
    },
    {
        id: 139,
        name: "شهر بابک،دهج",
        province_id: 2,
    },
    {
        id: 140,
        name: "شهربابک",
        province_id: 2,
    },
    {
        id: 141,
        name: "فارياب",
        province_id: 2,
    },
    {
        id: 142,
        name: "فهرج",
        province_id: 2,
    },
    {
        id: 143,
        name: "قلعه گنج",
        province_id: 2,
    },
    {
        id: 144,
        name: "کاظم آباد",
        province_id: 2,
    },
    {
        id: 145,
        name: "کبوترخان",
        province_id: 2,
    },
    {
        id: 146,
        name: "کبوترخان",
        province_id: 2,
    },
    {
        id: 147,
        name: "کرمان",
        province_id: 2,
    },
    {
        id: 148,
        name: "کرمان،اختيارآباد،باغين،شهداد..",
        province_id: 2,
    },
    {
        id: 149,
        name: "کشکونيه",
        province_id: 2,
    },
    {
        id: 150,
        name: "کوهبنان",
        province_id: 2,
    },
    {
        id: 151,
        name: "کهنوج",
        province_id: 2,
    },
    {
        id: 152,
        name: "کهنوج،رودبار،فارياب،منوجان",
        province_id: 2,
    },
    {
        id: 153,
        name: "کيانشهر",
        province_id: 2,
    },
    {
        id: 154,
        name: "گشکوييه",
        province_id: 2,
    },
    {
        id: 155,
        name: "گلباف",
        province_id: 2,
    },
    {
        id: 156,
        name: "گلزار",
        province_id: 2,
    },
    {
        id: 157,
        name: "ماهان",
        province_id: 2,
    },
    {
        id: 158,
        name: "محمدآباد(ريگان)",
        province_id: 2,
    },
    {
        id: 726,
        name: "کهک",
        province_id: 14,
    },
    {
        id: 728,
        name: "ولايت",
        province_id: 14,
    },
    {
        id: 729,
        name: "آزاد شهر",
        province_id: 15,
    },
    {
        id: 730,
        name: "آق قلا",
        province_id: 15,
    },
    {
        id: 731,
        name: "آق قلا ، انبار آلوم",
        province_id: 15,
    },
    {
        id: 732,
        name: "انبارالوم",
        province_id: 15,
    },
    {
        id: 733,
        name: "اينچه برون",
        province_id: 15,
    },
    {
        id: 734,
        name: "بناور",
        province_id: 15,
    },
    {
        id: 735,
        name: "بندر ترکمن",
        province_id: 15,
    },
    {
        id: 736,
        name: "بندر ترکمن،گميش تپه",
        province_id: 15,
    },
    {
        id: 737,
        name: "بندرگز",
        province_id: 15,
    },
    {
        id: 738,
        name: "بندرگز،نوکنده",
        province_id: 15,
    },
    {
        id: 739,
        name: "خان ببين",
        province_id: 15,
    },
    {
        id: 740,
        name: "دلند",
        province_id: 15,
    },
    {
        id: 741,
        name: "راميان",
        province_id: 15,
    },
    {
        id: 742,
        name: "راميان،خانببين،دلند",
        province_id: 15,
    },
    {
        id: 743,
        name: "سرخنکلاته",
        province_id: 15,
    },
    {
        id: 744,
        name: "سيمين شهر",
        province_id: 15,
    },
    {
        id: 745,
        name: "علی آباد",
        province_id: 15,
    },
    {
        id: 746,
        name: "علی آباد،فاضل آباد",
        province_id: 15,
    },
    {
        id: 747,
        name: "فاضل آباد",
        province_id: 15,
    },
    {
        id: 748,
        name: "کردکوی",
        province_id: 15,
    },
    {
        id: 749,
        name: "کردکوی",
        province_id: 15,
    },
    {
        id: 750,
        name: "کلاله",
        province_id: 15,
    },
    {
        id: 751,
        name: "کلاله،مراوه تپه",
        province_id: 15,
    },
    {
        id: 752,
        name: "گاليکش",
        province_id: 15,
    },
    {
        id: 753,
        name: "گاليکش",
        province_id: 15,
    },
    {
        id: 754,
        name: "گرگان",
        province_id: 15,
    },
    {
        id: 755,
        name: "گرگان،سرخنکلاته",
        province_id: 15,
    },
    {
        id: 756,
        name: "گميش تپه",
        province_id: 15,
    },
    {
        id: 757,
        name: "گميشان",
        province_id: 15,
    },
    {
        id: 758,
        name: "گنبد،اينچه برون",
        province_id: 15,
    },
    {
        id: 759,
        name: "گنبدکاووس",
        province_id: 15,
    },
    {
        id: 760,
        name: "مراوه تپه",
        province_id: 15,
    },
    {
        id: 761,
        name: "مينو دشت",
        province_id: 15,
    },
    {
        id: 762,
        name: "مينودشت",
        province_id: 15,
    },
    {
        id: 764,
        name: "نگين شهر",
        province_id: 15,
    },
    {
        id: 765,
        name: "نوده خاندوز",
        province_id: 15,
    },
    {
        id: 766,
        name: "نوکنده",
        province_id: 15,
    },
    {
        id: 767,
        name: "اردل",
        province_id: 16,
    },
    {
        id: 768,
        name: "اردل،ناغان",
        province_id: 16,
    },
    {
        id: 769,
        name: "الونی",
        province_id: 16,
    },
    {
        id: 770,
        name: "بابا حيدر",
        province_id: 16,
    },
    {
        id: 771,
        name: "بروجن",
        province_id: 16,
    },
    {
        id: 772,
        name: "بروجن،سفيددشت،فرادبنه",
        province_id: 16,
    },
    {
        id: 773,
        name: "بلداجی",
        province_id: 16,
    },
    {
        id: 774,
        name: "بلداچی",
        province_id: 16,
    },
    {
        id: 775,
        name: "بن",
        province_id: 16,
    },
    {
        id: 776,
        name: "جونقان",
        province_id: 16,
    },
    {
        id: 777,
        name: "چالشتر",
        province_id: 16,
    },
    {
        id: 778,
        name: "چلگرد",
        province_id: 16,
    },
    {
        id: 779,
        name: "سامان",
        province_id: 16,
    },
    {
        id: 780,
        name: "سفيددشت",
        province_id: 16,
    },
    {
        id: 781,
        name: "سودجان",
        province_id: 16,
    },
    {
        id: 782,
        name: "سورشجان",
        province_id: 16,
    },
    {
        id: 783,
        name: "شلمزار",
        province_id: 16,
    },
    {
        id: 784,
        name: "شهرکرد",
        province_id: 16,
    },
    {
        id: 785,
        name: "شهرکرد،کيان،هفشجان،نافچ،شلمزار",
        province_id: 16,
    },
    {
        id: 786,
        name: "طاقانک",
        province_id: 16,
    },
    {
        id: 787,
        name: "طالقانک",
        province_id: 16,
    },
    {
        id: 788,
        name: "فارسان",
        province_id: 16,
    },
    {
        id: 789,
        name: "فارسان،باباحيدر،جونقان",
        province_id: 16,
    },
    {
        id: 790,
        name: "فرادبنه",
        province_id: 16,
    },
    {
        id: 791,
        name: "فرخ شهر",
        province_id: 16,
    },
    {
        id: 792,
        name: "فرخشهر",
        province_id: 16,
    },
    {
        id: 793,
        name: "کوهرنگ",
        province_id: 16,
    },
    {
        id: 794,
        name: "کوهرنگ،چلگرد",
        province_id: 16,
    },
    {
        id: 795,
        name: "کيان",
        province_id: 16,
    },
    {
        id: 796,
        name: "گندمان",
        province_id: 16,
    },
    {
        id: 797,
        name: "گهرو",
        province_id: 16,
    },
    {
        id: 798,
        name: "لردگان",
        province_id: 16,
    },
    {
        id: 799,
        name: "لردگان،الونی،مال خليفه",
        province_id: 16,
    },
    {
        id: 800,
        name: "مال خليفه",
        province_id: 16,
    },
    {
        id: 801,
        name: "ناغان",
        province_id: 16,
    },
    {
        id: 802,
        name: "نافچ",
        province_id: 16,
    },
    {
        id: 804,
        name: "هفشجان",
        province_id: 16,
    },
    {
        id: 805,
        name: "آب پخش",
        province_id: 17,
    },
    {
        id: 806,
        name: "آبدان",
        province_id: 17,
    },
    {
        id: 807,
        name: "امام حسن",
        province_id: 17,
    },
    {
        id: 888,
        name: "آستارا",
        province_id: 19,
    },
    {
        id: 889,
        name: "آستانه اشرفيه",
        province_id: 19,
    },
    {
        id: 890,
        name: "آستانه اشرفيه،کياشهر",
        province_id: 19,
    },
    {
        id: 891,
        name: "احمد سرگوراب",
        province_id: 19,
    },
    {
        id: 892,
        name: "اسالم",
        province_id: 19,
    },
    {
        id: 893,
        name: "اطاقور",
        province_id: 19,
    },
    {
        id: 894,
        name: "املش",
        province_id: 19,
    },
    {
        id: 895,
        name: "أستارا",
        province_id: 19,
    },
    {
        id: 896,
        name: "بازارجمعه",
        province_id: 19,
    },
    {
        id: 897,
        name: "بره سر",
        province_id: 19,
    },
    {
        id: 898,
        name: "بندر انزلی",
        province_id: 19,
    },
    {
        id: 899,
        name: "بندرانزلی",
        province_id: 19,
    },
    {
        id: 900,
        name: "پره سر",
        province_id: 19,
    },
    {
        id: 901,
        name: "تالش",
        province_id: 19,
    },
    {
        id: 902,
        name: "تونکابن",
        province_id: 19,
    },
    {
        id: 903,
        name: "جيرنده",
        province_id: 19,
    },
    {
        id: 904,
        name: "چابکسر",
        province_id: 19,
    },
    {
        id: 905,
        name: "چوبر",
        province_id: 19,
    },
    {
        id: 906,
        name: "حويق",
        province_id: 19,
    },
    {
        id: 907,
        name: "خشکبيجار",
        province_id: 19,
    },
    {
        id: 908,
        name: "خمام",
        province_id: 19,
    },
    {
        id: 909,
        name: "ديلمان",
        province_id: 19,
    },
    {
        id: 910,
        name: "رانکوه",
        province_id: 19,
    },
    {
        id: 911,
        name: "رحيم آباد",
        province_id: 19,
    },
    {
        id: 912,
        name: "رستم آباد",
        province_id: 19,
    },
    {
        id: 913,
        name: "رستم آباد،جيرنده",
        province_id: 19,
    },
    {
        id: 914,
        name: "رشت",
        province_id: 19,
    },
    {
        id: 915,
        name: "رشت,خشکبيجار،سنگر،کوچصفهان",
        province_id: 19,
    },
    {
        id: 916,
        name: "رضوانشهر",
        province_id: 19,
    },
    {
        id: 917,
        name: "رضوانشهر،پره سر",
        province_id: 19,
    },
    {
        id: 918,
        name: "رودبار",
        province_id: 19,
    },
    {
        id: 919,
        name: "رودبار،منجيل،لوشان،بره سر،...",
        province_id: 19,
    },
    {
        id: 920,
        name: "رودبنه",
        province_id: 19,
    },
    {
        id: 921,
        name: "رودسر",
        province_id: 19,
    },
    {
        id: 922,
        name: "رودسر،واجارگاه،چابکسر،........",
        province_id: 19,
    },
    {
        id: 923,
        name: "زيبا کنار",
        province_id: 19,
    },
    {
        id: 924,
        name: "سنگر",
        province_id: 19,
    },
    {
        id: 925,
        name: "سياهکل",
        province_id: 19,
    },
    {
        id: 926,
        name: "سياهکل،ديلمان",
        province_id: 19,
    },
    {
        id: 927,
        name: "شفت",
        province_id: 19,
    },
    {
        id: 928,
        name: "شفت،احمدسرگوراب",
        province_id: 19,
    },
    {
        id: 929,
        name: "شلمان",
        province_id: 19,
    },
    {
        id: 930,
        name: "صومعه سرا",
        province_id: 19,
    },
    {
        id: 931,
        name: "صومعه سرا،مرچقل،گوراب زرميخ",
        province_id: 19,
    },
    {
        id: 932,
        name: "ضيابر",
        province_id: 19,
    },
    {
        id: 933,
        name: "فومن",
        province_id: 19,
    },
    {
        id: 934,
        name: "فومن،ماسوله",
        province_id: 19,
    },
    {
        id: 935,
        name: "کلاچای",
        province_id: 19,
    },
    {
        id: 936,
        name: "کوچصفهان",
        province_id: 19,
    },
    {
        id: 937,
        name: "کومله",
        province_id: 19,
    },
    {
        id: 938,
        name: "کيا شهر",
        province_id: 19,
    },
    {
        id: 939,
        name: "گوراب زرميخ",
        province_id: 19,
    },
    {
        id: 940,
        name: "لاهيجان",
        province_id: 19,
    },
    {
        id: 941,
        name: "لاهيجان,رودبنه",
        province_id: 19,
    },
    {
        id: 942,
        name: "لشت نشا",
        province_id: 19,
    },
    {
        id: 943,
        name: "لشت نشاء",
        province_id: 19,
    },
    {
        id: 944,
        name: "لنگرود",
        province_id: 19,
    },
    {
        id: 945,
        name: "لنگرود،اطاقور،شلمان،کومله",
        province_id: 19,
    },
    {
        id: 946,
        name: "لوشان",
        province_id: 19,
    },
    {
        id: 947,
        name: "لوندويل",
        province_id: 19,
    },
    {
        id: 948,
        name: "ليسار",
        province_id: 19,
    },
    {
        id: 949,
        name: "ماسال",
        province_id: 19,
    },
    {
        id: 950,
        name: "ماسال،بازارجمعه",
        province_id: 19,
    },
    {
        id: 951,
        name: "ماسوله",
        province_id: 19,
    },
    {
        id: 952,
        name: "مرجقل",
        province_id: 19,
    },
    {
        id: 953,
        name: "منجيل",
        province_id: 19,
    },
    {
        id: 955,
        name: "واجارگاه",
        province_id: 19,
    },
    {
        id: 956,
        name: "هشتپر",
        province_id: 19,
    },
    {
        id: 957,
        name: "هشتپر,طوالش,اسالم,ليسار",
        province_id: 19,
    },
    {
        id: 958,
        name: "ارادان",
        province_id: 20,
    },
    {
        id: 959,
        name: "اميريه",
        province_id: 20,
    },
    {
        id: 960,
        name: "ايوانکی",
        province_id: 20,
    },
    {
        id: 961,
        name: "بسطام",
        province_id: 20,
    },
    {
        id: 962,
        name: "بيارجمند",
        province_id: 20,
    },
    {
        id: 963,
        name: "دامغان",
        province_id: 20,
    },
    {
        id: 964,
        name: "دامغان،ديباج،اميريه",
        province_id: 20,
    },
    {
        id: 965,
        name: "ديباج",
        province_id: 20,
    },
    {
        id: 966,
        name: "سرخه",
        province_id: 20,
    },
    {
        id: 967,
        name: "سمنان",
        province_id: 20,
    },
    {
        id: 1205,
        name: "معلم کلايه",
        province_id: 26,
    },
    {
        id: 1207,
        name: "نورجه",
        province_id: 26,
    },
    {
        id: 1208,
        name: "آمل",
        province_id: 27,
    },
    {
        id: 1209,
        name: "آمل،رينه،گزنک",
        province_id: 27,
    },
    {
        id: 1210,
        name: "الاشت",
        province_id: 27,
    },
    {
        id: 1211,
        name: "اميرکلا",
        province_id: 27,
    },
    {
        id: 1212,
        name: "ايزدشهر",
        province_id: 27,
    },
    {
        id: 1213,
        name: "بابل",
        province_id: 27,
    },
    {
        id: 1214,
        name: "بابل ـ گلوگاه",
        province_id: 27,
    },
    {
        id: 1215,
        name: "بابل،اميرکلا،مرزيکلا،گلوگاه،..",
        province_id: 27,
    },
    {
        id: 1216,
        name: "بابلسر",
        province_id: 27,
    },
    {
        id: 1217,
        name: "بابلسر،بهنمير،کله بست،........",
        province_id: 27,
    },
    {
        id: 1218,
        name: "بلده",
        province_id: 27,
    },
    {
        id: 1219,
        name: "بهشهر",
        province_id: 27,
    },
    {
        id: 1220,
        name: "بهشهر ـ گلوگاه",
        province_id: 27,
    },
    {
        id: 1221,
        name: "بهشهر،رستمکلا،گلوگاه",
        province_id: 27,
    },
    {
        id: 1222,
        name: "بهنمير",
        province_id: 27,
    },
    {
        id: 1223,
        name: "پل سفيد(سوادکوه)",
        province_id: 27,
    },
    {
        id: 1224,
        name: "تنکابن",
        province_id: 27,
    },
    {
        id: 1225,
        name: "تنکابن،خرم آباد،سلماس شهر،....",
        province_id: 27,
    },
    {
        id: 1226,
        name: "جويبار",
        province_id: 27,
    },
    {
        id: 1227,
        name: "چالوس",
        province_id: 27,
    },
    {
        id: 1228,
        name: "چالوس،مرزن آباد",
        province_id: 27,
    },
    {
        id: 1229,
        name: "چمستان",
        province_id: 27,
    },
    {
        id: 1230,
        name: "خرم آباد",
        province_id: 27,
    },
    {
        id: 1231,
        name: "خليل شهر",
        province_id: 27,
    },
    {
        id: 1232,
        name: "خوش رودپی",
        province_id: 27,
    },
    {
        id: 1233,
        name: "دابودشت",
        province_id: 27,
    },
    {
        id: 1234,
        name: "درياکنار",
        province_id: 27,
    },
    {
        id: 1235,
        name: "درياکناربابلسر",
        province_id: 27,
    },
    {
        id: 1236,
        name: "رامسر",
        province_id: 27,
    },
    {
        id: 1237,
        name: "رامسر،کتالم و سادات شهر",
        province_id: 27,
    },
    {
        id: 1238,
        name: "رستمکلا",
        province_id: 27,
    },
    {
        id: 1239,
        name: "رويان",
        province_id: 27,
    },
    {
        id: 1240,
        name: "رينه",
        province_id: 27,
    },
    {
        id: 1241,
        name: "زرگرمحله",
        province_id: 27,
    },
    {
        id: 1242,
        name: "زيرآب",
        province_id: 27,
    },
    {
        id: 1243,
        name: "سادات شهر",
        province_id: 27,
    },
    {
        id: 1244,
        name: "ساری",
        province_id: 27,
    },
    {
        id: 1245,
        name: "ساری،کياسر،سورک",
        province_id: 27,
    },
    {
        id: 1246,
        name: "سرخرود",
        province_id: 27,
    },
    {
        id: 1247,
        name: "سلمان شهر",
        province_id: 27,
    },
    {
        id: 1248,
        name: "سوادکوه",
        province_id: 27,
    },
    {
        id: 1249,
        name: "سوادکوه(پل سفيد)،آلاشت،پل سفيد",
        province_id: 27,
    },
    {
        id: 1250,
        name: "سورک",
        province_id: 27,
    },
    {
        id: 1251,
        name: "شيرگاه",
        province_id: 27,
    },
    {
        id: 1252,
        name: "عباس آباد",
        province_id: 27,
    },
    {
        id: 1253,
        name: "فريدونکنار",
        province_id: 27,
    },
    {
        id: 1254,
        name: "فريم",
        province_id: 27,
    },
    {
        id: 1255,
        name: "قائم شهر",
        province_id: 27,
    },
    {
        id: 1256,
        name: "قائمشهر،کياکلا",
        province_id: 27,
    },
    {
        id: 1257,
        name: "کتالم",
        province_id: 27,
    },
    {
        id: 1258,
        name: "کلارآباد",
        province_id: 27,
    },
    {
        id: 1259,
        name: "کلاردشت",
        province_id: 27,
    },
    {
        id: 1260,
        name: "کلوگاه بندپس",
        province_id: 27,
    },
    {
        id: 1261,
        name: "کله بست",
        province_id: 27,
    },
    {
        id: 1262,
        name: "کوهی خيل",
        province_id: 27,
    },
    {
        id: 1263,
        name: "کياسر",
        province_id: 27,
    },
    {
        id: 1264,
        name: "کياکلا",
        province_id: 27,
    },
    {
        id: 1265,
        name: "گتاب",
        province_id: 27,
    },
    {
        id: 1266,
        name: "گزنک",
        province_id: 27,
    },
    {
        id: 1267,
        name: "لاريجان",
        province_id: 27,
    },
    {
        id: 1268,
        name: "محمودآباد",
        province_id: 27,
    },
    {
        id: 1269,
        name: "محمودآباد،سرخرود",
        province_id: 27,
    },
    {
        id: 1270,
        name: "مرزن‌ آباد",
        province_id: 27,
    },
    {
        id: 1271,
        name: "مرزيکلا",
        province_id: 27,
    },
    {
        id: 1273,
        name: "نشتارود",
        province_id: 27,
    },
    {
        id: 1274,
        name: "نکا",
        province_id: 27,
    },
    {
        id: 1275,
        name: "نکاء",
        province_id: 27,
    },
    {
        id: 1276,
        name: "نور",
        province_id: 27,
    },
    {
        id: 1277,
        name: "نور،رويان،بلده،چمستان",
        province_id: 27,
    },
    {
        id: 1278,
        name: "نوشهر",
        province_id: 27,
    },
    {
        id: 1279,
        name: "آستانه",
        province_id: 28,
    },
    {
        id: 1280,
        name: "آشتيان",
        province_id: 28,
    },
    {
        id: 1281,
        name: "اراک",
        province_id: 28,
    },
    {
        id: 1282,
        name: "اراک،سنجان،خنداب،کميجان،......",
        province_id: 28,
    },
    {
        id: 1283,
        name: "پرندک",
        province_id: 28,
    }
]

export default cities;
