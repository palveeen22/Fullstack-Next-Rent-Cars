type Cars = {
	id: number;
	car_name: string;
	day_rate: number;
	month_rate: number;
	image: string;
};


type Orders = {
    id: number;
	car_id: number;
    order_date: Date;
    pickup_date: Date;
    dropoff_date: Date;
    pickup_location: string;
    dropof_location: string;
    car : Cars
};
