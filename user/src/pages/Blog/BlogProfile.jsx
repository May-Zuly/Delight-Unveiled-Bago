import React from 'react';
import './BlogProfile.css';
import { useParams } from 'react-router-dom';

// Example videos stored in the public folder
const blogData = [
  {
    title: 'Exploring the Bago Region - Part 1',
    description:
      'Join us as we explore the scenic beauty of the Bago Region. In this video, we cover the breathtaking landscapes and cultural heritage sites.',
    videoUrl: '/videos/blog1.mp4',
  },
  {
    title: 'Bago Region Cuisine',
    description:
      'Discover the unique and delicious cuisine of the Bago Region. This video showcases some of the best local dishes you must try.',
    videoUrl: '/videos/blog1.mp4',
  },
  {
    title: 'Adventure Activities in Bago',
    description:
      'Get ready for some adrenaline-pumping adventure activities in the Bago Region. This video highlights the top activities for thrill-seekers.',
    videoUrl: '/videos/blog1.mp4',
  },
];

const BlogProfile = () => {
  const { id } = useParams();
  return (
    <>
      {/* <header className='header'>
        <h1 className='header-title masthead'>{blogData[id].title}</h1>
      </header> */}
      <main className='main'>
        <article className='entry entry-lede'>
          <img
            className='entry-img'
            src='https://assets.codepen.io/467/horse02.jpg'
            alt='A handsome young horse in front of an expansive sky'
            style={{ width: '45vw' }}
          />
          <div className='entry-content'>
            <h1 className='entry-headline primary-headline'>
              {blogData[id]?.title}
            </h1>
            <time className='entry-date meta'>January 24, 2021</time>
            <span className='entry-byline meta'>by Alex Trost</span>
            <p className='entry-summary'>{blogData[id]?.description}</p>
          </div>
        </article>
        <article className='entry'>
          <a
            href={`/blog/${parseInt(id) + 1}`}
            style={{ textDecoration: 'none', color: 'var(--text)' }}
          >
            <img
              className='entry-img'
              src='https://assets.codepen.io/467/horse03.jpg'
              alt='The profile view of three majestic brown horses'
              style={{ width: '30vw' }}
            />
            <h1 className='entry-headline primary-headline'>
              {blogData[parseInt(id) + 1]?.title}
            </h1>
            <time className='entry-date meta'>January 24, 2021</time>
            <span className='entry-byline meta'>by Alex Trost</span>
            <p className='entry-summary'>
              {blogData[parseInt(id) + 1]?.description}
            </p>
          </a>
        </article>
        <article className='entry'>
          <a
            href={`/blog/${parseInt(id) + 2}`}
            style={{ textDecoration: 'none', color: 'var(--text)' }}
          >
            <img
              className='entry-img'
              src='https://assets.codepen.io/467/horse01.jpg'
              alt='The profile view of three majestic brown horses'
              style={{ width: '30vw' }}
            />
            <h1 className='entry-headline primary-headline'>
              {blogData[parseInt(id) + 2]?.title}
            </h1>
            <time className='entry-date meta'>January 24, 2021</time>
            <span className='entry-byline meta'>by Alex Trost</span>
            <p className='entry-summary'>
              {blogData[parseInt(id) + 2]?.description}
            </p>
          </a>
        </article>
        <section className='trending'>
          <h1 className='entry-headline primary-headline'>Tips blah blah</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            temporibus atque, mollitia dolores ut molestias quia saepe nobis
            iure vero id officiis modi quidem distinctio magnam nostrum
            voluptatem reiciendis voluptates?
          </p>
        </section>
      </main>
    </>
  );
};

export default BlogProfile;
