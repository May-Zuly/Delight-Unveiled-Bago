import React from "react";
import { Carousel, Button } from "antd";
import slider1 from "../../assets/images/artifactslider.jpg";
import slider2 from "../../assets/images/bambooslider.jpg";
import slider3 from "../../assets/images/foodslider.jpg";
// Import other images as needed
import "./CarouselSection.css";

const CarouselSection = () => {
  return (
    <Carousel  autoplay autoplaySpeed={1000} speed={500}>
      <div className="carousel-slide">
        <img src={slider1} alt="Organic Food" className="carousel-image" />
        <div className="carousel-content">
          <h1>လက်ရာမြောက်သော ဒေသထွက်ကုန်စုံများ</h1>
          <div>
            <p>ရိုးရာလက်ရာတိုင်းတွင် ထူးခြားဆန်းသစ်သော တီထွင်ဖန်တီးမှုနှင့် ကိုက်ညီသည့် ပဲခူးတိုင်းအတွင်းရှိ မြို့နယ်အသီးသီး၏ လက်မှုပညာရှင်များ၏ ထူးခြားသော လက်မှုပညာကို ကြည့်ရှုလိုက်ပါ</p>
          </div>
        </div>
      </div>
      <div className="carousel-slide">
        <img src={slider2} alt="Organic Food" className="carousel-image" />
        <div className="carousel-content">
          <h1>ကြွယ်ဝသော ယဉ်ကျေးမှု အမွေအနှစ်များ</h1>
          <div>
            <p>အနုစိတ်ဖန်တီးထားသော ပန်းပုလက်ရာများမှသည် မြန်မာ့ အမွေအနှစ်များအကြောင်းကို ပြောပြသော ရှေးဟောင်းအမွေအနှစ်များအထိ ပဲခူးတိုင်းအတွင်းရှိ ဆန်းသစ်သော လက်ရာများကို ရှာဖွေလိုက်ပါ</p>
          </div>
        </div>
      </div>
      <div className="carousel-slide">
        <img src={slider3} alt="Organic Food" className="carousel-image" />
        <div className="carousel-content">
          <h1>လက်ရာမြောက်သော ဒေသထွက်ကုန်များ</h1>
          <div>
            <p>ကျွန်ုပ်တို့၏ ဒေသထွက်ကုန်ကြမ်းများကို ရွေးချယ်ခြင်းဖြင့် ပဲခူးတိုင်း၏ စစ်မှန်သောအရသာများကို မြည်းစမ်းရင်း ကျွန်ုပ်တို့ဒေသ၏ အနှစ်သာရကို သင့်မီးဖိုချောင်သို့ ယူဆောင်လာလိုက်ပါ။</p>
          </div>
        </div>
      </div>
      {/* Add more slides if needed */}
    </Carousel>
  );
};

export default CarouselSection;
