import React, { useState, useEffect } from 'react';
import './ProductAdmin.css';

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    product: '',
    activeSubstance: '',
    volume: '',
    stock: '',
    price: '',
    tableType: 'first',
    isActive: true
  });

  // Загрузка всех продуктов
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:1337/api/products');
      const data = await response.json();
      setProducts(data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Создание нового продукта
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:1337/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: newProduct }),
      });

      if (response.ok) {
        setNewProduct({
          product: '',
          activeSubstance: '',
          volume: '',
          stock: '',
          price: '',
          tableType: 'first',
          isActive: true
        });
        fetchProducts();
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  // Обновление продукта
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:1337/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: editingProduct.attributes }),
      });

      if (response.ok) {
        setEditingProduct(null);
        fetchProducts();
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Удаление продукта
  const handleDeleteProduct = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот продукт?')) {
      try {
        const response = await fetch(`http://localhost:1337/api/products/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchProducts();
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  // Начать редактирование
  const startEditing = (product) => {
    setEditingProduct(product);
  };

  // Отменить редактирование
  const cancelEditing = () => {
    setEditingProduct(null);
  };

  if (loading) {
    return <div className="admin-container">Загрузка...</div>;
  }

  return (
    <div className="admin-container">
      <h1>Управление продуктами</h1>

      {/* Форма создания нового продукта */}
      <div className="form-section">
        <h2>Добавить новый продукт</h2>
        <form onSubmit={handleCreateProduct} className="product-form">
          <div className="form-row">
            <input
              type="text"
              placeholder="Название продукта"
              value={newProduct.product}
              onChange={(e) => setNewProduct({...newProduct, product: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Активное вещество"
              value={newProduct.activeSubstance}
              onChange={(e) => setNewProduct({...newProduct, activeSubstance: e.target.value})}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              placeholder="Объем/Дозировка"
              value={newProduct.volume}
              onChange={(e) => setNewProduct({...newProduct, volume: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Наличие"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              placeholder="Цена"
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
              required
            />
            <select
              value={newProduct.tableType}
              onChange={(e) => setNewProduct({...newProduct, tableType: e.target.value})}
            >
              <option value="first">Первая таблица</option>
              <option value="second">Вторая таблица</option>
              <option value="third">Третья таблица</option>
            </select>
          </div>
          <button type="submit" className="btn-primary">Добавить продукт</button>
        </form>
      </div>

      {/* Список продуктов */}
      <div className="products-section">
        <h2>Список продуктов</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {editingProduct?.id === product.id ? (
                // Форма редактирования
                <form onSubmit={handleUpdateProduct} className="edit-form">
                  <input
                    type="text"
                    value={editingProduct.attributes.product}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      attributes: {...editingProduct.attributes, product: e.target.value}
                    })}
                  />
                  <input
                    type="text"
                    value={editingProduct.attributes.activeSubstance}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      attributes: {...editingProduct.attributes, activeSubstance: e.target.value}
                    })}
                  />
                  <input
                    type="text"
                    value={editingProduct.attributes.volume}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      attributes: {...editingProduct.attributes, volume: e.target.value}
                    })}
                  />
                  <input
                    type="text"
                    value={editingProduct.attributes.stock}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      attributes: {...editingProduct.attributes, stock: e.target.value}
                    })}
                  />
                  <input
                    type="text"
                    value={editingProduct.attributes.price}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      attributes: {...editingProduct.attributes, price: e.target.value}
                    })}
                  />
                  <select
                    value={editingProduct.attributes.tableType}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      attributes: {...editingProduct.attributes, tableType: e.target.value}
                    })}
                  >
                    <option value="first">Первая таблица</option>
                    <option value="second">Вторая таблица</option>
                    <option value="third">Третья таблица</option>
                  </select>
                  <div className="edit-actions">
                    <button type="submit" className="btn-save">Сохранить</button>
                    <button type="button" onClick={cancelEditing} className="btn-cancel">Отмена</button>
                  </div>
                </form>
              ) : (
                // Отображение продукта
                <>
                  <h3>{product.attributes.product}</h3>
                  <p><strong>Активное вещество:</strong> {product.attributes.activeSubstance}</p>
                  <p><strong>Объем:</strong> {product.attributes.volume}</p>
                  <p><strong>Наличие:</strong> {product.attributes.stock}</p>
                  <p><strong>Цена:</strong> {product.attributes.price}</p>
                  <p><strong>Таблица:</strong> {product.attributes.tableType}</p>
                  <div className="product-actions">
                    <button onClick={() => startEditing(product)} className="btn-edit">Редактировать</button>
                    <button onClick={() => handleDeleteProduct(product.id)} className="btn-delete">Удалить</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductAdmin;
