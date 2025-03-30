export const getTitle = (key: string) => {
    switch (key) {
        case 'status':
            return 'Наличие';
        case 'date_created':
            return 'Дата добавления';
        case 'name':
            return 'Модель';
        case 'brand':
            return 'Производитель';
        case 'price':
            return 'Цена';
        case 'color':
            return 'Цвет';
        case 'stock':
            return 'В наличии шт.';
        default:
            return key;
    }
};