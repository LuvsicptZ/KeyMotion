import {faker} from "@faker-js/faker"
import {useCallback, useState} from "react"

const useWords = (count:number) => {
    const [words, setWords] = useState<string>(() => {
        return faker.word.words(count).toLowerCase();
    });

    const updateWords = useCallback(() => {
        setWords(faker.word.words(count).toLowerCase());
    }, [count]);

    return {words, updateWords}
}

export default useWords;
