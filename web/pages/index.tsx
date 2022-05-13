import Head from "next/head";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Mutual Aid Tracker</title>
      </Head>

      <main className="bg-teal-100">
        <h1 className="title">Welcome to Your Mutual Aid Tracker</h1>

        <p className="description">
          Your One stop tool for tracking aid requests
        </p>

        <div className="grid"></div>
      </main>

      <footer></footer>
    </div>
  );
}
