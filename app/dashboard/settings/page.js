import AnimatedCard from "@/components/common/AnimatedCard";
import WEbForm from "@/components/dashboard/settings/WEbForm";

export default function SettingsPage() {
  return (
    <>
      <h1 className="text-md md:text-lg lg:text-2xl font-bold ms-9 pb-8 border-b  border-border">
        Settings
      </h1>
      <main className="  p-10">
        <AnimatedCard className="max-w-xl mx-auto border bg-secondary/50 border-border rounded-2xl p-8 shadow-lg">
          <header className="mb-8 text-center">
            <h1 className="text-2xl font-bold mb-2 ">
              Website Settings
            </h1>
            <p className="text-sm ">
              Update your site name and what&apos;s app contact number below.
            </p>
          </header>

          <WEbForm />
        </AnimatedCard>
      </main>
    </>
  );
}
