const ProfileContent = () => {
  return (
    <section className="py-24 px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white p-12 rounded-2xl text-center shadow-md mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Sign In Required</h2>
          <p className="text-xl leading-relaxed text-gray-600 mb-8">
            Please sign in to view and manage your profile. Join AIBO Wave to connect 
            with the global creative community, participate in events, and join local societies.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold transition-all hover:-translate-y-0.5">
              Sign In
            </button>
            <button className="bg-transparent hover:bg-primary hover:text-white text-primary border-2 border-primary px-8 py-4 rounded-lg font-semibold transition-all">
              Create Account
            </button>
          </div>
        </div>
        
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">What You Can Do With Your Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl text-center transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="text-5xl mb-4">📝</div>
              <h4 className="text-xl font-semibold mb-2 text-gray-900">Manage Your Profile</h4>
              <p className="text-base text-gray-500 leading-relaxed">
                Update your information, showcase your work, and connect with others
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl text-center transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="text-5xl mb-4">🎫</div>
              <h4 className="text-xl font-semibold mb-2 text-gray-900">Event Participation</h4>
              <p className="text-base text-gray-500 leading-relaxed">
                Register for events, track your attendance, and host your own
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl text-center transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="text-5xl mb-4">👥</div>
              <h4 className="text-xl font-semibold mb-2 text-gray-900">Join Societies</h4>
              <p className="text-base text-gray-500 leading-relaxed">
                Become a member of local chapters and build community
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl text-center transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="text-5xl mb-4">📚</div>
              <h4 className="text-xl font-semibold mb-2 text-gray-900">Share Stories</h4>
              <p className="text-base text-gray-500 leading-relaxed">
                Tell your creative journey and inspire others
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfileContent
