import React from 'react'
import InfoBlock from "/src/components/widgets/InfoBlock.jsx"
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons"

const HowToBlock = () => {
    const instructions = [
        'Type in how much you currently have saved.',
        'Select how much extra you’ll save and how often you’ll be adding that extra contribution.',
        'Enter your expected interest rate into the calculator.',
        'Decide on a timeline for your savings plan.',
        'Press <i>Calculate</i> to create the report.'
    ]

    return (
        <InfoBlock title={`How to calculate your estimated future savings?`} faIcon={faQuestionCircle}>
            <div className={`text-4`}>
                <p>Calculating compound interest for your finances is a breeze with this tool:</p>
                <ol>
                    {instructions.map((instruction, index) => (
                        <li className={`fw-bold`} key={index}>
                            <span className={`ms-1 fw-normal`} dangerouslySetInnerHTML={{__html:instruction}}/>
                        </li>
                    ))}
                </ol>

                <p>It's important to note that any results or calculations displayed on this tool are made available for information purposes only, and do not constitute financial or legal advice.</p>
            </div>
        </InfoBlock>
    )
};

export default HowToBlock