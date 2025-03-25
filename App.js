import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  Button,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    axios
      .get('https://api.saray.net/api/people')
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employee list:', error);
      });
  }, []);

  const handleEmployeePress = (id) => {
    setLoadingDetails(true);
    axios
      .get(`https://api.saray.net/api/people/${id}`)
      .then((response) => {
        setSelectedEmployee(response.data);
        setModalVisible(true);
        setLoadingDetails(false);
      })
      .catch((error) => {
        console.error('Error fetching employee details:', error);
        setLoadingDetails(false);
      });
  };

  const renderEmployee = ({ item }) => (
    <TouchableOpacity
      style={styles.employeeContainer}
      onPress={() => handleEmployeePress(item.id)}
    >
      <Image
        source={{ uri: `https://api.saray.net/images/${item.avatar}.jpg` }}
        style={styles.avatar}
      />
      <View style={styles.employeeInfo}>
        <Text style={styles.nameText}>
          {item.firstName} {item.lastName}
        </Text>
      </View>
      <Text style={styles.positionText}>{item.position}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee Directory</Text>
      <FlatList
        data={employees}
        renderItem={renderEmployee}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
      <StatusBar style="auto" />

      {/* Modal for detailed info */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <ScrollView contentContainerStyle={styles.modalContent}>
          {loadingDetails ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : selectedEmployee ? (
            <>
              <Image
                source={{
                  uri: `https://api.saray.net/images/${selectedEmployee.avatar}.jpg`,
                }}
                style={styles.modalAvatar}
              />
              <Text style={styles.modalName}>
                {selectedEmployee.firstName} {selectedEmployee.lastName}
              </Text>
              <Text>Email: {selectedEmployee.email}</Text>
              <Text>Phone: {selectedEmployee.phone}</Text>
              <Text>Gender: {selectedEmployee.gender}</Text>
              <Text>Birthday: {selectedEmployee.birthday}</Text>
              <Text>Position: {selectedEmployee.position}</Text>
              <Text>Role: {selectedEmployee.role}</Text>
              <Text>Interests: {selectedEmployee.interests}</Text>
              <Text>Address: {selectedEmployee.address.road}, {selectedEmployee.address.city}, {selectedEmployee.address.country}</Text>
              <Text>Team: {selectedEmployee.team.name}</Text>
              <Text>Status: {selectedEmployee.status}</Text>
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </>
          ) : null}
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  employeeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 5,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  employeeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '500',
  },
  positionText: {
    fontSize: 14,
    color: '#333',
  },
  modalContent: {
    padding: 20,
    alignItems: 'center',
  },
  modalAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  modalName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
