import React, { useState } from 'react';

import { getContributor } from '../../api';
import { ERROR_NOTIFICATION } from '../../constants';

export const Card = ({ avatar, login, contributions, url }) => {
  const [active, setActive] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState();
  const [disabled, setDisabled] = useState(false);

  const handleClick = async () => {
    if (user) setActive(!active);
    else if (active) setActive(false);
    else if (!disabled) {
      setDisabled(true);
      getContributor(login)
        .then(rez => {
          if (!rez.ok) throw new Error(ERROR_NOTIFICATION);
          return rez.json();
        })
        .then(rez => {
          setUser(rez);
        })
        .catch(() => setError(true))
        .finally(() => {
          setActive(true);
          setDisabled(false);
        });
    }
  };

  return (
    <div className="card">
      <div aria-hidden className="card__header" onClick={() => handleClick()}>
        <a href={url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>
          <img
            src={avatar}
            alt={`avatar-${login}`}
            style={{ width: '50px', height: '50px', borderRadius: '100%' }}
          />
        </a>
        <p>{login}</p>
      </div>
      {user && (
        <ul className="card__content" style={{ height: active ? '100px' : '0' }}>
          {user?.name && <li>Name: {user?.name}</li>}
          {(user?.login || login) && <li>Login: {user?.login || login}</li>}
          {user?.email && <li>Email: {user?.email}</li>}
          {contributions && <li>Contributions: {contributions}</li>}
        </ul>
      )}
      {error && active && <p>{ERROR_NOTIFICATION}</p>}
    </div>
  );
};

export default Card;
