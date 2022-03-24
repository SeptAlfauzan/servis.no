class OnboardData {
    constructor() {
        this.data = [
            {
                key: 0,
                image: require('./../../assets/illustrations/images0.png'),
                illustration: '',
                text: 'Tenete ergo quod si servitus quae natura liber, et aliena tua tunc impeditur. Dolebis, et turbabuntur, et invenietis, cum culpa tam dis hominibusque. Quod si tibi tantum sit propria et aliena quale sit, nemo unquam vel invitum'
            },
            {
                key: 1,
                image: require('./../../assets/illustrations/images1.png'),
                illustration: '',
                text: 'Quidam alii sunt, et non est in nostra potestate. Quae omnia in nostra sententia, pursuit, cupiditatem, aversatio, ex quibus in Verbo, quicquid non suis actibus nostris. Non sunt in nostra potestate corpore bona fama'
            },
            {
                key: 2,
                image: require('./../../assets/illustrations/images2.png'),
                illustration: '',
                text: 'Quidam alii sunt, et non est in nostra potestate. Quae omnia in nostra sententia, pursuit, cupiditatem, aversatio, ex quibus in Verbo, quicquid non suis actibus nostris. Non sunt in nostra potestate corpore bona fama'
            },
        ]
    }

    get = () => JSON.stringify(this.data);
}

module.exports = OnboardData;