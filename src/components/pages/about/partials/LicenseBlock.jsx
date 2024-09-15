import React from 'react'
import InfoBlock from "/src/components/widgets/InfoBlock.jsx"
import {faNoteSticky} from "@fortawesome/free-solid-svg-icons"
import {Card} from "react-bootstrap"

const LicenseBlock = () => {
    return (
        <>
            <InfoBlock title={`License`} faIcon={faNoteSticky} paragraphs={[
                "Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:",
            ]}>
                <Card className={`p-3`}>
                    <p className={`text-2 text-muted m-0`}>
                        "THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE."
                    </p>
                </Card>
            </InfoBlock>

            <InfoBlock title={`Disclaimer Note`} faIcon={faNoteSticky} paragraphs={[
                "The work is made available to you in its current state, without any warranties, guarantees, or assurances of its performance or suitability for any specific purpose. This means that the work is provided \"as is,\" and you are advised to use it with a comprehensive understanding of its inherent characteristics and limitations. The absence of warranties implies that the author does not take on the responsibility of ensuring the work's error-free functioning, stability, or fitness for particular applications.",
                "It is important to emphasize that the principle of providing the work \"as is\" is not an attempt to undermine its value or quality. Rather, it underscores the reality that software and creative works can vary in terms of performance, compatibility, and outcomes due to the diverse environments and contexts in which they are used. While the author has undoubtedly put effort into crafting a functional and reliable tool, the inherent complexities of technology and the diversity of user scenarios can influence the work's behavior in unpredictable ways."
            ]}/>
        </>
    )
};

export default LicenseBlock