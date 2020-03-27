import React, { useState } from 'react';

import './styles.css';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg';
import api from '../../service/api';


export default function NewIncident() {
  const history = useHistory();

  const ongId = localStorage.getItem('ongId');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');


  async function handleNewIncident(event){
    event.preventDefault();

    const data = {
      title,
      description,
      value,
    }

    await api.post('incidents', data, {
      headers: {
        Authorization: ongId,
      }
    });
    history.push('/profile');
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041"/>
            Volta para profile
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />

          <textarea
            placeholder="Descrição"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />

          <input
            placeholder="Valor em reais"
            value={value}
            onChange={event => setValue(event.target.value)}
          />

          <button className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}
