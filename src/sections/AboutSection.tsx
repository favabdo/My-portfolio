import FadeIn from "../components/FadeIn";
import AnimatedText from "../components/AnimatedText";
import DecorIcon from "../components/DecorIcon";
import portraitImg from "../assets/images/portrait.png";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
    >
      {/* Decorative corner icons — AI / ML / CS themed */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px]"
      >
        <DecorIcon type="graph" />
      </FadeIn>

      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]"
      >
        <DecorIcon type="code" />
      </FadeIn>

      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px]"
      >
        <DecorIcon type="matrix" />
      </FadeIn>

      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px]"
      >
        <DecorIcon type="radar" />
      </FadeIn>

      {/* Heading + text + button */}
      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            About me
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText
            text="An AI & Machine Learning engineer with a focus on computer vision and deep learning, i build automation pipelines, real-time AI services, and backend systems that turn raw data into decisions. From training CNNs to shipping production APIs, i enjoy taking a problem all the way from prototype to deployment. Let's build something intelligent together!"
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
            style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
          />

          {/* 3D Portrait */}
          <FadeIn delay={0.3} y={30}>
            <img
              src={portraitImg}
              alt="Abdallah Elsawy 3D"
              draggable={false}
              style={{
                width: "clamp(180px, 28vw, 400px)",
                objectFit: "contain",
                objectPosition: "top center",
                pointerEvents: "none",
                userSelect: "none",
              }}
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
