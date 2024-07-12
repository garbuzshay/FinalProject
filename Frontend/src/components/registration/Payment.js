import React from "react";
import { TextField } from "@mui/material";
import { useRegisterContext } from "../../contexts/RegisterContext";

export default function PaymentStep() {
  const { formData, setFormData } = useRegisterContext();
  const { userData } = formData;

  const setUserData = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      userData: {
        ...prevData.userData,
        ...newData,
      },
    }));
  };

  return (
    <div>
      <div>
        <TextField
          label="Card Number"
          value={userData.cardNumber || ""}
          onChange={(e) =>
            setUserData({ cardNumber: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </div>
      <div>
        <TextField
          label="Expiry Date"
          placeholder="MM / YY"
          value={userData.expiryDate || ""}
          onChange={(e) =>
            setUserData({ expiryDate: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </div>
      <div>
        <TextField
          label="CVV"
          value={userData.cvv || ""}
          onChange={(e) => setUserData({ cvv: e.target.value })}
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </div>
      <div>
        <TextField
          label="Email"
          value={userData.email || ""}
          onChange={(e) => setUserData({ email: e.target.value })}
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </div>
      <div>
        <TextField
          label="Address"
          value={userData.address || ""}
          onChange={(e) =>
            setUserData({ address: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </div>
      <div>
        <TextField
          label="Country"
          value={userData.country || ""}
          onChange={(e) =>
            setUserData({ country: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </div>
    </div>
  );
}
