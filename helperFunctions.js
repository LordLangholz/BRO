const API_KEY = "AIzaSyCA8JDgKJyCgPLm9OJ03MxbN0xsf1tOh0Y";
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

function generateBody(image) {
  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [
          {
            type: "TEXT_DETECTION",
            maxResults: 1,
          },
        ],
      },
    ],
  };
  return body;
}
async function callGoogleVisionAsync(image) {
  const body = generateBody(image);
  console.log(body + ":Det her er kroppen")
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  console.log(result + "det her er result")

  const detectedText = result.responses[0].fullTextAnnotation;
  return detectedText
    ? detectedText
    : { text: "This image doesn't contain any text!" };
}
export default callGoogleVisionAsync;
