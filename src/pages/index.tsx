import { kanbanlist } from "@/mock/kanbanlists";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-wrap justify-between gap-4 p-4 ${inter.className}`}
    >
      <div className="flex flex-col bg-[#262626] h-fit p-6 gap-4 w-[500px] rounded-2xl">
        <h3 className="text-2xl tracking-wide font-bold">Backlog</h3>
        {kanbanlist &&
          kanbanlist.backLog.map((back) => (
            <div className="flex flex-col bg-[#6A6DCD] rounded-lg p-6 gap-2">
              <h4 className=" text-base font-bold "> {back.title} </h4>
              <p className="text-sm">{back.description}</p>
              {back.status && (
                <div className="px-1 border border-white w-fit ">
                  <span className="text-sm"> {back.status} </span>
                </div>
              )}
            </div>
          ))}
        <button>
          <span>+ Create</span>
        </button>
      </div>

      <div className="flex flex-col bg-[#262626] h-fit p-6 gap-4 w-[500px] rounded-2xl">
        <h3 className="text-2xl tracking-wide font-bold">To do</h3>
        {kanbanlist &&
          kanbanlist.toDo.map((to) => (
            <div className="flex flex-col bg-[#6A6DCD] rounded-lg p-6 gap-2">
              <h4 className=" text-base font-bold "> {to.title} </h4>
              <p className="text-sm">{to.description}</p>
              {to.status && (
                <div className="px-1 border border-white w-fit ">
                  <span className="text-sm"> {to.status} </span>
                </div>
              )}
            </div>
          ))}
        <button>
          <span>+ Create</span>
        </button>
      </div>
      <div className="flex flex-col bg-[#262626] h-fit p-6 gap-4 w-[500px] rounded-2xl">
        <h3 className="text-2xl tracking-wide font-bold">In progress</h3>
        {kanbanlist &&
          kanbanlist.inProgress.map((prog) => (
            <div className="flex flex-col bg-[#6A6DCD] rounded-lg p-6 gap-2">
              <h4 className=" text-base font-bold "> {prog.title} </h4>
              <p className="text-sm">{prog.description}</p>
              {prog.status && (
                <div className="px-1 border border-white w-fit ">
                  <span className="text-sm"> {prog.status} </span>
                </div>
              )}
            </div>
          ))}
        <button>
          <span>+ Create</span>
        </button>
      </div>
      <div className="flex flex-col bg-[#262626] h-fit p-6 gap-4 w-[500px] rounded-2xl">
        <h3 className="text-2xl tracking-wide font-bold">Designed</h3>
        {kanbanlist &&
          kanbanlist.designed.map((design) => (
            <div className="flex flex-col bg-[#6A6DCD] rounded-lg p-6 gap-2">
              <h4 className=" text-base font-bold "> {design.title} </h4>
              <p className="text-sm">{design.description}</p>
              {design.status && (
                <div className="px-1 border border-white w-fit ">
                  <span className="text-sm"> {design.status} </span>
                </div>
              )}
            </div>
          ))}
        <button>
          <span>+ Create</span>
        </button>
      </div>
    </main>
  );
}
