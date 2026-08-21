import React from 'react';

export default function ClientCloud() {
  const clients = [
    { name: 'Semarang Kota', img: '/Logo LJH.png', label: 'LJH Realty Logo', class: 'max-h-8 sm:max-h-9' },
    { name: '', img: '/Logo Platinum.png', label: 'Platinum Logo', class: 'max-h-8 sm:max-h-9' },
    { name: 'AMJD.Shoot', img: '/Logo AMJD.png', label: 'AMJD.SHOOT Logo', class: 'max-h-8 sm:max-h-9' },
    { name: '', img: '/Logo GANGLIOFID.png', label: 'GANGLIOFID Logo', class: 'max-h-5 sm:max-h-6' },
    { name: 'CKJ Management', img: '/Logo CKJ.png', label: 'CKJ MANAGEMENT Logo', class: 'max-h-8 sm:max-h-9' },
    { name: 'Photo Instax Semarang', img: '/Logo PHOTO INSTAX SEMARANG.png', label: 'PHOTO INSTAX SEMARANG Logo', class: 'max-h-8 sm:max-h-9' },
    { name: '', img: '/Logo PRASADA FUSHION.png', label: 'PRASADA FUSHION Logo', class: 'max-h-10 sm:max-h-12' },
    { name: '', img: '/Logo MEGACODIFY.png', label: 'MEGACODIFY Logo', class: 'max-h-7 sm:max-h-8' },
    { name: 'SchoolTech Indonesia', img: '/Logo SCHOOLTECHID.png', label: 'SCHOOLTECHID Logo', class: 'max-h-10 sm:max-h-11' },
    { name: '', img: '/Logo VIULA STUDIO.png', label: 'VIULA STUDIO Logo', class: 'max-h-10 sm:max-h-12' },
    { name: 'Gudha Pranahara Indonesia', img: '/Logo GUDHA PRANAHARA INDONESIA.png', label: 'GUDHA PRANAHARA INDONESIA Logo', class: 'max-h-8 sm:max-h-9' },
    { name: '', img: '/Logo INAGO DESIGN.png', label: 'INAGO DESIGN Logo', class: 'max-h-8 sm:max-h-9' },
    { name: '', img: '/Logo KOLAVIT.png', label: 'KOLAVIT Logo', class: 'max-h-10 sm:max-h-12' },
    { name: 'Custompedia Creative Group', img: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop&auto=format&q=80', label: 'Custompedia Logo', class: 'max-h-8 sm:max-h-9 rounded' },
    { name: 'Bank Jateng', img: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop&auto=format&q=80', label: 'Bank Jateng Logo', class: 'max-h-8 sm:max-h-9 rounded' },
    { name: 'Segel', img: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop&auto=format&q=80', label: 'Segel Logo', class: 'max-h-8 sm:max-h-9 rounded' },
    { name: 'SD Islam Almadinah', img: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop&auto=format&q=80', label: 'SD Islam Almadinah Logo', class: 'max-h-8 sm:max-h-9 rounded' },
  ];

  return (
    <section className="py-12 border-b border-zinc-900 bg-zinc-950/40 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h2 className="text-center text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          TRUSTED BY & COLLABORATED WITH
        </h2>
      </div>
      
      {/* Marquee Wrapper with fading edge gradients */}
      <div className="relative flex overflow-hidden group w-full">
        {/* Left and Right fade gradients */}
        <div className="absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none"></div>

        {/* Marquee Content */}
        <div className="flex w-max animate-marquee py-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-shrink-0 items-center justify-around gap-12 lg:gap-16 px-6 lg:px-8 w-max">
              {clients.map((client, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-zinc-900/20 px-4 py-2 rounded-xl transition-colors duration-300">
                  <img 
                    src={client.img} 
                    alt={client.label} 
                    className={`${client.class} object-contain filter grayscale opacity-45 hover:grayscale-0 hover:opacity-100 transition-all duration-300`} 
                  />
                  {client.name && (
                    <span className="text-sm font-bold text-zinc-400 whitespace-nowrap tracking-wide uppercase">
                      {client.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
