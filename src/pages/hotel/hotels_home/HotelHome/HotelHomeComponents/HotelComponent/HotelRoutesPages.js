import { formatString } from "../../../../../../utils/strFormatter";

const nextDate = new Date();
nextDate.setDate(nextDate.getDate() + 1);
const nextMnth = nextDate.getMonth()+1;
const checkInday = String(nextDate).split(" ")[2] +"-"+ (nextMnth < 10 ? "0"+nextMnth : nextMnth) +"-"+ nextDate.getFullYear();

nextDate.setDate(nextDate.getDate() + 1);
const nextMnthTwo = nextDate.getMonth()+1;
const checkOutday = String(nextDate).split(" ")[2] +"-"+ (nextMnthTwo < 10 ? "0"+nextMnthTwo : nextMnthTwo) +"-"+ nextDate.getFullYear();

const link = (data) => `https://www.expedia.com/${data.name.split(" ").join("-")}.h${data.id}.Hotel-Information?chkin=${checkInday}&chkout=${checkOutday}`

const hotelRoutesPages = {
    about: (data) => (
        <div className="hC__About">
            <div className="hCA__Content">
                <div className="hCA__Txt">
                    <span className="hCA__Small">Hotel Location</span>
                    <span className="hCA__Big">{data.address}</span>
                </div>
                <div className="hCA__Txt">
                    <span className="hCA__Small">Hotel dataues/Motto</span>
                    <span className="hCA__Big">{data.cacheWord}</span>
                </div>
                <div className="hCA__Txt">
                    <span className="hCA__Small">Hotel Star</span>
                    <div className="hCA__Star">
                        <svg width="0.8em" height="0.8em" viewBox="0 0 24 24" fill="none" color="contentSecondary">
                            <title>Star</title>
                            <path d="M12.458 1l3.646 7 7.813.5-5.73 5.5 2.084 8-7.813-4-7.812 4 2.083-8L1 8.5 8.813 8l3.645-7z" fill="currentColor">
                            </path>
                        </svg>
                        <span>{data.star} Stars</span>
                    </div>
                </div>
                <div className="hCA__Txt">
                    <span className="hCA__Small">Hotel Cost</span>
                    <span className="hCA__Big">{data.cost}</span>
                </div>
                <div className="hCA__Txt">
                    <span className="hCA__Small">Hotel Score By Guests</span>
                    <span className="hCA__Big">{data.score}</span>
                </div>
                <div className="hCA__Txt">
                    <span className="hCA__Small">Hotel Cordinates</span>
                    <span className="hCA__Big">
                        {data.coordinates.lat} ; {data.coordinates.lng}
                    </span>
                </div>
                <a href={link(data)} target="_blank" rel="noopener noreferrer" 
                className="expedia__Link">Book Room</a>
            </div>
        </div>
    ),
    features: (data) => (
        <div className="hC__Lists">
            <ul className="hCL__ul">
                {data.features.map((items, idx) => (
                    <ul key={`hclf-${idx}`} className="features__Ul">
                        <div className="features__Ul__Div">
                            <span>{items.header}</span>
                        </div>
                        {items.data.map((itemsData, indx) => (
                            <ul key={`itD-${indx}`} className="FUL">
                                <div className="FUL__header">{itemsData.title}</div>
                                {itemsData.items.map((item, index) => (
                                    <li key={`hclfi-${index}`}>
                                        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                                            <title>Circle small</title>
                                            <path fillRule="evenodd" clipRule="evenodd" 
                                            d="M12 14a2 2 0 100-4 2 2 0 000 4zm5-2a5 5 0 11-10 0 5 5 0 0110 0z" 
                                            fill="currentColor">
                                            </path>
                                        </svg>
                                        <span>{item||""}</span>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </ul>
                ))}
            </ul>
        </div>
    ),
    policies: (data, address) => (
        <div className="hC__Lists">
            <ul className="hCL__ul">
                {data.policies.map((items, idx) => (
                    <ul key={`hclf-${idx}`}>
                        <div className="hC__Ul__div">
                            <span>{items.title}</span>
                        </div>
                        {items.items.map((item, indx) => (
                            <li key={`hclfi-${indx}`}>

                                <span>{item ? formatString(item) : ""}</span>
                            </li>
                        ))}
                    </ul>
                ))}
            </ul>
        </div>
    )
}

export default hotelRoutesPages;