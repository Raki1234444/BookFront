import React, { useState } from "react";
import { Container, Tabs, Tab, Grid, Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SaleIcon from "@mui/icons-material/LocalOffer";

const books = [
  {
    id: 1,
    title: "Practice Book: Electrical Engineering",
    image: "/path-to-image1.jpg",
    status: "Out of Stock",
    sale: true,
  },
  {
    id: 2,
    title: "GKP GATE 2025: Electronics & Communication",
    image: "/path-to-image2.jpg",
    sale: true,
  },
  {
    id: 3,
    title: "GKP GATE 2025: Mechanical Engineering",
    image: "/path-to-image3.jpg",
    sale: true,
  },
  {
    id: 4,
    title: "GKP GATE 2025: Data Science & AI",
    image: "/path-to-image4.jpg",
    sale: true,
  },
  {
    id: 5,
    title: "GATE 2024: Architecture & Planning",
    image: "/path-to-image5.jpg",
    sale: true,
  },
];

const categories = ["GATE", "IIT-JEE", "CBSE", "NEET", "UPSC", "IELTS"];

const ExamPrepBooks = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Book Heaven
      </Typography>
      <Box display="flex" justifyContent="center">
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {categories.map((category, index) => (
            <Tab key={index} label={category} />
          ))}
        </Tabs>
      </Box>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
            <Card sx={{ position: "relative", borderRadius: 2, boxShadow: 3 }}>
              <CardMedia component="img" height="180" image={book.image} alt={book.title} />

              {/* Sale or Out of Stock Tag */}
              {book.sale && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    bgcolor: "red",
                    color: "white",
                    px: 1,
                    borderRadius: 1,
                    fontSize: 12,
                  }}
                >
                  SALE
                </Box>
              )}
              {book.status && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 32,
                    left: 8,
                    bgcolor: "black",
                    color: "white",
                    px: 1,
                    borderRadius: 1,
                    fontSize: 12,
                  }}
                >
                  {book.status}
                </Box>
              )}
              <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                  {book.title}
                </Typography>
                <Button variant="contained" size="small" sx={{ mt: 2 }}>
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ExamPrepBooks;
