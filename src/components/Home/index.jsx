import React, { useState, useEffect, useRef } from 'react';

function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  
  const nameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();

  useEffect(() => {
    fetch("https://auth-rg69.onrender.com/api/products/all")
      .then(response => {
        if (!response.ok) {
          throw new Error('Serverdan notogri javob keldi');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          setProducts(data.data);
        } else {
          throw new Error(data.message || 'Mahsulotlarni olishda xatolik yuz berdi.');
        }
      })
      .catch(error => {
        setError(error.message || "Mahsulotlarni olishda xatolik yuz berdi.");
      });
  }, []);
  
  const handleCreateProduct = (e) => {
    e.preventDefault();
    setError('');
  
    const name = nameRef.current.value.trim();
    const description = descriptionRef.current.value.trim();
    const price = priceRef.current.value.trim();
    const image = imageRef.current.value.trim();
  
    if (!image) {
      setError('Rasm URL kiritish shart');
      return;
    }
  
    fetch("https://auth-rg69.onrender.com/api/products", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ name, description, price: Number(price), image }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Serverdan notogri javob keldi');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          setProducts(prevProducts => [data.data, ...prevProducts]); 
          nameRef.current.value = '';
          descriptionRef.current.value = '';
          priceRef.current.value = '';
          imageRef.current.value = '';
        } else {
          throw new Error(data.message || 'Mahsulot yaratishda xatolik yuz berdi.');
        }
      })
      .catch(error => {
        setError(error.message || "Tarmoq xatosi. Iltimos, qayta urinib ko'ring.");
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mahsulotlar</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <h2 className="text-xl font-bold mb-4">Yangi mahsulot yaratish</h2>
      <form onSubmit={handleCreateProduct} className="space-y-4 mb-8">
        <input
          type="text"
          ref={nameRef}
          placeholder="Mahsulot nomi"
          className="border p-2 w-full"
        />
        <input
          type="text"
          ref={descriptionRef}
          placeholder="Mahsulot ta'rifi"
          className="border p-2 w-full"
        />
        <input
          type="number"
          ref={priceRef}
          placeholder="Mahsulot narxi"
          className="border p-2 w-full"
        />
        <input
          type="text"
          ref={imageRef}
          placeholder="Rasm URL"
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Mahsulot yaratish
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-md">
              <div
                className="w-full h-48 bg-cover bg-center mb-4 rounded-md"
                style={{ backgroundImage: `url(${product.image})` }}
              ></div>
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-gray-700 font-bold">{product.price} UZS</p>
            </div>
          ))
        ) : (
          <p>Hozircha mahsulotlar mavjud emas.</p>
        )}
      </div>
    </div>
  );
}

export default Home;