import React from 'react';

const Flags = () => {
  return (
    <section className="max-w-container px-4 py-12 mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 lg:gap-6" style={{ padding: '0 20px' }}>
        {/* Row 1 */}
        <div className="flex justify-center items-center p-2">
          <img src="/assets/extras/English.png" alt="Flag 1" className="w-20 md:w-24 lg:w-28" style={{ border: 'none' }} />
        </div>
        <div className="flex justify-center items-center p-2">
          <img src="/assets/extras/Urdu.png" alt="Flag 2" className="w-20 md:w-24 lg:w-28" style={{ border: 'none' }} />
        </div>
        <div className="flex justify-center items-center p-2">
          <img src="/assets/extras/Hindi.png" alt="Flag 3" className="w-20 md:w-24 lg:w-28" style={{ border: 'none' }} />
        </div>
        <div className="flex justify-center items-center p-2">
          <img src="/assets/extras/Spanish.png" alt="Flag 4" className="w-20 md:w-24 lg:w-28" style={{ border: 'none' }} />
        </div>
        <div className="flex justify-center items-center p-2">
          <img src="/assets/extras/French.png" alt="Flag 5" className="w-20 md:w-24 lg:w-28" style={{ border: 'none' }} />
        </div>
        <div className="flex justify-center items-center p-2">
          <img src="/assets/extras/Arabic.png" alt="Flag 6" className="w-20 md:w-24 lg:w-28" style={{ border: 'none' }} />
        </div>
        
        {/* Row 2 */}
        <div className="flex justify-center items-center p-2">
          <img src="/assets/extras/Japanese.png" alt="Flag 7" className="w-20 md:w-24 lg:w-28" style={{ border: 'none' }} />
        </div>
        <div className="flex justify-center items-center p-2">
          <img src="/assets/extras/Russian.png" alt="Flag 8" className="w-20 md:w-24 lg:w-28" style={{ border: 'none' }} />
        </div>
        <div className="flex justify-center items-center p-2">
          <img src="/assets/extras/Indonesian.png" alt="Flag 9" className="w-20 md:w-24 lg:w-28" style={{ border: 'none' }} />
        </div>
        <div className="flex justify-center items-center p-2">
          <img src="/assets/extras/Bengali.png" alt="Flag 10" className="w-20 md:w-24 lg:w-28" style={{ border: 'none' }} />
        </div>
        <div className="flex justify-center items-center p-2">
          <img src="/assets/extras/Portuguese.png" alt="Flag 11" className="w-20 md:w-24 lg:w-28" style={{ border: 'none' }} />
        </div>
        <div className="flex justify-center items-center p-2">
          <img src="/assets/extras/German.png" alt="Flag 12" className="w-20 md:w-24 lg:w-28" style={{ border: 'none' }} />
        </div>
      </div>
    </section>
  );
}

export default Flags;
