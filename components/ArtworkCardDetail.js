import { useAtom } from 'jotai';
import React from 'react';
import { favouritesAtom } from '../store';
import { useState } from 'react';
import Link from 'next/link';
import { Button, Card } from 'react-bootstrap';
import useSWR from 'swr';
import Error from 'next/error';



export default function ArtworkCardDetail({objectID}) {
  const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null)
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(favouritesList.includes(objectID));

  function favouritesClicked(){
    if(showAdded){
      setFavouritesList(current => current.filter(fav => fav != objectID));
      setShowAdded(false);
    }else{
      setFavouritesList(current => [...current, objectID]);
      setShowAdded(true);
    }
  }

  return (
    <>
      {error && <Error statusCode={404} />}
      {data ? (
        <Card>
          {data.primaryImage ? <Card.Img variant="top" src={data.primaryImage} /> : null}
          <Card.Body>
            <Card.Title>
                {data.title ? data.title : "N/A"}
            </Card.Title>
            <Card.Text>
              <strong>Date: </strong> {data.objectDate ? data.objectDate : "N/A"}<br />
              <strong>Classification: </strong>{data.classification ? data.classification : "N/A"}<br />
              <strong>Medium: </strong>{data.medium ? data.medium : "N/A"}
              <br />
              <br />
              <strong>Artist: </strong>{data.artistDisplayName ? data.artistDisplayName : "N/A"}<br />
              <strong>Credit Line: </strong>{data.creditLine ? data.creditLine : "N/A"}<br />
              <strong>Dimensions: </strong>{data.dimensions ? data.dimensions : "N/A"}
            </Card.Text>
            <Button variant={showAdded ? "primary" : "outline-primary"} onClick={favouritesClicked}>{`+ Favourite ${showAdded ? '(added)' : ''}`}</Button>
          </Card.Body>
        </Card>
      ) : null}
    </>
  );
}