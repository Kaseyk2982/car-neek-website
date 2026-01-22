import UpdateCustomerForm from "@/app/_components/UpdateCustomerForm";
import { auth } from "@/app/_lib/auth";
import { getCustomer } from "@/app/_lib/data-service";

export default async function Page() {
  const session = await auth();
  const customer = await getCustomer(session.user.email);

  return (
    <div>
      <h2 className="text-3xl text-stone-400 font-semibold mb-4">
        Update your profile
      </h2>
      <p className="text-lg text-slate-200">
        Contact phone number changed? Help us better serve you by keeping your
        phone number up to date.
      </p>
      <UpdateCustomerForm customer={customer} />
    </div>
  );
}
