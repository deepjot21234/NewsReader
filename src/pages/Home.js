import { Button, Card, Paragraph, Title } from "react-native-paper";
import { Modal, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";

import FastImage from "react-native-fast-image";
import axios from "axios";

const NewsScreen = () => {
  const [articles, setArticles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    fetchNewsData();
  }, []);

  const fetchNewsData = async () => {
    try {
      const response = await axios.get("https://newsapi.org/v2/top-headlines", {
        params: {
          country: "in",
          apiKey: "aa55a1767d9a4ff9b4fb99bf99267499",
        },
      });
      setArticles(response.data.articles);
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  const openModal = (article) => {
    setSelectedArticle(article);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedArticle(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {articles.map((article) => (
          <Card key={article.url} style={styles.card}>
            <Card.Cover source={{ uri: article?.urlToImage }} />
            <Card.Content>
              <Title>{article?.title}</Title>
              <Paragraph>{article?.description}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => openModal(article)}>Read More</Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>

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
  },
  card: {
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalCard: {
    width: "80%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
  },
});

export default NewsScreen;
