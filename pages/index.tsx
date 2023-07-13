import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import Navbar from "@/components/navabar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieLIst";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import useInfoModalStore from "@/hooks/useInfoModalStore";


export async function getServerSideProps(context: NextPageContext){
  const session = await getSession(context);

  if (!session){
    return{
      redirect: {
        destination : '/auth',
        premanent: false,
      }
    }
  }

  return {
    props : {}
  }
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] }= useFavorites();
  const { isOpen, closeModal } = useInfoModalStore();
  

  return (
    <>
      <InfoModal visible={isOpen} onClose ={closeModal}/>
      <Navbar/>
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies}/>
        <MovieList title="My List" data={favorites}/>
      </div>
    </>
  )
}
