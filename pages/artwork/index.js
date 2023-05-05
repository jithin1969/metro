import Error from "next/error";
import validObjectIDList from '../../public/data/validObjectIDList.json';
import {Row, Col, Pagination, Card, Button} from "react-bootstrap";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSWR from "swr";
import ArtworkCard from "../../components/ArtworkCard";

const PER_PAGE = 12;


export default function Home() {

  const [artWorkList, setArtworkList] = useState();
  const [page, setPage]= useState(1);

  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];

  const{data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  function nextPage() {
    if (page >= 1) setPage((prev) => prev + 1);
  }
  function previousPage() {
    if (page > 1) setPage((prev) => prev - 1);
  }


  useEffect(() => {
    
    if (data) {   
      let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x)); 
        var results = [];
        for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
          const chunk = filteredResults.slice(i, i + PER_PAGE);
          results.push(chunk);
          }
        setArtworkList(results);
    };
    setPage(1);  
}, [data]);

return(
<>
{error && <Error statusCode={400} />}             
{artWorkList && (                 
<Row className="gy-4">                    
{artWorkList.length > 0 ? (artWorkList[page - 1].map((currentObjectID) => {return <Col lg={3} key={currentObjectID}><ArtworkCard objectID={currentObjectID} /></Col>                        
}
)) : (                         
<Card><Card.Body> <h4>Nothing Here</h4><br />Try searching for something else</Card.Body></Card>                    
)}                 
</Row>            
)}             
{artWorkList?.length > 0 && (              
<Row>
  <Col>                        
  <Pagination>                            
    <Pagination.Prev onClick={previousPage} />                            
    <Pagination.Item>{page}</Pagination.Item>                            
    <Pagination.Next onClick={nextPage} />                        
    </Pagination>                    
    </Col>                
    </Row>            
    )}  

    {!artWorkList && (                 
      null)}         
      </>
)
}
