import Image from 'next/image';

import Hero from '@/components/HomePage/Hero/Hero';
import Section from '@/components/HomePage/Hero/Section';
import Footer from "@/components/HomePage/Footer/Footer";

export default function Home() {
  return <>
    <Hero />
    <Section
      isOpaqueBG={false}
      paddingY="pt-[9.688rem] pb-[21rem]"
      title={<>
        Educa
        <span className="relative right-[0.6rem]">t</span>
        <span className="relative right-[1.1rem]">ion</span>
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
    <div className="relative">
      <Image
        width="500"
        height="290"
        className="absolute top-[-12rem] right-[12rem]"
        alt=""
        src="/pizza.png"
      />
      <Section
        isOpaqueBG
        paddingY="pt-[9.688rem] pb-[39rem]"
        title={<>Exper<span className="relative right-[0.45rem]">ience</span></>}
        content={[
          {
            subTitle: 'Digital illustrator',
            details: 'Freelance (2019 - 2023)',
            paragraph: 'I had been working as a freelance digital illustrator for about 4 years. And, as a result, I aquired color theory-related knowledge. I invite you to visit my Behance to see some of my work.'
          }
        ]}
      />
      <Image
        height="500"
        width="212"
        className="absolute bottom-[4.1rem] left-[4.1rem]"
        alt=""
        src="/soda.png"
      />
    </div>
    <Footer />
  </>;
}