import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";

function CollectionDetails() {
    const { collectionId } = useParams();
    const [currproducts, setCurrProducts] = useState([]);
    const [collection, setCollection] = useState(null);


    const fetchCollectionsById = async () => {
        try {
            const resp = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/collection/${collectionId}`)
            setCurrProducts(resp?.data?.products) //all products on current collection
            setCollection(resp?.data);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchCollectionsById()
    }, [collectionId]);

    return (
        <Container className="mt-4">
            <h1 className="mb-4">Collections By <span>{collection?.name}</span></h1>
            <Row>
                <h5>{currproducts?.length } Products</h5>
                {currproducts?.map(product => (
                    <Col key={product.id} md={4} sm={6} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={'https://freakins.com/cdn/shop/files/DSC08030_1411f6b1-7db5-484a-b5cc-25a8ee9480b2.jpg?v=1719254956&width=700'} alt={product.name} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>Price: ${product.price}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default CollectionDetails;
