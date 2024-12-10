import DashboardHeader from "@/components/DashboardHeader";
import useGetSession from "@/lib/useGetSession";
import { redirect } from "next/navigation";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

const stats = [
  {
    title: "Unique views",
    value: "192.1k",
    change: "32k increase",
    changeType: "increase", // "increase" or "decrease"
  },
  {
    title: "Bounce rate",
    value: "21%",
    change: "7% increase",
    changeType: "decrease",
  },
  {
    title: "Average time on page",
    value: "03:12",
    change: "3% increase",
    changeType: "increase",
  },
];

const DashboardPage = async () => {
  const session = await useGetSession();
  console.log("🚀 ~ DashboardPage ~ session:", session);
  if (!session?.user) redirect("/login");

  return (
    <>
      <DashboardHeader user={session?.user} />
      <div className="h-screen dark:bg-gray-800 flex justify-center items-center">
        <section className="grid gap-6 md:grid-cols-3 p-4 md:p-8 max-w-5xl mx-auto w-full">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow rounded-2xl dark:bg-gray-900"
            >
              <dl className="space-y-2">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.title}
                </dt>
                <dd className="text-5xl font-light md:text-6xl dark:text-white">
                  {stat.value}
                </dd>
                <dd
                  className={`flex items-center space-x-1 text-sm font-medium ${
                    stat.changeType === "increase"
                      ? "text-green-500 dark:text-green-400"
                      : "text-red-500 dark:text-red-400"
                  }`}
                >
                  <span>{stat.change}</span>
                  {stat.changeType === "increase" ? (
                    <AiOutlineArrowUp className="w-7 h-7" />
                  ) : (
                    <AiOutlineArrowDown className="w-7 h-7" />
                  )}
                </dd>
              </dl>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default DashboardPage;
