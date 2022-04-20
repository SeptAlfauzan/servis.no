import AsyncStorage from '@react-native-async-storage/async-storage';
class AccountCheck {
    static async isPatner() {
        const patner = await AsyncStorage.getItem('@is-patner');
        if (patner) return true;
        return false;
    }
}

export default AccountCheck;