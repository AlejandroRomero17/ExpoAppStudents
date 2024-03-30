// ListStudentScreen.js

import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, FlatList } from "react-native";
import { Card, Button, Icon, Text } from "react-native-elements";
import { fetchStudents, deleteStudent } from "../../Api.js";
import { useFocusEffect } from "@react-navigation/native"; 

const ListStudentScreen = ({ navigation }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    try {
      const data = await fetchStudents();
      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const confirmDelete = (no_control, index) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this student?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleDelete(no_control, index),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = async (no_control, index) => {
    try {
      await deleteStudent(no_control);
      const updatedStudents = [...students];
      updatedStudents.splice(index, 1);
      setStudents(updatedStudents);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item, index }) => (
    <Card containerStyle={styles.card}>
      <Text style={styles.nameText}>
        {item.name} {item.last_name}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.boldText}>No Control:</Text> {item.no_control}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.boldText}>Name:</Text> {item.name}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.boldText}>Last Name:</Text> {item.last_name}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.boldText}>Grade:</Text> {item.grade}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.boldText}>Average:</Text> {item.average}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          icon={<Icon name="delete" color="white" />}
          title="Delete"
          buttonStyle={styles.deleteButton}
          onPress={() => confirmDelete(item.no_control, index)}
        />
        <Button
          icon={<Icon name="edit" color="white" />}
          title="Edit"
          buttonStyle={styles.editButton}
          onPress={() =>
            navigation.navigate("Edit", {
              student: item,
            })
          }
        />
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Button
        title="Insert Student"
        onPress={() => navigation.navigate("Insert")}
        buttonStyle={styles.addButton}
      />
      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        refreshing={false}
        onRefresh={fetchData}
        extraData={students}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginBottom: 10,
    borderRadius: 10,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
  nameText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#f5061d",
    borderRadius: 10,
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#0050ad",
    borderRadius: 10,
    marginTop: 10,
  },
  addButton: {
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: "#7edd29",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default ListStudentScreen;
