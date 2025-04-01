import Image from "next/image"
import logo from "../../../public/assets/src/logo.png"
import menu from "../../../public/assets/src/menu_burger.svg"
import slider from "../../../public/assets/src/slider.jpg"
import user from "../../../public/assets/src/user.png"

<header class="p-8 w-full">
    <nav class="flex">
        <div class="mt-1 lg:hidden">

            <Image src={menu} alt="Icone d'un menu burger" class="cursor-pointer" />

            <div class=" hidden flex-col gap-4 pt-20 font-title font-medium absolute top-0 left-0 bg-neutral-grey-off p-6 rounded-lg shadow-md lg:hidden" id="menuBurger">

                <img class="w-8 cursor-pointer absolute top-4 right-4" id="closeIcon" src="./assets/src/close_icon.svg" alt="Icône de fermeture" />

                <a class="" href="account.php">Mon compte</a>
                <a href="">Blabla</a>
                <a href="">bip bip</a>
            </div>

        </div>

        <div class="px-4 w-[80%] mx-auto justify-center ">
            <div class="flex flex-row justify-between items-center">
                <a href="">
                    <Image src={slider} alt="Icone de barres de slides pour lister les catégories" />
                </a>

                <a href="homepage.php" class="">
                    <Image src={logo} alt="Logo de l'entreprise Bookmaker" class="h-10 lg:hidden" />
                </a>

                <a href="">
                    <p class=" text-primary-blue font-title text-xl font-bold pt-4 pb-4 pl-4">Hi, $user !</p>
                </a>
                <a href="">
                    <Image src={user} alt="Icone de login" />
                </a>

            </div>
        </div>
    </nav>

    <div class="flex flex-col items-center w-[80%] mx-auto justify-center">
        <h1 class="text-neutral-black font-title text-2xl font-semibold text-center pb-1 pt-3 tracking-[0.13em] ">BOOKMAKER</h1>
        <h2 class="text-neutral-black text-center text-xs font-semibold font-title tracking-[0.13em] pb-10">Le meilleur des livres d'occasion</h2>
    </div>
</header>