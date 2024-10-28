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
        id: null,
        name: "",
    })

    const handelInput = (event) => {
        event.preventDefault();
        const { id, name } = event.target;
        console.log(id, name)
        setPlaylist({ ...playlist, [id]: name });
    }

    const handelSubmit = async (event) => {
        event.preventDefault();
        console.log(playlist)
        try {
            setIsLoading(true);
            const response = await fetch(createPlaylistApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(playlist),
            });

            if (response.ok) {
                console.log('Formulario enviado com sucesso');
                setPlaylist({id:"", name: ""})
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
                    <label for="id" className="form-label">Id</label>
                    <input type="text" className="form-control" onChange={handelInput} />
                </div>
                <div className="mb-2 mt-2">
                    <label for="name" className="form-label">Name</label>
                    <input type="text" className="form-control" onChange={handelInput} />
                </div>
                <button type="submit" className="btn btn-primary submit-btn">Salvar</button>
            </form>
        </div>
    )
}

export default CreatePlaylist