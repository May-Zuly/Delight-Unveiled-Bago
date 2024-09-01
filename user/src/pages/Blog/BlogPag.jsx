import "./BlogPage.css";

import { Card, Col, Image, Row } from "antd";

import { useEffect } from "react";

// Example videos stored in the public folder
const blogData = [
  {
    title: "ပြည်မြို့မှယိုလုပ်ငန်းအကြောင်းတစေ့တစောင်း",
    description:
      "သစ်သီးမျိုးစုံယိုမျိုးစုံစာသောက်ကုန်လုပ်ငန်းသည် သဘာဝသစ်သီးများကို အကောင်းဆုံးအသုံးပြုကာ ကျန်းမာရေးနှင့် အရသာပြည့်ဝမှုကို ပေးစွမ်းနိုင်သော စာသောက်ကုန်များကို ထုတ်လုပ်ရောင်းချသည့် အစဉ်အလာရှိသော လုပ်ငန်းတစ်ခုဖြစ်ပါသည်။",
    imageUrl: "/src/assets/images/jam1.jpg",
    date: "July 22, 2024",
  },
  {
    title: "မင်းလှမြို့မှ ရိုးရာ မြန်မာ့သစ်သား လက်ရာများ",
    description:
      "မြန်မာ့ရိုးရာ သစ်သားပန်းပုလုပ်ငန်းသည် ယဉ်ကျေးမှုနှင့် အနုပညာ အမွေအနှစ်များအတွက် အရေးပါပြီး ထူးထူးခြားခြား ပန်းပုအတတ်ပညာများနှင့် လှပပြီး သဘာဝပန်းပုများကို ဖန်တီးရန် အချိန်အတော်အတန်ကြာသည့် လုပ်ငန်းစဉ်များကို ပြသထားသည်။",
    imageUrl: "/src/assets/images/panpu1.jpg",
    date: "June 30, 2024",
  },
  {
    title: "ပေါင်းတည်ရှိအကျိုအမြတ်ဖြစ်ထွန်းလျက်ရှိသောပြောင်းဖူးဈေးကွက်",
    description:
      "ရန်ကုန်-ပြည်လမ်းမကြီးတစ်လျှောက် ဖွံ့ဖြိုး တိုးတက်နေသော ပြောင်းဈေး ကွက်များသို့ တင်ပို့နိုင်ရေးအတွက် ပေါင်းတည်မြို့နယ်ရှိ ဒေသခံတောင်သူ များသည် တစ်နှစ်ပတ်လုံး ပြောင်းစိုက် ပျိုးရေးလုပ်ငန်းကို လုပ်ကိုင် လျက်ရှိသည်။",
    imageUrl: "/src/assets/images/corn.jpg",
    date: "June 22, 2024",
  },
];

const BlogPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="blog-page">
      <h1 className="blog-title">ပဲခူးတိုင်းအတွင်း လှပသော ခရီးနှင့် အတွေ့အကြုံများ</h1>
      <Row gutter={[16, 16]}>
        {blogData.map((blog, index) => (
          <Col xs={24} sm={24} md={12} lg={8} key={index}>
            <a href={`/blog/${index}`}>
              <Card
                hoverable
                cover={
                  <Image
                    alt={blog.title}
                    src={blog.imageUrl}
                    className="blog-image" // Updated to image element
                  />
                }
              >
                <Card.Meta
                  title={
                    <div>
                      {blog.title}
                      <div className="blog-meta-info">
                        <time style={{fontStyle:'italic',fontSize:'0.75rem'}}>{blog.date}</time>
                        <span style={{fontStyle:'italic',fontSize:'0.75rem'}}> by May Zuly Moe</span>
                      </div>
                    </div>
                  }
                  style={{textAlign:"justify"}}
                  description={blog.description}
                />
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BlogPage;
