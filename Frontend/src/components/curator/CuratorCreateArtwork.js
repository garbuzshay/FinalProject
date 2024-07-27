import React from 'react';
import { useForm } from 'react-hook-form';
import ArtworksApi from '../../api/ArtworksApi';

const CuratorCreateArtwork = ({exhibitionId}) => {
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await ArtworksApi.createArtwork(exhibitionId,data);
      if (response) {
        alert('Artwork created successfully');
        reset();
      }
    } catch (error) {
      console.error('There was an error creating the artwork!', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create New Artwork</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? 'border-red-500' : ''}`}
            id="title"
            type="text"
            {...register('title', { required: true })}
          />
          {errors.title && <p className="text-red-500 text-xs italic">Please enter a title.</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.description ? 'border-red-500' : ''}`}
            id="description"
            {...register('description', { required: true })}
          ></textarea>
          {errors.description && <p className="text-red-500 text-xs italic">Please enter a description.</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="createdDateByArtist">
            Created Date by Artist
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.createdDateByArtist ? 'border-red-500' : ''}`}
            id="createdDateByArtist"
            type="date"
            {...register('createdDateByArtist', { required: true })}
          />
          {errors.createdDateByArtist && <p className="text-red-500 text-xs italic">Please enter the created date by the artist.</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="artist">
            Artist Name
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.artistId ? 'border-red-500' : ''}`}
            id="artist"
            type="text"
            {...register('artist', { required: true })}
          />
          {errors.artist && <p className="text-red-500 text-xs italic">Please enter the artist ID.</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
            Image URL
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.imageUrl ? 'border-red-500' : ''}`}
            id="imageUrl"
            type="text"
            {...register('imageUrl')}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Artwork
          </button>
        </div>
      </form>
    </div>
  );
};

export default CuratorCreateArtwork;
