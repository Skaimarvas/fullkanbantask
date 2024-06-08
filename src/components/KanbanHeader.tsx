import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

interface Iprops {
  title: string;
}

const KanbanHeader: React.FC<Iprops> = ({ title }) => {
  const router = useRouter();

  return (
    <div className="flex flex-row items-baseline uppercase gap-4 p-4">
      <h2 className="p-2 border border-white">{title}</h2>
      <Button variant="secondary" onClick={() => router.push("/")}>
        Homepage
      </Button>
    </div>
  );
};

export default KanbanHeader;
