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
  const getPlaylistApi = "http://localhost:8080/playlist-api/";

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

  const handelInput = (e) => {
    e.preventDefault();
    const { id, name } = e.target;
    console.log(name, id);
    setPlaylist({ ...playlist, [id]: name });
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    fetch(getPlaylistApi.concat("/") + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playlist),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Servico nao responde");
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(true);
        navigate("/show-playlist");
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
        <div className="mb-2">
          <label for="id" className="form-label">
            Id
          </label>
          <input
            type="number"
            className="form-control"
            id="id"
            name="id"
            value={playlist.id}
            onChange={handelInput}
          />
        </div>
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
