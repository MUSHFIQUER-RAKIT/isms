import AnimatedCard from "../common/AnimatedCard";

export default function QuickStats() {
  return (
    <AnimatedCard
      animation="fade-left"
      className="glass-card border-border mt-10 border  bg-secondary/30     p-6 rounded-2xl"
    >
      <header>
        <h2 className="text-foreground">Quick Stats</h2>
        <p className="text-muted-foreground">Overview of your performance</p>
      </header>
      <div>
        <div className="space-y-4">
          {["Completion Rate", "Response Time", "Success Rate"].map(
            (metric, i) => (
              <div key={metric} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{metric}</span>
                  <span className="font-medium text-foreground">
                    {85 + i * 5}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-secondary/30 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${85 + i * 5}%` }}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </AnimatedCard>
  );
}
