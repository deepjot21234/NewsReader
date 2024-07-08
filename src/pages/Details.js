import {
  ActivityIndicator,
  Button,
  Card,
  Modal,
  Paragraph,
  Searchbar,
  Title,
} from "react-native-paper";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import axios from "axios";

const Details = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const openModal = (article) => {
    setSelectedArticle(article);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedArticle(null);
    setModalVisible(false);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return; // Don't search if query is empty or whitespace
    }

    setLoading(true);

    try {
      const response = await axios.get("https://newsapi.org/v2/everything", {
        params: {
          q: searchQuery,
          apiKey: "aa55a1767d9a4ff9b4fb99bf99267499", // Replace with your actual NewsAPI key
        },
      });
      setSearchResults(response.data.articles);
    } catch (error) {
      console.error("Error searching news:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search news"
        onChangeText={setSearchQuery}
        value={searchQuery}
        onSubmitEditing={handleSearch}
        onIconPress={handleSearch}
        style={styles.searchBar}
      />
      {!searchQuery ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 2,
            borderColor: "pink",
            height: 300,
            borderRadius: 20,
          }}>
          <Text style={{ textAlign: "center" }}>
            Please Add titile that you want to seach in search box Thanks!
          </Text>
        </View>
      ) : loading ? (
        <ActivityIndicator size="large" style={styles.loadingIndicator} />
      ) : (
        <ScrollView style={styles.resultContainer}>
          {searchResults.map((article) => (
            <Card key={article.url} style={styles.card}>
              <Card.Cover source={{ uri: article?.urlToImage }} />
              <Card.Content>
                <Title>{article.title}</Title>
                <Paragraph>{article.description}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => openModal(article)}>Read More</Button>
              </Card.Actions>
            </Card>
          ))}
        </ScrollView>
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <Card style={styles.modalCard}>
            <Card.Content>
              {selectedArticle && (
                <>
                  <Title>{selectedArticle?.title}</Title>
                  <Paragraph>{selectedArticle?.content}</Paragraph>
                </>
              )}
            </Card.Content>
            <Card.Actions>
              <Button onPress={closeModal}>Close</Button>
            </Card.Actions>
          </Card>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  searchBar: {
    marginBottom: 16,
    marginTop: 40,
  },
  resultContainer: {
    flex: 1,
  },
  card: {
    marginBottom: 16,
  },
});

export default Details;
