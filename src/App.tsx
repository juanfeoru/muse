import { Route, Routes } from "react-router";
import AppLayout from "./components/layout/AppLayout";

function Home() {
  return <h1>Home</h1>;
}

function Discover() {
  return <h1>Discover</h1>;
}

function Search() {
  return <h1>Search</h1>;
}

function Favorites() {
  return <h1>Favorites</h1>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>
    </Routes>
  );
}
