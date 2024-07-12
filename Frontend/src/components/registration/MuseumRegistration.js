import React from "react";
import { TextField} from "@mui/material";
import { useRegisterContext } from "../../contexts/RegisterContext";
import "../../App.css";

export default function MuseumRegistration() {
  const { formData, setFormData } = useRegisterContext();
  const { museumData = {} } = formData;

  // Helper function to update nested state
  const setMuseumData = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      museumData: {
        ...prevData.museumData,
        ...newData
      }
    }));
  };

  return (
    <div>
      <div>
        <TextField
          label="Museum Name"
          value={museumData.name || ""}
          onChange={(e) => setMuseumData({ name: e.target.value })}
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </div>
      <div>
        <TextField
          label="Address"
          value={museumData.address || ""}
          onChange={(e) => setMuseumData({ address: e.target.value })}
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </div>
      <div>
        <TextField
          label="City"
          value={museumData.city || ""}
          onChange={(e) => setMuseumData({ city: e.target.value })}
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </div>
      <div>
        <TextField
          label="State"
          value={museumData.state || ""}
          onChange={(e) => setMuseumData({ state: e.target.value })}
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </div>
      <div>
        <TextField
          label="Zip Code"
          value={museumData.zipCode || ""}
          onChange={(e) => setMuseumData({ zipCode: e.target.value })}
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </div>
      <div>
        <TextField
          label="Phone Number"
          value={museumData.phoneNumber || ""}
          onChange={(e) => setMuseumData({ phoneNumber: e.target.value })}
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </div>
      <div>
        <TextField
          label="Email"
          value={museumData.email || ""}
          onChange={(e) => setMuseumData({ email: e.target.value })}
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </div>
    </div>
  );
}
