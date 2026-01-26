import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../animations/gsap.config'
import Section from '../layout/Section'
import Container from '../ui/Container'
import { freeBonusScrollData } from '../../data/freeBonusScroll.data'

export default function FreeBonusScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement[]>([])
  const imagesRef = useRef<HTMLImageElement[]>([])
  const boxRef = useRef<HTMLDivElement>(null)

  // helper to collect refs
  const setStepRef = (el: HTMLDivElement | null, i: number) => {
    if (el) stepsRef.current[i] = el
  }
  const setImageRef = (el: HTMLImageElement | null, i: number) => {
    if (el) imagesRef.current[i] = el
  }

  useLayoutEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const totalSteps = freeBonusScrollData.steps.length

      // initial states
      gsap.set(imagesRef.current, { autoAlpha: 0 })
      gsap.set(imagesRef.current[0], { autoAlpha: 1 })
      gsap.set(boxRef.current, {
        y: stepsRef.current[0].offsetTop,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalSteps * 100}%`,
          scrub: true,
          pin: true,
        },
      })

      freeBonusScrollData.steps.forEach((_, i) => {
        const stepEl = stepsRef.current[i]
        const imgEl = imagesRef.current[i]

        tl.to(
          boxRef.current,
          {
            y: stepEl.offsetTop,
            duration: 0.3,
          },
          i
        )

        tl.to(
          imagesRef.current,
          {
            autoAlpha: 0,
            duration: 0.2,
          },
          i
        )

        tl.to(
          imgEl,
          {
            autoAlpha: 1,
            duration: 0.2,
          },
          i
        )

        tl.to(
          stepsRef.current,
          {
            opacity: 0.4,
            duration: 0.2,
          },
          i
        )

        tl.to(
          stepEl,
          {
            opacity: 1,
            duration: 0.2,
          },
          i
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Section className="bg-bg-primary">
      <Container>
        {/* Header */}
        <div className="mb-16">
          <span className="inline-block rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold">
            ✨ {freeBonusScrollData.badge}
          </span>

          <h2 className="mt-4 text-3xl font-bold">
            {freeBonusScrollData.title}
          </h2>
        </div>

        {/* Main grid */}
        <div
          ref={sectionRef}
          className="relative grid min-h-screen grid-cols-12 gap-8"
        >
          {/* Left text */}
          <div className="col-span-4 space-y-12">
            {freeBonusScrollData.steps.map((step, i) => (
              <div
                key={i}
                ref={(el) => setStepRef(el, i)}
                className="opacity-40"
              >
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Center moving box */}
          <div className="col-span-4 relative">
            <div
              ref={boxRef}
              className="absolute left-1/2 w-48 -translate-x-1/2 rounded-xl bg-white p-4 shadow-lg"
            >
              <img
                src="/src/assets/images/box.png"
                alt=""
                className="w-full"
              />
            </div>
          </div>

          {/* Right images */}
          <div className="col-span-4 relative">
            {freeBonusScrollData.steps.map((step, i) => (
              <img
                key={i}
                ref={(el) => setImageRef(el, i)}
                src={step.image}
                alt=""
                className="absolute inset-0 w-full rounded-2xl object-cover"
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
