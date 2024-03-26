/* eslint-disable camelcase */
import './App.css';

import React, { useEffect, useRef, useState } from 'react';

import { getContributors } from './api';
import { Card } from './components';
import { ERROR_NOTIFICATION } from './constants';

const App = () => {
  const [contributors, setContributors] = useState([]);
  const [error, setError] = useState(false);
  const ignore = useRef(false);

  useEffect(() => {
    if (ignore.current) {
      getContributors
        .then(rez => {
          if (!rez.ok) throw new Error(ERROR_NOTIFICATION);
          return rez.json();
        })
        .then(rez => setContributors(rez))
        .catch(() => setError(true));
    }

    return () => {
      ignore.current = true;
    };
  }, []);

  return (
    <div className="App">
      <h1 className="App__title">List of contributors</h1>
      <div className="App__content">
        {error && <p>{ERROR_NOTIFICATION}</p>}
        {contributors.map(({ avatar_url, html_url, contributions, login }) => (
          <Card
            key={login}
            avatar={avatar_url}
            url={html_url}
            contributions={contributions}
            login={login}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
