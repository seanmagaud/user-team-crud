import React, { useState, useEffect, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateUser from "./Create";
import User from "./User";
import EditUser from "./Edit";
import styled from "styled-components";

const Users: FC = (): JSX.Element => {
  const [users, setUsers] = useState<[]>();
  const [userDetailVisible, setUserDetailVisible] = useState<boolean>(false);
  const [addUserVisible, setAddUserVisible] = useState<boolean>(false);
  const [editUserVisible, setEditUserVisible] = useState<boolean>(false);
  const [userSelected, setUserSelected] = useState<any>();

  function decodeRole(roleId: any): string {
    let role: any = {
      1: "Intern",
      2: "Squad Member",
      3: "Squad Leader",
    };

    return role[roleId];
  }

  const showAddUserComponent = (): void => {
    setAddUserVisible(true);
    setUserDetailVisible(false);
    setEditUserVisible(false);
  };

  const showUserDetailComponent = (user: {}): void => {
    setUserDetailVisible(true);
    setAddUserVisible(false);
    setEditUserVisible(false);
    setUserSelected(user);
  };

  const showEditUserComponent = (): void => {
    setEditUserVisible(true);
    setUserDetailVisible(false);
  };

  const promoteUser = async (): Promise<void> => {
    if (userSelected.role === 3) {
      alert("user already at the top level");

      return;
    }

    await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/user/promote/${userSelected.id}`,
      {
        method: "put",
      }
    );

    window.location.reload();
  };

  const demoteUser = async (): Promise<void> => {
    if (userSelected.role === 1) {
      alert("user already at the lowest level");

      return;
    }
    await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/user/demote/${userSelected.id}`,
      {
        method: "put",
      }
    );

    window.location.reload();
  };

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/users`
      );
      const results = await response.json();

      results.sort(
        // Sort highest role first
        (a: { role: number }, b: { role: number }) => b.role - a.role
      );
      setUsers(results);
    };
    fetchUsers();
  }, []);

  const Card = styled.div`
    &:hover {
      background: #cba4f95c;
      div {
        color: #5c0bbb;
      }
    }
  `;

  return (
    <>
      <section className="col-3">
        <div className="d-flex justify-content-between pb-4 pt-2 align-items-center">
          <b>User List</b>

          <div
            onClick={showAddUserComponent}
            className="nav-link text-reset text-center"
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon="user-plus" />
          </div>
        </div>
        <div className="">
          {users &&
            users?.map(
              (user: {
                id: number;
                firstname: string;
                lastname: string;
                email: string;
                role: string;
              }) => (
                <Card
                  onClick={() => showUserDetailComponent(user)}
                  className="py-3 text-reset text-decoration-none d-flex align-items-center"
                  style={{ cursor: "pointer" }}
                  key={user.id}
                >
                  <div className="mx-4">
                    <FontAwesomeIcon icon="user" />
                  </div>
                  <div>
                    <b>
                      <>
                        {user.firstname} {user.lastname} (
                        {decodeRole(user.role)})
                      </>
                    </b>
                    <br />
                    <span>{user.email}</span>
                  </div>
                </Card>
              )
            )}
        </div>
      </section>
      {addUserVisible && <CreateUser />}
      {userDetailVisible && (
        <User user={userSelected} onClick={showEditUserComponent} />
      )}
      {editUserVisible && (
        <EditUser
          onClick={() => setEditUserVisible(false)}
          promote={promoteUser}
          demote={demoteUser}
        />
      )}
    </>
  );
};

export default Users;
