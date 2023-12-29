import Navbar from "../components/Navbar";
export const dynamic = "force-dynamic";

export default function NewTripLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
