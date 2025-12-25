const philosophies = [
  {
    title: 'Artistry Interplay',
    description: 'We celebrate the fusion and collaboration of diverse creative talents from different cultures and backgrounds.'
  },
  {
    title: 'Beacon O Wave',
    description: 'AIBO Wave serves as a guiding light for talent, creating a powerful, global movement that transforms lives and communities.'
  },
  {
    title: 'Where Culture Meets Commerce',
    description: 'We bridge the gap between artistic expression and sustainable business models, ensuring creators can thrive while maintaining their integrity and cultural identity.'
  }
]

const Philosophy = () => {
  return (
    <section className="py-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold mb-12 text-center text-gray-900">Our Philosophy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {philosophies.map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-200 p-10 rounded-2xl border-l-4 border-accent transition-all hover:-translate-y-1 hover:shadow-2xl">
              <h3 className="text-3xl font-semibold mb-4 text-accent">{item.title}</h3>
              <p className="text-lg leading-relaxed text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Philosophy
