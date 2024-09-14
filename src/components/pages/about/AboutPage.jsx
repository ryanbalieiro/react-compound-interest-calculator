import React from 'react'
import PageHeader from "/src/components/layout/PageHeader.jsx"
import PageSection from "/src/components/layout/PageSection.jsx"

import DescriptionBlock from "/src/components/pages/about/partials/DescriptionBlock.jsx"
import TechnicalInfoBlock from "/src/components/pages/about/partials/TechnicalInfoBlock.jsx"
import LicenseBlock from "/src/components/pages/about/partials/LicenseBlock.jsx"

const AboutPage = () => {
    return (
        <div className={`license-page`}>
            <PageHeader title="About" subtitle="Learn more about the project"/>

            <PageSection>
                <DescriptionBlock/>
                <TechnicalInfoBlock/>
                <LicenseBlock/>
            </PageSection>
        </div>
    )
};

export default AboutPage