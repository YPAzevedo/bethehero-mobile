import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as MailComposer from "expo-mail-composer";
import { View, Image, TouchableOpacity, Text, Linking } from "react-native";
import { Feather } from "@expo/vector-icons";

import logoImg from "../../assets/logo.png";

import styles from "./styles";

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { incident } = route.params;

  const message = `Hello, ${incident.name}, i'm contacting you to help with the incident: ${incident.title}, with the value of: ${incident.value}`;

  const navigateToIncidents = () => {
    navigation.navigate("Incidents");
  };

  const sendMail = () => {
    MailComposer.composeAsync({
      subject: `Hero for the incident: ${incident.title}`,
      recipients: incident.email,
      body: message,
    });
  };

  const sendWhatapp = () => {
    Linking.openURL(
      `whatapp://send?phone=${incident.whatsapp}&text=${message}`
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateToIncidents}>
          <Feather name="arrow-left" size={28} color="#e32041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProp, { marginTop: 0 }]}>CHARITY:</Text>
        <Text style={styles.incidentValue}>
          {incident.name} from {incident.city}/{incident.uf}
        </Text>

        <Text style={styles.incidentProp}>INCIDENT:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProp}>DESCRIPTION:</Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>

        <Text style={styles.incidentProp}>VALUE:</Text>
        <Text style={styles.incidentValue}>
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(incident.value)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Save the day!</Text>
        <Text style={styles.heroTitle}>Be the hero for this incident.</Text>

        <Text style={styles.heroDescription}>Contact them:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatapp}>
            <Text style={styles.actionText}>Whatsapp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Detail;
