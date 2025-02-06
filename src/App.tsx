import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Table } from "./Components/Table";
import './App.css';

type User = {
  id: number;
  name: string;
  email: string;
};

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<User>();

  const addUser = (data: User) => {
    if (editingUser) {
      setUsers((prev) =>
        prev.map((user) => (user.id === editingUser.id ? { ...editingUser, ...data } : user))
      );
      setEditingUser(null);
    } else {
      const newUser = { ...data, id: Date.now() };
      setUsers((prev) => [...prev, newUser]);
    }
    reset();
  };

  const deleteUser = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const editUser = (user: User) => {
    setEditingUser(user);
    setValue("name", user.name);
    setValue("email", user.email);
  };

  const viewUser = (user: User) => {
    setViewingUser(user);
  };

  return (
    <div>
      <h1>User Management Dashboard</h1>

      <form onSubmit={handleSubmit(addUser)}>
        <div>
          <label>Name:</label>
          <input {...register("name", { required: "Name is required" })} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <button type="submit">{editingUser ? "Update User" : "Add User"}</button>
      </form>

      <Table data={users} deleteUser={deleteUser} editUser={editUser} viewUser={viewUser} />

      {viewingUser && (
        <div className="modal">
          <div className="modal-content">
            <h2>User Details</h2>
            <p><strong>Name:</strong> {viewingUser.name}</p>
            <p><strong>Email:</strong> {viewingUser.email}</p>
            <button onClick={() => setViewingUser(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
