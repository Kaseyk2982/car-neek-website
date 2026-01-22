"use server";

import { redirect } from "next/navigation";
import { auth, signIn } from "./auth";
import { getSales } from "./data-service";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";

export async function signInActionGoogle() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signInActionGithub() {
  await signIn("github", { redirectTo: "/account" });
}

export async function updateCustomer(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const phoneNumber = formData.get("phoneNumber");

  if (!/\+?[0-9\s\-\(\)]+/.test(phoneNumber)) {
    throw new Error("Please enter a valid phone number");
  }

  const updatedData = { phoneNumber };

  const { data, error } = await supabase
    .from("customers")
    .update(updatedData)
    .eq("id", session.user.customerId);

  if (error) {
    console.log(error.message);
    throw new Error("Customer could not be updated");
  }
  revalidatePath("account/profile");
}

export async function deletePurchase(purchaseId, vehicleId) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");
  const customerSales = await getSales(session.user.customerId);
  const customerSalesIds = customerSales.map((sale) => sale.id);

  if (!customerSalesIds.includes(purchaseId))
    throw new Error("You cannot delete this purchase");

  const { error } = await supabase.from("sales").delete().eq("id", purchaseId);

  if (error) {
    console.log(error.message);
    throw new Error("Sale could not be deleted");
  }

  const { data: updatedVehicle, error: updateError } = await supabase
    .from("vehicles")
    .update({ isSold: false })
    .eq("id", vehicleId)
    .eq("isSold", true)
    .select()
    .maybeSingle();

  if (updateError) {
    console.error("Vehicle update error:", updateError);
    throw new Error(updateError.message || "Failed to update vehicle status");
  }

  if (!updatedVehicle) {
    throw new Error("Vehicle was not marked as sold or does not exist");
  }

  revalidatePath("account/purchases");
}

export async function createSale(saleData, formData) {
  const session = await auth();
  if (!session?.user?.customerId) {
    throw new Error("You must be logged in");
  }

  const vehicleId = saleData.vehicleId;
  if (!vehicleId) {
    throw new Error("Missing vehicle ID");
  }

  const downPaymentRaw = formData.get("downPayment");
  const downPayment = Number(downPaymentRaw);

  if (downPaymentRaw == null || isNaN(downPayment) || downPayment < 0) {
    throw new Error("Invalid down payment amount");
  }
  if (downPayment > saleData.regularPrice) {
    throw new Error("Down payment cannot exceed vehicle price");
  }

  const totalOwed = saleData.salePrice - downPayment;

  const newSale = {
    ...saleData,
    customerId: session.user.customerId,
    downPayment,
    totalOwed,
  };

  const { data: updatedVehicle, error: updateError } = await supabase
    .from("vehicles")
    .update({ isSold: true })
    .eq("id", vehicleId)
    .eq("isSold", false)
    .select()
    .maybeSingle();

  if (updateError) {
    console.error("Vehicle update error:", updateError);
    throw new Error(
      updateError.message || "Failed to update vehicle status to sold",
    );
  }

  if (!updatedVehicle) {
    throw new Error("Vehicle is already sold or not found");
  }

  const { data: saleDataResult, error: insertError } = await supabase
    .from("sales")
    .insert([newSale])
    .select();

  if (insertError) {
    console.error("Sale insert error:", insertError);

    throw new Error(insertError.message || "Sale could not be created");
  }
  revalidatePath(`/vehicles/${saleData.vehicleId}`);
  redirect("/vehicles/thank-you");
}

export default async function updateSale(updatedData, formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");
  const customerSales = await getSales(session.user.customerId);
  const customerSalesIds = customerSales.map((sale) => sale.id);
  const purchaseId = updatedData.id;

  if (!customerSalesIds.includes(purchaseId))
    throw new Error("You cannot update this purchase");

  const downPayment = Number(formData.get("downPayment"));
  const pickupDate = formData.get("pickupDate");
  const newTotalOwed = updatedData.liveTotalOwed;

  const { data, error } = await supabase
    .from("sales")
    .update({
      downPayment: downPayment,
      pickupDate: pickupDate,
      totalOwed: newTotalOwed,
    })
    .eq("id", purchaseId)
    .select();

  if (error) {
    console.error("Sale update error:", error);
    throw new Error(error.message || "Failed to update sale");
  }
  redirect("/vehicles/update-thanks");
}
