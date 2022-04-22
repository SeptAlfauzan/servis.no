import axios from "axios";
import { API_URL } from 'react-native-dotenv';

class NotifToken {
    static insertToken = async (username, token) => {
        const response = await axios.post(`${API_URL}api/notif-token`, { username, token });
        return response;
    }
    static deleteToken = async (username, token) => {
        const response = await axios.delete(`${API_URL}api/notif-token?username=${username}&token=${token}`);
        return response;
    }
}

export default NotifToken;