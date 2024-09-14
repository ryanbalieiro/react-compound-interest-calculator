import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faChainBroken} from "@fortawesome/free-solid-svg-icons"
import CalculatorTabWrapper from "/src/components/calculator/tabs/CalculatorTabWrapper.jsx"

function CalculatorEmptyTab({visible, fixedHeight}) {
    return (
        <CalculatorTabWrapper visible={visible}>
            <div className={`tab-viewer-empty opacity-50 text-3 d-flex align-items-center justify-content-center text-center w-100`}
                 style={{height: fixedHeight || 'auto'}}>
                <div className={`content`}>
                    <FontAwesomeIcon icon={faChainBroken} className={`lead-4 mb-2`}/>
                    <h6 className={`d-block mt-2 text-custom-subheading`}>No data to display</h6>
                </div>
            </div>
        </CalculatorTabWrapper>
    )
}

export default CalculatorEmptyTab