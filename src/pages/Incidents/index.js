import React, { useState, useEffect } from "react";
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import api from "../../services/api";

import logoImg from "../../assets/logo.png";

import styles from "./styles";

const Incidents = () => {
  const navigation = useNavigation();
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false)

  async function loadData() {
    if(loading) {
      return;
    }

    if(total > 0 && incidents.length === total) {
      return;
    } 

    setLoading(true);

    const res = await api.get("/incidents", {
      params: {page}
    });

    setIncidents([...incidents, ...res.data]);
    setTotal(res.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const navigateToDetail = (incident) => {
    navigation.navigate("Detail", { incident });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total of <Text style={styles.headerTextBold}>{`${total} incidents`}</Text>
        </Text>
      </View>
      <View>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.description}>
          Be the hero for one of those charities.
        </Text>
      </View>
      <FlatList
        style={styles.incidentList}
        data={incidents}
        showsHorizontalScrollIndicator={false}
        onEndReached={loadData}
        onEndReachedThreshold={0.1}
        keyExtractor={(incident) => String(incident.id)}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProp}>CHARITY:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProp}>INCIDENT:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProp}>VALUE:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Details</Text>
              <Feather name="arrow-right" size={16} color="#e32041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Incidents;
