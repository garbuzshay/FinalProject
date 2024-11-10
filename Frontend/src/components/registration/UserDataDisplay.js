import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Divider,
  Container,
} from "@mui/material";
import { useRegisterContext } from "../../contexts/RegisterContext";
import usePlans from "../../hooks/usePlans"; // Import the usePlans hook

export default function UserDataOrderDisplay() {
  const { formData } = useRegisterContext();
  const { userData, museumData } = formData;
  const { loading, error, getPlanNameById, getPlanPriceById } = usePlans(); // Destructure the functions from usePlans

  if (loading) return <p>Loading plans...</p>;
  if (error) return <p>{error}</p>;

  // Mask card number to show only the first 4 digits
  const maskCardNumber = (cardNumber) => {
    if (!cardNumber) return "No Card Info";
    return `************${cardNumber.slice(-4)}`; // Show last 4 digits, mask the rest
  };

  // Mask CVV for privacy
  const maskCVV = (cvv) => {
    if (!cvv) return "No CVV";
    return `**${cvv.slice(-1)}`; // Mask first two digits, show the last digit
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: "20px", margin: "10px auto" }}>
        <Typography variant="h4" gutterBottom align="center">
          User Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Personal Details
                </Typography>
                <Divider />
                <Typography variant="body1">
                  <strong>Name:</strong> {userData.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Last Name:</strong> {userData.lastName}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {userData.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone Number:</strong> {userData.phoneNumber}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Museum Details
                </Typography>
                <Divider />
                <Typography variant="body1">
                  <strong>Museum Name:</strong> {museumData.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Address:</strong> {museumData.address}
                </Typography>
                <Typography variant="body1">
                  <strong>City:</strong> {museumData.city}
                </Typography>
                <Typography variant="body1">
                  <strong>State:</strong> {museumData.state}
                </Typography>
                <Typography variant="body1">
                  <strong>Zip Code:</strong> {museumData.zipCode}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone Number:</strong> {museumData.phoneNumber}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {museumData.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Payment Details
                </Typography>
                <Divider />
                <Typography variant="body1">
                  <strong>Plan:</strong> {getPlanNameById(userData.plan)}
                </Typography>
                <Typography variant="body1">
                  <strong>Price:</strong> {getPlanPriceById(userData.plan)}
                </Typography>
                <Typography variant="body1">
                  <strong>Card Number:</strong> {maskCardNumber(userData.cardNumber)}
                </Typography>
                <Typography variant="body1">
                  <strong>Expiry Date:</strong> {userData.expiryDate}
                </Typography>
                <Typography variant="body1">
                  <strong>CVV:</strong> {maskCVV(userData.cvv)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Terms and Conditions
                </Typography>
                <Divider />
                <Typography variant="body1">
                  <strong>Terms Accepted:</strong> {userData.terms ? "Yes" : "No"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

