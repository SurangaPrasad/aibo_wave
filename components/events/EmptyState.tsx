const EmptyState = () => {
  return (
    <section className="py-24 px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center py-16">
          <p className="text-2xl text-gray-500">No events available at the moment. Check back soon!</p>
        </div>
        <div className="text-center mt-16 p-12 bg-gray-50 rounded-2xl">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Want to Host an Event?</h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Join AIBO Wave and share your cultural event with a global audience.
          </p>
          <button className="bg-gray-900 hover:bg-gray-700 text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all hover:-translate-y-0.5">
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  )
}

export default EmptyState
