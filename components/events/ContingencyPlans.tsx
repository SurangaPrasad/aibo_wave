const ContingencyPlans = () => {
  return (
    <section className="bg-secondary/5 py-16 md:py-24 border-y border-border">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Contingency Plans</h2>
        
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-bold mb-2">If projector fails:</h3>
            <p className="text-muted-foreground">Display word cloud verbally; Moderator can describe visuals; focus on audio and conversation.</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-bold mb-2">If sound system fails:</h3>
            <p className="text-muted-foreground">Use portable Bluetooth speaker; move to smaller, more intimate space; focus on acoustic performance.</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-bold mb-2">If guest cannot attend:</h3>
            <p className="text-muted-foreground">Have backup speaker identified; Moderator can lead deeper conversation; focus on community wisdom.</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-bold mb-2">If no one comes to share:</h3>
            <p className="text-muted-foreground">Moderator shares personal reflection; invite smaller group conversation; normalize silence and listening.</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-bold mb-2">If too many want to share:</h3>
            <p className="text-muted-foreground">Set time limit (3 minutes per person); invite written reflections; continue conversation in post-event mingle.</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-bold mb-2">If attendance is lower than expected:</h3>
            <p className="text-muted-foreground">Rearrange seating for intimacy; deepen conversation; create more space for individual sharing.</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-bold mb-2">If attendance is higher than expected:</h3>
            <p className="text-muted-foreground">Have extra chairs available; use standing room; create breakout conversations; extend post-event mingle.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContingencyPlans
