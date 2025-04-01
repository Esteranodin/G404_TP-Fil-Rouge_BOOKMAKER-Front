import Image from "next/image";

export default function Home() {
  return (
    <>
      <div id="title-header">
        <h1>BOOKMAKER</h1>
        <p>Le meilleur des livres d'occasion</p>
      </div>

      <Image
        alt="image du  logo"
        src="/img/logo.jpg"
        width={100}
        height={100}
      />
    </>
  );
}
