export function formatPrice(
  price,
  {
    currency = "USD",
    locale = "en-US",
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = {}
) {
  // Handle invalid/empty input
  if (price == null || isNaN(price)) {
    return "—"; // or return '' or 'N/A' depending on your needs
  }

  // Convert to number and ensure it's a valid number
  const numericPrice = Number(price);

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(numericPrice);
}

export function formatDate(input) {
  const date = new Date(input);

  // Validate the date (in case of invalid input)
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
}
