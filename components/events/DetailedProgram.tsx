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
          <p className="text-muted-foreground mb-3">
            Thilina opens the event with 30 minutes of original songs and musical performance. The screen displays song details, lyrics, and artistic context. This sets the emotional and artistic tone for the entire evening.
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 ml-4">
            <li>• Original compositions by Thilina</li>
            <li>• Screen displays song details and context</li>
            <li>• Audience enters into artistic sanctuary</li>
            <li>• Creates contemplative atmosphere</li>
          </ul>
        </div>

        {/* Introduction */}
        <div className="border-l-4 border-orange-500 pl-6 py-4 bg-orange-50/30 rounded-r">
          <h3 className="text-lg font-bold mb-2">6:30 PM - 6:35 PM | Introduction & Welcome</h3>
          <p className="text-muted-foreground mb-3">
            <strong>Moderator:</strong> Vidura Dias Abayagunawardana
          </p>
          <p className="text-muted-foreground mb-3">
            Vidura welcomes all participants and introduces the day, the speakers, and the six topics that will guide our conversation. Sets context and expectations for the evening.
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
              <p className="text-sm mt-2">
                Deep dialogue on the first topic. Banthe M Anomadassi shares wisdom and perspective. Vidura guides the conversation with thoughtful questions and reflections.
              </p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">6:50 PM - 6:55 PM | Thilina&apos;s Song Response</p>
              <p className="text-sm">
                Thilina performs an original song related to Topic 1. Screen updates with song details, lyrics, and thematic context. Music bridges conversation with emotional resonance.
              </p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">6:55 PM - 7:00 PM | Audience Reflection & Invitation</p>
              <p className="text-sm">
                Vidura invites audience to reflect silently on the topic and the song. Then invites one person to come forward to the empty chair and share their thoughts, feelings, or personal connection to the topic.
              </p>
            </div>
          </div>
        </div>

        {/* Topic 2 */}
        <div className="border-l-4 border-purple-500 pl-6 py-4 bg-purple-50/30 rounded-r">
          <h3 className="text-lg font-bold mb-2">Topic 2: 7:00 PM - 7:25 PM</h3>
          <p className="text-sm text-muted-foreground">
            Same structure as Topic 1: Conversation (7:00-7:15) → Song Response (7:15-7:20) → Audience Reflection & Invitation (7:20-7:25)
          </p>
        </div>

        {/* Topic 3 */}
        <div className="border-l-4 border-purple-500 pl-6 py-4 bg-purple-50/30 rounded-r">
          <h3 className="text-lg font-bold mb-2">Topic 3: 7:25 PM - 7:50 PM</h3>
          <p className="text-sm text-muted-foreground">
            Same structure as Topics 1 & 2: Conversation (7:25-7:40) → Song Response (7:40-7:45) → Audience Reflection & Invitation (7:45-7:50)
          </p>
        </div>

        {/* Closing */}
        <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50/30 rounded-r">
          <h3 className="text-lg font-bold mb-2">7:50 PM - 8:00 PM | Closing & Gratitude</h3>
          <p className="text-muted-foreground mb-3">
            <strong>Moderator:</strong> Vidura Dias
          </p>
          <p className="text-muted-foreground mb-3">
            Vidura thanks Banthe M Anomadassi and Thilina for their wisdom and artistry. Expresses gratitude to all participants for their presence and openness. Ends the formal session.
          </p>
        </div>

        {/* Post-Event */}
        <div className="border-l-4 border-green-500 pl-6 py-4 bg-green-50/30 rounded-r">
          <h3 className="text-lg font-bold mb-2">8:00 PM - 8:30 PM | Community Mingle & Continuation</h3>
          <p className="text-muted-foreground mb-3">
            <strong>Facilitator:</strong> Thilina Weththasinghe
          </p>
          <p className="text-muted-foreground mb-3">
            Thilina leads informal discussion with audience. Participants continue sharing poems, thoughts, songs, and personal reflections. Refreshments, community connection, and informal networking.
          </p>
        </div>
      </div>
    </section>
  )
}

export default DetailedProgram
