import TechCarousel from "@/components/TechCarousel/TechCarousel";

export default function Home() {
  return (
    <div className="flex h-screen">
      <aside className="flex flex-1 pt-10 bg-black/30 backdrop-blur-md border-r border-white/5 shadow-lg overflow-hidden">
        <div className="w-full flex flex-col gap-1 items-center">
          <div className="overflow-hidden rounded-full h-30 w-30 border-2 border-white shadow-md">
            <img src="profile.png" alt="Profile Picture" />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-white text-3xl font-bold">Jhonatan Ferreira</h1>
            <p className="text-gray-500">Full Stack Developer</p>
          </div>
          <div className="w-full py-2 px-2 flex-1">
            <TechCarousel></TechCarousel>
          </div>
        </div>
      </aside>
      <main className="flex flex-3">
        <section></section>
      </main>
    </div>
  );
}
