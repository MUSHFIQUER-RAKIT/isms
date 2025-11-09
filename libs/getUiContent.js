export const getUiContent = async () => {
  const data = (await import("../data/uiContent.json")).default;
  return data;
};
