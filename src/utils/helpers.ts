export const countErrors = (actual: string, expected: string) => {
    const expectedChars = expected.split("")

    return expectedChars.reduce((errors, expectedChar, i) => {
        const actualChar = actual[i]
        if (actualChar !== expectedChar) {
            errors++;
        }
        return errors;
    
    }, 0);    
}

export const calculateAccuracyPercentage = (errors:number, total:number) => {
    if (total > 0) {
        const corrects = total - errors;
        return (corrects / total) * 100;
    }
    return 0
} 

export const calculateWPM = (totalChars: number, timeElapsedSeconds:number) => {
    if (totalChars === 0) return 0;

    const timeMiutes = timeElapsedSeconds / 60;
    const grossWPM = (totalChars / 5) / timeMiutes

    return Math.round(grossWPM);
}


