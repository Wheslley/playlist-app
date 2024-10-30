/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import Loader from "../Common/Loader";
import { Link } from "react-router-dom";

const ShowPlaylist = () => {
  const showPlaylist = "http://localhost:8080/playlist-api/playlists";
  const deletePlaylist = "http://localhost:8080/playlist-api/playlist";

  const [playlist, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handelDelete = async (id) => {
    console.log("id : -", id);
    setIsLoading(true);
    try {
      const response = await fetch(deletePlaylist.concat("/") + id, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Nao foi possivel deletar a playlist");
      }
      let playRemoved = { playlists: playlist.playlists.filter((item) => item.id !== id)}
      console.log(playRemoved)
      console.log(playlist)
      setPlaylists(playRemoved);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPlaylists();
  }, []);

  const getPlaylists = () => {
    const headers = {
      'Content-Type':'application/json;charset=utf-8',
      'Access-Control-Allow-Origin':'*'
    }

    axios
      .get(showPlaylist, null, { headers: headers})
      .then((res) => {
        setPlaylists(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (playlist.length < 0) {
    return <h1>Nenhuma playlist cadastrada</h1>;
  } else {
    return (
      <div className="mt-2">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
          </tr>
          </thead>
          <tbody>
            {playlist.playlists?.map((play, i) => {
              return(
                <tr key={i + 1}>
                  <td>{play.id}</td>
                  <td>{play.name}</td>
                  <td>
                    <Link to={`/edit-playlist/${play.id}`}>
                      <i className="fa fa-pencil" 
                        aria-hidden="true"
                      >editar</i>
                    </Link>
                    <i
                        className="fa fa-trash-o"
                        aria-hidden="true"
                        onClick={() => handelDelete(play.id)}
                      >deletar</i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default ShowPlaylist;
