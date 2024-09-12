import { useMuseumContext, usePlanContext } from '../../contexts/MuseumContext';
import ArtworkForm from '../common/ArtworkForm';
import { useParams } from 'react-router-dom';
import GoBackButton from '../common/GoBackButton';

const MuseumOwnerCreateArtwork = () => {
  const { id } = useParams();
  const { createArtwork, exhibitions } = useMuseumContext();
  const { artworksLeft } = usePlanContext();

  const exhibition = exhibitions.find(exhibition => exhibition._id === id);

  const handleCreateArtwork = async (data) => {
    try {
      const response = await createArtwork(id, data);
      if (response) {
        alert('Artwork created successfully');
      }
    } catch (error) {
      console.error('There was an error creating the artwork!', error);
    }
  };

  // Check if there are artworks left to create for this specific exhibition
  const artworksLeftForExhibition = exhibition && (exhibition.maxArtworks - exhibition.artworks.length);

  if (artworksLeftForExhibition <= 0) {
    return <p>The exhibition is already full. No more artworks can be added.</p>;
  }

  return (
    <div>
      <ArtworkForm
        onSubmit={handleCreateArtwork}
        formType="create"
      />
            <div className="mt-6">
        <GoBackButton />
      </div>
    </div>
  );
};

export default MuseumOwnerCreateArtwork;
