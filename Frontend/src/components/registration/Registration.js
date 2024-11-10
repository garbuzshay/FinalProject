

// import React from "react";
// import { TextField } from "@mui/material";
// import { useRegisterContext } from "../../contexts/RegisterContext";
// import "../../App.css";

// export default function Registration() {
//   const { formData, setFormData } = useRegisterContext();
//   const { userData = {} } = formData;

//   const setUserData = (newData) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       userData: {
//         ...prevData.userData,
//         ...newData,
//       },
//     }));
//   };

//   return (
//     <div>
//       <div>
//         <TextField
//           label="Name"
//           value={userData.name || ""}
//           onChange={(e) => setUserData({ name: e.target.value })}
//           margin="normal"
//           variant="outlined"
//           color="secondary"
//         />
//       </div>
//       <div>
//         <TextField
//           label="Last Name"
//           value={userData.lastName || ""}
//           onChange={(e) => setUserData({ lastName: e.target.value })}
//           margin="normal"
//           variant="outlined"
//           color="secondary"
//         />
//       </div>
//       <div>
//         <TextField
//           label="Email"
//           value={userData.email || ""}
//           onChange={(e) => setUserData({ email: e.target.value })}
//           margin="normal"
//           variant="outlined"
//           color="secondary"
//         />
//       </div>
//       <div>
//         <TextField
//           label="Password"
//           type="password"
//           value={userData.password || ""}
//           onChange={(e) => setUserData({ password: e.target.value })}
//           margin="normal"
//           variant="outlined"
//           color="secondary"
//         />
//       </div>
//       <div>
//         <TextField
//           label="Confirm Password"
//           type="password"
//           value={userData.confirmPassword || ""}
//           onChange={(e) => setUserData({ confirmPassword: e.target.value })}
//           margin="normal"
//           variant="outlined"
//           color="secondary"
//         />
//       </div>
//       <div>
//         <TextField
//           label="Phone Number"
//           value={userData.phoneNumber || ""}
//           onChange={(e) => setUserData({ phoneNumber: e.target.value })}
//           margin="normal"
//           variant="outlined"
//           color="secondary"
//         />
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRegisterContext } from "../../contexts/RegisterContext";
import "../../App.css";

export default function Registration() {
  const { formData, setFormData } = useRegisterContext();
  const { userData = {} } = formData;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const setUserData = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      userData: {
        ...prevData.userData,
        ...newData,
      },
    }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <div>
        <TextField
          label="Name"
          value={userData.name || ""}
          onChange={(e) => setUserData({ name: e.target.value })}
          margin="normal"
          variant="outlined"
          color="secondary"
          fullWidth
        />
      </div>
      <div>
        <TextField
          label="Last Name"
          value={userData.lastName || ""}
          onChange={(e) => setUserData({ lastName: e.target.value })}
          margin="normal"
          variant="outlined"
          color="secondary"
          fullWidth
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
          fullWidth
        />
      </div>
      <div>
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          value={userData.password || ""}
          onChange={(e) => setUserData({ password: e.target.value })}
          margin="normal"
          variant="outlined"
          color="secondary"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div>
        <TextField
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          value={userData.confirmPassword || ""}
          onChange={(e) => setUserData({ confirmPassword: e.target.value })}
          margin="normal"
          variant="outlined"
          color="secondary"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleToggleConfirmPasswordVisibility} edge="end">
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div>
        <TextField
          label="Phone Number"
          value={userData.phoneNumber || ""}
          onChange={(e) => setUserData({ phoneNumber: e.target.value })}
          margin="normal"
          variant="outlined"
          color="secondary"
          fullWidth
        />
      </div>
    </div>
  );
}
