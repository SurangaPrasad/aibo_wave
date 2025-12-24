const values = [
  {
    title: 'Inclusivity',
    description: 'We welcome artists and entrepreneurs from all backgrounds, cultures, and experience levels, creating equal opportunities for all.'
  },
  {
    title: 'Sustainability',
    description: 'We build for the long term, ensuring that all stakeholders—artists, communities, and the platform—thrive together.'
  },
  {
    title: 'Community',
    description: 'We believe in the power of local societies and community-led growth, fostering meaningful connections and mutual support.'
  },
  {
    title: 'Innovation',
    description: 'We continuously evolve our platform to meet the changing needs of the global creative economy and our community.'
  }
]

const Values = () => {
  return (
    <section className="py-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold mb-12 text-center text-gray-900">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-xl border border-gray-200 transition-all hover:-translate-y-1 hover:shadow-xl">
              <h3 className="text-2xl font-semibold mb-4 text-primary">{value.title}</h3>
              <p className="text-base leading-relaxed text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Values
