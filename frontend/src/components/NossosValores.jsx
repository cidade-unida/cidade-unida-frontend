const NossosValores = () => {
    return (
      <div className="m-6">
        <h2 className="text-3xl font-bold tracking-tight text-azul-paleta sm:text-4xl mb-6">Nossos Valores</h2>
        
        {/* Card 1 */}
        <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden mb-5">
          <img 
            src="/src/assets/escudo-privacidade.jpg" 
            alt="Escudo que representa a confiança e a privacidade" 
            className="w-3/4 md:w-1/3 h-auto object-cover" 
            title="Fonte: gerado por Inteligência Artificial Canva em 27/08/2024." 
          />
          <div className="p-6 text-azul-paleta md:w-2/3">
            <h2 className="text-xl font-bold mb-4">Priorizamos a segurança das suas informações para garantir a sua confiança.</h2>
          </div>
        </div>
  
        {/* Card 2 */}
        <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden mb-5">
          <img 
            src="/src/assets/cidade-sustentavel.jpg" 
            alt="Elemento gráfico de cidade sustentável com várias árvores e paisagens naturais" 
            className="w-3/4 md:w-1/3 h-auto object-cover" 
            title="Fonte: gerado por Inteligência Artificial Canva em 27/08/2024." 
          />
          <div className="p-6 text-azul-paleta md:w-2/3">
            <h2 className="text-xl font-bold mb-4">Facilitamos denúncias de problemas ambientais para promover a proteção do nosso planeta.</h2>
          </div>
        </div>
  
        {/* Card 3 */}
        <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden mb-5">
          <img 
            src="/src/assets/acessibilidade.jpg" 
            alt="Elemento gráfico que simboliza a acessibilidade" 
            className="w-3/4 md:w-1/3 h-auto object-cover" 
            title="Fonte: gerado por Inteligência Artificial Canva em 27/08/2024." 
          />
          <div className="p-6 text-azul-paleta md:w-2/3">
            <h2 className="text-xl font-bold mb-4">Nosso site é acessível a todos, garantindo que todos possam participar e ajudar.</h2>
          </div>
        </div>
      </div>
    );
  };
  
  export default NossosValores;
  