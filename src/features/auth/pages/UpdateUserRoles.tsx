import React, { useState, useEffect } from 'react';
import { useGetUsersQuery } from '../api/authApi';
import { useChangeRolesMutation } from '../api/authApi';
import { enqueueSnackbar } from 'notistack';

const UpdateUserRoles = () => {
  const rolesType: string[] = ['admin', 'author', 'reader'];
  const { data: users } = useGetUsersQuery();
  const [changeRoles, { isSuccess, isLoading }] = useChangeRolesMutation();
  const [id, setId] = useState<string>();
  const [roles, setRoles] = useState<string[]>([]);
  const handleRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    var updateList = [...roles];
    if (event.target.checked) {
      updateList = [...roles, event.target.value];
    } else {
      updateList.splice(roles.indexOf(event.target.value), 1);
    }
    setRoles(updateList);
  };
  const handleSubmit = () => {
    if (id !== undefined && id && roles.length) {
      const rolesUpdate = { id, roles };
      changeRoles(rolesUpdate);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Roles updated', { variant: 'success' });
    }
  }, [isSuccess]);

  return (
    <>
      <div className="data-table">
        {users &&
          users.map((user) => (
            <div
              key={user._id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                marginBottom: 10,
              }}
            >
              <input
                type="radio"
                value={user._id}
                checked={id === user._id}
                onChange={(e) => setId(e.target.value)}
              />
              <img src={user.avatar} alt={user.name} className="avatar-big" />
              <div>
                <div>
                  <span>Name:</span>
                  <span>{user.name}</span>
                </div>
                <div>
                  <span>Role(s) :</span>
                  {user.roles.map((role, index) => (
                    <span key={role}>
                      {role}
                      {user.roles.length && user.roles.length - 1 === index
                        ? ''
                        : ', '}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div>
        Set Roles:
        {rolesType.map((role) => (
          <span key={role} className="sp-bor">
            <input
              type="checkbox"
              id={role}
              name={role}
              value={role}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleRole(e)
              }
            />
            <label htmlFor={role}>{role}</label>
          </span>
        ))}
      </div>
      <button onClick={handleSubmit} disabled={isLoading ? true : false}>
        Update User Roles
      </button>
    </>
  );
};

export default UpdateUserRoles;
