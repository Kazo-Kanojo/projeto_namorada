import { useState, useEffect, useRef, useMemo } from 'react'
import { Heart, Music, Play, Pause, SkipForward, Clock, Camera, ChevronLeft, Sparkles, MapPin } from 'lucide-react'

// --- CONFIGURAÇÕES DO CASAL ---
const DATA_INICIO_NAMORO = new Date("2025-02-16T00:00:00"); 

const PLAYLIST = [
  { title: "Nossa Música", url: "/musica1.mp3" }, 
  { title: "Obrigado por me esperar", url: "/musica2.mp3" },
  { title: "Te amo", url: "/musica3.mp3" }
];




const JORNADA = [
  {
    data: "O Início",
    titulo: "Onde tudo começou",
    descricao: "Nosso primeiro beijo, onde tudo começou. No dia em que você me mostrou ser incrível, com uma grande e divertida conversa na cadeira da piscina.",
    foto: "/primeiro_beijo.jpeg",
    icone: <Heart className="w-6 h-6 text-red-500" />
  },
  {
    data: "Duda Chas",
    titulo: "Dormir juntos",
    descricao: "Esse dia me marcou muito. Foi o dia em que mais ficamos de casal. Éramos o casal que menos daria certo, mas somos os únicos que sobrevivemos.",
    foto: "/casa_duda.jpeg",
    icone: <Heart className="w-6 h-6 text-blue-500" />
  },
  {
    data: "CP ou CPK",
    titulo: "Lugar especial",
    descricao: "Lugar onde mais saímos, lugar onde eu me apaixonei por você. Definitivamente um lugar especial para nós dois.",
    foto: "/foto_favorita.jpeg",
    icone: <Heart className="w-6 h-6 text-yellow-500" />
  },
  {
    data: "Niver Godoy",
    titulo: "Foto fofinha",
    descricao: "Essa foto tinha que estar aqui, amo ela e sei que você a ama também.",
    foto: "niver_gdy_fofinho.jpeg",
    icone: <Heart className="w-6 h-6 text-green-500" />
  },
  {
    data: "Casal",
    titulo: 'Primeiro "Date"',
    descricao: "Paixão de Cristo. Para mim é uma data especial, pois foi a primeira vez que saímos juntos como um casal, sem medo de sermos vistos.",
    foto: "primeira_saida_casal.jpeg",
    icone: <Heart className="w-6 h-6 text-cyan-500" />
  },
  {
    data: "Miguxos",
    titulo: "Primeiro? Não sei",
    descricao: "Não sei se foi o primeiro 'miguxos', mas tem que estar aqui. Foi muito especial para mim, pois foi algo que construímos onde não havia julgamentos, apenas pura diversão, alegria, respeito e gargalhadas.",
    foto: "miguxos.jpeg",
    icone: <Heart className="w-6 h-6 text-purple-500" />
  },
  {
    data: "😉😉🙄🙄",
    titulo: "Seu belo bíceps",
    descricao: "Mesmo não sendo maior que meu gigantesco bíceps, ainda assim o seu é grandinho.",
    foto: "seu_biceps_maior.jpeg",
    icone: <Heart className="w-6 h-6 text-fuchsia-500" />
  },
  {
    data: "Aldeia",
    titulo: "Casa Guadalupe",
    descricao: "Fotinha na casa da Valen Guadalupe. Amo essa foto, a gente tá muito bonito, e a diferença de altura é nítida.",
    foto: "lindos_aldeia.jpeg",
    icone: <Heart className="w-6 h-6 text-emerald-500" />
  },
  {
    data: "Miguxos",
    titulo: "Não superei",
    descricao: "Ainda não superei os miguxos, com certeza está no top 3 melhores resenhas.",
    foto: "miguxos_2.jpeg",
    icone: <Heart className="w-6 h-6 text-gray-500" />
  },
  {
    data: "Aniversário",
    titulo: "Melhor dia",
    descricao: "Um dia que pra mim foi muito especial, pois é o meu primeiro aniversário que você passa ao meu lado.",
    foto: "24_1.jpeg",
    icone: <Heart className="w-6 h-6 text-emerald-500" />
  },
];

// Componente de Chuva Otimizado para Mobile
const RainEffect = ({ images }) => {
  const particles = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${10 + Math.random() * 10}s`,
      size: Math.random() * (50 - 30) + 30, // Tamanho menor no mobile
      img: images[i % images.length].foto,
      type: i % 3 === 0 ? 'heart' : 'photo'
    }));
  }, [images]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute animate-fall opacity-15"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            top: '-100px'
          }}
        >
          {p.type === 'heart' ? (
            <Heart size={p.size / 1.5} className="text-pink-300 fill-pink-200" />
          ) : (
            <img 
              src={p.img} 
              style={{ width: p.size, height: p.size }} 
              className="rounded-lg object-cover border border-white shadow-sm"
              alt=""
            />
          )}
        </div>
      ))}
    </div>
  );
};

function App() {
  const [tempoJuntos, setTempoJuntos] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(new Audio(PLAYLIST[0].url));
  const [noButtonPos, setNoButtonPos] = useState({ top: 'auto', left: 'auto', position: 'relative' });
  const [aceitou, setAceitou] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const agora = new Date();
      const diferenca = agora - DATA_INICIO_NAMORO;
      setTempoJuntos({
        dias: Math.floor(diferenca / (1000 * 60 * 60 * 24)),
        horas: Math.floor((diferenca / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((diferenca / 1000 / 60) % 60),
        segundos: Math.floor((diferenca / 1000) % 60)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const togglePlay = () => {
    if(isPlaying) {
        audioRef.current.pause();
    } else {
        audioRef.current.play().catch(e => console.log("Interação necessária"));
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setIsPlaying(false);
    setCurrentSongIndex((prev) => (prev + 1) % PLAYLIST.length);
    setTimeout(() => {
        audioRef.current.src = PLAYLIST[(currentSongIndex + 1) % PLAYLIST.length].url;
        audioRef.current.play();
        setIsPlaying(true);
    }, 100);
  };

  const fogeBotao = (e) => {
    // Cálculo seguro para mobile (evita sair da tela)
    const buttonWidth = 100;
    const buttonHeight = 50;
    const maxWidth = window.innerWidth - buttonWidth - 20;
    const maxHeight = window.innerHeight - buttonHeight - 20;
    
    const x = Math.max(20, Math.random() * maxWidth); 
    const y = Math.max(20, Math.random() * maxHeight);
    
    setNoButtonPos({ position: 'fixed', top: `${y}px`, left: `${x}px`, zIndex: 50 });
  };

  if (aceitou) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 text-center p-4 animate-in fade-in duration-700">
        <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-6 animate-bounce">PARA SEMPRE NÓS! ❤️</h1>
        <p className="text-stone-600 mb-8 max-w-md">Prometo te fazer a mulher mais feliz desse mundo.</p>
        <div className="relative">
          <img src="/foto_favorita.jpeg" className="w-64 h-64 md:w-96 md:h-96 object-cover rounded-full border-8 border-white shadow-2xl" />
          <Sparkles className="absolute -top-4 -right-4 text-yellow-400 animate-pulse" size={40} />
        </div>
        <button onClick={() => setAceitou(false)} className="mt-12 px-6 py-2 rounded-full bg-white shadow-md text-pink-500 flex items-center gap-2 hover:bg-pink-50 transition-colors">
          <ChevronLeft size={20} /> Rever nossa história
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffafa] text-stone-800 font-sans selection:bg-pink-100 overflow-x-hidden pb-24">
      
      {/* BARRA DE PROGRESSO */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-pink-50">
        <div 
          className="h-full bg-gradient-to-r from-red-400 to-pink-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <RainEffect images={JORNADA} />

      {/* HERO SECTION */}
      <header className="relative min-h-[90vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="z-10 space-y-6">
          <div className="relative inline-block group">
            <div className="absolute -inset-2 bg-pink-300 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <img 
              src="/foto_favorita.jpeg" 
              className="relative w-48 h-48 md:w-72 md:h-72 rounded-full object-cover border-4 border-white shadow-2xl transition-transform duration-500 hover:scale-105" 
            />
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600 px-2 leading-tight">
            Sofia Munhoz
          </h1>
          <p className="text-base md:text-2xl text-stone-500 font-light italic max-w-xs md:max-w-2xl mx-auto">
            "Cada segundo com você é um presente que eu guardo no peito."
          </p>
          <div className="pt-8 animate-bounce text-pink-300">
            <ChevronLeft className="-rotate-90 mx-auto" size={30} />
          </div>
        </div>
      </header>

      {/* CONTADOR - Grid Responsivo (2x2 Mobile, 4x1 Desktop) */}
      <section className="py-8 px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md p-6 rounded-[2rem] shadow-lg border border-pink-50">
          <h2 className="text-center text-xs font-bold uppercase tracking-widest text-pink-400 mb-6">Tempo juntos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(tempoJuntos).map(([unit, value]) => (
              <div key={unit} className="text-center bg-white p-3 rounded-xl shadow-sm border border-pink-50">
                <div className="text-2xl md:text-5xl font-bold text-red-500">{value}</div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-stone-400">{unit}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JORNADA - Layout Coluna Única (Mobile First) */}
      <section className="max-w-5xl mx-auto py-16 px-4 space-y-20 relative z-10">
        {JORNADA.map((item, index) => (
          // No mobile: sempre coluna. No desktop (md): alterna lados
          <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 md:gap-16`}>
            
            {/* Card da Foto */}
            <div className="w-full md:w-1/2 group">
              <div className="relative bg-white p-3 rounded-[2rem] shadow-xl transform transition duration-500 hover:scale-[1.02]">
                <div className="aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-stone-100">
                  <img 
                    src={item.foto} 
                    className="w-full h-full object-cover" 
                    alt={item.titulo}
                    loading="lazy"
                  />
                </div>
                <div className="absolute -top-3 -right-3 bg-white p-2 rounded-full shadow-lg border border-pink-50">
                  {item.icone}
                </div>
              </div>
            </div>

            {/* Textos */}
            <div className="w-full md:w-1/2 text-center md:text-left space-y-3 px-2">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-2">
                <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {item.data}
                </span>
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-stone-800">{item.titulo}</h3>
              <p className="text-sm md:text-lg text-stone-500 leading-relaxed font-light">{item.descricao}</p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-pink-400 text-xs italic bg-pink-50/50 p-2 rounded-lg inline-flex">
                <MapPin size={14} /> <span>{item.detalhe}</span>
              </div>
            </div>

          </div>
        ))}
      </section>

      {/* O PEDIDO */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 relative z-10 bg-gradient-to-t from-pink-100 to-transparent">
        <div className="bg-white/90 backdrop-blur-xl p-8 md:p-16 rounded-[2.5rem] shadow-2xl text-center max-w-2xl w-full border-2 border-white mb-20">
          <Heart className="mx-auto mb-6 text-red-500 animate-pulse" size={50} />
          <h2 className="text-2xl md:text-5xl font-bold text-stone-800 mb-10 leading-snug">
            Sofia, aceita fazer de todos os meus dias os mais felizes?
          </h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full">
            <button 
              onClick={() => setAceitou(true)}
              className="w-full md:w-auto px-10 py-4 bg-red-500 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-red-600 hover:scale-105 transition-all active:scale-95"
            >
              SIM! ❤️
            </button>
            <button 
              onClick={fogeBotao}
              onMouseEnter={fogeBotao}
              style={{ position: noButtonPos.position, top: noButtonPos.top, left: noButtonPos.left, zIndex: noButtonPos.zIndex }}
              className="w-full md:w-auto px-10 py-4 bg-stone-200 text-stone-500 text-lg font-medium rounded-xl hover:bg-stone-300 transition-all"
            >
              Não...
            </button>
          </div>
        </div>
      </section>

      {/* PLAYER MOBILE/DESKTOP */}
      {/* Barra fixa no rodapé para mobile, flutuante para desktop */}
      <div className="fixed bottom-0 left-0 w-full md:w-auto md:bottom-6 md:right-6 z-[100]">
        <div className="bg-white/95 backdrop-blur-xl border-t md:border border-pink-100 p-3 md:rounded-full shadow-[0_-4px_20px_rgba(0,0,0,0.1)] flex items-center justify-between md:gap-4 px-6 md:px-4">
          
          <div className="flex items-center gap-3 overflow-hidden">
             <div className={`w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 ${isPlaying ? 'animate-spin-slow' : ''}`}>
                <Music size={18} className="text-pink-500" />
             </div>
             <div className="flex flex-col max-w-[150px]">
                <span className="text-xs font-bold text-stone-800 truncate">{PLAYLIST[currentSongIndex].title}</span>
                <span className="text-[10px] text-stone-400 uppercase tracking-widest">Nossa Playlist</span>
             </div>
          </div>

          <div className="flex items-center gap-3">
             <button onClick={togglePlay} className="w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded-full shadow-md active:scale-90 transition-transform">
               {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
             </button>
             <button onClick={nextSong} className="text-stone-400 hover:text-red-500 p-2">
               <SkipForward size={22} />
             </button>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.15; }
          90% { opacity: 0.15; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  )
}

export default App