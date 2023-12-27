import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"

export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0,
}, {
    id: '2',
    deliveryDays: 3,
    priceCents: 499,
}, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999,
}];

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((Option) => {
        if (Option.id === deliveryOptionId) {
            deliveryOption = Option;
        }
    })

    return deliveryOption;
}

function isweekend(date) {
    const dayOfWeek = date.format('dddd');
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}
export function calculateDeliveryDate(deliveryOption) {

    let Days = 0
    let deliveryDate = dayjs();

    while (Days < deliveryOption.deliveryDays) {
        deliveryDate = deliveryDate.add(1, 'day');

        if (!isweekend(deliveryDate)) {
            Days++;
        }
    }

    const dateString = deliveryDate.format('dddd, DD MMMM YYYY ');

    return dateString;
}