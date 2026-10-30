import Reveal from "@/components/Reveal";

const POINTS = [
  {
    number: "01",
    title: "Вместе интереснее",
    text: "Можно прийти компанией друзей или одноклассников и провести время вместе.",
  },
  {
    number: "02",
    title: "Повод для праздника",
    text: "Квест подойдёт для дня рождения или встречи, которую хочется сделать особенной.",
  },
  {
    number: "03",
    title: "Необычный формат",
    text: "Вместо привычного похода в гости — тематическая игра в музее «Экспериментарий».",
  },
];

export default function ValueSection() {
  return (
    <section id="about" className="relative border-t border-gold/12 bg-ink py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px w-10 bg-gold/70" />
                  <span className="eyebrow">О квесте</span>
                </div>
                <h2 className="font-display text-3xl leading-[1.12] text-parchment sm:text-4xl lg:text-[2.9rem]">
                  Час для друзей,
                  <br />
                  <span className="text-gold-soft">магии и игры</span>
                </h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-parchment-dim sm:text-[15px]">
                  Квест по мотивам Гарри Поттера проходит в музее «Экспериментарий» в Анапе. Это возможность собраться компанией и провести время в тематическом формате.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="divide-y divide-parchment/10 border-y border-parchment/10">
              {POINTS.map((point, index) => (
                <Reveal as="li" key={point.number} delay={index * 90} className="py-7 sm:py-8">
                  <div className="flex gap-5 sm:gap-7">
                    <span className="font-display text-lg text-gold/70 sm:text-xl">{point.number}</span>
                    <div>
                      <h3 className="font-display text-xl text-parchment sm:text-2xl">{point.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-parchment-dim sm:text-[15px]">
                        {point.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={120}>
              <p className="mt-8 border-l border-gold/40 pl-5 text-sm leading-relaxed text-parchment/80 sm:text-[15px]">
                Подойдёт для дня рождения или встречи с друзьями и одноклассниками.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
