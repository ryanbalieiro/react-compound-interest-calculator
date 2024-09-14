import React from 'react'
import {useCalculator} from "/src/hooks/calculator.js"

import InfoBlock from "/src/components/widgets/InfoBlock.jsx"
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons"
import {Alert} from "react-bootstrap"

const ExplanationBlock = () => {
    return (
        <InfoBlock title={`What is compound interest?`} faIcon={faQuestionCircle}>
            <div className={`text-4`}>
                <p>Compound interest is when the interest you earn, earns interest. It helps boost the growth of your money over time.</p>
                <p>The formula for calculating the final value of an investment that's compounded is:</p>

                <Alert className={`alert alert-light fw-bold text-center text-5`}>
                    Amount = P × ( 1 + r )<sup> t</sup>
                </Alert>

                <p>In this equation:</p>

                <ul>
                    <li><strong>P</strong> is the initial investment.</li>
                    <li><strong>r</strong> is the interest rate.</li>
                    <li><strong>t</strong> is the time the money stays invested.</li>
                </ul>
            </div>
        </InfoBlock>
    )
};

export default ExplanationBlock