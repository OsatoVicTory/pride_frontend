const indx = ["pickup", "hotel booking", "courier"];
const randType = () => {
    return indx[Math.floor(Math.random() * 3)];
}
const act = new Array(20).fill({}).map(val => ({
    from: "Iju Ishaga",
    to: "Oke-Aro Bustsop",
    when: "Wed, Feb 2, 2022",
    type: randType(),
    cost: "N20,000"
}));

export default act;