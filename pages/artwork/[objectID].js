import { useRouter} from "next/router"
import React, { useState } from "react";
import { Row, Col} from "react-bootstrap"
import ArtworkCardDetail from "../../components/ArtworkCardDetail"

function ObjectID(){
    const router = useRouter();
    const {objectID} = router.query;

    return(
    <>
    <Row>
    <Col>
    <ArtworkCardDetail objectID={objectID} />
    </Col>
    </Row>
    </>
    )
}
export default ObjectID