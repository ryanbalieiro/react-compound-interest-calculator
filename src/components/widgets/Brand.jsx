import "./Brand.scss"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie } from '@fortawesome/free-solid-svg-icons'
import {useAssets} from "/src/hooks/assets.js"

function Brand() {
    const assets = useAssets()
    const leadLabelHtml = `Compound <span class="fw-bold">Interest</span>`

    return (
        <div className="brand">
            <img src={assets.getLogo()} alt="logo"/>

            <div className="brand-texts">
                <span className="lead-label" dangerouslySetInnerHTML={{__html: leadLabelHtml}}/>
                <span className="sub-label text-1">
                    Calculator
                    <FontAwesomeIcon icon={faChartPie} className="ms-1" />
                </span>
            </div>
        </div>
    )
}

export default Brand