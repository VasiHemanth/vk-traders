import Navbar from "../components/Navbar";

export default function VehiclesLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
