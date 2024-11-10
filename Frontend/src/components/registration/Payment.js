

// import React, { useState } from "react";
// import { TextField, Checkbox, FormControlLabel, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
// import { useRegisterContext } from "../../contexts/RegisterContext";
// import termsOfUseApi from "../../api/TermsOfUseApi"; // Assuming this is the API to fetch terms of use

// export default function PaymentStep() {
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
//           label="Card Number"
//           value={userData.cardNumber || ""}
//           onChange={(e) => setUserData({ cardNumber: e.target.value })}
//           margin="normal"
//           variant="outlined"
//           color="secondary"
//         />
//       </div>
//       <div>
//         <TextField
//           label="Expiry Date"
//           placeholder="MM / YY"
//           value={userData.expiryDate || ""}
//           onChange={(e) => setUserData({ expiryDate: e.target.value })}
//           margin="normal"
//           variant="outlined"
//           color="secondary"
//         />
//       </div>
//       <div>
//         <TextField
//           label="CVV"
//           value={userData.cvv || ""}
//           onChange={(e) => setUserData({ cvv: e.target.value })}
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
//       {/* I agree to terms and conditions */}
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
//                 onClick={handleOpen}
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


import React, { useState } from "react";
import { TextField, Checkbox, FormControlLabel, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useRegisterContext } from "../../contexts/RegisterContext";
import termsOfUseApi from "../../api/TermsOfUseApi"; // Assuming this is the API to fetch terms of use

export default function PaymentStep() {
  const { formData, setFormData } = useRegisterContext();
  const { userData = {} } = formData;
  const [open, setOpen] = useState(false); // State to control the dialog
  const [termsContent, setTermsContent] = useState(""); // State to hold terms content

  const setUserData = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      userData: {
        ...prevData.userData,
        ...newData,
      },
    }));
  };

  const handleOpen = async () => {
    // Fetch the terms of use when opening the modal
    try {
      const termsResponse = await termsOfUseApi.getTermsOfUse();
      setTermsContent(termsResponse.content); // Assuming content field holds the terms
      setOpen(true);
    } catch (error) {
      console.error("Failed to load terms of use:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <div>
        <TextField
          label="Card Number"
          value={userData.cardNumber || ""}
          onChange={(e) => setUserData({ cardNumber: e.target.value })}
          margin="normal"
          variant="outlined"
          color="secondary"
          fullWidth
        />
      </div>
      <div>
        <TextField
          label="Expiry Date"
          placeholder="MM / YY"
          value={userData.expiryDate || ""}
          onChange={(e) => setUserData({ expiryDate: e.target.value })}
          margin="normal"
          variant="outlined"
          color="secondary"
          fullWidth
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
      {/* I agree to terms and conditions */}
      <div style={{ textAlign: "left", marginTop: "10px" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={userData.terms || false}
              onChange={(e) => setUserData({ terms: e.target.checked })}
              color="secondary"
            />
          }
          label={
            <span>
              I agree to the{" "}
              <button
                onClick={handleOpen}
                style={{
                  color: "#3a4c98",
                  textDecoration: "underline",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  font: "inherit",
                }}
              >
                terms and conditions
              </button>
            </span>
          }
        />
      </div>

      {/* Terms of Use Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Terms and Conditions</DialogTitle>
        <DialogContent>
          <div
            style={{
              whiteSpace: "pre-line",
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            {termsContent || "Loading terms..."}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
