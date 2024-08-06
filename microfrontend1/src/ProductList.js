import React from 'react';
import useStore from 'appShell/store';

const ProductList = () => {
  const products = useStore((state) => state.products);
  const addProduct = useStore((state) => state.addProduct);

  const handleAddProduct = () => {
    addProduct({ id: products.length + 1, name: `Product ${products.length + 1}` });
  };

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
      <button onClick={handleAddProduct}>Add product</button>
    </div>
  );
};

export default ProductList;
