

// import React, { useState } from "react";
// import { TextField, Checkbox, FormControlLabel, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
// import { useRegisterContext } from "../../contexts/RegisterContext";
// import termsOfUseApi from "../../api/TermsOfUseApi"; // Assuming this is the API to fetch terms of use
// import "../../App.css";

// export default function Registration() {
//   const { formData, setFormData } = useRegisterContext();
//   const { userData = {} } = formData;
//   const [open, setOpen] = useState(false); // State to control the dialog
//   const [termsContent, setTermsContent] = useState(""); // State to hold terms content

//   const setUserData = (newData) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       userData: {
//         ...prevData.userData,
//         ...newData,
//       },
//     }));
//   };

//   const handleOpen = async () => {
//     // Fetch the terms of use when opening the modal
//     try {
//       const termsResponse = await termsOfUseApi.getTermsOfUse();
//       setTermsContent(termsResponse.content); // Assuming content field holds the terms
//       setOpen(true);
//     } catch (error) {
//       console.error("Failed to load terms of use:", error);
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
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
//       <div>
//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={userData.terms || false}
//               onChange={(e) => setUserData({ terms: e.target.checked })}
//               color="secondary"
//             />
//           }
//           label={
//             <span>
//               I agree to the{" "}
//               <a
//                 href="#"
//                 onClick={handleOpen} // Handle opening the modal
//                 style={{ color: "#3a4c98", textDecoration: "underline", cursor: "pointer" }}
//               >
//                 terms and conditions
//               </a>
//             </span>
//           }
//         />
//       </div>

//       {/* Terms of Use Dialog */}
//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
//         <DialogTitle>Terms and Conditions</DialogTitle>
//         <DialogContent>
//           <div
//             style={{
//               whiteSpace: "pre-line",
//               maxHeight: "400px",
//               overflowY: "auto",
//             }}
//           >
//             {termsContent || "Loading terms..."}
//           </div>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import { TextField, Checkbox, FormControlLabel, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
// import { useRegisterContext } from "../../contexts/RegisterContext";
// import termsOfUseApi from "../../api/TermsOfUseApi"; // Assuming this is the API to fetch terms of use
// import "../../App.css";

// export default function Registration() {
//   const { formData, setFormData } = useRegisterContext();
//   const { userData = {} } = formData;
//   const [open, setOpen] = useState(false); // State to control the dialog
//   const [termsContent, setTermsContent] = useState(""); // State to hold terms content

//   const setUserData = (newData) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       userData: {
//         ...prevData.userData,
//         ...newData,
//       },
//     }));
//   };

//   const handleOpen = async () => {
//     // Fetch the terms of use when opening the modal
//     try {
//       const termsResponse = await termsOfUseApi.getTermsOfUse();
//       setTermsContent(termsResponse.content); // Assuming content field holds the terms
//       setOpen(true);
//     } catch (error) {
//       console.error("Failed to load terms of use:", error);
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
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
//       <div>
//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={userData.terms || false}
//               onChange={(e) => setUserData({ terms: e.target.checked })}
//               color="secondary"
//             />
//           }
//           label={
//             <span>
//               I agree to the{" "}
//               <button
//                 onClick={handleOpen} // Handle opening the modal
//                 style={{
//                   color: "#3a4c98",
//                   textDecoration: "underline",
//                   background: "none",
//                   border: "none",
//                   cursor: "pointer",
//                   padding: 0,
//                   font: "inherit",
//                 }}
//               >
//                 terms and conditions
//               </button>
//             </span>
//           }
//         />
//       </div>

//       {/* Terms of Use Dialog */}
//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
//         <DialogTitle>Terms and Conditions</DialogTitle>
//         <DialogContent>
//           <div
//             style={{
//               whiteSpace: "pre-line",
//               maxHeight: "400px",
//               overflowY: "auto",
//             }}
//           >
//             {termsContent || "Loading terms..."}
//           </div>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }


import React from "react";
import { TextField } from "@mui/material";
import { useRegisterContext } from "../../contexts/RegisterContext";
import "../../App.css";

export default function Registration() {
  const { formData, setFormData } = useRegisterContext();
  const { userData = {} } = formData;

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
          label="Name"
          value={userData.name || ""}
          onChange={(e) => setUserData({ name: e.target.value })}
          margin="normal"
          variant="outlined"
          color="secondary"
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
          onChange={(e) => setUserData({ password: e.target.value })}
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
          onChange={(e) => setUserData({ confirmPassword: e.target.value })}
          margin="normal"
          variant="outlined"
          color="secondary"
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
        />
      </div>
    </div>
  );
}
