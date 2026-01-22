import Spinner from "@/app/_components/Spinner";

export default function Loading() {
  return (
    <div className="grid justify-center items-center">
      <Spinner size="lg" color="stone" />
      <p className="text-xl text-stone-200">Loading vehicles data...</p>
    </div>
  );
}
