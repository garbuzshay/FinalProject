import React from "react";
import { TextField, Checkbox, FormControlLabel } from "@mui/material";

import {  useRegisterContext } from "../../contexts/RegisterContext";
import "../../App.css";


export default function Registration() {
  const { formData, setFormData } = useRegisterContext();
  const { userData = {} } = formData;

  const setUserData = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      userData: {
        ...prevData.userData,
        ...newData
      }
    }));
  };
  return (
    <div>
      <div>
        <TextField
          label="Name"
          value={userData.name || ""}
          onChange={(e) => setUserData({name: e.target.value })}
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </div>
      <div>
        <TextField
          label="Last Name"
          value={userData.lastName || ""}
          onChange={(e) =>
            setUserData({ lastName: e.target.value })
          }
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
          label="Password"
          type="password"
          value={userData.password || ""}
          onChange={(e) =>
            setUserData({ password: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </div>
      <div>
        <TextField
          label="Confirm Password"
          type="password"
          value={userData.confirmPassword || ""}
          onChange={(e) =>
            setUserData({confirmPassword: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </div>
      <div>
        <TextField
          label="Phone Number"
          value={userData.phoneNumber || ""}
          onChange={(e) =>
            setUserData({ phoneNumber: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={userData.terms || false}
              onChange={(e) =>
                setUserData({ terms: e.target.checked })
              }
              color="secondary"
            />
          }
          label="I agree to the terms and conditions"
        />
      </div>
    </div>
  );
}
