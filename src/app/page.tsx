import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { IntroOverlay } from "@/components/intro-overlay";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Credentials } from "@/components/sections/credentials";
import { Experience } from "@/components/sections/experience";
import { GithubActivity } from "@/components/sections/github-activity";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Writing } from "@/components/sections/writing";

export default function Home() {
  return (
    <>
      <IntroOverlay />
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <GithubActivity />
        <Credentials />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
