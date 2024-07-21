import ExhibitCard from '../exhibitions/ExhibitCard'; // Adjust the path as needed
import useMuseumOwnerExhibitions from '../../hooks/useMuseumExhibitions';


const MuseumOwnerExhibitionsList = () => {
  const {exhibitions, loading}= useMuseumOwnerExhibitions();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Exhibitions</h1>
      <div className="flex flex-wrap -m-4">
        {exhibitions.map((exhibition) => (
          <ExhibitCard
            key={exhibition._id}
            name={exhibition.name}
            description={exhibition.description}
            imageUrl="https://via.placeholder.com/150" // Placeholder image URL; replace with actual image URL if available
            location={`${exhibition.museum.city}, ${exhibition.museum.state}`}
            artworks={exhibition.artworks.map((artwork) => artwork.title).join(', ')} // Assuming artworks is an array of objects with a title field
          />
        ))}
      </div>
    </div>
  );
};

export default MuseumOwnerExhibitionsList;
