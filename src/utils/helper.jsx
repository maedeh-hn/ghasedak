const status_code_text = (status_code) => {
    switch (status_code) {
        case 204:
            return 'حذف شد!';
        case 404:
            return 'یافت نشد!';
    }
}

export {status_code_text};