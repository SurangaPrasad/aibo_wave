const DetailedProgram = () => {
  return (
    <section className="container mx-auto px-4 py-20 md:py-32">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Detailed Program Schedule</h2>
      
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Pre-Show */}
        <div className="border-l-4 border-yellow-500 pl-6 py-4 bg-yellow-50/30 rounded-r">
          <h3 className="text-lg font-bold mb-2">5:30 PM - 6:00 PM | Pre-Show Setup</h3>
          <p className="text-muted-foreground mb-3">Guest arrival and registration. Welcome packets distributed. Venue ambiance setup with lighting and music.</p>
          <ul className="text-sm text-muted-foreground space-y-1 ml-4">
            <li>• Registration table at entrance</li>
            <li>• Welcome signage and QR codes</li>
            <li>• Warm lighting and instrumental music</li>
            <li>• Refreshments prepared</li>
          </ul>
        </div>

        {/* Opening */}
        <div className="border-l-4 border-primary pl-6 py-4 bg-primary/5 rounded-r">
          <h3 className="text-lg font-bold mb-2">6:00 PM - 6:30 PM | Opening: Creative Interplay</h3>
          <p className="text-muted-foreground mb-3">
            <strong>Artist:</strong> Thilina Weththasinghe
          </p>
        </div>

        {/* Introduction */}
        <div className="border-l-4 border-orange-500 pl-6 py-4 bg-orange-50/30 rounded-r">
          <h3 className="text-lg font-bold mb-2">6:30 PM - 6:35 PM | Introduction & Welcome</h3>
          <p className="text-muted-foreground mb-3">
            <strong>Moderator:</strong> Vidura Dias Abayagunawardana
          </p>
        </div>

        {/* Topic 1 */}
        <div className="border-l-4 border-purple-500 pl-6 py-4 bg-purple-50/30 rounded-r">
          <h3 className="text-lg font-bold mb-2">Topic 1: 6:35 PM - 7:00 PM</h3>
          
          <div className="space-y-4 text-muted-foreground">
            <div>
              <p className="font-semibold text-foreground mb-2">6:35 PM - 6:50 PM | Conversation</p>
              <p className="text-sm">
                <strong>Speakers:</strong> Vidura Dias & Banthe M Anomadassi
              </p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">6:50 PM - 6:55 PM | Thilina&apos;s Song Response</p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">6:55 PM - 7:00 PM | Audience Reflection & Invitation</p>
            </div>
          </div>
        </div>

        {/* Topic 2 */}
        <div className="border-l-4 border-purple-500 pl-6 py-4 bg-purple-50/30 rounded-r">
          <h3 className="text-lg font-bold mb-2">Topic 2: 7:00 PM - 7:25 PM</h3>
        </div>

        {/* Topic 3 */}
        <div className="border-l-4 border-purple-500 pl-6 py-4 bg-purple-50/30 rounded-r">
          <h3 className="text-lg font-bold mb-2">Topic 3: 7:25 PM - 7:50 PM</h3>
        </div>

        {/* Closing */}
        <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50/30 rounded-r">
          <h3 className="text-lg font-bold mb-2">7:50 PM - 8:00 PM | Closing & Gratitude</h3>
          <p className="text-muted-foreground mb-3">
            <strong>Moderator:</strong> Vidura Dias
          </p>
        </div>

        {/* Post-Event */}
        <div className="border-l-4 border-green-500 pl-6 py-4 bg-green-50/30 rounded-r">
          <h3 className="text-lg font-bold mb-2">8:00 PM - 8:30 PM | Community Mingle & Continuation</h3>
          <p className="text-muted-foreground mb-3">
            <strong>Facilitator:</strong> Thilina Weththasinghe
          </p>
        </div>
      </div>
    </section>
  )
}

export default DetailedProgram
