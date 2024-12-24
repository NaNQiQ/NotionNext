import Image from "next/image"

export function HeroSection() {
  return (
    <section className="py-12 md:py-24">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">
            Hi There 👋, Syakir Here!
            <br />
            你好 👋, 这里是 Syakir!
          </h1>
          <div className="space-y-4 text-muted-foreground">
            <p>
              I am a Front-end Engineer from Indonesia. I love sharing what I know on devaradise.com, and sometime I also share freebies like this. I&apos;m also active on dev.to and twitter.
            </p>
            <p className="text-sm">
              我是来自印度尼西亚的前端工程师。我喜欢在devaradise.com上分享我知道的东西，有时我也会分享这样的免费赠品。我还活跃在dev.to和twitter上。
            </p>
          </div>
        </div>
        <div className="relative aspect-square md:aspect-auto">
          <div className="absolute right-0 top-0 h-72 w-72 overflow-hidden rounded-lg bg-blue-500">
            <Image
              src="/placeholder.svg"
              alt="Profile"
              width={288}
              height={288}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

