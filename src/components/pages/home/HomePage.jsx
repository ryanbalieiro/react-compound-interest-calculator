import React, {useRef, useState} from 'react'
import {useStore} from "/src/hooks/store.js"

import PageHeader from "/src/components/layout/PageHeader.jsx"
import PageSection from "/src/components/layout/PageSection.jsx"
import Calculator from "/src/components/calculator/Calculator.jsx"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons"

const HomePage = () => {
    const store = useStore()
    const _getInitialParams = () => {
        return store.getParams()
    }

    const _onCalculatorParamsChanged = (params) => {
        store.setParams(params)
    }

    return (
        <div className={`homepage`}>
            <PageHeader title={`Simulate Now`}
                        subtitle="Find out how your investment will grow over time:"/>

            <PageSection>
                <Calculator className={`mt-0 mt-lg-3`}
                        editable={true}
                        paramsBundle={_getInitialParams()}
                        onParamsChanged={_onCalculatorParamsChanged}/>

                <p className={`mt-2 text-3 text-muted`}>
                    <FontAwesomeIcon icon={faInfoCircle} className={`me-2`}/>
                    For the purpose of this calculation, we assume compounding occurs at the <b>end of each month</b>. If you enter an <b>annual return rate</b>, it will still compound <b>monthly</b>, but in a way that ensures the total compounding equals the given annual rate by the end of each year.
                </p>
            </PageSection>
        </div>
    )
};

export default HomePage