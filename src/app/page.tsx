'use client';

import Hero from './components/Hero';
import Nosotros from './components/Nosotros';
import Proyectos from './components/Proyectos';
import News from './components/News';
import Footer from './components/Footer';


export default function HomePage() {
  return (
    <main className='min-h-screen flex flex-col'>
      <Hero />
      <Nosotros />
      <Proyectos />
      <News />
      <Footer />
    </main>
  );
}
