const StoriesGrid = () => {
  return (
    <section className="py-24 px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center py-16 mb-12">
          <p className="text-3xl text-gray-600 font-semibold mb-4">Stories coming soon...</p>
          <p className="text-lg text-gray-500 leading-relaxed">
            We&apos;re collecting inspiring stories from our community members. 
            Check back soon to read about their creative journeys!
          </p>
        </div>
        <div className="text-center p-12 bg-gradient-to-br from-primary to-primary-dark rounded-2xl text-white">
          <h3 className="text-4xl font-bold mb-4">Share Your Story</h3>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Have an inspiring journey to share? We&apos;d love to feature your story 
            and inspire others in the AIBO Wave community.
          </p>
          <button className="bg-white hover:bg-gray-100 text-primary px-10 py-4 rounded-lg text-lg font-semibold transition-all hover:-translate-y-0.5 hover:shadow-xl">
            Submit Your Story
          </button>
        </div>
      </div>
    </section>
  )
}

export default StoriesGrid
