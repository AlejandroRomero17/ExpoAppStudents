import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";
import { addStudent } from "../../Api.js";

const InsertStudentScreen = ({ navigation }) => {
  const [student, setStudent] = useState({
    no_control: "",
    name: "",
    last_name: "",
    grade: "",
    average: "",
  });

  const saveStudent = async () => {
    try {
      await addStudent(student);
      navigation.navigate("List");
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeText = (key, value) => {
    setStudent({ ...student, [key]: value });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="No Control"
        keyboardType="numeric"
        value={student.no_control}
        onChangeText={(text) => onChangeText("no_control", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Name"
        value={student.name}
        onChangeText={(text) => onChangeText("name", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        value={student.last_name}
        onChangeText={(text) => onChangeText("last_name", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Grade"
        value={student.grade}
        onChangeText={(text) => onChangeText("grade", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Average"
        keyboardType="numeric"
        value={student.average}
        onChangeText={(text) => onChangeText("average", text)}
        style={styles.input}
      />
      <Button
        title="Save"
        onPress={saveStudent}
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

export default InsertStudentScreen;
