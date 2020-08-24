export class Status {
    id?: string;
    name?: string;
}

export const STATUS: Status[] = [
    { id: 'available', name: 'Available' },
    { id: 'on_sale', name: 'On Sale' },
    { id: 'restock', name: 'Restock' },
    { id: 'sold_out', name: 'Sold Out' },
    { id: 'coming_soon', name: 'Coming Soon' },
];
