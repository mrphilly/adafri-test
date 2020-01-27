import { map, take, debounceTime } from 'rxjs/operators';
/* export function usernameValidator(auth: AuthService) {
   
  return (control: AbstractControl): { [key: string]: any } | null => {
  
      auth.getUsername(control.value).then(res => {
        console.log(res.length)
        if (res.length === 1) {
          return { unvaible: true }
        } else {
          return null
        }
      })
      return;
        
    }
  } */
export function usernameValidator(afs) {
    return (control) => {
        const username = control.value;
        console.log(username);
        return afs.collection('users', (ref) => ref.where('displayName', '==', username)).valueChanges().pipe(debounceTime(500), take(1), map(arr => arr.length ? { 'usernameAvailable': true } : null));
    };
}
export class FormValidators {
    static usernameValidator(auth) {
        return (control) => {
            auth.getUsername(control.value).then(res => {
                console.log(res.length);
                if (res.length === 1) {
                    return { unvaible: true };
                }
                else {
                    return null;
                }
            });
        };
    }
    static emailValidator(afs) {
        return (control) => {
            const email = control.value;
            return afs.collection('users', (ref) => ref.where('email', '==', email)).valueChanges().pipe(debounceTime(500), take(1), map(arr => arr.length ? { emailAvailable: true } : null));
        };
    }
    static traceCampaigneNameValidator(afs) {
        return (control) => {
            const name = control.value;
            return afs.collection('trace', (ref) => ref.where('name', '==', name)).valueChanges().pipe(debounceTime(500), take(1), map(arr => arr.length ? { nameAvailable: true } : null));
        };
    }
    static displayCampaignNameValidator(afs) {
        return (control) => {
            const name = control.value;
            return afs.collection('adwords-display', (ref) => ref.where('name', '==', name)).valueChanges().pipe(debounceTime(500), take(1), map(arr => arr.length ? { nameAvailable: true } : null));
        };
    }
    static youtubeCampaignNameValidator(afs) {
        return (control) => {
            const name = control.value;
            return afs.collection('youtube-ads', (ref) => ref.where('name', '==', name)).valueChanges().pipe(debounceTime(500), take(1), map(arr => arr.length ? { nameAvailable: true } : null));
        };
    }
    static validLandingPageUrlValidator(control) {
        if (!control.value.startsWith('https') || !control.value.startsWith('http') || !control.value.includes('.io') || !control.value.includes('.com') || !control.value.includes('.fr') || !control.value.includes('.sn') || !control.value.includes('.eu') || !control.value.includes('.en') || !control.value.includes('.co')) {
            return { validUrl: true };
        }
        return null;
    }
}
export function urlValidator(control) {
    var regexp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    if (regexp.test(control.value)) {
        return null;
    }
    else {
        return { urlValid: false };
    }
}
//# sourceMappingURL=form-validators.js.map