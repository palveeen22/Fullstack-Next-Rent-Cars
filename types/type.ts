type ListCars = {
	id: number;
	car_name: string;
	day_rate: number;
	month_rate: number;
    image: string;
};

type inputCar = {
	car_name: string;
		day_rate: number;
		month_rate: number;
		image: string;
};

type inputOrder = {
	pickup_date: string;
	dropoff_date: string;
	pickup_location: string;
	dropoff_location: string;
	carsId: number;
};

type inputOrderEdit = {
	pickup_date: string;
	dropoff_date: string;
	pickup_location: string;
	dropoff_location: string;
};

type ListCarsDetails = {
	id: number;
	car_name: string;
	day_rate: number;
	month_rate: number;
    image: string;
    Orders: ListOrders[]
};


type ListOrders = {
    id: number;
	car_id: number;
    order_date: string;
    pickup_date: string;
    dropoff_date: string;
    pickup_location: string;
    dropoff_location: string;
};

type ListOrdersDetails = {
    id: number;
	car_id: number;
    order_date: Date;
    pickup_date: Date;
    dropoff_date: Date;
    pickup_location: string;
    dropoff_location: string;
    car : ListCars
};

