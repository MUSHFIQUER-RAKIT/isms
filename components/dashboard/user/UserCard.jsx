import AnimatedCard from "@/components/common/AnimatedCard";
import { FaUser } from "react-icons/fa";

export default function UserCard() {
  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Active user",
            value: "12",
            desc: "+12.5% from last month",
            icon: <FaUser />,
          },
          {
            title: "Total Users",
            value: 5,
            desc: `+12.5% from last month `,
          },
          {
            title: "Total Users",
            value: 5,
            desc: `+12.5% from last month `,
          },
          {
            title: "Total Users",
            value: 5,
            desc: `+12.5% from last month `,
          },
        ].map((card, i) => (
          <AnimatedCard
            animation="fade-left"
            delay={i * 0.2}
            key={i}
            className="bg-primary/20 hover:bg-primary/50  border  border-border p-6 rounded-2xl flex justify-between"
          >
            <div className="">
              <h3 className="text-sm text-[var(--muted)] mb-2">{card.title}</h3>
              <p className="text-3xl font-bold text-[var(--accent)]">
                {card.value}
              </p>
              <span className="text-xs text-green-500">{card.desc}</span>
            </div>
            <span className="text-accent text-2xl">{card.icon}</span>
          </AnimatedCard>
        ))}
      </div>
    </>
  );
}
