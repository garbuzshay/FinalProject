// Frontend/src/components/ContactUs.js

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useContactUs from "../../hooks/useContactUs";
import { useUserContext } from "../../contexts/UserContext";
import FormConfirmButton from "../common/FormConfirmButton";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { loading, error, success, sendContactForm } = useContactUs();
  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      setValue("name", `${user.name} ${user.lastName}`);
      setValue("email", user.email);
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    const messageWithSenderEmail = `${data.message}\n\nUser's email: ${data.email}`;
    const updatedData = { ...data, message: messageWithSenderEmail };
    await sendContactForm(updatedData);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Us</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
            className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              errors.name ? "border-red-500" : "border-gray-300"
            } `}
            readOnly
          />
          {errors.name && (
            <p className="text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
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
            className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500" : "border-gray-300"
            } `}
            readOnly
          />
          {errors.email && (
            <p className="text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            {...register("message", { required: "Message is required" })}
            className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              errors.message ? "border-red-500" : "border-gray-300"
            } `}
          />
          {errors.message && (
            <p className="text-red-500 mt-1">{errors.message.message}</p>
          )}
        </div>
        <FormConfirmButton
          onSubmit={handleSubmit(onSubmit)}
          buttonText="Send"
          dialogMessage="Would you like to send this message?"
        />
        {success && (
          <p className="text-green-500 mt-4">Message sent successfully!</p>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default ContactUs;
