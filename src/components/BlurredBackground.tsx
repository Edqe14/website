export default function BlurredBackground() {
  return (
    <>
      <section className="w-screen h-full z-[-2] flex-grow absolute inset-0 overflow-hidden">
        <span
          id="blob-1"
          className="blur-[250px] block rounded-full w-[45rem] h-[40rem] -top-80 md:-top-16 -right-96 md:right-4 animate-spin-slow absolute bg-gradient-to-b from-[#37E7FF] via-[#E0CE92] to-[#F040BF]"
        />

        <span
          id="blob-2"
          className="blur-[250px] block rounded-full w-[30rem] h-[35rem] top-[105vh] -left-48 md:left-0 animate-spin-slow absolute bg-gradient-to-b from-[#FF375B] via-[#92E0A8] to-[#4440F0]"
        />

        <span
          id="blob-3"
          className="blur-[250px] block rounded-full w-[30rem] h-[35rem] top-[200vh] -right-56 md:right-0 animate-spin-slow absolute bg-gradient-to-b from-[#37FF4B] via-[#92ACE0] to-[#F040C9]"
        />
      </section>
    </>
  );
}
