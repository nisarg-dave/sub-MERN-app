import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Article {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
}

const CardsContainer = styled.div`
  padding: 4rem;
  display: flex;
`;

const Card = styled.div`
  height: 50rem;
  width: 80%;
  box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.2);
  padding: 2rem;
  border-radius: 2rem;
  margin-right: 1rem;
  background-color: #3cacae;
`;

const Image = styled.img`
  width: 100%;
  height: 15rem;
  border-radius: 2rem;
`;

const Header = styled.h2`
  margin-top: 1rem;
  font-size: 1.5rem;
  color: white;
`;

const Content = styled.p`
  color: white;
`;

const NoArticlesContainer = styled.div`
  display: flex;
  align-items: center;
  color: white;
  justify-content: center;
  text-align: center;
  padding: 20rem 0;
  flex-direction: column;
  & a {
    font-size: 2rem;
    color: white;
    text-decoration: none;
  }
`;

const ErrorHeader = styled.h2`
  font-size: 3rem;
`;

function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticles();
  }, []);
  const fetchArticles = async () => {
    const { data: response } = await axios.get(
      "http://localhost:5000/articles/"
    );
    setArticles(response);
  };
  return (
    <Container>
      {articles.length ? (
        <CardsContainer>
          {articles.map((article) => (
            <Card key={article.id}>
              <Image src={article.imageUrl} />
              <Header>{article.title}</Header>
              <Content>{article.content}</Content>
            </Card>
          ))}
        </CardsContainer>
      ) : (
        <NoArticlesContainer>
          <ErrorHeader>You don't have a plan</ErrorHeader>
          <Link to="/article-plans">Buy a plan</Link>
        </NoArticlesContainer>
      )}
    </Container>
  );
}

export default Articles;
