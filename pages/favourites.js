import { useAtom } from "jotai";
import { Card, Row, Col } from "react-bootstrap";
import ArtworkCard from "../components/ArtworkCard";
import { favouritesAtom } from "../store";

export default function FavouritesPage() {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  
    return (
      <>
        {favouritesList.length > 0 ? (
        <Row className="gy-4">
        {favouritesList?.map((objID) => (
        <Col lg={3} key={objID}>
        <ArtworkCard objectID={objID} />
        </Col>))}
        </Row>) : (
        <Card>
        <Card.Body>
        <h4>Nothing Here</h4>Try adding some new artwork to the list.
        </Card.Body>
        </Card>
        )}
      </>
    );
  }
  