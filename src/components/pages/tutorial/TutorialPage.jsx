import React from 'react'
import PageHeader from "/src/components/layout/PageHeader.jsx"
import PageSection from "/src/components/layout/PageSection.jsx"
import ExplanationBlock from "/src/components/pages/tutorial/partials/ExplanationBlock.jsx"
import HowToBlock from "/src/components/pages/tutorial/partials/HowToBlock.jsx"
import ExampleBlock from "/src/components/pages/tutorial/partials/ExampleBlock.jsx"

const TutorialPage = () => {
    return (
        <div className={`license-page`}>
            <PageHeader title="Instructions" subtitle="How to use the calculator"/>

            <PageSection>
                <ExplanationBlock/>
                <HowToBlock/>
                <ExampleBlock/>
            </PageSection>
        </div>
    )
};

export default TutorialPage