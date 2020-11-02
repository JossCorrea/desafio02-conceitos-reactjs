import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories,setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response => setRepositories(response.data))
  },[])

  async function handleAddRepository() {
    const response = api.post('repositories',{
      title: `Desafio ${Date.now()}`, 
      url: "http://github.com/JossCorrea", 
      techs: ["ReactJS"]
    });
    const newRepository = (await response).data;
    setRepositories([...repositories, newRepository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)
    
    if (response.status === 204) {
      const updatedRepositories = repositories.filter(repository => repository.id !== id)
      setRepositories(updatedRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return(
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
