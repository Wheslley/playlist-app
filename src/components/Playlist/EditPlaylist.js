/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./Playlist.css";
const EditPlaylist = () => {
  const [playlist, setPlaylist] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const getPlaylistApi = "http://localhost:8080/playlist-api/playlist";

  useEffect(() => {
    getPlaylist();
  }, []);

  const getPlaylist = () => {
    const headers = {
      'Content-Type':'application/json;charset=utf-8',
      'Access-Control-Allow-Origin':'*'
    }

    axios
      .get(getPlaylistApi.concat("/") + id, null, {headers: headers})
      .then((item) => {
        let playlistParseded = {
          id: Number.parseInt(item.data.playlists[0].id),
          name: item.data.playlists[0].name
        }
        setPlaylist(playlistParseded);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handelInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    setPlaylist({ ...playlist, [name]: value });
  };

  const handelSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    let playParseded = {
        id: Number.parseInt(id),
        name: playlist.name
    }
    fetch(getPlaylistApi.concat("/") + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playParseded),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Servico nao responde");
        }
        return response.json();
      })
      .then((data) => {
        setPlaylist({id:0, name: ""})
        navigate('/show-playlist');
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      })
  };

  return (
    <div className="playlist-form">
      <div className="heading">
      {isLoading && <Loader />}
      {error && <p>Erro: {error}</p>}
        <p>Editar</p>
      </div>
      <form onSubmit={handelSubmit}>
        <div className="mb-2 mt-2">
          <label for="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={playlist.name}
            onChange={handelInput}
          />
        </div>
        <button type="submit" className="btn btn-primary submit-btn">
          Salvar
        </button>
      </form>
    </div>
  );
};
export default EditPlaylist;
