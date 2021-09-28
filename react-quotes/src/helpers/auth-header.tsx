import { authenticationService } from '../services/authentication.service';

export function authHeader() {
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.accessToken) {
        return { Authorization: `Bearer ${currentUser.accessToken}` };
    } else {
        return {};
    }
}