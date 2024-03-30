const API_URL = "https://studentsapi-y7u9.onrender.com"; 

async function fetchStudents() {
  try {
    const response = await fetch(`${API_URL}/students`);
    if (!response.ok) {
      throw new Error("Error fetching students");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function addStudent(student) {
  try {
    const response = await fetch(`${API_URL}/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    if (!response.ok) {
      throw new Error("Error adding student");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteStudent(no_control) {
  try {
    const response = await fetch(`${API_URL}/students/${no_control}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error deleting student");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function editStudent(no_control, updatedStudent) {
  try {
    console.log("Editing student:", no_control, updatedStudent); 
    const response = await fetch(`${API_URL}/students/${no_control}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStudent),
    });
    console.log("Edit student response:", response); 
    if (!response.ok) {
      throw new Error("Error editing student");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { fetchStudents, addStudent, deleteStudent, editStudent };
