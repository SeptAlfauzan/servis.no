class DummyData {
    static getData = async (lat, lng) => {
        const datas = [];

        for (let index = 0; index < 10; index++) {
            const el = {
                key: index,
                name: 'Random Place',
                address: `Jl. yang sesat ${index}`,
                star: Math.floor(Math.random() * 5),
                latitude: lat + (Math.random() * 0.001),
                longitude: lng + (Math.random() * 0.001),
            }
            datas.push(el);
        }

        return JSON.stringify(datas);
    }
}

module.exports = DummyData;