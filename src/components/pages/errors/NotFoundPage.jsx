import React from 'react'
import PageHeader from "/src/components/layout/PageHeader.jsx"
import PageSection from "/src/components/layout/PageSection.jsx"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircle, faChainBroken, faHome} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom"
import {Button} from "react-bootstrap"
import {useAssets} from "/src/hooks/assets.js"

const NotFoundPage = () => {
    const assets = useAssets()

    return (
        <div className={`not-found-page`}>
            <PageHeader title="Not found" subtitle="Error 404"/>

            <PageSection>
                <div className={`d-flex flex-column align-items-center justify-content-center`} style={{minHeight: '50vh'}}>
                    <div className="fa-stack display-3">
                        <FontAwesomeIcon icon={faCircle} className="fa-stack-2x text-primary" />
                        <FontAwesomeIcon icon={faChainBroken} className="fa-stack-1x fa-inverse" />
                    </div>

                    <div className={`d-block mt-4 pt-3 text-center`}>
                        <h5 className={`text-custom-subheading fw-bold`}>Sorry, this page isn't available.</h5>
                        <p className={`text-4`}>The link you followed may be broken, or you might not have permission to access it.</p>
                    </div>

                    <Link to={assets.resolvePath('/')}>
                        <Button className={`mt-4`}>
                            <FontAwesomeIcon icon={faHome} className={`me-2 text-5`}/>
                            Go back home
                        </Button>
                    </Link>
                </div>
            </PageSection>
        </div>
    )
};

export default NotFoundPage