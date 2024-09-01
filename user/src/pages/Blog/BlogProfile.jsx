import React from "react";
import "./BlogProfile.css";
import { useParams } from "react-router-dom";
import { Typography } from "antd";

// Example videos stored in the public folder
const blogData = [
  {
    title: "ပြည်မြို့မှယိုလုပ်ငန်းအကြောင်းတစေ့တစောင်း",
    description:
      "ယခုဖော်ပြထားသောဘလော့ဗီဒီယိုသည် မြင့်နှင့်ကောင်းသန့်ယိုမျိုးစုံလုပ်ငန်းမှ ရိုက်ကူးဖော်ပြထားခြင်းဖြစ်ပြီး ရှောက်သီးယိုပြုလုပ်ပုံအဆင့်ဆင့်နှင့်နွားနို့မလိုင်ပြုလုပ်ပုံအနဲငယ်ကိုရိုက်ကူးဖော်ပြထားခြင်းဖြစ်ပါသည်။ရှောက်ယိုပြုလုပ်ခြင်းတွင်လတ်ဆတ်ပြီး အရသာပြည့်ဝသော ရှောက်သီးများကို ရွေးချယ်၍သေချာစွာဆေးကြောသန့်စင်ပြီးရှောက်သီးများကို အနှစ်နှင့် အခွံ သီးသန့်ဖယ်ရှားရသည်။ထို့နောက်ရှောက်သီးများကို သေးငယ်သော အပိုင်းအခြားများအဖြစ် ခွဲစိတ်ပြီးတစ်ရက်ခန့်ထုံးရည်စိမ်ထားရသည်။ထို့နောက် သကြားနှင့်ဆားတို့ကို အချိုးကျပေါင်းစပ်ပြီးယိုထိုးနိုင်ပြီဖြစ်သည်။ပြုလုပ်ပြီးသော ရှောက်ယိုကိုအအေးခံ၍ကောင်းမွန်သော ထုပ်ပိုးမှုဖြင့် ထုပ်ပိုးရောင်းချကြပါသည်။",
    videoUrl: "/videos/blog2.mp4",
    extraTitle: "လက်ဆတ်ယို၏အကျိုးကျေးဇူးများ",
    extraDesctiption:
      "သဘာဝသစ်သီးများဖြင့် ပြုလုပ်ထားသော ယိုများသည် ဗီတာမင်နှင့် သင့်စပ်သော အာဟာရဓာတ်များ ပါဝင်သောကြောင့် ကျန်းမာရေးအတွက် အထူးသင့်လျော်သည်။သဘာဝသစ်သီးများမှ ရရှိသော အာဟာရဓာတ်များအပြည့်အဝကို ရယူနိုင်ပြီး အရသာလည်း ထူးခြားကောင်းမွန်သည့် အတွက် လူအများက အနှစ်သာရအဖြစ် သုံးစွဲကြပါသည်။သန့်ရှင်းသော ပြုပြင်ထုတ်လုပ်မှုနည်းလမ်းများအသုံးပြု၍ ထုတ်လုပ်ထားသောကြောင့် စားသုံးသူများအတွက်ကျန်းမာရေးနှင့်ညီညွတ်ကောင်းမွန်စေပါသည်။",
  },
  {
    title: "မင်းလှမြို့မှ ရိုးရာ မြန်မာ့သစ်သား လက်ရာများ",
    description:
      "ထိုဘလော့ဗီဒီယိုတွင်သစ်သားရုပ်ထုများထုတ်လုပ်သောမင်းလှမြို့ရှိ'လင်းတိုင်းပြည့်'ပန်းပုလုပ်ငန်းသို့သွားရောက်၍ ဗဟုသုတရစရာအကြောင်းအရာအနည်းငယ်ကိုဖော်ပြထားပါသည်။ပန်းပုလုပ်ငန်းအတွက်သစ်အလေအလွင့်မရှိစေရန် သစ်သားပုံစံအသေးမှစ၍ အရွယ်အစားအလိုက်သင့်တော်သောအသုံးအဆောင်ပစ္စည်းများကိုထုတ်လုပ်သည်။လက်မှုပညာရှင်များသည်ရိုးရာဒီဇိုင်းများကိုအခြေခံ၍ သစ်သားပေါ်တွင်ပုံများရေးဆွဲပြီး ထိုပုံများအတိုင်းဓားနှင့်ဆောက်များကိုအသုံးပြု၍ပန်းပုထွင်းထုကြသည်။စားသုံးသူရေးရာဦးစီးဌာနအနေဖြင့်မြန်မာမှုပန်းပုလုပ်ငန်းဖွံ့ဖြိုးတိုးတက်လာစေရန်အတွက်ဈေးကွက်ပိုမိုကျယ်ပြန့်စွာထုတ်လုပ်နိုင်ရေးအတွက်ပဲခူးမြို့အ‌ရောင်းပြခန်းတွင်ဗွီနိုင်းစနစ်Venyl ဖြင့်ပြသရောင်းချနိုင်ရေးကိုကူညီဆောင်ရွက်ပေးထားကြောင်းသိရပါသည်။",
    videoUrl: "/videos/wooden-blog.mp4",
    extraTitle: "သစ်သားရုပ်ထု၏အကျိုးကျေးဇူးများ",
    extraDesctiption:
      "မြန်မာ့ ရိုးရာရုပ်ထုပန်းပုလုပ်ငန်းသည် မြန်မာ့ ယဉ်ကျေးမှုနှင့် အနုပညာအမွေအနှစ်များကို ထိန်းသိမ်းစောင့်ရှောက်ရာတွင် အရေးပါသည်။၎င်းသည် ခရီးသွားလည်ပတ်သူများနှင့် အနုပညာရောင်းဝယ်သူများအတွက် စိတ်ဝင်စားမှုကို ရရှိစေပြီး စီးပွားရေးဖြစ်စဉ်တွင် အထောက်အကူပြုသည်။မြန်မာ့ရိုးရာသစ်သားရုပ်ထုပန်းပုလုပ်ငန်းသည် မြန်မာ့ ယဉ်ကျေးမှုနှင့် အနုပညာ၏ အထင်ကရအခန်းကဏ္ဍတစ်ခုဖြစ်ကာ လက်မှုပညာရှင်များ၏ တီထွင်စွမ်းဆောင်ရည်နှင့် သမိုင်းရိုးရာကို ထိန်းသိမ်းစောင့်ရှောက်နေသော လုပ်ငန်းတစ်ခုဖြစ်သည်။",
  },
  {
    title: "ပေါင်းတည်ရှိအကျိုအမြတ်ဖြစ်ထွန်းလျက်ရှိသောပြောင်းဖူးဈေးကွက်",
    description:
      "ပဲခူးတိုင်းဒေသကြီး၊ နတ်တလင်းခရိုင်၊ ပေါင်းတည်မြို့နယ်တွင် အနယ်နယ်အရပ်ရပ်သို့ တင်ပို့နိုင်ရန်နှင့် ရန်ကုန်-ပြည် ကားလမ်းဘေးတလျှောက်တွင် ဖြစ်ထွန်းလျက်ရှိသော ပြောင်းဖူးဆိုင်တန်း စျေးကွက်အတွက် ဒေသခံတောင်သူများသည် တစ်နှစ်ပတ်လုံး ပြောင်းစိုက်ပျိုးရေးကို လုပ်ကိုင်လာကြပြီး အဆင်ပြေလျက်ရှိကြောင်း သိရသည်။သုံးရာသီပတ်လုံးဝယ်လိုအား ရှိခြင်းကြောင့်လည်း အလှည့်ကျသုံးသီးစား စိုက်ပျိုးထုတ်လုပ်လျက်ရှိကြောင်း၊ စျေးကွက်လိုအပ်ချက်ကို မူတည်၍ဒေသအခေါ် လေယာဉ်စိမ်းပြောင်းမျိုးများ စိုက်ပျိုးမှုများပြားကြောင်း ပြောင်းစိုက်တောင်သူတစ်ဦးထံမှသိရသည်။ယင်းသို့ ပြောင်းဖူးများရောင်းအားကောင်းမှု၊ စျေးကွက်ဖြစ်ထွန်းအောင်မြင်နေမှုတို့ကြောင့် ဒေသခံတောင်သူများနှင့် ဝယ်ယူရောင်းချသူများမိသားစုဝင်ငွေများတိုးကာ အဆင်ပြေလျက်ရှိပါသည်။",
    videoUrl: "/videos/blog3.mp4",
    extraTitle: "ပြောင်းဖူးဆိုင်တန်းများ၏အံ့ဖွယ်အတွေ့အကြုံ",
    extraDesctiption: "ပြောင်းဖူးစျေးတန်းကြီးသည်ဒေသစျေးကွက်အဖြစ်ရပ်တည်လျက်ရှိပြီးပြောင်းဖူးစိမ်းများအပြင်အသင့်စားသုံးနိုင်ရန်မီးဖုတ်၍လည်းရောင်းချလျက်ရှိသောကြောင့်အနယ်နယ်အရပ်ရပ်မှခရီးသွားပြည်သူများသည်နှစ်ခြိုက်စွာဝယ်ယူစားသုံးကြသည်။ထိုပြောင်းဖူးဆိုင်တန်းများတွင်ပြေင်းဖူးပေါက်ပါက်များ၊ပဲအရွကြော်များ၊မရွေးများ၊ထန်းလျက်များနှင့်တခြားဒေသထွက်မုန့်များကိုစုံလင်စွာရရှိနိုင်သည့်အပြင်စိတ်ကြိုက်မြီးစမ်း၍ဝယ်ယူနိုင်သည်။တခြားဒေသတွင်မရနိုင်သည့်အရသာရှိမှုနှင့်လတ်ဆတ်မှုတို့ကိုခံစားရပါလိမ့်မည်။",
  },
];

const BlogProfile = () => {
  const { id } = useParams();
  const nextId =
    parseInt(id) + 1 < blogData.length
      ? parseInt(id) + 1
      : parseInt(id) - blogData.length + 1;
  const nextId2 =
    parseInt(id) + 2 < blogData.length
      ? parseInt(id) + 2
      : parseInt(id) - blogData.length + 2;
  return (
    <>
      <main className="main">
        <article className="entry entry-lede">
          <video className="entry-video" controls style={{ width: "45vw" }}>
            <source src={blogData[id]?.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="entry-content">
            <h1 className="entry-headline primary-headline">
              {blogData[id]?.title}
            </h1>
            <time className="entry-date meta">July 22, 2024</time>
            <span className="entry-byline meta"> by May Zuly Moe</span>
            <p className="entry-summary" style={{textAlign:"justify"}}>{blogData[id]?.description}</p>
          </div>
        </article>
        <article className="entry">
          <a
            href={`/blog/${nextId}`}
            style={{ textDecoration: "none", color: "var(--text)" }}
          >
            <video className="entry-video" controls style={{ width: "30vw" }}>
              <source src={blogData[nextId]?.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h1 className="entry-headline primary-headline">
              {blogData[nextId]?.title}
            </h1>
            <time className="entry-date meta">June 30, 2024</time>
            <span className="entry-byline meta"> by May Zuly Moe</span>
            <Typography.Paragraph className="entry-summary" ellipsis={{ rows: 2, expandable: true, symbol: "more" }}>{blogData[nextId]?.description}</Typography.Paragraph>
          </a>
        </article>
        <article className="entry">
          <a
            href={`/blog/${nextId2}`}
            style={{ textDecoration: "none", color: "var(--text)" }}
          >
            <video className="entry-video" controls style={{ width: "30vw" }}>
              <source src={blogData[nextId2]?.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h1 className="entry-headline primary-headline">
              {blogData[nextId2]?.title}
            </h1>
            <time className="entry-date meta">June 22, 2024</time>
            <span className="entry-byline meta"> by May Zuly Moe</span>
            <Typography.Paragraph className="entry-summary" ellipsis={{ rows: 2, expandable: true, symbol: "more" }}>{blogData[nextId2]?.description}</Typography.Paragraph>
          </a>
        </article>
        <section className="trending">
          <h1 className="entry-headline primary-headline" style={{fontSize:"20px"}}>
            {blogData[id]?.extraTitle}
          </h1>
          <p style={{textAlign:"justify"}}>{blogData[id]?.extraDesctiption}</p>
        </section>
      </main>
    </>
  );
};

export default BlogProfile;
