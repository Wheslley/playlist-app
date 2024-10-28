/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Playlist.css";
const EditPlaylist = () => {
  const [playlist, setPlaylist] = useState([]);
  const { id } = useParams();
  const getPlaylistApi = "http://localhost:8080/playlist-api/playlists";

  useEffect(() => {
    getPlaylist();
  }, []);

  const getPlaylist = () => {
    axios
      .get(getPlaylistApi.concat("/") + id)
      .then((item) => {
        setPlaylist(item.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="playlist mt-2">
      <table className="table table-bordered">
    <thead>
      <tr>
        <th>id</th>
        <th>name</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Id</td>
        <td>{playlist.id}</td>
      </tr>
      <tr>
        <td>Name</td>
        <td>{playlist.name}</td>
      </tr>
    </tbody>
  </table>
    </div>
  );
};
export default EditPlaylist;
