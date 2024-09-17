// // Frontend/src/components/ContactUs.js

// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import useContactUs from "../../hooks/useContactUs";
// import { useUserContext } from "../../contexts/UserContext";
// import FormConfirmButton from "../common/FormConfirmButton";

// const ContactUs = () => {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     resetField,
//     formState: { errors },
//   } = useForm();
//   const { loading, error, success, sendContactForm } = useContactUs();
//   const { user } = useUserContext();

//   useEffect(() => {
//     if (user) {
//       setValue("name", `${user.name} ${user.lastName}`);
//       setValue("email", user.email);
//     }
//   }, [user, setValue]);

//   useEffect(() => {
//     let timer;
//     if (success) {
//       // Clear the message field after 3 seconds
//       timer = setTimeout(() => {
//         resetField("message");
//       }, 3000);
//     }
//     return () => clearTimeout(timer); // Cleanup the timer on component unmount or success state change
//   }, [success, resetField]);

//   const onSubmit = async (data) => {
//     const messageWithSenderEmail = `${data.message}\n\nUser's email: ${data.email}`;
//     const updatedData = { ...data, message: messageWithSenderEmail };
//     await sendContactForm(updatedData);
//   };

//   return (
//     <div>
//       <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Contact Us</h1>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
//             Name
//           </label>
//           <input
//             id="name"
//             type="text"
//             {...register("name", { required: "Name is required" })}
//             className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
//               errors.name ? "border-red-500" : "border-gray-300"
//             } `}
//             readOnly
//           />
//           {errors.name && (
//             <p className="text-red-500 mt-1">{errors.name.message}</p>
//           )}
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
//             Email
//           </label>
//           <input
//             id="email"
//             type="email"
//             {...register("email", {
//               required: "Email is required",
//               pattern: {
//                 value: /^\S+@\S+\.\S+$/,
//                 message: "Invalid email address",
//               },
//             })}
//             className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
//               errors.email ? "border-red-500" : "border-gray-300"
//             } `}
//             readOnly
//           />
//           {errors.email && (
//             <p className="text-red-500 mt-1">{errors.email.message}</p>
//           )}
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
//             Message
//           </label>
//           <textarea
//             id="message"
//             {...register("message", { required: "Message is required" })}
//             className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
//               errors.message ? "border-red-500" : "border-gray-300"
//             } `}
//           />
//           {errors.message && (
//             <p className="text-red-500 mt-1">{errors.message.message}</p>
//           )}
//         </div>
//         <FormConfirmButton
//           onSubmit={handleSubmit(onSubmit)}
//           buttonText="Send"
//           dialogMessage="Would you like to send this message?"
//         />
//         {success && (
//           <p className="text-green-500 mt-4">Message sent successfully!</p>
//         )}
//         {error && <p className="text-red-500 mt-4">{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default ContactUs;
// src/components/ContactUs.js

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useContactUs from "../../hooks/useContactUs";
import { useUserContext } from "../../contexts/UserContext";
import { useThemeMode } from "../../contexts/DarkModeContext"; // Import Theme Context
import FormConfirmButton from "../common/FormConfirmButton";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    formState: { errors },
  } = useForm();
  const {  error, success, sendContactForm } = useContactUs();
  const { user } = useUserContext();
  const { isDarkMode } = useThemeMode(); // Destructure isDarkMode

  useEffect(() => {
    if (user) {
      setValue("name", `${user.name} ${user.lastName}`);
      setValue("email", user.email);
    }
  }, [user, setValue]);

  useEffect(() => {
    let timer;
    if (success) {
      // Clear the message field after 3 seconds
      timer = setTimeout(() => {
        resetField("message");
      }, 3000);
    }
    return () => clearTimeout(timer); // Cleanup the timer on component unmount or success state change
  }, [success, resetField]);

  const onSubmit = async (data) => {
    const messageWithSenderEmail = `${data.message}\n\nUser's email: ${data.email}`;
    const updatedData = { ...data, message: messageWithSenderEmail };
    await sendContactForm(updatedData);
  };

  return (
    <div>
      <div >
        <h1
          className={`text-4xl font-extrabold mb-8 text-center ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Contact Us
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Name Field */}
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className={`block w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? errors.name
                    ? "border-red-500 bg-gray-700 placeholder-gray-400 text-gray-200 focus:ring-red-500"
                    : "border-gray-700 bg-gray-800 placeholder-gray-400 text-gray-200 focus:ring-blue-500"
                  : errors.name
                  ? "border-red-500 bg-white placeholder-gray-400 text-gray-900 focus:ring-red-500"
                  : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
              }`}
              readOnly
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
              className={`block w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? errors.email
                    ? "border-red-500 bg-gray-700 placeholder-gray-400 text-gray-200 focus:ring-red-500"
                    : "border-gray-700 bg-gray-800 placeholder-gray-400 text-gray-200 focus:ring-blue-500"
                  : errors.email
                  ? "border-red-500 bg-white placeholder-gray-400 text-gray-900 focus:ring-red-500"
                  : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
              }`}
              readOnly
              placeholder="Your Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              {...register("message", { required: "Message is required" })}
              className={`block w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? errors.message
                    ? "border-red-500 bg-gray-700 placeholder-gray-400 text-gray-200 focus:ring-red-500"
                    : "border-gray-700 bg-gray-800 placeholder-gray-400 text-gray-200 focus:ring-blue-500"
                  : errors.message
                  ? "border-red-500 bg-white placeholder-gray-400 text-gray-900 focus:ring-red-500"
                  : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
              }`}
              placeholder="Your Message"
              rows="4"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <FormConfirmButton
              onSubmit={handleSubmit(onSubmit)}
              buttonText="Send"
              dialogMessage="Would you like to send this message?"
              isDarkMode={isDarkMode} // Pass isDarkMode as a prop for styling
            />
          </div>

          {/* Success Message */}
          {success && (
            <p className="text-green-500 text-sm mt-4 text-center">
              Message sent successfully!
            </p>
          )}

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
