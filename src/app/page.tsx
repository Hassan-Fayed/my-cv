import Hero from '@/components/HomePage/Hero/Hero';
import Section from '@/components/HomePage/Hero/Section';
import Footer from "@/components/HomePage/Footer/Footer";

export default function Home() {
  return <>
    <Hero />
    <Section
      isOpaqueBG={false}
      title="Education"
      content={[
        {
          title: 'Front-end web development',
          subTitle: 'Self-taught (2024)',
          paragraph: 'I learned HTML, CSS, JavaScrpt, Git, Reactjs, Tailwindcss, Redux Toolkit, and Nextjs.',
        },
        {
          title: 'Bachelor\'s Degree in Mechatronics Engineering - GPA: 3.64',
          subTitle: 'Arab Academy for Science, Technology and Maritime Transport (2009 - 2014)',
          paragraph: 'Here is where I was first introduced to programming. I learned C++ as my first programming language. I also learned how to program micro-controllers to create automatic systems. My graduation project was a vacuum cleaning robot.',
        }
      ]}
    />
    <Section
      isOpaqueBG
      title="Experience"
      content={[
        {
          title: 'Digital illustrator',
          subTitle: 'Freelance (2019 - 2023)',
          paragraph: 'I had been working as a freelance digital illustrator for about 4 years. And, as a result, I aquired color theory-related knowledge. I invite you to visit my Behance to see some of my work.'
        }
      ]}
    />
    <Footer />
  </>;
}