import { format } from "date-fns"

export const getFieldValue = (field: any, type: string) => {
    switch(type) {
        case 'date': 
            return getFormattedDate(field, 'dd.MM.yyyy')
        case 'float': 
            return field === undefined || field.value === '' ? '' : Number(field).toFixed(2)
        case 'int': 
            return field === undefined || field === '' ? '' : field
        case 'bool': 
            return field === undefined ? '' : field ? 'Да' : 'Нет'
        default:
            return  field || ''
    }
}

export const getFormattedDate = (date: string, formatStr: string) => {
    const regStr = new RegExp(/[A-za-z]/)
    if (date) {
        if (formatStr && formatStr !== 'undefined') {
            try {
                if (regStr.test(date)) {
                    const dateISO = new Date(date)
                    const timestamp = dateISO.getTime()
                    
                    return format(timestamp, formatStr)
                } else return format(Number(date), formatStr)
            } catch (error) {
                return 'Ошибка чтения записи'
            }
        } else return 'Неизвестный формат записи'
    } else return ''
}