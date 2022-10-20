import axios from "axios";
import image from "../../imgs/UberX.png";

const starCost = [
    "",
    "to least averagely be 20 USD or higher per night, could be massively higher in some location",
    "to least averagely be 50 USD or higher per night, could be massively higher in some location",
    "to least averagely be 70 USD or higher per night, could be massively higher in some location",
    "to least averagely be 100 USD or higher per night, could be massively higher in some location",
    "to least averagely be 150 USD or higher per night, could be massively higher in some location",
    "to least averagely be 200 USD or higher per night, could be massively higher in some location",
    "to least averagely be 500 USD or higher per night, could be massively higher in some location",
]

const date = new Date();

export const fetchPlacesSuggestions = async (input, key) => {
    const options = {
        method: 'GET',
        url: 'https://hotels4.p.rapidapi.com/locations/v3/search',
        params: {q: input, locale: 'en_US', langId: '10033'},
        headers: {
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
        }
    }

    const response = await axios.request(options);
    if(!response.data.sr) return null;
    const Data = response.data.sr.map(hotel => {
        const { coordinates, regionNames, gaiaId, cityId } = hotel;
        return {
            status: "success",
            cordinates: {
                lat: coordinates.lat,
                lng: coordinates.long
            },
            id: gaiaId||cityId,
            primaryAddress: regionNames.primaryDisplayName,
            secondaryAddress: regionNames.secondaryDisplayName,
            address: regionNames.fullName,
            neighbourhood: regionNames.secondaryDisplayName.split(",")[0]
        }
    });

    return Data;
}

export const fetchHotelSuggestions = async (id, neighbourhood, key) => {

    if(!id) return {
        error: true,
        message: "No Id Indicated"
    };

    const date = new Date();
    const day = Number(String(date).split(" ")[2]);
    const month = date.getMonth()+1;
    const year = date.getFullYear();

    const options = {
        method: "POST",
        url: 'https://hotels4.p.rapidapi.com/properties/v2/list',
        headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
        },
        data: {
            "currency": "USD",
            "locale": "en_US",
            "destination": {
                "regionId": String(id),
            },
            "checkInDate":{
                "day": day,
                "month": month,
                "year": year
            },
            "checkOutDate": {
                "day": day,
                "month": month,
                "year": year
            },
            "rooms": [
                {
                    "adults": 2,
                    "children": [
                        {"age": 5},{"age": 7}
                    ]
                }
            ],
            "resultsStartingIndex": 0,
            "resultsSize": 100,
            "sort":"PRICE_LOW_TO_HIGH",
            "filters": {
                "price": {
                    "max": 200,
                    "min": 100
                }
            }
        }
    }

    const response = await axios.request(options);
    if(!response.data.data) return null;
    const { properties } = response.data.data.propertySearch;
    const Data = properties.map(data => {
        const { 
            name, 
            availability, 
            propertyImage, 
            destinationInfo,
            offerSummary,
            price,
            reviews,
            id,
            neighborhood,
        } = data;
        const { distanceFromDestination } = destinationInfo;
        return {
            hotelName: name,
            neighbourhood: neighborhood?.name||neighbourhood,
            id: id,
            availableRooms: availability.available ? availability.minRoomsLeft : "no",
            image: propertyImage.image?.url,
            distanceFromSearch: distanceFromDestination?(distanceFromDestination.value + distanceFromDestination.unit):null,
            offers: offerSummary.messages.map(offer => offer?.message),
            price: price.options[0].formattedDisplayPrice,
            reviews: `${reviews.score} rating from ${reviews.total} guests` 
        }
    });

    return Data;
}


export const fetchHotelDetails = async (hotelId, key) => {

    if(!hotelId) return {
        status: "failed",
        message: "No Hotel Id generated"
    };


    const options = {
        method: 'POST',
        url: 'https://hotels4.p.rapidapi.com/properties/v2/detail',
        headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Credentials': true,
            withCredentials: true
        },
        data: {
            "currency": "USD",
            "propertyId": String(hotelId),
        }
    };

    
    const response = await axios.request(options);
    const { propertyGallery, summary, reviewInfo } = response.data.data.propertyInfo;
    const { 
        policies, overview, fees, 
        amenities, name, location, 
        tagline, telesalesPhoneNumber 
    } = summary;
    const len = location.address.addressLine.split(" ");
    const Data = {
        name: name,
        //3 star hotel with ... => cacheWord
        cacheWord: tagline,
        id: hotelId,
        phoneNumber: `${telesalesPhoneNumber||"Not Specified."}`,
        address: location.address.addressLine,
        fullAddress: location.address.addressLine,
        primaryAddress: location.address.addressLine.split(".")[0],
        secondaryAddress: location.address.addressLine.split(".")[1] || len[len.length-1],
        coordinates: {
            lat: location.coordinates.latitude,
            lng: location.coordinates.longitude
        },
        img: propertyGallery?.images[0].image?.url,
        star: overview.propertyRating.rating,
        cost: fees ? fees : `Fees Not Shown, you might need to visit the hotel yourself if you like it. But Hotels like this are Estimated ${starCost[overview.propertyRating.rating]}`,
        score: reviewInfo.summary?.overallScoreWithDescriptionA11y.value || `${overview.propertyRating.rating}/5`,
        features: amenities.amenities.slice(1, 3).map(sections => {
            return {
                header: sections.title,
                data: sections.contents.map(content => {
                    return {
                        title: content.header.text,
                        items: content.items.map(item => item?.text||""),
                    }
                })
            }
        }),
        policies: [
            {
                title: "Checkin Instructions",
                items: [
                    `Checkin Start ${policies.checkInStart||""}`,
                    `Checkin End ${policies.checkInEnd||""}`,
                    policies.childAndBed?.body ? [...policies.childAndBed.body] : [],
                    policies.checkinInstructions ? [...policies.checkinInstructions]:[],
                ],
            },
            {
                title: "Need To Know",
                items: [
                    policies.pets?.body ? [...policies.pets.body] : [],
                    policies.needToKnow ? [...policies.needToKnow.body] : [],
                ],
            },
            {
                title: "Payment Options",
                items: [...policies.paymentOptions],
            },
            {
                title: "Should Mention",
                items: policies.shouldMention?.body ? [...policies.shouldMention.body] : [],
            }
        ]
    }
    return Data;
}

export const fetchDummy = () => {
    
    return {
        name: "Goosepen Suites Victoria Island", 
        cacheWord: "Suburban aparthotel in Lagos with outdoor pool and 24-hour fitness  ↵", 
        phoneNumber: "Not Specified.", 
        address: "Plot 19 to 21 olaletan street, off Onigefon road, Lagos, Lagos, 101241",
        cordinates: {lat: 6.428868, lng: 3.455995},
        img: "https://images.trvl-media.com/hotels/33000000/32230000/32221800/32221765/7923bbaa.jpg?impolicy=resizecrop&rw=670&ra=fit",
        star: 3.5,
        cost: "Fees Not Shown, you might need to visit the hotel yourself if you like it. But Hotels like this are Estimated undefined",
        score: "9.0/10 Superb",
        policies: [
            {
                title: "Checkin Instructions",
                items: [
                    "Checkin Start undefined",
                    "Checkin End undefined",
                    ["No cribs (infant beds)"],
                    "Guests must contact the property in advance for check-in instructions; front desk staff will greet guests on arrival",
                    "To make arrangements for check-in please contact the property ahead of time using the information on the booking confirmation",
                    "If you are planning to arrive after 10:00 PM please contact the property in advance using the information on the booking confirmation",
                ]
            },
            {
                title: "Need To Know",
                items: [
                    ["Pets not allowed"],
                    ["<p>This property does not have elevators. </p><p>G…ty accepts debit cards. Cash is not accepted.</p>"],
                ]
            },
            {
                title: "Payment Options",
                items: []
            },
            {
                title: "Should Mention",
                items: ["This property does not have elevators"]
            }
        ]
    }
}

// const hotelName = val.name.split(" ").join("-");
// const region = val.location.address.city(" ");
// const newDate = new Date();
// const day = newDate.split(" ")[2], month=newDate.getMonth(), year=newDate.getFullYear();
// let date = `${year}-${month}-${day}`
// link=`https://www.expedia.com/${region}-Hotels-${hotelName}.h${hotelId}.Hotel-Information?chkin=${date}&chkout=${date}&r`