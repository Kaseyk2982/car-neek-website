import Image from "next/image";
import image1 from "@/public/bugatti.jpg";
import image2 from "@/public/rolls.jpg";
import Link from "next/link";
export const metadata = {
  title: "About",
};

export default function Page() {
  return (
    <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-xl text-slate-300 items-center">
      <div className="col-span-3">
        <h1 className="text-5xl text-stone-500 font-semibold mb-10">
          Welcome to Car-Neek
        </h1>
        <div className="space-y-8">
          <p>
            At Car-Neek, we curate an unparalleled collection of the
            world&apos;s most coveted high-end exotic cars—from legendary
            Italian masterpieces like Ferrari and Lamborghini to cutting-edge
            hypercars from Bugatti, McLaren, and Pagani.{" "}
          </p>{" "}
          <p>
            {" "}
            Our modern showroom is a sanctuary for automotive enthusiasts, where
            each vehicle is meticulously selected, impeccably maintained, and
            presented under expert lighting to showcase its breathtaking design
            and performance{" "}
          </p>{" "}
          <p>
            {" "}
            With personalized service, white-glove delivery, and a passion for
            excellence, we invite discerning clients to experience the pinnacle
            of luxury and engineering—because at Car-Neek, owning an exotic car
            isn&apos;t just a purchase; it&apos;s a statement of extraordinary
            achievement.
          </p>
        </div>
      </div>
      <div className="col-span-2">
        <Image src={image1} alt="bugatti" placeholder="blur" quality={80} />
      </div>
      <div className="col-span-2">
        <Image src={image2} alt="rolls-royce" placeholder="blur" quality={80} />
      </div>
      <div className="col-span-3">
        <h1 className="text-5xl text-stone-500 font-semibold mb-10">
          Family owned and operated since 2019
        </h1>
        <div className="space-y-8">
          <p>
            At Car-Neek, we&apos;re proud to be a family-owned and operated
            business, where passion for exotic automobiles has been passed down
            through generations. What began as a shared dream has grown into a
            trusted destination for discerning clients seeking the world&apos;s
            finest high-end cars.
          </p>{" "}
          <p>
            {" "}
            Every member of our family team brings personal dedication,
            integrity, and genuine enthusiasm to every interaction, ensuring you
            receive the personalized attention and expertise that only a
            close-knit family business can provide. Here, buying an
            extraordinary car isn&apos;t just a transaction—it&apos;s a
            relationship built on trust and shared excitement.
          </p>
        </div>
        <div className="inline-block bg-stone-500 px-6 py-6 text-slate-700 mt-10 font-semibold  hover:bg-stone-600 transition-all">
          <Link href="/vehicles">Explore our luxury vehicles</Link>
        </div>
      </div>
    </div>
  );
}
