import Image from 'next/image';

import Hero from '@/components/HomePage/Hero/Hero';
import Section from '@/components/HomePage/Section';
import Footer from "@/components/HomePage/Footer/Footer";
import Modal from '@/components/Modal';

export default function Home() {
  return <>
    <Modal msg="I created this project to showcase my React and Nextjs skills. I used Nextjs, Tailwindcss, Classnames, React Icons, and Firebase." />
    <Hero />
    <Section
      isOpaqueBG={false}
      paddingY="
        pt-[9.688em] pb-[21em]
        screen-s:py-32
        screen-3xs:py-24
      "
      title={<>
        Educa
        <span className="relative right-[0.2em]">t</span>
        <span className="relative right-[0.35em]">ion</span>
      </>}
      content={[
        {
          subTitle: 'Front-end web development',
          details: 'Self-taught (2024)',
          paragraph: 'I learned HTML, CSS, JavaScrpt, Git, Reactjs, Tailwindcss, Redux Toolkit, and Nextjs.',
        },
        {
          subTitle: 'Bachelor\'s Degree in Mechatronics Engineering - GPA: 3.64',
          details: 'Arab Academy for Science, Technology and Maritime Transport (2009 - 2014)',
          paragraph: 'Here is where I was first introduced to programming. I learned C++ as my first programming language. I also learned how to program micro-controllers to create automatic systems. My graduation project was a vacuum cleaning robot.',
        }
      ]}
    />
    <div className="
      relative text-[1rem]
      screen-xl:text-[0.9rem]
      screen-slg:text-[0.8rem]
      screen-md:text-[0.7rem]
      screen-smd:text-[0.62rem]
    ">
      <Image
        width="1000"
        height="598"
        className="
          w-[31.25em] h-auto
          absolute top-[-12em] right-[8em]
          screen-s:hidden
        "
        alt=""
        src="/pizza.png"
      />
      <Section
        isOpaqueBG
        paddingY="
          pt-[9.688em] pb-[39em]
          screen-s:py-32
          screen-3xs:py-24
        "
        title={<>Exper<span className="relative right-[0.14em]">ience</span></>}
        content={[
          {
            subTitle: 'Digital illustrator',
            details: 'Freelance (2019 - 2023)',
            paragraph: 'I had been working as a freelance digital illustrator for about 4 years. And, as a result, I aquired color theory-related knowledge. I invite you to visit my Behance to see some of my work.'
          }
        ]}
      />
      <Image
        height="1000"
        width="423"
        className="
          w-auto h-[31.25em]
          absolute bottom-[4.1em] left-11
          screen-s:hidden
        "
        alt=""
        src="/soda.png"
      />
    </div>
    <Footer />
    <div className="modal-container"></div>
  </>;
}