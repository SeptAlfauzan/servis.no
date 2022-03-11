class DummyData {
    static getData = async () => {
        const data =
            [
                {
                    name: "location 1",
                    coords: {
                        latitude: -7.9621281,
                        longitude: 112.6166501,
                    }
                },
                {
                    name: "location 2",
                    coords: {
                        latitude: -7.9621481,
                        longitude: 112.6166501,
                    }
                },
            ];
        return JSON.stringify(data);
    }
}

module.exports = DummyData;