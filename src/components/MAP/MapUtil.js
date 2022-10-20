export const getMidPoint = (pickupCoord, destCoord) => {
    const rad2degr = (rad) => rad * 180 / Math.PI;
    const degr2rad = (degr) => degr * Math.PI / 180;

    let sumX = 0, sumY = 0, sumZ = 0;
    
    sumX = Math.cos(degr2rad(pickupCoord.lat-0)) * Math.cos(degr2rad(pickupCoord.lng-0));
    sumY = Math.cos(degr2rad(destCoord.lat-0)) * Math.cos(degr2rad(destCoord.lng-0));
    sumZ = Math.sin(degr2rad(pickupCoord.lat-0));

    var avgX = sumX / 2;
    var avgY = sumY / 2;
    var avgZ = sumZ / 2;

    var newLng = Math.atan2(avgY, avgX);
    var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
    var newLat = Math.atan2(avgZ, hyp);

    console.log(newLat, newLng);
    return {
        lat: rad2degr(newLat),
        lng: rad2degr(newLng)
    }
}