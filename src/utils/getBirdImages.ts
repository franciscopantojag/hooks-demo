interface Result {
  urls: {
    regular: string;
  };
}
interface JsonResponse {
  results: Result[];
}

const getBirdImages = async () => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=birds&client_id=${
      import.meta.env.VITE_UNPLASH_ACCESS_KEY
    }`
  );
  if (!response.ok) return;
  const data = (await response.json()) as JsonResponse;
  const imageUrls = data.results.map((result) => result.urls.regular);
  return imageUrls;
};

export default getBirdImages;
