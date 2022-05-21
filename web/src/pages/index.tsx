import Head from "next/head";
import Navbar from "../components/Navbar";
import RequestForm from "../components/RequestForm";
export default function Home() {
  return (
    <div className="container m-auto text-center content-evenly">
      <Head>
        <title>Mutual Aid Tracker</title>
        <Navbar />
      </Head>

      <main>
        <h1 className="title">Welcome to Your Mutual Aid Tracker</h1>

        <p className="description">
          Your one stop tool for tracking aid requests
        </p>

        <RequestForm />
      </main>

      <footer></footer>
    </div>
  );
}
