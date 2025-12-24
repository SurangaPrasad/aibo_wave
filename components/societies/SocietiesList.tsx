const SocietiesList = () => {
  return (
    <section className="py-16 px-8 pb-24 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">Active Societies</h2>
        <div className="text-center py-12 px-8 bg-white rounded-xl mb-12">
          <p className="text-2xl text-gray-500 mb-4">No societies available yet.</p>
          <p className="text-lg text-gray-400">Be the first to start a Society in your region!</p>
        </div>
        <div className="text-center p-12 bg-gray-900 rounded-2xl text-white">
          <h3 className="text-4xl font-bold mb-4">Want to Start a Society?</h3>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            If there&apos;s no AIBO Wave Society in your area, you can become a Society Leader 
            and build a community of artists and entrepreneurs in your region.
          </p>
          <button className="bg-accent hover:bg-accent-dark text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all hover:-translate-y-0.5">
            Become a Society Leader
          </button>
        </div>
      </div>
    </section>
  )
}

export default SocietiesList
