import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Student() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();
  const getStudents = async () => {
    const res = await axios.get("http://localhost:5000/students");

    setStudents(res.data);
  };

  useEffect(() => {
    getStudents();
  }, []);

  // Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`http://localhost:5000/students/${editId}`, {
        name,
        email,
        age,
        password,
      });

      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/students", {
        name,
        email,
        age,
        password,
      });
    }

    setName("");
    setEmail("");
    setAge("");

    getStudents();
  };

  // Edit
  const handleEdit = (student) => {
    setEditId(student._id);
    setName(student.name);
    setEmail(student.email);
    setAge(student.age);
    setPassword(student.password);
  };

  // Delete
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/students/${id}`);

    getStudents();
    alert("Student deleted successfully");
  };

  // View
  const handleView = (student) => {
    alert(
      `Name: ${student.name}\nEmail: ${student.email}\nAge: ${student.age}`,
    );
  };
  const logOut = () => {
    navigate("/login");
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5">Student Dashboard</h1>
      <button
        className="text-blue-400 fw-3 h-11 w-20 float-end border rounded bg-green-300"
        onClick={logOut}
      >
        logout
      </button>
      {/* Form */}

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          className="border p-2 mr-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 mr-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 mr-2"
          placeholder="Age"
          value={age}
          required
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="password"
          className="border p-2 mr-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-green-500 text-white px-4 py-2 rounded">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {/* Student List */}

      {students.map((student) => (
        <div
          key={student._id}
          className="border p-3 mb-2 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <span className="ml-4">
              {" "}
              <b>Name:</b> {student.name}
            </span>
            <span className="ml-4">
              <strong>Email:</strong>
              {student.email}
            </span>
            <span className="ml-4">
              <strong>Age:</strong>
              {student.age}
            </span>
            <span className="ml-4">
              <strong>Password:</strong>
              {student.password}
            </span>
          </div>

          {/* 3 Buttons */}

          <div className="flex gap-2">
            <button
              onClick={() => handleView(student)}
              className="bg-gray-500 text-white px-3 py-1 rounded"
            >
              View
            </button>

            <button
              onClick={() => handleEdit(student)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(student._id)}
              className="bg-red-400 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Student;
