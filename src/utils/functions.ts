import moment from 'jalali-moment';


export const toPersianNumber = (value: string) => {
    if (!value.toString()) return ""
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    return value
        .toString()
        // @ts-ignore
        .replace(/\d/g, x => farsiDigits[x]);
}


const convertToJalali = (value: any) => {
    try {
        let date = moment(value, 'YYYY-MM-DDTHH:mm:ss').locale('fa').format('YYYY/MM/DD');
        return {
            year: parseInt(date.split('/')[0]),
            month: parseInt(date.split('/')[1]),
            day: parseInt(date.split('/')[2]),
        };
    } catch (e) {
        return null;
    }
};

const convertToMiladi = (value: any) => {
    try {
        let date = moment.from(`${value.year}/${value.month}/${value.day}`, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');
        return {
            year: parseInt(date.split('/')[0]),
            month: parseInt(date.split('/')[1]),
            day: parseInt(date.split('/')[2]),
        };
    } catch (e) {
        return null;
    }
};

function numberWithCommas(x: any) {
    try {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } catch (e) {
        return '';
    }
}

const numberWithCommasPersian = (x:any) => {
    try {
        if (x.toString().startsWith('-')) {
            const a = x.toString().replaceAll('-', '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return toPersianNumber(`-${a}`);
        }
        return toPersianNumber(x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));

    } catch (e) {
        return '';
    }
};
export const tomanPrice = (x: any) => {
    try {
        let value = parseInt(x)
        return (Math.trunc(value / 10));
    } catch (e) {
        return 0;
    }
};

const convertToJalaliString = (value: any) => {
    try {
        let date = moment(value, 'YYYY-MM-DDTHH:mm:ss').locale('fa').format('YYYY/MM/DD');
        return `${parseInt(date.split('/')[0])}/${parseInt(date.split('/')[1])}/${parseInt(date.split('/')[2])}`;
    } catch (e) {
        return '';
    }
};

function bytesToSize(bytes: any) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))));
    if (i == 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};

const generateQueryString = (arr: any) => {
    let query = '?'
    Object.keys(arr).map(key => {
        if (arr[key]) {
            query += `${key}=${arr[key]}&`
        }
    })
    return query
}

const sort_by_number_value = (arr: any, key: any) => {
    return arr.sort(function (a: { [x: string]: number; }, b: { [x: string]: number; }) {
        return a[key] - b[key];
    });
}
const ListGeneratorFromEnum = (arr:any) => {
    const newArr:any = [];
    Object.keys(arr).map((item) =>
        newArr.push({
            id: Number(item),
            title: arr[item],
        })
    );
    return newArr;
};

export {
    numberWithCommas,
    convertToJalali,
    convertToMiladi,
    convertToJalaliString,
    bytesToSize,
    generateQueryString,
    sort_by_number_value,
    numberWithCommasPersian,
    ListGeneratorFromEnum
};
