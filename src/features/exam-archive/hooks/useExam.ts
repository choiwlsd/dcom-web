import { useEffect, useState } from "react";
import { getExam } from "../exam-archive.api";
import type { ExamArchiveType } from "../exam-archive.type";

export const useExam = () => {
    const [data, setData] = useState<ExamArchiveType[]>([]);

    useEffect(() => {
        getExam().then(setData);
    }, []);

    return { data };
};