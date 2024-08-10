export default function updateUrl(
  url: string,
  options?: { params?: Record<string, any> }
) {
  let newUrl = url;

  if (options?.params) {
    newUrl = `${newUrl}?${new URLSearchParams(options.params).toString()}`;
  }

  window.history.replaceState(
    { ...window.history.state, as: newUrl, url: newUrl },
    "",
    newUrl
  );
}
