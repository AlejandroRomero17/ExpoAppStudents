import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InsertStudentScreen from "./src/screens/InsertStudentScreen";
import ListStudentScreen from "./src/screens/ListStudentScreen";
import EditStudentScreen from "./src/screens/EditStudentScreen";

// Crear pila navigator para la navegación entre las pantallas
const Stack = createNativeStackNavigator();

export default function App() {
  // Define un estado local para almacenar la lista de estudiantes
  const [students, setStudents] = useState([]);

  // Función para agregar un nuevo estudiante a la lista
  const addStudent = (student) => {
    const updatedStudents = students.concat(student);
    setStudents(updatedStudents);
  };

  // Función para editar un estudiante existente en la lista
  const editStudent = (index, updatedStudent) => {
    const updatedStudents = [...students];
    updatedStudents[index] = updatedStudent;
    setStudents(updatedStudents);
  };

  // Función para eliminar un estudiante de la lista
  const deleteStudent = (index) => {
    const updatedStudents = [...students];
    updatedStudents.splice(index, 1);
    setStudents(updatedStudents);
  };

  return (
    // Contenedor de navegación principal que envuelve toda la aplicación
    <NavigationContainer>
      {/* Definición de las diferentes pantallas y sus propiedades */}
      <Stack.Navigator initialRouteName="List">
        {/* Pantalla para listar estudiantes */}
        <Stack.Screen name="List">
          {(props) => (
            <ListStudentScreen
              students={students}
              deleteStudent={deleteStudent}
              navigation={props.navigation}
            />
          )}
        </Stack.Screen>
        {/* Pantalla para insertar un nuevo estudiante */}
        <Stack.Screen name="Insert">
          {(props) => (
            <InsertStudentScreen
              addStudent={addStudent}
              navigation={props.navigation}
            />
          )}
        </Stack.Screen>
        {/* Pantalla para editar un estudiante existente */}
        <Stack.Screen name="Edit">
          {(props) => (
            <EditStudentScreen
              students={students}
              editStudent={editStudent}
              route={props.route} // Asegúrate de pasar la prop 'route'
              navigation={props.navigation}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
