export default function EnvAPI() {
  let apiUrl = "";
  if (process.env.NODE_ENV === "production") {
    apiUrl = "https://vk-traders.vercel.app";
  } else if (process.env.NODE_ENV === "development") {
    apiUrl = "http://localhost:3000";
  }
  return apiUrl;
}