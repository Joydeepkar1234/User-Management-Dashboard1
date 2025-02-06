import React from "react";

type TableProps = {
  data: { id: number; name: string; email: string }[];
  deleteUser: (id: number) => void;
  editUser: (user: { id: number; name: string; email: string }) => void;
  viewUser: (user: { id: number; name: string; email: string }) => void;
};

export const Table: React.FC<TableProps> = ({ data, deleteUser, editUser, viewUser }) => {
  return (
    <table style={{ marginTop: "20px", width: "100%" }}>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <button onClick={() => viewUser(user)}>View</button>
              <button onClick={() => editUser(user)}>Edit</button>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
