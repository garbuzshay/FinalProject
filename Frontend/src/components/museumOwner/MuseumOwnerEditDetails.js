// import React, { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { useMuseumContext } from '../../contexts/MuseumContext';
// import FormConfirmButton from '../common/FormConfirmButton';
// import { useNavigate } from 'react-router-dom';
// import QRCodeGenerator from './QRCodeGenerator';

// const MuseumOwnerEditDetails = () => {
//   const { museum, updateMuseumDetails } = useMuseumContext();
//   const { register, handleSubmit, setValue, watch } = useForm();
//   const navigate = useNavigate();
//   const imageUrl = watch('imageUrl', museum?.imageUrl || '');

//   useEffect(() => {
//     if (museum) {
//       for (const key in museum) {
//         setValue(key, museum[key]);
//       }
//     }
//   }, [museum, setValue]);

//   const onSubmit = (data) => {
//     updateMuseumDetails(data);
//     setTimeout(() => {
//       navigate("/owner");
//     }, 1000); // 1 second delay
//   };

//   const generateRandomPassword = () => {
//     const randomPassword = Math.random().toString(36).slice(-8);
//     setValue('password', randomPassword);
//   };

//   const museumUrl = `https://mensch-visitors.vercel.app/${museum?.name}`;

//   return (
//     <div className="container p-6 ">
//       <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Edit Museum Details</h1>

//       <a
//         href={museumUrl}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-blue-600 hover:text-blue-800 underline block text-center"
//       >
//         Visit your museum
//       </a>
//               {/* QR Code */}
              
//           <QRCodeGenerator url={museumUrl} fileName={museum?.name} />


//       <form onSubmit={handleSubmit(onSubmit)} className="p-6 rounded-lg shadow-lg">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Name */}
//           <div>
//             <label className="block text-lg font-medium text-gray-700">Museum Name</label>
//             <input
//               type="text"
//               {...register('name', { required: true })}
//               className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
//             />
//           </div>

//           {/* Address */}
//           <div>
//             <label className="block text-lg font-medium text-gray-700">Address</label>
//             <input
//               type="text"
//               {...register('address', { required: true })}
//               className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
//             />
//           </div>

//           {/* City */}
//           <div>
//             <label className="block text-lg font-medium text-gray-700">City</label>
//             <input
//               type="text"
//               {...register('city', { required: true })}
//               className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
//             />
//           </div>

//           {/* State */}
//           <div>
//             <label className="block text-lg font-medium text-gray-700">State</label>
//             <input
//               type="text"
//               {...register('state', { required: true })}
//               className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
//             />
//           </div>

//           {/* Zipcode */}
//           <div>
//             <label className="block text-lg font-medium text-gray-700">Zipcode</label>
//             <input
//               type="text"
//               {...register('zipcode', { required: true })}
//               className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
//             />
//           </div>

//           {/* Phone Number */}
//           <div>
//             <label className="block text-lg font-medium text-gray-700">Phone Number</label>
//             <input
//               type="text"
//               {...register('phoneNumber', { required: true })}
//               className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-lg font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               {...register('email', { required: true })}
//               className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
//             />
//           </div>
//         </div>

//         {/* Image URL and Preview */}
//         <div className="mb-6">
//           <label className="block text-lg font-medium text-gray-700">Image URL</label>
//           <div className="flex items-center space-x-4 mt-2">
//             <input
//               type="text"
//               {...register('imageUrl')}
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
//             />
//             {imageUrl && (
//               <img
//                 src={imageUrl}
//                 alt="Current Image"
//                 className="w-20 h-20 object-cover rounded-md shadow-lg"
//               />
//             )}
//           </div>
//         </div>

//         {/* Password and Generate Button */}
//         <div className="mb-6">
//           <label className="block text-lg font-medium text-gray-700">Password</label>
//           <div className="flex items-center space-x-4 mt-2">
//             <input
//               type="text"
//               {...register('password')}
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
//             />
//             <button
//               type="button"
//               onClick={generateRandomPassword}
//               className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow-md"
//             >
//               Generate Password
//             </button>
//           </div>
//         </div>

//         {/* Form Confirm Button */}
//         <FormConfirmButton
//           onSubmit={handleSubmit(onSubmit)}
//           buttonText="Save Changes"
//           dialogMessage="Are you sure you want to save these changes?"
//         />

//       </form>
//     </div>
//   );
// };

// export default MuseumOwnerEditDetails;
// src/components/MuseumOwnerEditDetails.js

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMuseumContext } from '../../contexts/MuseumContext';
import { useThemeMode } from '../../contexts/DarkModeContext'; // Import Theme Context
import FormConfirmButton from '../common/FormConfirmButton';
import { useNavigate } from 'react-router-dom';
import QRCodeGenerator from './QRCodeGenerator';

const MuseumOwnerEditDetails = () => {
  const { museum, updateMuseumDetails } = useMuseumContext();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const imageUrl = watch('imageUrl', museum?.imageUrl || '');
  const { isDarkMode } = useThemeMode(); // Destructure isDarkMode

  useEffect(() => {
    if (museum) {
      for (const key in museum) {
        setValue(key, museum[key]);
      }
    }
  }, [museum, setValue]);

  const onSubmit = (data) => {
    updateMuseumDetails(data);
    setTimeout(() => {
      navigate("/owner");
    }, 1000); // 1 second delay
  };

  const generateRandomPassword = () => {
    const randomPassword = Math.random().toString(36).slice(-8);
    setValue('password', randomPassword);
  };

  const museumUrl = `https://mensch-visitors.vercel.app/${encodeURIComponent(museum?.name)}`;

  return (
    <div>
      <div>
        <h1
          className={`text-4xl font-extrabold mb-8 text-center ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Edit Museum Details
        </h1>

        <a
          href={museumUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${
            isDarkMode
              ? "text-blue-400 hover:text-blue-500 underline block text-center mb-4"
              : "text-blue-600 hover:text-blue-800 underline block text-center mb-4"
          }`}
        >
          Visit your museum
        </a>

        {/* QR Code */}
        <div className="flex justify-center mb-8">
          <QRCodeGenerator url={museumUrl} fileName={museum?.name} />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`p-6 rounded-lg shadow-lg ${
            isDarkMode ? "bg-gray-800" : "bg-gray-200"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label
                className={`block text-lg font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
                htmlFor="name"
              >
                Museum Name
              </label>
              <input
                type="text"
                {...register('name', { required: true })}
                defaultValue={museum?.name}
                readOnly
                className={`mt-2 w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
                    : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  This field is required
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label
                className={`block text-lg font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
                htmlFor="address"
              >
                Address
              </label>
              <input
                type="text"
                {...register('address', { required: true })}
                defaultValue={museum?.address}
                readOnly
                className={`mt-2 w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
                    : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  This field is required
                </p>
              )}
            </div>

            {/* City */}
            <div>
              <label
                className={`block text-lg font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
                htmlFor="city"
              >
                City
              </label>
              <input
                type="text"
                {...register('city', { required: true })}
                defaultValue={museum?.city}
                readOnly
                className={`mt-2 w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
                    : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
                }`}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">
                  This field is required
                </p>
              )}
            </div>

            {/* State */}
            <div>
              <label
                className={`block text-lg font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
                htmlFor="state"
              >
                State
              </label>
              <input
                type="text"
                {...register('state', { required: true })}
                defaultValue={museum?.state}
                readOnly
                className={`mt-2 w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
                    : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
                }`}
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">
                  This field is required
                </p>
              )}
            </div>

            {/* Zipcode */}
            <div>
              <label
                className={`block text-lg font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
                htmlFor="zipcode"
              >
                Zipcode
              </label>
              <input
                type="text"
                {...register('zipcode', { required: true })}
                defaultValue={museum?.zipcode}
                readOnly
                className={`mt-2 w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
                    : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
                }`}
              />
              {errors.zipcode && (
                <p className="text-red-500 text-sm mt-1">
                  This field is required
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label
                className={`block text-lg font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                type="text"
                {...register('phoneNumber', { required: true })}
                defaultValue={museum?.phoneNumber}
                readOnly
                className={`mt-2 w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
                    : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
                }`}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  This field is required
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                className={`block text-lg font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                {...register('email', { required: true })}
                defaultValue={museum?.email}
                readOnly
                className={`mt-2 w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
                    : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  This field is required
                </p>
              )}
            </div>
          </div>

          {/* Image URL and Preview */}
          <div className="mb-6">
            <label
              className={`block text-lg font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="imageUrl"
            >
              Image URL
            </label>
            <div className="flex items-center space-x-4 mt-2">
              <input
                type="text"
                {...register('imageUrl')}
                defaultValue={museum?.imageUrl}
                className={`w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
                    : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
                }`}
              />
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Current"
                  className="w-20 h-20 object-cover rounded-md shadow-lg"
                />
              )}
            </div>
            {errors.imageUrl && (
              <p className="text-red-500 text-sm mt-1">
                Invalid Image URL
              </p>
            )}
          </div>

          {/* Password and Generate Button */}
          <div className="mb-6">
            <label
              className={`block text-lg font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex items-center space-x-4 mt-2">
              <input
                type="text"
                {...register('password')}
                defaultValue={museum?.password}
                className={`w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-700 placeholder-gray-500 text-gray-200 focus:ring-blue-500"
                    : "border-gray-300 bg-white placeholder-gray-400 text-gray-900 focus:ring-blue-500"
                }`}
              />
              <button
                type="button"
                onClick={generateRandomPassword}
                className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow-md ${
                  isDarkMode ? "focus:ring-blue-500" : "focus:ring-blue-500"
                } focus:outline-none focus:ring-2 transition-colors duration-300`}
              >
                Generate Password
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                This field is required
              </p>
            )}
          </div>

          {/* Form Confirm Button */}
          <FormConfirmButton
            onSubmit={handleSubmit(onSubmit)}
            buttonText="Save Changes"
            dialogMessage="Are you sure you want to save these changes?"
            isDarkMode={isDarkMode} // Pass isDarkMode as a prop for styling
          />
        </form>
      </div>
    </div>
  );
};

export default MuseumOwnerEditDetails;
