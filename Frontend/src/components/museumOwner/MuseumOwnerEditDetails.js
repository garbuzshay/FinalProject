
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
//     navigate(-1);
//   };

//   const generateRandomPassword = () => {
//     const randomPassword = Math.random().toString(36).slice(-8);
//     setValue('password', randomPassword);
//   };

//   const museumUrl = `https://mensch-visitors.vercel.app/${museum?.name}`;
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Museum Details</h1>
//       <a
//           href={museumUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-blue-500 underline"
//         >
//           Click here to visit your museum
//         </a>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="my-4 ">
//           <label className="block text-gray-700">Name</label>
//           <input
//             type="text"
//             {...register('name', { required: true })}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Address</label>
//           <input
//             type="text"
//             {...register('address', { required: true })}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">City</label>
//           <input
//             type="text"
//             {...register('city', { required: true })}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">State</label>
//           <input
//             type="text"
//             {...register('state', { required: true })}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Zipcode</label>
//           <input
//             type="text"
//             {...register('zipcode', { required: true })}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Phone Number</label>
//           <input
//             type="text"
//             {...register('phoneNumber', { required: true })}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Email</label>
//           <input
//             type="email"
//             {...register('email', { required: true })}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Image</label>
//           <div className="flex items-center">
//             <input
//               type="text"
//               {...register('imageUrl')}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//             />
//             {imageUrl && (
//               <img
//                 src={imageUrl}
//                 alt="Current Image"
//                 className="ml-4 w-16 h-16 object-cover rounded-md shadow-sm"
//               />
//             )}
//           </div>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Password</label>
//           <div className="flex items-center">
//             <input
//               type="text"
//               {...register('password')}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//             />
//             <button
//               type="button"
//               onClick={generateRandomPassword}
//               className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Generate Password
//             </button>
//           </div>
//         </div>
//         <FormConfirmButton
//           onSubmit={handleSubmit(onSubmit)}
//           buttonText="Save Changes"
//           dialogMessage="Are you sure you want to save these changes?"
//         />
//       </form>

//       <div className="mb-4">
//         <div className="ml-4">
//           <QRCodeGenerator url={museumUrl} fileName={museum?.name} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MuseumOwnerEditDetails;
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMuseumContext } from '../../contexts/MuseumContext';
import FormConfirmButton from '../common/FormConfirmButton';
import { useNavigate } from 'react-router-dom';
import QRCodeGenerator from './QRCodeGenerator';

const MuseumOwnerEditDetails = () => {
  const { museum, updateMuseumDetails } = useMuseumContext();
  const { register, handleSubmit, setValue, watch } = useForm();
  const navigate = useNavigate();
  const imageUrl = watch('imageUrl', museum?.imageUrl || '');

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

  const museumUrl = `https://mensch-visitors.vercel.app/${museum?.name}`;

  return (
    <div className="container p-6 ">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Edit Museum Details</h1>

      <a
        href={museumUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline block text-center mb-6"
      >
        Visit your museum
      </a>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Museum Name</label>
            <input
              type="text"
              {...register('name', { required: true })}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Address</label>
            <input
              type="text"
              {...register('address', { required: true })}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-lg font-medium text-gray-700">City</label>
            <input
              type="text"
              {...register('city', { required: true })}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-lg font-medium text-gray-700">State</label>
            <input
              type="text"
              {...register('state', { required: true })}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            />
          </div>

          {/* Zipcode */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Zipcode</label>
            <input
              type="text"
              {...register('zipcode', { required: true })}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              {...register('phoneNumber', { required: true })}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            />
          </div>
        </div>

        {/* Image URL and Preview */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">Image URL</label>
          <div className="flex items-center space-x-4 mt-2">
            <input
              type="text"
              {...register('imageUrl')}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Current Image"
                className="w-20 h-20 object-cover rounded-md shadow-lg"
              />
            )}
          </div>
        </div>

        {/* Password and Generate Button */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">Password</label>
          <div className="flex items-center space-x-4 mt-2">
            <input
              type="text"
              {...register('password')}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            />
            <button
              type="button"
              onClick={generateRandomPassword}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow-md"
            >
              Generate Password
            </button>
          </div>
        </div>

        {/* Form Confirm Button */}
        <FormConfirmButton
          onSubmit={handleSubmit(onSubmit)}
          buttonText="Save Changes"
          dialogMessage="Are you sure you want to save these changes?"
        />

        {/* QR Code */}
        <div className="mt-8">
          <QRCodeGenerator url={museumUrl} fileName={museum?.name} />
        </div>
      </form>
    </div>
  );
};

export default MuseumOwnerEditDetails;
