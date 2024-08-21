import {
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Table,
  Paper,
} from "@mui/material";
import { useRegisterContext } from "../../contexts/RegisterContext";

export default function DisplayData() {
  const { formData } = useRegisterContext();
  const getPlanNameById = (planId) => {
    const plan = plans.find((p) => p._id === planId);
    return plan ? plan.name : "Unknown Plan";
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Museum Name</TableCell>
              <TableCell>Terms Accepted</TableCell>
              <TableCell>Plan</TableCell>
              <TableCell>Card Number</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>CVV</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Country</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formData.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.lastName}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{data.museumName}</TableCell>
                <TableCell>{data.terms ? "Yes" : "No"}</TableCell>
                <TableCell>{data.plan}</TableCell>
                <TableCell>{data.cardNumber}</TableCell>
                <TableCell>{data.expiryDate}</TableCell>
                <TableCell>{data.cvv}</TableCell>
                <TableCell>{data.address}</TableCell>
                <TableCell>{data.country}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
