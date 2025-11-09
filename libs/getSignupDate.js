export function getSignupDate(dateString) {
  const date = new Date(dateString);

  const month = date.toLocaleString("en-US", { month: "long" });

  const year = date.getFullYear();

  const value = `${month} ${year}` || "New signups this month";

  return value;
}
