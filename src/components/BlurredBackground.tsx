export default function BlurredBackground() {
  return (
    <>
      <section className="w-screen h-full z-[-2] flex-grow absolute inset-0">
        <span className="blur-[250px] block rounded-full w-[45rem] h-[40rem] -top-16 right-4 animate-spin-slow absolute bg-gradient-to-b from-[#37E7FF] via-[#E0CE92] to-[#F040BF]" />
        <span className="blur-[250px] block rounded-full w-[30rem] h-[35rem] top-[105vh] -left-0 animate-spin-slow absolute bg-gradient-to-b from-[#FF375B] via-[#92E0A8] to-[#4440F0]" />
      </section>
    </>
  );
}
