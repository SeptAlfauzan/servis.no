class DummyData {
    static getData = async (lat, lng) => {
        const datas = [];

        for (let index = 0; index < 10; index++) {
            const el = {
                key: index,
                latitude: lat + (Math.random() * 0.001),
                longitude: lng + (Math.random() * 0.001),
            }
            datas.push(el);
        }

        return JSON.stringify(datas);
    }
}

module.exports = DummyData;