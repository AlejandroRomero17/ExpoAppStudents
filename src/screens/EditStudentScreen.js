// EditStudentScreen.js

import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";
import { editStudent } from "../../Api.js";

const EditStudentScreen = ({ route, navigation }) => {
  const { student } = route.params;
  const [editedStudent, setEditedStudent] = useState(student);

  const saveEdit = async () => {
    try {
      console.log("editedStudent:", editedStudent); // Registro para verificar los datos del estudiante editado
      const originalNoControl = student.no_control; // Guardar el número de control original
      await editStudent(originalNoControl, editedStudent); // Enviar la solicitud PUT con el número de control original
      navigation.setOptions({ onUpdate: reloadStudents }); // Actualizar la lista de estudiantes
      navigation.navigate("List");
    } catch (error) {
      console.error(error);
    }
  };

  const reloadStudents = async () => {
    try {
      const data = await fetchStudents();
      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeText = (key, value) => {
    setEditedStudent({ ...editedStudent, [key]: value });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="No Control"
        keyboardType="numeric"
        value={editedStudent.no_control}
        onChangeText={(text) => onChangeText("no_control", text)}
        style={styles.input}
        maxLength={10} 
      />

      <TextInput
        placeholder="Name"
        value={editedStudent.name}
        onChangeText={(text) => onChangeText("name", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        value={editedStudent.last_name}
        onChangeText={(text) => onChangeText("last_name", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Grade"
        value={editedStudent.grade}
        onChangeText={(text) => onChangeText("grade", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Average"
        keyboardType="numeric"
        value={editedStudent.average}
        onChangeText={(text) => onChangeText("average", text)}
        style={styles.input}
      />
      <Button
        title="Save"
        onPress={saveEdit}
        icon={<Icon name="save" color="white" />}
        buttonStyle={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#7edd29",
    borderRadius: 10,
  },
});

export default EditStudentScreen;
