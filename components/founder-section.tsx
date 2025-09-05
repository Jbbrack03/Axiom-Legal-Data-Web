import Image from "next/image"

export function FounderSection() {
  return (
    <section className="container max-w-screen-xl mx-auto px-4 py-32">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">From the Founder</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
        {/* Left Column - Image */}
        <div className="flex justify-center md:justify-end">
          <div className="relative">
            <Image
              src="/founder-headshot.png"
              alt="Josh Brackin, Founder of Axiom Legal Data"
              width={300}
              height={300}
              className="rounded-2xl border-2 border-primary/20 shadow-lg"
            />
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white">A Relentless Focus on Quality</h3>

          <div className="space-y-4 text-foreground leading-relaxed">
            <p>
              My career was forged over a decade of managing people and systems for corporate America, where 'good enough' is never an option. You learn to build systems and processes that are reliable, scalable, and deliver an unimpeachable user experience. When I began my deep dive into AI, I saw that the foundational data used in legal tech didn't meet that standard. It was brittle, legally risky, and often failed the customer before the product was even built. Axiom was born from a simple idea: to bring an exceptional standard of quality and reliability to the foundational data that powers legal AI.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
