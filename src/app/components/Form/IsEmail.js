

/*
This function checks if an email address respects the writting standard
Example : xxxx@xxx.xx
*/
export function isEmail(email) {
        
        const indexOfAt = email.indexOf("@");
        const lastIndexOfDot = email.lastIndexOf(".");
        
        if (indexOfAt>0 && lastIndexOfDot>0 && (indexOfAt<lastIndexOfDot+1)) return true;
        else return false;
}