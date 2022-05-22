import React, { useState, useEffect, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateUser from "./Create";
import User from "./User";
import EditUser from "./Edit";

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
  };

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/users`
      );
      const json = await response.json();
      setUsers(json);
    };
    fetchUsers();
  }, []);

  return (
    <>
      <section className="col-2">
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
                <div
                  onClick={() => showUserDetailComponent(user)}
                  className="py-2 text-reset text-decoration-none"
                  style={{ cursor: "pointer" }}
                  key={user.id}
                >
                  <p>
                    <b>
                      <>
                        {user.firstname} {user.lastname} (
                        {decodeRole(user.role)})
                      </>
                    </b>
                    <br />
                    <span>{user.email}</span>
                  </p>
                </div>
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
          user={userSelected}
          onClick={() => setEditUserVisible(false)}
          promote={promoteUser}
          demote={demoteUser}
        />
      )}
    </>
  );
};

export default Users;
