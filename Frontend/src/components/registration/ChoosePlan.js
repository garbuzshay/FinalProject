
import React, { useState } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Typography,
  Grid,
  useMediaQuery,
} from '@mui/material';
import { useRegisterContext } from '../../contexts/RegisterContext';
import usePlans from '../../hooks/usePlans';

export default function ChoosePlan() {
  const { formData, setFormData } = useRegisterContext();
  const [selectedPlan, setSelectedPlan] = useState(formData.userData.plan || '');
  const { plans, loading, error } = usePlans();
  const isMobile = useMediaQuery('(max-width:600px)'); // Detect if the screen is mobile

  const handlePlanClick = (planId) => {
    setSelectedPlan(planId);
    setFormData((prevData) => ({
      ...prevData,
      userData: {
        ...prevData.userData,
        plan: planId,
      },
    }));
  };

  const tableHeaders = plans.length > 0
    ? Object.keys(plans[0]).filter(key =>
        !['_id', 'createdAt', 'updatedAt', '__v', 'plan', 'maxExhibitions', 'maxArtWorks'].includes(key))
    : [];

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      {isMobile ? (
        <Grid container spacing={2}>
          {plans.map(plan => (
            <Grid item xs={12} key={plan._id}>
              <Card variant="outlined" sx={{ border: selectedPlan === plan._id ? '2px solid #1976d2' : 'none' }}>
                <CardContent>
                  {tableHeaders.map(header => (
                    <Typography key={header} variant="body2">
                      <strong>{header.charAt(0).toUpperCase() + header.slice(1)}:</strong> {header === 'price' ? `$${plan[header]}` : plan[header]}
                    </Typography>
                  ))}
                  <Button
                    fullWidth
                    variant={selectedPlan === plan._id ? 'contained' : 'outlined'}
                    onClick={() => handlePlanClick(plan._id)}
                    sx={{ marginTop: 2 }}
                  >
                    {selectedPlan === plan._id ? 'Selected' : 'Select'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {tableHeaders.map(header => (
                  <TableCell key={header}>
                    {header.charAt(0).toUpperCase() + header.slice(1)}
                  </TableCell>
                ))}
                <TableCell>Select</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plans.map(plan => (
                <TableRow key={plan._id}>
                  {tableHeaders.map(header => (
                    <TableCell key={header}>
                      {header === 'price' ? `$${plan[header]}` : plan[header]}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button
                      variant={selectedPlan === plan._id ? 'contained' : 'outlined'}
                      onClick={() => handlePlanClick(plan._id)}
                    >
                      {selectedPlan === plan._id ? 'Selected' : 'Select'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
