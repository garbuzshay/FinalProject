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

export default function UserDataOrderDisplay() {
  const { formData } = useRegisterContext();
  const { userData, museumData } = formData;

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', margin: '20px auto', maxWidth: '600px' }}>
        <Typography variant="h4" gutterBottom>
          User Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Personal Details
                </Typography>
                <Divider />
                <Typography variant="body1"><strong>Name:</strong> {userData.name}</Typography>
                <Typography variant="body1"><strong>Last Name:</strong> {userData.lastName}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {userData.email}</Typography>
                <Typography variant="body1"><strong>Phone Number:</strong> {userData.phoneNumber}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Museum Details
                </Typography>
                <Divider />
                <Typography variant="body1"><strong>Museum Name:</strong> {museumData.museumName}</Typography>
                <Typography variant="body1"><strong>Address:</strong> {museumData.address}</Typography>
                <Typography variant="body1"><strong>City:</strong> {museumData.city}</Typography>
                <Typography variant="body1"><strong>State:</strong> {museumData.state}</Typography>
                <Typography variant="body1"><strong>Zip Code:</strong> {museumData.zipCode}</Typography>
                <Typography variant="body1"><strong>Phone Number:</strong> {museumData.phoneNumber}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {museumData.email}</Typography>
                <Typography variant="body1"><strong>Terms Accepted:</strong> {userData.terms ? "Yes" : "No"}</Typography>
                <Typography variant="body1"><strong>Plan:</strong> {userData.plan}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Payment Details
                </Typography>
                <Divider />
                <Typography variant="body1"><strong>Card Number:</strong> {userData.cardNumber}</Typography>
                <Typography variant="body1"><strong>Expiry Date:</strong> {userData.expiryDate}</Typography>
                <Typography variant="body1"><strong>CVV:</strong> {userData.cvv}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Address
                </Typography>
                <Divider />
                <Typography variant="body1"><strong>Address:</strong> {userData.address}</Typography>
                <Typography variant="body1"><strong>Country:</strong> {userData.country}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
