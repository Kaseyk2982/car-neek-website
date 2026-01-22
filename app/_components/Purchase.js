import { auth } from "../_lib/auth";
import PurchaseForm from "./PurchaseForm";

export default async function Purchase({ vehicle }) {
  const session = await auth();

  return <PurchaseForm vehicle={vehicle} user={session.user} />;
}
