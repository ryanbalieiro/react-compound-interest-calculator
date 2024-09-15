import React from 'react'
import InfoBlock from "/src/components/widgets/InfoBlock.jsx"

const DescriptionBlock = () => {
    return (
        <InfoBlock title={null} paragraphs={[
            "This calculator is an open source project that is licensed under the <a href='https://opensource.org/licenses/MIT'>MIT license</a>. This allows you to do pretty much anything you want as long as you include the copyright in “all copies or substantial portions of the Software.” Attribution is not required (though very much appreciated)."
        ]}/>
    )
};

export default DescriptionBlock