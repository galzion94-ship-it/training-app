import { useState } from "react";

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const USERS = [
  { id: 1, name: "משה לוי",   role: "tech",  av: "מ" },
  { id: 2, name: "אבי כהן",   role: "tech",  av: "א" },
  { id: 3, name: "דנה מזרחי", role: "tech",  av: "ד" },
  { id: 4, name: "ניהול",     role: "admin", av: "N" },
];

const CATS = [
  {
    id:1, icon:"🏠", he:"מטבח", en:"Kitchen", color:"#f59e0b",
    items:[
      {
        id:11, he:"ארונות מטבח", en:"Cabinets",
        tabs:[
          { title:"סוגי ייצור", rows:[
            { name:"Stock / RTA",  price:"$",    note:"⚡ מיידי",         desc:"מוצר מדף, מידות קבועות (קפיצות של 3 אינץ׳). הכי זול וזמין." },
            { name:"Semi-Custom", price:"$$",                             desc:"גוף סטנדרטי עם גמישות במידות ויותר אפשרויות צבע." },
            { name:"Full Custom", price:"$$$$",  note:"⏱ 8-12 שבועות",  desc:"בנייה מאפס לפי אינץ׳ (Shop-built). הכי יקר." },
          ]},
          { title:"חומרים (הגוף)", rows:[
            { name:"Particle Board", price:"$",    warn:"⚠️ רגיש מאוד למים",  desc:"שבבית. הכי זול — מתנפח ומתפרק ממים." },
            { name:"MDF / HDF",      price:"$$",   tip:"💡 הכי טוב לצביעה",   desc:"סיבי עץ דחוסים. לא מתרחב בלחות, הצבע לא נסדק בחיבורים." },
            { name:"Plywood",        price:"$$$",  tip:"✅ הסטנדרט האיכותי",  desc:"סנדוויץ׳. חזק, עמיד למים ומשקל." },
            { name:"Solid Wood",     price:"$$$$",                            desc:"עץ מלא. יוקרתי וטבעי. יקר מאוד לייצור." },
          ]},
          { title:"סגנון ודלת", rows:[
            { name:"Slab",         price:"$",    desc:"דלת חלקה ומודרנית. זולה וקלה לניקוי." },
            { name:"Shaker",       price:"$$",   note:"⭐ Best Seller",         desc:"מסגרת קלאסית. הכי פופולרי בשוק." },
            { name:"Raised Panel", price:"$$$",  desc:"מראה מסורתי/כפרי. יקר יותר לעיבוד." },
            { name:"Full Overlay", price:"",     tip:"📐 הסטנדרט המודרני",    desc:"הדלת מכסה את כל גוף הארון." },
            { name:"Inset",        price:"$$$$", tip:"🏆 נגרות עילית",         desc:"הדלת יושבת בתוך המסגרת (קו אפס). דורש דיוק מושלם." },
          ]},
          { title:"שדרוגי פנים", rows:[
            { name:"Soft-Close",                      tip:"✅ חובה בכל מטבח מודרני", desc:"טריקה שקטה לצירים ומגירות." },
            { name:"Spice Pull-out",    price:"$$",   desc:"מגירה צרה לתבלינים ליד הכיריים." },
            { name:"Lazy Susan",        price:"$$",   desc:"מדפים מסתובבים/נשלפים לפינות ׳מתות׳." },
            { name:"Trash Pull-out",    price:"$$",   desc:"פח אשפה נסתר בתוך מגירה כפולה." },
            { name:"Roll-out Trays",    price:"$$$",  tip:"💡 חוסך התכופפות", desc:"מדפים נשלפים בארונות תחתונים." },
          ]},
          { title:"חידוש וצביעה", rows:[
            { name:"צביעה מחדש (Spray)", price:"$", tip:"💰 חוסך 50-70% מול החלפה!", desc:"פירוק דלתות, שיוף מקצועי וצביעה בתנור. להציע רק אם גוף הארון תקין ולא רקוב." },
          ]},
          { title:"צ׳ק-ליסט", isCheck:true, rows:[
            { label:"גובה תקרה" },
            { label:"קירות ישרים (Plumb)?" },
            { label:"תאורה פנימית נדרשת?" },
            { permit:"לא צריך להחלפה קוסמטית. חובה אם מזיזים אינסטלציה, חשמל או שוברים קיר." },
          ]},
        ],
        quiz:[
          { q:"מה הסטנדרט לגוף ארון איכותי?", opts:["Particle Board","MDF","Plywood","Solid Wood"], ans:2 },
          { q:"איזה סגנון דלת הוא ה-Best Seller?", opts:["Slab","Shaker","Raised Panel","Inset"], ans:1 },
          { q:"כמה חוסכת צביעה מחדש לעומת החלפה?", opts:["10-20%","30-40%","50-70%","80-90%"], ans:2 },
          { q:"מתי צריך פרמיט לארונות?", opts:["תמיד","רק אם מזיזים אינסטלציה/חשמל","אף פעם","רק בדירות"], ans:1 },
        ]
      },
      {
        id:12, he:"משטחי עבודה", en:"Countertops",
        tabs:[
          { title:"חומרים", rows:[
            { name:"Laminate",      price:"$",    warn:"⚠️ לא עמיד לחום/שריטות", desc:"פורמייקה. הכי זול." },
            { name:"Butcher Block", price:"$$",   warn:"⚠️ רגיש למים",           desc:"עץ מלא. מראה חם. דורש שימון תקופתי." },
            { name:"Quartz",        price:"$$$",  note:"⭐ הכי פופולרי", tip:"✅ אפס תחזוקה", desc:"חזק, עמיד לכתמים. ❌ אסור חום ישיר!" },
            { name:"Granite",       price:"$$$",  tip:"💡 עמיד לחום",             desc:"אבן טבעית. דורשת Sealer פעם בשנה." },
            { name:"Porcelain",     price:"$$$$", tip:"💎 עמיד להכל",             desc:"חום, שריטות, כתמים. יקר לחיתוך והתקנה." },
            { name:"Marble",        price:"$$$$", warn:"⚠️ רגיש מאוד",            desc:"הכי יוקרתי, סופג יין/לימון ונשרט." },
          ]},
          { title:"קאנטים", rows:[
            { name:"Eased Edge",   price:"$",   tip:"📐 הסטנדרט", desc:"ישר עם פינה מעוגלת קלה." },
            { name:"Bullnose",     price:"$$",  desc:"חצי עגול." },
            { name:"Mitered Edge", price:"$$$", tip:"💎 מראה בלוק עבה", desc:"45 מעלות — נראה כמו אבן 2-3 אינץ׳ עבה." },
          ]},
          { title:"Backsplash", rows:[
            { name:"Tile",      price:"$$",   desc:"קרמיקה או מוזאיקה." },
            { name:"Full Slab", price:"$$$$", tip:"💎 יוקרה מקסימלית", desc:"השיש ממשיך ועולה על כל הקיר. קל לניקוי." },
          ]},
        ],
        quiz:[
          { q:"מה המשטח הכי פופולרי?", opts:["Granite","Marble","Quartz","Laminate"], ans:2 },
          { q:"מה אסור לשים על Quartz?", opts:["כלים","חום ישיר","מים","משקל"], ans:1 },
          { q:"מה דורש Sealer פעם בשנה?", opts:["Quartz","Granite","Porcelain","Laminate"], ans:1 },
          { q:"Mitered Edge נראה כמו?", opts:["חצי עגול","בלוק עבה 2-3 אינץ׳","קצה חד","מדרגה"], ans:1 },
        ]
      }
    ]
  },
  {
    id:2, icon:"🏗️", he:"ריצוף", en:"Flooring", color:"#8b5cf6",
    items:[{
      id:21, he:"ריצוף", en:"Flooring",
      tabs:[
        { title:"חומרים", rows:[
          { name:"LVP (ויניל)",         price:"$$",   note:"💎 Value הכי טוב בטקסס", tip:"✅ 100% עמיד למים", desc:"נראה כמו עץ. הבחירה הכי חכמה לאקלים טקסס." },
          { name:"Laminate",            price:"$",    warn:"⚠️ לא עמיד למים",         desc:"מתאים רק לחדרי שינה." },
          { name:"Tile (פורצלן)",       price:"$$$",  tip:"✅ עמיד לכל החיים",        desc:"קל לניקוי. דורש תשתית דבק ורובה." },
          { name:"Engineered Hardwood", price:"$$$$", tip:"📈 מעלה ערך נכס", warn:"⚠️ רגיש לשריטות/מים", desc:"יוקרתי ביותר." },
        ]},
        { title:"תשתית והתקנה", rows:[
          { name:"Self-Leveling", price:"$$",  warn:"⚠️ חובה!",          desc:"פילוס הרצפה. בלעדיו הריצוף יישבר או ירעיש." },
          { name:"Herringbone",   price:"$$$", note:"📐 דמוי דג",        desc:"מייקר עבודה ויש Waste חומרים." },
        ]},
      ],
      quiz:[
        { q:"מה ה-Value הטוב ביותר לריצוף בטקסס?", opts:["Laminate","LVP","Tile","Engineered Hardwood"], ans:1 },
        { q:"Laminate מתאים רק היכן?", opts:["כל הבית","חדרי שינה בלבד","מטבח","אמבטיה"], ans:1 },
        { q:"מה חובה לפני כל התקנת ריצוף?", opts:["צביעת קירות","Self-Leveling","הסרת ארונות","החלפת תאורה"], ans:1 },
      ]
    }]
  },
  {
    id:3, icon:"💡", he:"חשמל ותאורה", en:"Electrical & Lighting", color:"#eab308",
    items:[{
      id:31, he:"חשמל ותאורה", en:"Electrical & Lighting",
      tabs:[
        { title:"סוגי תאורה", rows:[
          { name:"Recessed Wafers",        price:"$",   desc:"ספוטים שקועים דקים. תאורה כללית לכל הבית." },
          { name:"Under-Cabinet Lighting", price:"$$$", tip:"✨ משדרג את המטבח ליוקרתי", desc:"פסי לד נסתרים." },
          { name:"Pendants",               price:"$$",  tip:"📏 גובה מומלץ: 30-36 אינץ׳ מהמשטח", desc:"תליונים מעל האי." },
        ]},
        { title:"טמפרטורת צבע", rows:[
          { name:"2700K – 3000K", tip:"🏠 סלון וחדרי שינה",       desc:"אור חם ונעים." },
          { name:"4000K – 5000K", tip:"🍳 מטבח, אמבטיה, מוסך",   desc:"אור לבן/יום. חד ומקצועי." },
        ]},
        { title:"בטיחות וקוד", isCheck:true, rows:[
          { label:"GFCI — שקעים מוגנים ליד מים (מטבח/אמבטיה). חובה לפי החוק." },
          { permit:"חובה להוספת מעגלים חדשים או הזזת נקודות חשמל." },
        ]},
      ],
      quiz:[
        { q:"Kelvin למטבח ואמבטיה?", opts:["2700K","3000K","4000K-5000K","6500K"], ans:2 },
        { q:"מה חייב בשקעים ליד מים?", opts:["כיסוי מיוחד","GFCI","מאמ״ר 20A","שקע כפול"], ans:1 },
        { q:"גובה מומלץ לפנדנט מעל האי?", opts:["15-20 אינץ׳","30-36 אינץ׳","48-54 אינץ׳","60 אינץ׳"], ans:1 },
        { q:"מתי חובה פרמיט חשמל?", opts:["רק להחלפת שקעים","הוספת מעגל חדש","לעולם לא","רק בבתים ישנים"], ans:1 },
      ]
    }]
  },
  {
    id:4, icon:"🛁", he:"חדרי רחצה", en:"Bathrooms", color:"#3b82f6",
    items:[{
      id:41, he:"חדרי רחצה", en:"Bathrooms",
      tabs:[
        { title:"אזור הרחצה", rows:[
          { name:"Walk-in Shower",   price:"$$$", warn:"📏 דורש ניקוז 2 אינץ׳",          desc:"מקלחון מרוצף במקום אמבטיה." },
          { name:"Schluter/Kerdi",   price:"$$$", tip:"✅ מניעת עובש — חובה!",            desc:"יריעות איטום כתומות. ׳בניית בריכה׳ אטומה." },
          { name:"Frameless Glass",  price:"$$$", tip:"💎 מראה יוקרתי",                   desc:"זכוכית עבה ללא מסגרת מתכת." },
        ]},
        { title:"שדרוגים", rows:[
          { name:"Heated Floors", price:"$$$", tip:"☀️ נוחות מקסימלית", desc:"רצפה מחוממת." },
          { name:"Niche",         price:"$$",  tip:"💡 מדף שקוע",        desc:"מדף שקוע בתוך הקיר לסבונים ושמפו." },
        ]},
        { title:"היתרים", isCheck:true, rows:[
          { permit:"חובה: הפיכת אמבטיה למקלחון (Tub-to-Shower) ו/או הזזת אסלה." },
        ]},
      ],
      quiz:[
        { q:"Walk-in Shower דורש שינוי ניקוז לאיזה גודל?", opts:["1 אינץ׳","1.5 אינץ׳","2 אינץ׳","3 אינץ׳"], ans:2 },
        { q:"מה מונע עובש במקלחת?", opts:["Frameless Glass","Schluter/Kerdi","Heated Floor","Niche"], ans:1 },
        { q:"מתי חובה פרמיט בחדר רחצה?", opts:["רק לריצוף","Tub-to-Shower והזזת אסלה","תמיד","לעולם לא"], ans:1 },
      ]
    }]
  },
  {
    id:5, icon:"🎨", he:"קירות וצבע", en:"Drywall & Painting", color:"#ec4899",
    items:[{
      id:51, he:"קירות וצבע", en:"Drywall & Painting",
      tabs:[
        { title:"רמות גימור", rows:[
          { name:"Level 4 – Texture", price:"$",    tip:"💡 מסתיר פגמים",             desc:"Orange Peel / Knockdown — הכי נפוץ." },
          { name:"Level 5 – Smooth",  price:"$$$$", tip:"💎 יוקרה מקסימלית", warn:"⚠️ יקר — שעות עבודה רבות", desc:"קיר חלק לגמרי. שפכטל ידני + שיוף על כל הקיר." },
        ]},
        { title:"סוגי ברק", rows:[
          { name:"Flat",         tip:"🏠 לתקרה",                      desc:"ללא ברק. מסתיר פגמים." },
          { name:"Satin/Eggshell", tip:"🏠 לקירות",                   desc:"ברק עדין. ניתן לניקוי." },
          { name:"Semi-Gloss",   tip:"🚿 פנלים, משקופים, חדרי רחצה", desc:"ברק גבוה. עמיד ברטיבות." },
        ]},
      ],
      quiz:[
        { q:"איזה Level מסתיר פגמים בגבס?", opts:["Level 1","Level 3","Level 4","Level 5"], ans:2 },
        { q:"איזה ברק לחדרי רחצה?", opts:["Flat","Satin","Semi-Gloss","Matte"], ans:2 },
        { q:"מדוע Level 5 יקר יותר?", opts:["חומרים יקרים","שעות שפכטל + שיוף","ציוד מיוחד","רישיון"], ans:1 },
      ]
    }]
  },
  {
    id:6, icon:"🔩", he:"שלד וחוץ", en:"Structural & Exterior", color:"#6b7280",
    items:[{
      id:61, he:"שלד וחוץ", en:"Structural & Exterior",
      tabs:[
        { title:"יסודות", rows:[
          { name:"סימני בעיה", warn:"🚨 אדום!",                          desc:"סדקים אלכסוניים מעל דלתות, דלתות שנתקעות." },
          { name:"תיקון",      warn:"⚠️ מהנדס + פרמיט חובה!",           desc:"כלונסאות בטון/פלדה. אסור לתקן בלי דוח מהנדס." },
        ]},
        { title:"גגות", rows:[
          { name:"Architectural Shingles", price:"$$", tip:"✅ הסטנדרט האיכותי", desc:"הגג הסטנדרטי." },
          { name:"Flashing",               warn:"🔍 לבדוק תמיד!",               desc:"מצב הפלשינג סביב הארובה — מקור דליפות נפוץ. חובה פרמיט." },
        ]},
        { title:"דקים", rows:[
          { name:"PT Wood",          price:"$",    warn:"🔧 תחזוקה שנתית",      desc:"עץ מטופל. דורש צביעה ושיוף מדי שנה." },
          { name:"Composite (Trex)", price:"$$$$", tip:"✅ 25 שנה ללא תחזוקה!", desc:"לא נרקב, לא נצבע." },
          { name:"קוד דק",           warn:"⚠️ פרמיט!",                         desc:"דק מעל 30 אינץ׳ חייב מעקה ופרמיט." },
        ]},
        { title:"מטבח חוץ", isCheck:true, rows:[
          { label:"מרחק גז — לפי קוד" },
          { label:"נקודת חשמל GFCI" },
          { label:"לאן הולך הניקוז?" },
          { label:"גזיבו מוכן (Kit) כהוזלה?" },
        ]},
      ],
      quiz:[
        { q:"מה מעיד על בעיות יסוד?", opts:["קירות לחים","סדקים אלכסוניים מעל דלתות","גג דולף","חלונות ישנים"], ans:1 },
        { q:"איזה חומר לדק מחזיק 25 שנה?", opts:["PT Wood","Cedar","Composite (Trex)","Bamboo"], ans:2 },
        { q:"דק מאיזה גובה חייב מעקה?", opts:["10 אינץ׳","20 אינץ׳","30 אינץ׳","48 אינץ׳"], ans:2 },
      ]
    }]
  },
  {
    id:7, icon:"🪟", he:"חלונות ודלתות", en:"Windows & Doors", color:"#14b8a6",
    items:[{
      id:71, he:"חלונות ודלתות", en:"Windows & Doors",
      tabs:[
        { title:"חומרים ובידוד", rows:[
          { name:"Vinyl",      price:"$",    tip:"💰 זול + תחזוקה נמוכה",        desc:"בידוד טוב. הבחירה הנפוצה." },
          { name:"Fiberglass", price:"$$$$", tip:"💎 הכי עמיד + בידוד מעולה",   desc:"פרמיום." },
          { name:"Low-E Glass",              tip:"☀️ חובה בטקסס!",               desc:"ציפוי מחזיר חום — קריטי לאקלים טקסס." },
        ]},
        { title:"בטיחות וקוד", rows:[
          { name:"Tempered Glass", warn:"⚠️ חובה לפי קוד", desc:"זכוכית מחוסמת — חובה ליד דלתות, רצפה ובמקלחת." },
          { name:"Egress",         warn:"⚠️ חובה בחדרי שינה!", desc:"חלון חילוץ בחדרי שינה — נדרש לפי קוד הבנייה." },
        ]},
      ],
      quiz:[
        { q:"מה חייב בחלון בחדר שינה?", opts:["Low-E Glass","Tempered Glass","Egress (חלון חילוץ)","Double Pane"], ans:2 },
        { q:"מה Low-E Glass עושה?", opts:["מגן מפני פריצה","מחזיר חום","מונע רעש","מספק צל"], ans:1 },
        { q:"איפה חובה Tempered Glass?", opts:["כל החלונות","רק בתקרה","ליד דלתות, רצפה ומקלחת","בחדרי שינה"], ans:2 },
        { q:"מה הכי חשוב בחלון בטקסס?", opts:["Vinyl Frame","Low-E Glass","Egress","Double Pane"], ans:1 },
      ]
    }]
  }
];

/* ══════════════════════════════════════════════
   PROGRESS
══════════════════════════════════════════════ */
function mkProgress() {
  const p = {};
  CATS.forEach(c => c.items.forEach(it => {
    p[it.id] = { tabs: [], quizScore: null, quizDone: false };
  }));
  return p;
}

function itemPct(prog, item) {
  const p = prog[item.id];
  if (!p) return 0;
  const total = item.tabs.length + 1;
  return Math.round(((p.tabs.length + (p.quizDone ? 1 : 0)) / total) * 100);
}

function catPct(prog, cat) {
  const vals = cat.items.map(it => itemPct(prog, it));
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

function totalPct(prog) {
  const vals = CATS.map(c => catPct(prog, c));
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

const DEMO_PROGRESS = {
  1: mkProgress(),
  2: (() => {
    const p = mkProgress();
    p[11] = { tabs: [0,1,2,3,4,5], quizScore: 100, quizDone: true };
    p[12] = { tabs: [0,1],          quizScore: null, quizDone: false };
    p[21] = { tabs: [0],            quizScore: null, quizDone: false };
    return p;
  })(),
  3: (() => {
    const p = mkProgress();
    p[11] = { tabs: [0,1,2],  quizScore: 75,  quizDone: true };
    p[31] = { tabs: [0,1,2],  quizScore: 100, quizDone: true };
    p[71] = { tabs: [0,1],    quizScore: null, quizDone: false };
    return p;
  })(),
};

/* ══════════════════════════════════════════════
   TOKENS
══════════════════════════════════════════════ */
const BG  = "#0e1117";
const BG2 = "#161b24";
const BG3 = "#1c2230";
const BOR = "#252d3a";
const TXT = "#e2ddd8";
const MUT = "#7a8494";

/* ══════════════════════════════════════════════
   SHARED COMPONENTS
══════════════════════════════════════════════ */
function Bar({ pct, color = "#f59e0b", h = 5 }) {
  return (
    <div style={{ height: h, background: BOR, borderRadius: h, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: h, transition: "width .5s ease" }} />
    </div>
  );
}

function Price({ v }) {
  if (!v) return null;
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: i < v.length ? "#f59e0b" : BOR }} />
      ))}
    </div>
  );
}

function Tag({ text, warn }) {
  const color = warn ? "#ef4444" : "#10b981";
  return (
    <span style={{ fontSize: 11, fontWeight: 700, color, background: color + "18",
      border: `1px solid ${color}33`, borderRadius: 20, padding: "2px 8px" }}>{text}</span>
  );
}

function BackBtn({ onClick }) {
  return (
    <button onClick={onClick} style={{ background: "transparent", border: `1px solid ${BOR}`,
      borderRadius: 7, color: MUT, padding: "7px 14px", cursor: "pointer", marginBottom: 22,
      fontFamily: "inherit", fontSize: 13 }}>← חזרה</button>
  );
}

/* ══════════════════════════════════════════════
   LOGIN
══════════════════════════════════════════════ */
function Login({ onLogin }) {
  return (
    <div style={{ minHeight: "100vh", background: BG, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", direction: "rtl", padding: 20 }}>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{ fontSize: 52, marginBottom: 10 }}>🏗️</div>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900, color: "#f59e0b", letterSpacing: 1 }}>Training Hub</h1>
        <p style={{ color: MUT, margin: "8px 0 0", fontSize: 14 }}>פלטפורמת הכשרה לטכנאי שיפוץ</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, width: "100%", maxWidth: 340 }}>
        {USERS.map(u => (
          <button key={u.id} onClick={() => onLogin(u)}
            style={{ background: BG2, border: `1.5px solid ${BOR}`, borderRadius: 12,
              padding: "18px 12px", cursor: "pointer", color: TXT, textAlign: "center",
              fontFamily: "inherit", transition: "all .15s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#f59e0b"; e.currentTarget.style.background = "#f59e0b0e"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = BOR; e.currentTarget.style.background = BG2; }}>
            <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#f59e0b1a",
              border: "2px solid #f59e0b", display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: 16, color: "#f59e0b", margin: "0 auto 10px" }}>{u.av}</div>
            <div style={{ fontWeight: 700, fontSize: 13 }}>{u.name}</div>
            <div style={{ fontSize: 11, color: MUT, marginTop: 3 }}>{u.role === "admin" ? "מנהל" : "טכנאי"}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   NAV
══════════════════════════════════════════════ */
function Nav({ user, onHome, onLogout }) {
  return (
    <nav style={{ background: "#090d13", borderBottom: `1px solid ${BOR}`, padding: "0 20px",
      display: "flex", alignItems: "center", justifyContent: "space-between", height: 58,
      position: "sticky", top: 0, zIndex: 100, direction: "rtl" }}>
      <span onClick={onHome} style={{ cursor: "pointer", display: "flex", alignItems: "center",
        gap: 8, fontWeight: 900, fontSize: 16, color: "#f59e0b" }}>🏗️ Training Hub</span>
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: MUT }}>
        <span>{user.name}</span>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#f59e0b1a",
          border: "2px solid #f59e0b", display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 900, fontSize: 13, color: "#f59e0b" }}>{user.av}</div>
        <button onClick={onLogout} style={{ background: "transparent", border: `1px solid ${BOR}`,
          borderRadius: 6, color: MUT, padding: "5px 12px", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>יציאה</button>
      </div>
    </nav>
  );
}

/* ══════════════════════════════════════════════
   HOME
══════════════════════════════════════════════ */
function Home({ user, prog, onCat }) {
  const total = totalPct(prog);
  const doneCats = CATS.filter(c => catPct(prog, c) === 100).length;
  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "28px 20px", direction: "rtl" }}>
      <div style={{ background: BG2, border: "1px solid #f59e0b2a", borderRadius: 14, padding: "24px 28px", marginBottom: 28 }}>
        <h1 style={{ margin: "0 0 4px", fontSize: 21, fontWeight: 900 }}>שלום, {user.name} 👋</h1>
        <p style={{ color: MUT, margin: "0 0 18px", fontSize: 14 }}>למד, תרגל, והפוך למומחה שיפוץ</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 16 }}>
          {[
            { v: `${total}%`, l: "התקדמות כוללת", c: "#f59e0b" },
            { v: `${doneCats}/${CATS.length}`, l: "קטגוריות הושלמו", c: "#10b981" },
            { v: CATS.reduce((s, c) => s + c.items.reduce((ss, it) => ss + it.quiz.length, 0), 0), l: "סה״כ שאלות", c: "#3b82f6" },
          ].map((s, i) => (
            <div key={i} style={{ background: BG3, borderRadius: 8, padding: "14px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: s.c }}>{s.v}</div>
              <div style={{ fontSize: 11, color: MUT, marginTop: 3 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <Bar pct={total} />
      </div>
      <h2 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 800 }}>קטגוריות</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 13 }}>
        {CATS.map(cat => {
          const pct = catPct(prog, cat);
          return (
            <div key={cat.id} onClick={() => onCat(cat)}
              style={{ background: BG2, border: `1.5px solid ${cat.color}22`, borderRadius: 12,
                padding: "20px 18px", cursor: "pointer", transition: "all .15s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = cat.color + "66"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = cat.color + "22"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontSize: 30 }}>{cat.icon}</div>
                <span style={{ fontSize: 11, fontWeight: 700,
                  color: pct === 100 ? "#10b981" : pct > 0 ? cat.color : MUT,
                  background: (pct === 100 ? "#10b981" : pct > 0 ? cat.color : MUT) + "18",
                  borderRadius: 20, padding: "2px 9px",
                  border: `1px solid ${pct === 100 ? "#10b981" : pct > 0 ? cat.color : MUT}33` }}>
                  {pct === 100 ? "✓ הושלם" : pct > 0 ? "בתהליך" : "חדש"}
                </span>
              </div>
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 3 }}>{cat.he}</div>
              <div style={{ fontSize: 12, color: MUT, marginBottom: 12 }}>{cat.en}</div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: MUT, marginBottom: 5 }}>
                <span>{cat.items.length} פריט{cat.items.length > 1 ? "ים" : ""}</span>
                <span style={{ color: cat.color, fontWeight: 700 }}>{pct}%</span>
              </div>
              <Bar pct={pct} color={cat.color} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   CATEGORY VIEW
══════════════════════════════════════════════ */
function CatView({ cat, prog, onItem, onBack }) {
  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "24px 20px", direction: "rtl" }}>
      <BackBtn onClick={onBack} />
      <div style={{ background: BG2, border: `1.5px solid ${cat.color}33`, borderRadius: 14, padding: "22px 26px", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
          <span style={{ fontSize: 38 }}>{cat.icon}</span>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 900 }}>{cat.he}</h1>
            <div style={{ fontSize: 13, color: MUT }}>{cat.en}</div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: MUT, marginBottom: 5 }}>
          <span>התקדמות</span>
          <span style={{ color: cat.color, fontWeight: 700 }}>{catPct(prog, cat)}%</span>
        </div>
        <Bar pct={catPct(prog, cat)} color={cat.color} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {cat.items.map(item => {
          const p = itemPct(prog, item);
          const ip = prog[item.id];
          return (
            <div key={item.id} onClick={() => onItem(item)}
              style={{ background: BG2, border: `1.5px solid ${p === 100 ? cat.color + "55" : BOR}`,
                borderRadius: 11, padding: "18px 20px", cursor: "pointer", transition: "all .15s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = cat.color + "66"}
              onMouseLeave={e => e.currentTarget.style.borderColor = p === 100 ? cat.color + "55" : BOR}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15 }}>{item.he}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{item.en}</div>
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: cat.color }}>{p}%</div>
                  {ip?.quizDone && <div style={{ fontSize: 11, color: "#10b981" }}>מבחן: {ip.quizScore}%</div>}
                </div>
              </div>
              <Bar pct={p} color={cat.color} />
              <div style={{ display: "flex", gap: 5, marginTop: 10, flexWrap: "wrap" }}>
                {item.tabs.map((t, i) => (
                  <span key={i} style={{ fontSize: 10, padding: "2px 7px", borderRadius: 4,
                    background: ip?.tabs?.includes(i) ? cat.color + "22" : BOR,
                    color: ip?.tabs?.includes(i) ? cat.color : MUT,
                    border: `1px solid ${ip?.tabs?.includes(i) ? cat.color + "44" : BOR}` }}>{t.title}</span>
                ))}
                <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 4,
                  background: ip?.quizDone ? "#10b98122" : BOR,
                  color: ip?.quizDone ? "#10b981" : MUT,
                  border: `1px solid ${ip?.quizDone ? "#10b98144" : BOR}` }}>📝 מבחן</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   ITEM (tabs)
══════════════════════════════════════════════ */
function ItemView({ item, cat, prog, onProgress, onQuiz, onBack }) {
  const [activeTab, setActiveTab] = useState(0);
  const ip = prog[item.id] || { tabs: [], quizScore: null, quizDone: false };
  const tab = item.tabs[activeTab];
  const allTabsDone = ip.tabs.length >= item.tabs.length;

  function selectTab(i) {
    setActiveTab(i);
    if (!ip.tabs.includes(i)) onProgress(item.id, i);
  }

  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "24px 20px", direction: "rtl" }}>
      <BackBtn onClick={onBack} />
      <div style={{ background: BG2, border: `1px solid ${cat.color}33`, borderRadius: 12, padding: "18px 22px", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 18, fontWeight: 900 }}>{item.he}</h1>
            <div style={{ fontSize: 12, color: MUT }}>{item.en}</div>
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: cat.color }}>{itemPct(prog, item)}%</div>
            {ip.quizDone && <div style={{ fontSize: 11, color: "#10b981" }}>מבחן: {ip.quizScore}%</div>}
          </div>
        </div>
      </div>

      {/* tab bar */}
      <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
        {item.tabs.map((t, i) => {
          const done = ip.tabs.includes(i);
          const active = activeTab === i;
          return (
            <button key={i} onClick={() => selectTab(i)}
              style={{ background: active ? cat.color : "transparent",
                border: `1.5px solid ${active ? cat.color : done ? cat.color + "55" : BOR}`,
                borderRadius: 7, color: active ? "#0e1117" : done ? cat.color : MUT,
                padding: "7px 13px", cursor: "pointer", fontSize: 12, fontWeight: 700,
                fontFamily: "inherit", transition: "all .15s" }}>
              {done && !active ? "✓ " : ""}{t.title}
            </button>
          );
        })}
        <button onClick={() => { if (allTabsDone) onQuiz(); }}
          disabled={!allTabsDone}
          style={{ background: ip.quizDone ? "#10b98122" : "transparent",
            border: `1.5px solid ${ip.quizDone ? "#10b981" : allTabsDone ? cat.color : BOR}`,
            borderRadius: 7, color: ip.quizDone ? "#10b981" : allTabsDone ? cat.color : MUT,
            padding: "7px 13px", cursor: allTabsDone ? "pointer" : "not-allowed",
            fontSize: 12, fontWeight: 700, fontFamily: "inherit", opacity: allTabsDone ? 1 : 0.5 }}>
          📝 {ip.quizDone ? "מבחן ✓" : "מבחן"}
        </button>
      </div>

      {/* content */}
      <div style={{ background: BG2, border: `1px solid ${BOR}`, borderRadius: 12, padding: "22px 24px" }}>
        <h2 style={{ margin: "0 0 18px", fontSize: 15, fontWeight: 800, color: cat.color }}>{tab.title}</h2>
        {tab.isCheck ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {tab.rows.map((r, i) => (
              r.permit
                ? <div key={i} style={{ background: "#ef444411", border: "1px solid #ef444433", borderRadius: 8, padding: "12px 14px" }}>
                    <div style={{ fontSize: 11, fontWeight: 900, color: "#ef4444", marginBottom: 4 }}>⚠️ PERMIT</div>
                    <div style={{ fontSize: 14, color: TXT, lineHeight: 1.6 }}>{r.permit}</div>
                  </div>
                : <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: BG3, borderRadius: 7, padding: "10px 14px" }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, border: "2px solid #10b981", background: "#10b98122",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#10b981", flexShrink: 0 }}>✓</div>
                    <div style={{ fontSize: 14, color: TXT }}>{r.label}</div>
                  </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {tab.rows.map((r, i) => (
              <div key={i} style={{ background: BG3, border: `1px solid ${BOR}`, borderRadius: 9, padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: r.desc ? 6 : 0 }}>
                  <span style={{ fontWeight: 800, fontSize: 14, color: TXT }}>{r.name}</span>
                  {r.price && <Price v={r.price} />}
                  {r.note && <Tag text={r.note} />}
                  {r.tip  && <Tag text={r.tip} />}
                  {r.warn && <Tag text={r.warn} warn />}
                </div>
                {r.desc && <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6 }}>{r.desc}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {!allTabsDone && (
        <div style={{ marginTop: 14, padding: "10px 16px", background: "#f59e0b0d",
          border: "1px solid #f59e0b22", borderRadius: 8, fontSize: 13, color: "#f59e0b" }}>
          📌 סיים את כל הטאבים כדי לפתוח את המבחן
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   QUIZ
══════════════════════════════════════════════ */
function Quiz({ item, cat, onFinish, onBack }) {
  const [cur, setCur]     = useState(0);
  const [sel, setSel]     = useState(null);
  const [shown, setShown] = useState(false);
  const [answers, setAns] = useState([]);
  const q = item.quiz[cur];

  function next() {
    const newAns = [...answers, { sel, correct: q.ans }];
    setAns(newAns);
    if (cur + 1 >= item.quiz.length) {
      const score = Math.round(newAns.filter(a => a.sel === a.correct).length / newAns.length * 100);
      onFinish(score);
    } else { setCur(cur + 1); setSel(null); setShown(false); }
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "24px 20px", direction: "rtl" }}>
      <BackBtn onClick={onBack} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 900 }}>📝 {item.he} — מבחן</h2>
        <span style={{ fontSize: 13, color: MUT }}>{cur + 1} / {item.quiz.length}</span>
      </div>
      <Bar pct={Math.round((cur / item.quiz.length) * 100)} color={cat.color} h={4} />
      <div style={{ background: BG2, border: `1.5px solid ${cat.color}33`, borderRadius: 13, padding: 26, marginTop: 18 }}>
        <p style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.6, margin: "0 0 22px" }}>{q.q}</p>
        {q.opts.map((o, i) => {
          let bg = BG3, border2 = BOR, color2 = TXT;
          if (shown && i === q.ans)         { bg = "#10b98118"; border2 = "#10b981"; color2 = "#10b981"; }
          if (shown && sel === i && i !== q.ans) { bg = "#ef444418"; border2 = "#ef4444"; color2 = "#ef4444"; }
          if (!shown && sel === i)          { bg = cat.color + "18"; border2 = cat.color; color2 = cat.color; }
          return (
            <button key={i} onClick={() => { if (!shown) setSel(i); }}
              style={{ display: "block", width: "100%", textAlign: "right", padding: "12px 16px",
                marginBottom: 9, borderRadius: 8, border: `2px solid ${border2}`, background: bg,
                color: color2, fontWeight: 600, fontSize: 14, fontFamily: "inherit",
                cursor: shown ? "default" : "pointer", direction: "rtl", lineHeight: 1.5, transition: "all .15s" }}>
              {o}{shown && i === q.ans ? " ✓" : ""}{shown && sel === i && i !== q.ans ? " ✗" : ""}
            </button>
          );
        })}
        <div style={{ marginTop: 16 }}>
          {!shown
            ? <button onClick={() => { if (sel !== null) setShown(true); }} disabled={sel === null}
                style={{ background: cat.color, color: "#0e1117", border: "none", borderRadius: 8,
                  padding: "11px 24px", fontWeight: 800, fontSize: 14,
                  cursor: sel !== null ? "pointer" : "not-allowed", opacity: sel === null ? 0.4 : 1, fontFamily: "inherit" }}>
                בדוק תשובה
              </button>
            : <button onClick={next}
                style={{ background: cat.color, color: "#0e1117", border: "none", borderRadius: 8,
                  padding: "11px 24px", fontWeight: 800, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
                {cur + 1 >= item.quiz.length ? "סיים מבחן →" : "שאלה הבאה →"}
              </button>}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   RESULT
══════════════════════════════════════════════ */
function Result({ score, item, cat, onBack, onRetry }) {
  const ok = score >= 75;
  return (
    <div style={{ maxWidth: 500, margin: "60px auto", padding: "0 20px", direction: "rtl", textAlign: "center" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>{ok ? "🏆" : "📚"}</div>
      <h1 style={{ fontSize: 24, fontWeight: 900, margin: "0 0 8px", color: ok ? "#10b981" : "#f59e0b" }}>
        {ok ? "כל הכבוד!" : "כמעט!"}
      </h1>
      <p style={{ color: MUT, marginBottom: 28 }}>{item.he} — ציון: {score}%</p>
      <div style={{ width: 120, height: 120, borderRadius: "50%", border: `4px solid ${ok ? "#10b981" : "#f59e0b"}`,
        display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px",
        background: `${ok ? "#10b981" : "#f59e0b"}11`, fontSize: 32, fontWeight: 900, color: ok ? "#10b981" : "#f59e0b" }}>
        {score}%
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button onClick={onBack} style={{ background: "transparent", border: `1.5px solid ${BOR}`,
          borderRadius: 8, color: MUT, padding: "11px 22px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>
          חזרה
        </button>
        <button onClick={onRetry} style={{ background: cat.color, border: "none", borderRadius: 8,
          color: "#0e1117", padding: "11px 22px", cursor: "pointer", fontFamily: "inherit", fontWeight: 800, fontSize: 14 }}>
          נסה שוב
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   ADMIN
══════════════════════════════════════════════ */
function Admin({ allProg }) {
  const [search, setSearch] = useState("");
  const techs = USERS.filter(u => u.role === "tech").filter(u => u.name.includes(search));

  const avgTotal = Math.round(
    USERS.filter(u => u.role === "tech").reduce((s, u) => s + totalPct(allProg[u.id] || mkProgress()), 0) /
    USERS.filter(u => u.role === "tech").length
  );

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 20px", direction: "rtl" }}>
      <h1 style={{ margin: "0 0 4px", fontSize: 21, fontWeight: 900 }}>לוח ניהול 📊</h1>
      <p style={{ color: MUT, margin: "0 0 24px" }}>סקירת כל הטכנאים</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 28 }}>
        {[
          { v: USERS.filter(u => u.role === "tech").length, l: "טכנאים", c: "#f59e0b" },
          { v: `${avgTotal}%`, l: "ממוצע התקדמות", c: "#10b981" },
          { v: CATS.reduce((s, c) => s + c.items.reduce((ss, it) => ss + it.quiz.length, 0), 0), l: "שאלות מבחן", c: "#3b82f6" },
        ].map((s, i) => (
          <div key={i} style={{ background: BG2, border: `1px solid ${BOR}`, borderRadius: 10, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: s.c }}>{s.v}</div>
            <div style={{ fontSize: 11, color: MUT, marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="חפש טכנאי..." dir="rtl"
        style={{ background: BG2, border: `1px solid ${BOR}`, borderRadius: 8, color: TXT,
          padding: "9px 14px", fontSize: 14, fontFamily: "inherit", width: "100%",
          boxSizing: "border-box", marginBottom: 16 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {techs.map(user => {
          const prog = allProg[user.id] || mkProgress();
          const total = totalPct(prog);
          return (
            <div key={user.id} style={{ background: BG2, border: `1px solid ${BOR}`, borderRadius: 12, padding: "20px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#f59e0b1a",
                  border: "2px solid #f59e0b", display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, color: "#f59e0b", fontSize: 14 }}>{user.av}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 15 }}>{user.name}</div>
                </div>
                <div style={{ fontSize: 20, fontWeight: 900, color: total === 100 ? "#10b981" : total > 50 ? "#f59e0b" : MUT }}>{total}%</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 8 }}>
                {CATS.map(cat => {
                  const pct = catPct(prog, cat);
                  return (
                    <div key={cat.id} style={{ background: BG3, borderRadius: 8, padding: "10px 12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 13 }}>
                        <span>{cat.icon} {cat.he}</span>
                        <span style={{ color: cat.color, fontWeight: 700 }}>{pct}%</span>
                      </div>
                      <Bar pct={pct} color={cat.color} h={4} />
                      {cat.items.map(it => {
                        const ip = prog[it.id];
                        return ip?.quizDone
                          ? <div key={it.id} style={{ fontSize: 10, color: "#10b981", marginTop: 4 }}>מבחן {it.he}: {ip.quizScore}%</div>
                          : null;
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   APP
══════════════════════════════════════════════ */
export default function App() {
  const [user,      setUser]  = useState(null);
  const [allProg,   setAll]   = useState(DEMO_PROGRESS);
  const [view,      setView]  = useState("home");
  const [cat,       setCat]   = useState(null);
  const [item,      setItem]  = useState(null);
  const [lastScore, setLS]    = useState(null);

  const up = () => allProg[user?.id] || mkProgress();

  function login(u)   { setUser(u); setView(u.role === "admin" ? "admin" : "home"); }
  function logout()   { setUser(null); setView("home"); setCat(null); setItem(null); }
  function goHome()   { setView(user?.role === "admin" ? "admin" : "home"); setCat(null); setItem(null); }
  function goCat(c)   { setCat(c); setView("cat"); }
  function goItem(it) { setItem(it); setView("item"); }

  function markTab(itemId, tabIdx) {
    setAll(prev => {
      const prog = prev[user.id] || mkProgress();
      const ip   = prog[itemId] || { tabs: [], quizScore: null, quizDone: false };
      if (ip.tabs.includes(tabIdx)) return prev;
      return { ...prev, [user.id]: { ...prog, [itemId]: { ...ip, tabs: [...ip.tabs, tabIdx] } } };
    });
  }

  function finishQuiz(score) {
    setAll(prev => {
      const prog = prev[user.id] || mkProgress();
      const ip   = prog[item.id] || { tabs: [], quizScore: null, quizDone: false };
      return { ...prev, [user.id]: { ...prog, [item.id]: { ...ip, quizScore: score, quizDone: true } } };
    });
    setLS(score);
    setView("result");
  }

  if (!user) return <Login onLogin={login} />;

  return (
    <div style={{ minHeight: "100vh", background: BG, color: TXT, fontFamily: "'Segoe UI', Tahoma, sans-serif" }}>
      <Nav user={user} onHome={goHome} onLogout={logout} />
      {view === "home"   && <Home user={user} prog={up()} onCat={goCat} />}
      {view === "admin"  && <Admin allProg={allProg} />}
      {view === "cat"    && cat  && <CatView  cat={cat}  prog={up()} onItem={goItem} onBack={goHome} />}
      {view === "item"   && item && cat && <ItemView item={item} cat={cat} prog={up()}
        onProgress={markTab} onQuiz={() => setView("quiz")} onBack={() => setView("cat")} />}
      {view === "quiz"   && item && cat && <Quiz    item={item} cat={cat} onFinish={finishQuiz} onBack={() => setView("item")} />}
      {view === "result" && item && cat && <Result  score={lastScore} item={item} cat={cat}
        onBack={() => setView("item")} onRetry={() => setView("quiz")} />}
    </div>
  );
}
