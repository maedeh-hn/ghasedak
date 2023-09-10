import {useEffect, useState} from "react";

const useTableData = (data) => {

    const [tableDate, setTableDate] = useState(data && data || []);

    useEffect(() => {
        setTableDate(data && data || [])
    }, [data])

    return [tableDate, setTableDate]
}

export default useTableData;