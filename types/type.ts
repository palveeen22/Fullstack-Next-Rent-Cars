type ListCars = {
	id: number;
	car_name: string;
	day_rate: number;
	month_rate: number;
    image: string;
    Orders: ListOrders
};


type ListOrders = {
    id: number;
	car_id: number;
    order_date: Date;
    pickup_date: Date;
    dropoff_date: Date;
    pickup_location: string;
    dropof_location: string;
    car : ListCars
};
