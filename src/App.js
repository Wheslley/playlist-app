import "./App.css";
import CreatePlaylist from "./components/Playlist/CreatePlaylist";
import ShowPlaylists from "./components/Playlist/ShowPlaylists";
import { Route, Routes } from "react-router-dom";
import EditPlaylist from "./components/Playlist/EditPlaylist";
import Header from "./components/Common/Header";

function App() {
  return (
    <div className="App">
      <header className="container">
        <div className="">
          <Header />
          <Routes>
          
            <Route path="/" element={<ShowPlaylists />} />
            <Route path="/edit-playlist/:id" element={< EditPlaylist />} />
            <Route path="/create-playlist" element={<CreatePlaylist />} />
            <Route path="/show-playlist" element={<ShowPlaylists />} />
          </Routes>
          

        </div>
      </header>
    </div>
  );
}

export default App;
