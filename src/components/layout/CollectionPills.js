import { Link } from 'react-router-dom';
import '../../styles/components/collection-pills.css';

function CollectionPills() {
  const collections = [
    "Kinnari's Collection",
    "Shirley's Collection",
    "Zahrah's Collection",
    "NKD's Collection",
    "Edenia's Collection",
    "Jaspreet's Collection",
    "The Malkin Collection",
    "Anushka's Collection",
    "Vipul's Collection",
    "Saurabh's collection"
  ];

  return (
    <div className="pills-container">
      <div className="pills-wrapper">
        {collections.map((collection, index) => (
          <Link 
            key={index} 
            to={`/collection/${collection.toLowerCase().replace(/['s ]/g, '-')}`} 
            className="pill"
          >
            {collection}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CollectionPills;