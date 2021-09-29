import { authenticationService } from '../services/authentication.service';

export function handleResponse(response: any) {
    console.log("WOW")
    return response.text().then((text: string) => {
        const data = text && JSON.parse(text);
        console.log(`DATA : ${JSON.stringify(data)}`)
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.logout();
                window.location.reload();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}