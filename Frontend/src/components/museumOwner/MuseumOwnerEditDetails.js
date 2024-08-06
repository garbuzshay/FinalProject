
// import React, { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { useMuseumContext } from '../../contexts/MuseumContext';
// import FormConfirmButton from '../common/FormConfirmButton';
// import { useNavigate } from 'react-router-dom';

// const MuseumOwnerEditDetails = () => {
//   const { museum, updateMuseumDetails } = useMuseumContext();
//   const { register, handleSubmit, setValue } = useForm();
//   const navigate = useNavigate();

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

//   return (
//     <div className="container mx-auo p-4">
//       <h1 className="text-3xl font-bold mb-6">Edit Museum Details</h1>
//       <form onSubmit={handleSubmit(onSubmit)} >
//         <div>
//           <label className="block text-gray-700">Name</label>
//           <input
//             type="text"
//             {...register('name', { required: true })}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Address</label>
//           <input
//             type="text"
//             {...register('address', { required: true })}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">City</label>
//           <input
//             type="text"
//             {...register('city', { required: true })}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">State</label>
//           <input
//             type="text"
//             {...register('state', { required: true })}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Zipcode</label>
//           <input
//             type="text"
//             {...register('zipcode', { required: true })}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Phone Number</label>
//           <input
//             type="text"
//             {...register('phoneNumber', { required: true })}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Email</label>
//           <input
//             type="email"
//             {...register('email', { required: true })}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Image</label>
//           <input
//             type="imageUrl"
//             {...register('imageUrl', { required: true })}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Password</label>
//           <div className="flex">
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
//     </div>
//   );
// };

// export default MuseumOwnerEditDetails;

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMuseumContext } from '../../contexts/MuseumContext';
import FormConfirmButton from '../common/FormConfirmButton';
import { useNavigate } from 'react-router-dom';

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
    navigate(-1);
  };

  const generateRandomPassword = () => {
    const randomPassword = Math.random().toString(36).slice(-8);
    setValue('password', randomPassword);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Edit Museum Details</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            {...register('name', { required: true })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            {...register('address', { required: true })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">City</label>
          <input
            type="text"
            {...register('city', { required: true })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">State</label>
          <input
            type="text"
            {...register('state', { required: true })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Zipcode</label>
          <input
            type="text"
            {...register('zipcode', { required: true })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            {...register('phoneNumber', { required: true })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <div className="flex items-center">
            <input
              type="text"
              {...register('imageUrl')}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Current Image"
                className="ml-4 w-16 h-16 object-cover rounded-md shadow-sm"
              />
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <div className="flex items-center">
            <input
              type="text"
              {...register('password')}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
            <button
              type="button"
              onClick={generateRandomPassword}
              className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Generate Password
            </button>
          </div>
        </div>
        <FormConfirmButton
          onSubmit={handleSubmit(onSubmit)}
          buttonText="Save Changes"
          dialogMessage="Are you sure you want to save these changes?"
        />
      </form>
    </div>
  );
};

export default MuseumOwnerEditDetails;
