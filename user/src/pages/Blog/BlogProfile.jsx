import React from "react";
import "./BlogProfile.css";
import { useParams } from "react-router-dom";
import { Typography } from "antd";

// Example videos stored in the public folder
const blogData = [
  {
    title: "A glimpse of the jam industry in Pyay",
    description:
      "This blog video shows the step-by-step process of making lemon jam and a little step of how to make cow's milk cream.In the process of making lemon jam, select fresh and full-flavored fruits, thoroughly wash and clean them, and remove the yolk and peel from the fruits. Then cut them into small pieces and soak them in lime juice for a day. After that, sugar and salt can be mixed in proportion to make lemon jam. The made jams are cooled and sold in good packaging.These blog videos are recorded and presented from 'Myint' and 'Kaung Thant' Jam industry. ",
    videoUrl: "/videos/jam-blog1.mp4",
    extraTitle: "Benefits of Fresh Jam",
    extraDesctiption:
      "Jams made from natural fruits are very healthy because they contain vitamins and nutrients.Many people use it as an essence because they can get all the nutrients obtained from natural fruits and have a unique taste.Produced using clean manufacturing methods, it feels great.",
  },
  {
    title: "Traditional Wooden Carvings from Minhla ",
    description:
      "In that blog video, I visit a wood carving workshop 'Lin Tine Pyae' in Minhla and provide a few things to learn about.It is important to choose the right wood for the sculpture and to ensure that there is no wastage of wood in the sculpture. From small to small wooden models, this industry produces suitable accessories according to the size.Artisans draw pictures on wood based on traditional designs and carve sculptures based on those pictures using knives and chisels.Then they cover the surface with paint to make it look beautiful with paintings and make it look like a pattern.",
    videoUrl: "/videos/wooden-blog1.mp4",
    extraTitle: "Benefits of Burmese Wood Sculpture",
    extraDesctiption:
      "Myanmar's traditional sculpture industry is important in preserving Myanmar's cultural and artistic heritage.It helps in the business process by generating interest for tourists and art dealers.Burmese traditional wood carving is an important part of Burmese culture and art, and it is an industry that preserves the creativity and historical tradition of the artisans.",
  },
  {
    title: "A Profitable Corn Market in PaungDe",
    description:
      "Bago Region In Nat Talin District, seasonal crops are grown, but corn crops are grown almost all year round depending on water availability and market demand.Due to the demand for all three seasons, three crops are grown in rotation. A corn farmer said that depending on the market demand, there is a lot of planting of local green plane corn varieties.In the corn market situation, there are not only local sales, but also buyers from other townships.The good sales of such corn, Due to the success of the market, local farmers and buyers and sellers have increased their family incomes.",
    videoUrl: "/videos/corn-blog.mp4",
    extraTitle: "Flavor Corn Rows Experience",
    extraDesctiption: "The big corn market stands as a local market, and in addition to raw corn, it also sells roasted corn for ready consumption, so tourists from all over the world like to buy and eat it.In those corn rows, popcorn, Fried green beans, selected, Palms and other local sweets are perfectly available and you can try and buy a custom tail.You will experience deliciousness and freshness unlike any other place.",
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
            <time className="entry-date meta">January 24, 2021</time>
            <span className="entry-byline meta">by Alex Trost</span>
            <p className="entry-summary">{blogData[id]?.description}</p>
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
            <time className="entry-date meta">January 24, 2021</time>
            <span className="entry-byline meta">by Alex Trost</span>
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
            <time className="entry-date meta">January 24, 2021</time>
            <span className="entry-byline meta">by Alex Trost</span>
            <Typography.Paragraph className="entry-summary" ellipsis={{ rows: 2, expandable: true, symbol: "more" }}>{blogData[nextId2]?.description}</Typography.Paragraph>
          </a>
        </article>
        <section className="trending">
          <h1 className="entry-headline primary-headline">
            {blogData[id]?.extraTitle}
          </h1>
          <p>{blogData[id]?.extraDesctiption}</p>
        </section>
      </main>
    </>
  );
};

export default BlogProfile;
