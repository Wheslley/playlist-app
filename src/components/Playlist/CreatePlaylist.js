import React, { useState } from 'react'
import {useNavigate } from "react-router-dom";
import Loader from '../Common/Loader';
import './Playlist.css';
const CreatePlaylist = () => {
    const navigate = useNavigate();
    const createPlaylistApi = "http://localhost:8080/playlist-api/playlist";

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [playlist, setPlaylist] = useState({
        id: 0,
        name: "",
    })

    const handelInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        console.log(name, value);
        setPlaylist({ ...playlist, [name]: value });
    }

    const handelSubmit = async (event) => {
        event.preventDefault();
        let playParseded = {
            id: Number.parseInt(playlist.id),
            name: playlist.name
        }
        console.log(playParseded)
        try {
            setIsLoading(true);
            JSON.stringify(playlist)
            const response = await fetch(createPlaylistApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(playParseded),
            });
            console.log(response)
            if (response.ok) {
                console.log('Formulario enviado com sucesso');
                setPlaylist({id:0, name: ""})
                navigate('/show-playlist');
            } else {
                console.error('Formulario submetido com erros!');
            }

        } catch (error) {
            setError(error.message);
        } finally{
            setIsLoading(false);
        }
    }

    return (
        <div className='playlist-form'>
            <div className='heading'>
            {isLoading && <Loader />}
            {error && <p>Erro: {error}</p>}
                <p>Playlist</p>
            </div>
            <form onSubmit={handelSubmit}>
                <div className="mb-2">
                    <label htmlFor="id" className="form-label">Id</label>
                    <input type="number" id="id" name="id" className="form-control" value={playlist.id} onChange={handelInput} />
                </div>
                <div className="mb-2 mt-2">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" id="name" name="name" className="form-control" value={playlist.name} onChange={handelInput} />
                </div>
                <button type="submit" className="btn btn-primary submit-btn">Salvar</button>
            </form>
        </div>
    )
}

export default CreatePlaylist