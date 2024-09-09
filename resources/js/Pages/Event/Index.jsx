import { Link, Head } from "@inertiajs/react";
import AppLink from "@/Components/AppLink";
import Nav from "@/Components/Nav";
import Card from "@/Components/Card";

export default function Index({events}) {
  return (
    <>
      <Nav />


      <section className="text-center flex flex-col gap-4 mb-5 pt-6">
            <h1 className=" text-4xl font-bold t">Where To?</h1>
            <form>
                <input type="text" placeholder="Maxo Cream..." className="rounded-xl bg-white/5 border-white/10 px-5 py-4 md:w-[40dvw] sm:w-full focus:border-red"></input>
            </form>
      </section>


      <section className="pt-6 px-4">
        <h2 className="font-bold text-3xl">Next week</h2>
        <div className="gap-y-8 grid lg:grid-cols-3 gap- mt-8">

        {events && events.map((event) => (
            <Card 
              key={event.id}
              event={event}
            />
          ))}

        </div>
      </section>

      <section className="pt-6">
        <h2 className="font-bold text-3xl">Plan Ahed</h2>
        <div className="flex flex-wrap gap-x-4 gap-y-4 mt-4">
          <Card size="small"/>
          <Card size="small"/>
          <Card size="small"/>
        </div>
      </section>

      <section className="pt-6">
        <h2 className="font-bold text-3xl">unimployed</h2>
        <div className="flex flex-wrap gap-x-4 gap-y-4 mt-4">
          <Card />
          <Card />
          <Card />
        </div>
      </section>
    </>
  );
}
