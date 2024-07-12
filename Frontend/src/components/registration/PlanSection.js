// Plan.js
import React from "react";
import { TableRow, TableCell } from "@mui/material";

const PlanSection = ({ plan, selectedPlan, handlePlanClick }) => {
  return (
    <TableRow
      className={`plan ${selectedPlan === plan.planId ? "selected-plan" : ""}`}
      onClick={() => handlePlanClick(plan.planId)}
      style={{
        cursor: "pointer",
        marginBottom: "10px",
        backgroundColor: selectedPlan === plan.planId ? "#f0f0f0" : "white",
      }}
    >
      <TableCell>{plan.name}</TableCell>
      <TableCell>{plan.price}</TableCell>
      <TableCell>{plan.exhibitions}</TableCell>
      <TableCell>{plan.artworks}</TableCell>
      <TableCell>{plan.features}</TableCell>
    </TableRow>
  );
};

export default PlanSection;