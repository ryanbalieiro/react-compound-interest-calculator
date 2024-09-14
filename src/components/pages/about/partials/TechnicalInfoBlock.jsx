import React from 'react'
import {useCalculator} from "/src/hooks/calculator.js"

import InfoBlock from "/src/components/widgets/InfoBlock.jsx"
import {faCode} from "@fortawesome/free-solid-svg-icons"

const TechnicalInfoBlock = () => {
    return (
        <InfoBlock title={`Technical Info`} faIcon={faCode}>
            <div className={`text-4`}>
                <p>This project was made possible using the following libraries and frameworks: </p>

                <ul>
                    <li>
                        <a href="https://reactjs.org/" target="_blank">React</a> – A popular JavaScript library for building UIs.
                    </li>
                    <li>
                        <a href="https://vitejs.dev/" target="_blank">Vite</a> – A fast and modern development build tool.
                    </li>
                    <li>
                        <a href="https://reactrouter.com/" target="_blank">React Router Dom</a> – A library for routing and navigation in React applications.
                    </li>
                    <li>
                        <a href="https://www.chartjs.org/" target="_blank">ChartJS</a> – A flexible JavaScript library for creating charts.
                    </li>
                    <li>
                        <a href="https://fontawesome.com/" target="_blank">FontAwesome</a> – A library of icons for web projects.
                    </li>
                    <li>
                        <a href="https://sass-lang.com/" target="_blank">Sass</a> – A CSS preprocessor for writing more maintainable styles.
                    </li>
                    <li>
                        <a href="https://getbootstrap.com/" target="_blank">Bootstrap 5</a> – A responsive CSS framework.
                    </li>
                </ul>
            </div>
        </InfoBlock>
    )
};

export default TechnicalInfoBlock