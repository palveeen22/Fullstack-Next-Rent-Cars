import Link from "next/link";
import Animation from "./components/Animation";

export default function Home() {
	return (
		<section className="paddingX paddingYShorter">
			<div className="flex flex-col text-center gap-8">
				<h3>Explore New World</h3>
				<p>
					Discover a revolutionary approach to simplify your travels and
					effortlessly share your car for journeys.
				</p>
				<Link href={"/list-cars"}>
					<button className="bg-[#ffcd3c] text-[#fff] m-2 w-[40%] mx-auto rounded-xl py-3">
						Get Started
					</button>
				</Link>
				<Animation />
			</div>
		</section>
	);
}
