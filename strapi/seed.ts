/**
 * Strapi Seed Script
 * يملأ الداتا بالـ 27 مهارة + المحتوى التعليمي + الكويزات
 *
 * Usage:
 *   1. Make sure Strapi is running (npm run develop)
 *   2. Run: npx ts-node seed.ts
 */

const STRAPI_URL = "http://localhost:1337";

// ─── Types ─────────────────────────────────────────

interface QuizOption {
    text: string;
    isCorrect: boolean;
    sortOrder: number;
}

interface Quiz {
    question: string;
    options: QuizOption[];
}

interface SkillContent {
    type: string;
    title: string;
    text: string;
    sortOrder: number;
}

interface SkillData {
    category: string;
    title: string;
    description: string;
    difficulty: string;
    sortOrder: number;
    contents: SkillContent[];
    quiz: Quiz;
}

interface LoginResponse {
    data: {
        token: string;
    };
}

interface CreatedEntry {
    id: number;
    documentId: string;
}

// ─── بيانات المهارات ───────────────────────────────────────

const SKILLS_DATA: SkillData[] = [
    // ─── COOKING 🍳 ─────────────────────────────────
    {
        category: "COOKING",
        title: "ساندويتش",
        description: "تعلم كيفية تحضير ساندويتش بسيط وصحي خطوة بخطوة",
        difficulty: "EASY",
        sortOrder: 1,
        contents: [
            { type: "TEXT", title: "المكونات", text: "خبز توست، جبنة، خس، طماطم", sortOrder: 1 },
            { type: "TEXT", title: "الخطوات", text: "١. ضع الجبنة على الخبز\n٢. أضف الخس والطماطم\n٣. ضع الخبزة الثانية فوق", sortOrder: 2 },
        ],
        quiz: {
            question: "ما هو أول شيء نضعه على الخبز؟",
            options: [
                { text: "جبنة", isCorrect: true, sortOrder: 1 },
                { text: "ماء", isCorrect: false, sortOrder: 2 },
                { text: "سكر", isCorrect: false, sortOrder: 3 },
                { text: "ملح", isCorrect: false, sortOrder: 4 },
            ],
        },
    },
    {
        category: "COOKING",
        title: "سلطة فواكه",
        description: "تعلم تحضير سلطة فواكه لذيذة وملونة",
        difficulty: "MEDIUM",
        sortOrder: 2,
        contents: [
            { type: "TEXT", title: "الفواكه المطلوبة", text: "تفاح، موز، برتقال، فراولة", sortOrder: 1 },
            { type: "TEXT", title: "الخطوات", text: "١. اغسل الفواكه جيداً\n٢. قطّعها قطع صغيرة\n٣. اخلطها في طبق كبير", sortOrder: 2 },
        ],
        quiz: {
            question: "ماذا نفعل قبل تقطيع الفواكه؟",
            options: [
                { text: "نغسلها", isCorrect: true, sortOrder: 1 },
                { text: "نطبخها", isCorrect: false, sortOrder: 2 },
                { text: "نرميها", isCorrect: false, sortOrder: 3 },
                { text: "نجمدها", isCorrect: false, sortOrder: 4 },
            ],
        },
    },
    {
        category: "COOKING",
        title: "بان كيك",
        description: "تعلم تحضير البان كيك اللذيذ",
        difficulty: "HARD",
        sortOrder: 3,
        contents: [
            { type: "TEXT", title: "المكونات", text: "دقيق، بيض، حليب، سكر، زبدة", sortOrder: 1 },
            { type: "TEXT", title: "الخطوات", text: "١. اخلط الدقيق والسكر\n٢. أضف البيض والحليب\n٣. اسكب العجينة في المقلاة\n٤. اقلبها عندما تظهر الفقاعات", sortOrder: 2 },
        ],
        quiz: {
            question: "متى نقلب البان كيك؟",
            options: [
                { text: "عندما تظهر فقاعات", isCorrect: true, sortOrder: 1 },
                { text: "فوراً", isCorrect: false, sortOrder: 2 },
                { text: "بعد ساعة", isCorrect: false, sortOrder: 3 },
                { text: "لا نقلبها", isCorrect: false, sortOrder: 4 },
            ],
        },
    },

    // ─── MUSIC 🎵 ─────────────────────────────────
    {
        category: "MUSIC",
        title: "تصفيق بإيقاع",
        description: "تعلم التصفيق مع الإيقاع الموسيقي",
        difficulty: "EASY",
        sortOrder: 1,
        contents: [
            { type: "TEXT", title: "ما هو الإيقاع؟", text: "الإيقاع هو نمط الأصوات في الموسيقى", sortOrder: 1 },
            { type: "TEXT", title: "كيف نتعلم؟", text: "١. استمع للموسيقى\n٢. صفّق مع كل نبضة\n٣. حاول أن تكون منتظماً", sortOrder: 2 },
        ],
        quiz: {
            question: "ما هو الإيقاع؟",
            options: [
                { text: "نمط الأصوات في الموسيقى", isCorrect: true, sortOrder: 1 },
                { text: "لون من الألوان", isCorrect: false, sortOrder: 2 },
                { text: "نوع من الطعام", isCorrect: false, sortOrder: 3 },
                { text: "حيوان", isCorrect: false, sortOrder: 4 },
            ],
        },
    },
    {
        category: "MUSIC",
        title: "أصوات الآلات",
        description: "تعرف على أصوات الآلات الموسيقية المختلفة",
        difficulty: "MEDIUM",
        sortOrder: 2,
        contents: [
            { type: "TEXT", title: "الآلات الموسيقية", text: "البيانو، الجيتار، الطبل، الناي", sortOrder: 1 },
            { type: "TEXT", title: "كل آلة لها صوت مميز", text: "البيانو: صوت رنان\nالطبل: صوت قوي\nالناي: صوت ناعم", sortOrder: 2 },
        ],
        quiz: {
            question: "أي آلة لها صوت رنان؟",
            options: [
                { text: "البيانو", isCorrect: true, sortOrder: 1 },
                { text: "الطبل", isCorrect: false, sortOrder: 2 },
                { text: "الصافرة", isCorrect: false, sortOrder: 3 },
                { text: "المثلث", isCorrect: false, sortOrder: 4 },
            ],
        },
    },
    {
        category: "MUSIC",
        title: "عزف بسيط",
        description: "تعلم العزف البسيط على آلة موسيقية",
        difficulty: "HARD",
        sortOrder: 3,
        contents: [
            { type: "TEXT", title: "اختيار الآلة", text: "ابدأ بآلة بسيطة مثل الإكسيلوفون أو الطبل", sortOrder: 1 },
            { type: "TEXT", title: "أول نغمة", text: "١. امسك العصا بيدك\n٢. اضرب على الآلة برفق\n٣. استمع للصوت", sortOrder: 2 },
        ],
        quiz: {
            question: "ما هي أفضل آلة للمبتدئين؟",
            options: [
                { text: "الإكسيلوفون", isCorrect: true, sortOrder: 1 },
                { text: "الكمان", isCorrect: false, sortOrder: 2 },
                { text: "البيانو الكبير", isCorrect: false, sortOrder: 3 },
                { text: "الهارب", isCorrect: false, sortOrder: 4 },
            ],
        },
    },

    // ─── MATH 🔢 ─────────────────────────────────
    {
        category: "MATH",
        title: "عد 1-5",
        description: "تعلم العد من واحد إلى خمسة",
        difficulty: "EASY",
        sortOrder: 1,
        contents: [
            { type: "TEXT", title: "الأرقام", text: "١ - واحد\n٢ - اثنان\n٣ - ثلاثة\n٤ - أربعة\n٥ - خمسة", sortOrder: 1 },
            { type: "TEXT", title: "تمرين", text: "عُد أصابع يدك: واحد، اثنان، ثلاثة، أربعة، خمسة!", sortOrder: 2 },
        ],
        quiz: {
            question: "ما العدد الذي يأتي بعد ٣؟",
            options: [
                { text: "٤", isCorrect: true, sortOrder: 1 },
                { text: "٢", isCorrect: false, sortOrder: 2 },
                { text: "٥", isCorrect: false, sortOrder: 3 },
                { text: "١", isCorrect: false, sortOrder: 4 },
            ],
        },
    },
    {
        category: "MATH",
        title: "جمع بسيط",
        description: "تعلم عمليات الجمع البسيطة",
        difficulty: "MEDIUM",
        sortOrder: 2,
        contents: [
            { type: "TEXT", title: "ما هو الجمع؟", text: "الجمع هو إضافة أعداد لبعضها\nمثال: ١ + ١ = ٢", sortOrder: 1 },
            { type: "TEXT", title: "أمثلة", text: "١ + ٢ = ٣\n٢ + ٢ = ٤\n٣ + ٢ = ٥", sortOrder: 2 },
        ],
        quiz: {
            question: "كم يساوي ٢ + ٣ ؟",
            options: [
                { text: "٥", isCorrect: true, sortOrder: 1 },
                { text: "٤", isCorrect: false, sortOrder: 2 },
                { text: "٦", isCorrect: false, sortOrder: 3 },
                { text: "٣", isCorrect: false, sortOrder: 4 },
            ],
        },
    },
    {
        category: "MATH",
        title: "أنماط",
        description: "تعلم التعرف على الأنماط والتسلسلات",
        difficulty: "HARD",
        sortOrder: 3,
        contents: [
            { type: "TEXT", title: "ما هو النمط؟", text: "النمط هو شيء يتكرر بترتيب معين\nمثال: 🔴🔵🔴🔵🔴🔵", sortOrder: 1 },
            { type: "TEXT", title: "أمثلة", text: "١، ٢، ١، ٢، ١، ٢\nأحمر، أزرق، أحمر، أزرق", sortOrder: 2 },
        ],
        quiz: {
            question: "ما الذي يأتي بعد: 🔴🔵🔴🔵🔴 ؟",
            options: [
                { text: "🔵", isCorrect: true, sortOrder: 1 },
                { text: "🔴", isCorrect: false, sortOrder: 2 },
                { text: "🟢", isCorrect: false, sortOrder: 3 },
                { text: "🟡", isCorrect: false, sortOrder: 4 },
            ],
        },
    },

    // ─── SONGS 🎤 ─────────────────────────────────
    {
        category: "SONGS",
        title: "أغنية الحروف",
        description: "تعلم أغنية الحروف العربية",
        difficulty: "EASY",
        sortOrder: 1,
        contents: [
            { type: "TEXT", title: "كلمات الأغنية", text: "ألف باء تاء ثاء\nجيم حاء خاء\nدال ذال راء زاي\nهيا نغني سوا!", sortOrder: 1 },
            { type: "TEXT", title: "طريقة الغناء", text: "غنّي الحروف ببطء ثم بسرعة أكبر", sortOrder: 2 },
        ],
        quiz: {
            question: "ما هو أول حرف في الأبجدية العربية؟",
            options: [
                { text: "ألف", isCorrect: true, sortOrder: 1 },
                { text: "باء", isCorrect: false, sortOrder: 2 },
                { text: "ياء", isCorrect: false, sortOrder: 3 },
                { text: "تاء", isCorrect: false, sortOrder: 4 },
            ],
        },
    },
    {
        category: "SONGS",
        title: "أغنية الألوان",
        description: "تعلم الألوان من خلال أغنية ممتعة",
        difficulty: "MEDIUM",
        sortOrder: 2,
        contents: [
            { type: "TEXT", title: "كلمات الأغنية", text: "أحمر أصفر أزرق أخضر\nألوان جميلة تملأ الدنيا\nأبيض أسود برتقالي\nيا ما أحلى الألوان!", sortOrder: 1 },
            { type: "TEXT", title: "النشاط", text: "أشر إلى الأشياء حولك وقل لونها مع الأغنية", sortOrder: 2 },
        ],
        quiz: {
            question: "ما لون السماء؟",
            options: [
                { text: "أزرق", isCorrect: true, sortOrder: 1 },
                { text: "أحمر", isCorrect: false, sortOrder: 2 },
                { text: "أخضر", isCorrect: false, sortOrder: 3 },
                { text: "أصفر", isCorrect: false, sortOrder: 4 },
            ],
        },
    },
    {
        category: "SONGS",
        title: "أغنية كاملة",
        description: "تعلم غناء أغنية كاملة من البداية للنهاية",
        difficulty: "HARD",
        sortOrder: 3,
        contents: [
            { type: "TEXT", title: "أغنية طيور الجنة", text: "ماما جابت بيبي\nبيبي صغير حلو\nعيونه مثل القمر\nوخدوده مثل الورد", sortOrder: 1 },
            { type: "TEXT", title: "تمرين الحفظ", text: "١. استمع للأغنية أولاً\n٢. ردد كل سطر\n٣. غنّي الأغنية كاملة", sortOrder: 2 },
        ],
        quiz: {
            question: "في الأغنية، عيون البيبي مثل إيه؟",
            options: [
                { text: "القمر", isCorrect: true, sortOrder: 1 },
                { text: "الشمس", isCorrect: false, sortOrder: 2 },
                { text: "النجوم", isCorrect: false, sortOrder: 3 },
                { text: "البحر", isCorrect: false, sortOrder: 4 },
            ],
        },
    },

    // ─── SPORTS ⚽ ─────────────────────────────────
    {
        category: "SPORTS",
        title: "مشي",
        description: "تعلم المشي الصحيح والمنتظم",
        difficulty: "EASY",
        sortOrder: 1,
        contents: [
            { type: "TEXT", title: "فوائد المشي", text: "المشي يقوي الجسم ويحسن المزاج", sortOrder: 1 },
            { type: "TEXT", title: "كيف نمشي", text: "١. قف بشكل مستقيم\n٢. حرك قدميك بالتناوب\n٣. حرك ذراعيك مع المشي", sortOrder: 2 },
        ],
        quiz: {
            question: "ما فائدة المشي؟",
            options: [
                { text: "يقوي الجسم", isCorrect: true, sortOrder: 1 },
                { text: "يضعف الجسم", isCorrect: false, sortOrder: 2 },
                { text: "لا فائدة له", isCorrect: false, sortOrder: 3 },
                { text: "يسبب النوم", isCorrect: false, sortOrder: 4 },
            ],
        },
    },
    {
        category: "SPORTS",
        title: "قفز",
        description: "تعلم القفز بطريقة آمنة وممتعة",
        difficulty: "MEDIUM",
        sortOrder: 2,
        contents: [
            { type: "TEXT", title: "أنواع القفز", text: "القفز في المكان، القفز للأمام، القفز على رجل واحدة", sortOrder: 1 },
            { type: "TEXT", title: "خطوات القفز", text: "١. اثنِ ركبتيك قليلاً\n٢. ادفع بقدميك للأعلى\n٣. انزل بلطف على قدميك", sortOrder: 2 },
        ],
        quiz: {
            question: "ماذا نفعل قبل القفز؟",
            options: [
                { text: "نثني الركبتين", isCorrect: true, sortOrder: 1 },
                { text: "نجلس", isCorrect: false, sortOrder: 2 },
                { text: "ننام", isCorrect: false, sortOrder: 3 },
                { text: "نأكل", isCorrect: false, sortOrder: 4 },
            ],
        },
    },
    {
        category: "SPORTS",
        title: "رمي كرة",
        description: "تعلم رمي الكرة والتقاطها",
        difficulty: "HARD",
        sortOrder: 3,
        contents: [
            { type: "TEXT", title: "كيفية الإمساك بالكرة", text: "امسك الكرة بيديك الاثنتين بثبات", sortOrder: 1 },
            { type: "TEXT", title: "خطوات الرمي", text: "١. امسك الكرة بكلتا اليدين\n٢. ارفعها فوق رأسك\n٣. ارمها للأمام بلطف\n٤. حاول أن تصيب الهدف", sortOrder: 2 },
        ],
        quiz: {
            question: "كيف نمسك الكرة عند الرمي؟",
            options: [
                { text: "بكلتا اليدين", isCorrect: true, sortOrder: 1 },
                { text: "بقدم واحدة", isCorrect: false, sortOrder: 2 },
                { text: "بالرأس", isCorrect: false, sortOrder: 3 },
                { text: "لا نمسكها", isCorrect: false, sortOrder: 4 },
            ],
        },
    },

    // ─── DRAWING 🎨 ─────────────────────────────────
    {
        category: "DRAWING",
        title: "تلوين",
        description: "تعلم تلوين الأشكال بألوان جميلة",
        difficulty: "EASY",
        sortOrder: 1,
        contents: [
            { type: "TEXT", title: "أدوات التلوين", text: "أقلام ملونة، ألوان شمعية، ألوان مائية", sortOrder: 1 },
            { type: "TEXT", title: "قواعد التلوين", text: "١. اختر اللون المناسب\n٢. لوّن داخل الخطوط\n٣. لا تترك فراغات", sortOrder: 2 },
        ],
        quiz: {
            question: "أين نلوّن؟",
            options: [
                { text: "داخل الخطوط", isCorrect: true, sortOrder: 1 },
                { text: "خارج الورقة", isCorrect: false, sortOrder: 2 },
                { text: "على الطاولة", isCorrect: false, sortOrder: 3 },
                { text: "على الحائط", isCorrect: false, sortOrder: 4 },
            ],
        },
    },
    {
        category: "DRAWING",
        title: "رسم أشكال",
        description: "تعلم رسم الأشكال الهندسية الأساسية",
        difficulty: "MEDIUM",
        sortOrder: 2,
        contents: [
            { type: "TEXT", title: "الأشكال الأساسية", text: "الدائرة ⭕، المربع ⬛، المثلث 🔺، المستطيل", sortOrder: 1 },
            { type: "TEXT", title: "كيف ترسم دائرة", text: "١. ضع القلم على الورقة\n٢. حركه في شكل دائري\n٣. أغلق الدائرة", sortOrder: 2 },
        ],
        quiz: {
            question: "كم ضلع للمربع؟",
            options: [
                { text: "٤ أضلاع", isCorrect: true, sortOrder: 1 },
                { text: "٣ أضلاع", isCorrect: false, sortOrder: 2 },
                { text: "٥ أضلاع", isCorrect: false, sortOrder: 3 },
                { text: "٢ ضلعين", isCorrect: false, sortOrder: 4 },
            ],
        },
    },
    {
        category: "DRAWING",
        title: "رسم وجه",
        description: "تعلم رسم وجه بسيط خطوة بخطوة",
        difficulty: "HARD",
        sortOrder: 3,
        contents: [
            { type: "TEXT", title: "أجزاء الوجه", text: "العيون، الأنف، الفم، الأذنان، الحواجب", sortOrder: 1 },
            { type: "TEXT", title: "خطوات الرسم", text: "١. ارسم دائرة كبيرة للوجه\n٢. ارسم عينين في الوسط\n٣. ارسم أنف صغير\n٤. ارسم فم مبتسم\n٥. أضف الأذنين", sortOrder: 2 },
        ],
        quiz: {
            question: "ما أول خطوة في رسم الوجه؟",
            options: [
                { text: "رسم دائرة كبيرة", isCorrect: true, sortOrder: 1 },
                { text: "رسم العيون", isCorrect: false, sortOrder: 2 },
                { text: "رسم الفم", isCorrect: false, sortOrder: 3 },
                { text: "رسم الشعر", isCorrect: false, sortOrder: 4 },
            ],
        },
    },

    // ─── COMPUTER 💻 ─────────────────────────────────
    {
        category: "COMPUTER",
        title: "النقر بالماوس",
        description: "تعلم استخدام الماوس والنقر",
        difficulty: "EASY",
        sortOrder: 1,
        contents: [
            { type: "TEXT", title: "ما هو الماوس؟", text: "الماوس هو أداة نستخدمها للتحكم في الكمبيوتر", sortOrder: 1 },
            { type: "TEXT", title: "كيفية النقر", text: "١. ضع يدك على الماوس\n٢. حرك المؤشر على الشاشة\n٣. اضغط الزر الأيسر", sortOrder: 2 },
        ],
        quiz: {
            question: "أي زر نضغط عليه عادةً؟",
            options: [
                { text: "الزر الأيسر", isCorrect: true, sortOrder: 1 },
                { text: "الزر الأوسط", isCorrect: false, sortOrder: 2 },
                { text: "كل الأزرار", isCorrect: false, sortOrder: 3 },
                { text: "لا نضغط", isCorrect: false, sortOrder: 4 },
            ],
        },
    },
    {
        category: "COMPUTER",
        title: "الكتابة",
        description: "تعلم الكتابة على لوحة المفاتيح",
        difficulty: "MEDIUM",
        sortOrder: 2,
        contents: [
            { type: "TEXT", title: "لوحة المفاتيح", text: "لوحة المفاتيح فيها حروف وأرقام ورموز", sortOrder: 1 },
            { type: "TEXT", title: "طريقة الكتابة", text: "١. ابحث عن الحرف المطلوب\n٢. اضغط عليه بإصبعك\n٣. شاهد الحرف يظهر على الشاشة", sortOrder: 2 },
        ],
        quiz: {
            question: "ماذا يوجد في لوحة المفاتيح؟",
            options: [
                { text: "حروف وأرقام", isCorrect: true, sortOrder: 1 },
                { text: "ألوان فقط", isCorrect: false, sortOrder: 2 },
                { text: "صور", isCorrect: false, sortOrder: 3 },
                { text: "طعام", isCorrect: false, sortOrder: 4 },
            ],
        },
    },
    {
        category: "COMPUTER",
        title: "فتح برنامج",
        description: "تعلم كيفية فتح واستخدام برنامج على الكمبيوتر",
        difficulty: "HARD",
        sortOrder: 3,
        contents: [
            { type: "TEXT", title: "ما هو البرنامج؟", text: "البرنامج هو تطبيق نستخدمه على الكمبيوتر مثل الرسام أو المتصفح", sortOrder: 1 },
            { type: "TEXT", title: "خطوات فتح برنامج", text: "١. ابحث عن أيقونة البرنامج\n٢. انقر عليها نقرتين سريعتين\n٣. انتظر حتى يفتح البرنامج", sortOrder: 2 },
        ],
        quiz: {
            question: "كم نقرة نحتاج لفتح برنامج؟",
            options: [
                { text: "نقرتين", isCorrect: true, sortOrder: 1 },
                { text: "نقرة واحدة", isCorrect: false, sortOrder: 2 },
                { text: "عشر نقرات", isCorrect: false, sortOrder: 3 },
                { text: "لا نحتاج نقر", isCorrect: false, sortOrder: 4 },
            ],
        },
    },

    // ─── SCIENCE 🔬 ─────────────────────────────────
    {
        category: "SCIENCE",
        title: "الحواس الخمسة",
        description: "تعرف على الحواس الخمسة وكيف نستخدمها",
        difficulty: "EASY",
        sortOrder: 1,
        contents: [
            { type: "TEXT", title: "الحواس الخمسة", text: "البصر 👁️، السمع 👂، الشم 👃، التذوق 👅، اللمس ✋", sortOrder: 1 },
            { type: "TEXT", title: "استخداماتها", text: "نرى بالعيون\nنسمع بالأذنين\nنشم بالأنف\nنتذوق باللسان\nنلمس باليدين", sortOrder: 2 },
        ],
        quiz: {
            question: "بماذا نسمع؟",
            options: [
                { text: "بالأذنين", isCorrect: true, sortOrder: 1 },
                { text: "بالعيون", isCorrect: false, sortOrder: 2 },
                { text: "بالأنف", isCorrect: false, sortOrder: 3 },
                { text: "باليدين", isCorrect: false, sortOrder: 4 },
            ],
        },
    },
    {
        category: "SCIENCE",
        title: "الماء والثلج",
        description: "تعلم عن حالات الماء المختلفة",
        difficulty: "MEDIUM",
        sortOrder: 2,
        contents: [
            { type: "TEXT", title: "حالات الماء", text: "الماء له ٣ حالات:\n١. سائل (ماء عادي)\n٢. صلب (ثلج)\n٣. غاز (بخار)", sortOrder: 1 },
            { type: "TEXT", title: "التحولات", text: "عندما نبرد الماء يصبح ثلج ❄️\nعندما نسخن الماء يصبح بخار 💨", sortOrder: 2 },
        ],
        quiz: {
            question: "ماذا يحدث عندما نبرد الماء؟",
            options: [
                { text: "يصبح ثلج", isCorrect: true, sortOrder: 1 },
                { text: "يصبح بخار", isCorrect: false, sortOrder: 2 },
                { text: "يختفي", isCorrect: false, sortOrder: 3 },
                { text: "يتحول لعصير", isCorrect: false, sortOrder: 4 },
            ],
        },
    },
    {
        category: "SCIENCE",
        title: "النباتات",
        description: "تعلم عن النباتات وكيف تنمو",
        difficulty: "HARD",
        sortOrder: 3,
        contents: [
            { type: "TEXT", title: "أجزاء النبات", text: "الجذور، الساق، الأوراق، الزهرة، الثمرة", sortOrder: 1 },
            { type: "TEXT", title: "ماذا يحتاج النبات؟", text: "١. ماء 💧\n٢. ضوء الشمس ☀️\n٣. تربة\n٤. هواء", sortOrder: 2 },
        ],
        quiz: {
            question: "ماذا يحتاج النبات لينمو؟",
            options: [
                { text: "ماء وشمس", isCorrect: true, sortOrder: 1 },
                { text: "شوكولاتة", isCorrect: false, sortOrder: 2 },
                { text: "ثلج فقط", isCorrect: false, sortOrder: 3 },
                { text: "ظلام", isCorrect: false, sortOrder: 4 },
            ],
        },
    },

    // ─── STORIES 📖 ─────────────────────────────────
    {
        category: "STORIES",
        title: "القطة الصغيرة",
        description: "قصة القطة الصغيرة التي تبحث عن أصدقاء",
        difficulty: "EASY",
        sortOrder: 1,
        contents: [
            { type: "TEXT", title: "القصة", text: "كان يا ما كان، قطة صغيرة اسمها مشمشة 🐱\nخرجت مشمشة تبحث عن أصدقاء\nقابلت كلباً لطيفاً وقالت: هل تلعب معي؟\nقال الكلب: طبعاً! هيا نلعب!\nأصبحا صديقين وعاشا سعيدين 💕", sortOrder: 1 },
            { type: "TEXT", title: "الدرس المستفاد", text: "الصداقة جميلة ومهمة، كن لطيفاً مع الآخرين", sortOrder: 2 },
        ],
        quiz: {
            question: "ما اسم القطة في القصة؟",
            options: [
                { text: "مشمشة", isCorrect: true, sortOrder: 1 },
                { text: "بسبوسة", isCorrect: false, sortOrder: 2 },
                { text: "نمنم", isCorrect: false, sortOrder: 3 },
                { text: "فلة", isCorrect: false, sortOrder: 4 },
            ],
        },
    },
    {
        category: "STORIES",
        title: "الأرنب والسلحفاة",
        description: "قصة السباق بين الأرنب السريع والسلحفاة الصبورة",
        difficulty: "MEDIUM",
        sortOrder: 2,
        contents: [
            { type: "TEXT", title: "القصة", text: "تحدى الأرنب السريع السلحفاة البطيئة في سباق 🐰🐢\nبدأ الأرنب بسرعة ثم نام تحت شجرة\nالسلحفاة مشت ببطء ولم تتوقف\nعندما استيقظ الأرنب، كانت السلحفاة قد فازت!\nالسلحفاة فازت بالسباق! 🏆", sortOrder: 1 },
            { type: "TEXT", title: "الدرس المستفاد", text: "الصبر والمثابرة أهم من السرعة", sortOrder: 2 },
        ],
        quiz: {
            question: "من فاز بالسباق؟",
            options: [
                { text: "السلحفاة", isCorrect: true, sortOrder: 1 },
                { text: "الأرنب", isCorrect: false, sortOrder: 2 },
                { text: "لا أحد", isCorrect: false, sortOrder: 3 },
                { text: "الأسد", isCorrect: false, sortOrder: 4 },
            ],
        },
    },
    {
        category: "STORIES",
        title: "النملة المجتهدة",
        description: "قصة النملة التي تعمل بجد لجمع الطعام",
        difficulty: "HARD",
        sortOrder: 3,
        contents: [
            { type: "TEXT", title: "القصة", text: "في فصل الصيف، كانت نملة صغيرة تعمل بجد 🐜\nكانت تجمع الطعام وتخزنه لفصل الشتاء\nالجندب كان يلعب ولا يعمل 🦗\nجاء الشتاء البارد ❄️\nالنملة كان عندها طعام كثير\nأما الجندب فلم يجد شيئاً يأكله\nساعدته النملة الطيبة وعلمته أهمية العمل", sortOrder: 1 },
            { type: "TEXT", title: "الدرس المستفاد", text: "العمل الجاد والتخطيط للمستقبل مهم جداً", sortOrder: 2 },
        ],
        quiz: {
            question: "ماذا كانت النملة تفعل في الصيف؟",
            options: [
                { text: "تجمع الطعام", isCorrect: true, sortOrder: 1 },
                { text: "تنام", isCorrect: false, sortOrder: 2 },
                { text: "تلعب", isCorrect: false, sortOrder: 3 },
                { text: "تسافر", isCorrect: false, sortOrder: 4 },
            ],
        },
    },
];

// ─── وظائف مساعدة ────────────────────────────────

let API_TOKEN: string | null = null;

// Content Manager API UIDs
const UIDS = {
    skillItem: "api::skill-item.skill-item",
    skillContent: "api::skill-content.skill-content",
    skillQuiz: "api::skill-quiz.skill-quiz",
    quizOption: "api::quiz-option.quiz-option",
} as const;

async function loginAdmin(): Promise<void> {
    console.log("🔑 Logging into Strapi admin...");

    const res = await fetch(`${STRAPI_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: "backendadmin@autism-app.com",
            password: "Admin123!",
        }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Admin login failed (${res.status}): ${text}`);
    }

    const data = await res.json() as LoginResponse;
    API_TOKEN = data.data.token;
    console.log("✅ Logged in successfully!");
}

async function cmRequest(path: string, method: string = "GET", body: object | null = null): Promise<any> {
    const opts: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
        },
    };
    if (body) opts.body = JSON.stringify(body);

    const res = await fetch(`${STRAPI_URL}/content-manager${path}`, opts);

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`CM ${method} ${path} failed (${res.status}): ${text}`);
    }

    return res.json();
}

async function createEntry(uid: string, data: object): Promise<CreatedEntry> {
    const result = await cmRequest(`/collection-types/${uid}`, "POST", data);
    const documentId: string = result.data?.documentId || result.documentId;
    const id: number = result.data?.id || result.id;

    // Publish the entry
    try {
        await cmRequest(`/collection-types/${uid}/${documentId}/actions/publish`, "POST", {});
    } catch (e) {
        // Some versions auto-publish or have different publish endpoints
    }

    return { id, documentId };
}

// ─── Main Seed ────────────────────────────────────

async function seed(): Promise<void> {
    console.log("🌱 Starting Strapi Seed...\n");

    await loginAdmin();

    let skillCount = 0;
    let contentCount = 0;
    let quizCount = 0;
    let optionCount = 0;

    for (const skill of SKILLS_DATA) {
        // 1. Create Skill Item
        const { documentId: skillDocId } = await createEntry(UIDS.skillItem, {
            category: skill.category,
            title: skill.title,
            description: skill.description,
            difficulty: skill.difficulty,
            ageMin: 3,
            ageMax: 12,
            sortOrder: skill.sortOrder,
            isActive: true,
        });
        skillCount++;
        console.log(`  📦 [${skillCount}/27] ${skill.category} → ${skill.title} (${skill.difficulty})`);

        // 2. Create Skill Contents
        for (const content of skill.contents) {
            await createEntry(UIDS.skillContent, {
                type: content.type,
                title: content.title,
                text: content.text,
                sortOrder: content.sortOrder,
                skill_item: { set: [{ documentId: skillDocId }] },
            });
            contentCount++;
        }

        // 3. Create Skill Quiz
        const { documentId: quizDocId } = await createEntry(UIDS.skillQuiz, {
            type: "MULTIPLE_CHOICE",
            question: skill.quiz.question,
            sortOrder: 1,
            skill_item: { set: [{ documentId: skillDocId }] },
        });
        quizCount++;

        // 4. Create Quiz Options
        for (const option of skill.quiz.options) {
            await createEntry(UIDS.quizOption, {
                text: option.text,
                isCorrect: option.isCorrect,
                sortOrder: option.sortOrder,
                skill_quiz: { set: [{ documentId: quizDocId }] },
            });
            optionCount++;
        }
    }

    console.log("\n" + "=".repeat(50));
    console.log("✅ Seed completed successfully!");
    console.log(`   📦 Skill Items:   ${skillCount}`);
    console.log(`   📄 Contents:      ${contentCount}`);
    console.log(`   ❓ Quizzes:       ${quizCount}`);
    console.log(`   🔘 Quiz Options:  ${optionCount}`);
    console.log("=".repeat(50));
}

seed().catch((err: Error) => {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
});
