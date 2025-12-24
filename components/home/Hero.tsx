import Carousel from '@/components/Carousel'

const carouselImages = [
  '/gallery-1.jpeg',
  '/gallery-2.jpeg',
  '/gallery-3.jpeg',
  '/gallery-4.jpeg',
  '/gallery-5.jpeg',
  '/gallery-6.jpeg',
  '/gallery-7.jpeg',
]

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-wave-light to-wave-dark text-white py-24 px-8 min-h-[70vh] flex items-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-6">
          <h1 className="text-6xl md:text-7xl font-bold leading-tight">AIBO Wave</h1>
          <div className="my-4">
            <span className="text-2xl text-gray-300 font-semibold tracking-wide">
              artistry interplay beacon O wave
            </span>
          </div>
          <p className="text-xl leading-relaxed text-gray-300">
            Where Culture Meets Commerce. Bridging Europe and Asia through art, entrepreneurship, and community.
          </p>
          <div className="flex gap-4 mt-4">
            <button className="bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg font-semibold transition-all hover:-translate-y-0.5">
              Join the Wave
            </button>
            <button className="bg-transparent hover:bg-white hover:text-gray-800 text-white border-2 border-white px-8 py-4 rounded-lg font-semibold transition-all">
              Learn More
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Carousel images={carouselImages} interval={4000} />
        </div>
      </div>
    </section>
  )
}

export default Hero
