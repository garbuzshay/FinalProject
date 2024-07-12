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
} from '@mui/material';
import { useRegisterContext } from '../../contexts/RegisterContext';
import usePlans from '../../hooks/usePlans';

export default function ChoosePlan() {
  const { formData, setFormData } = useRegisterContext();
  const [selectedPlan, setSelectedPlan] = useState(formData.userData.plan || '');
  const { plans, loading, error } = usePlans();

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
        !['_id', 'createdAt', 'updatedAt', '__v', 'planId','maxExhibitions','maxArtWorks'].includes(key))
    : [];

  return (
    <div>
      <h2>Choose a Plan</h2>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
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
              <TableRow key={plan.planId}>
                {tableHeaders.map(header => (
                  <TableCell key={header}>
                    {header === 'price' ? `$${plan[header]}` : plan[header]}
                  </TableCell>
                ))}
                <TableCell>
                  <Button
                    variant={selectedPlan === plan.planId ? 'contained' : 'outlined'}
                    onClick={() => handlePlanClick(plan.planId)}
                  >
                    {selectedPlan === plan.planId ? 'Selected' : 'Select'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
