import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Form states
  const [newProduct, setNewProduct] = useState({
    row: '',
    insides: [
      {
        product: '',
        activeSubstance: '',
        dosage: '',
        availability: true,
        price: '',
        id: 1
      }
    ]
  });

  const [editForm, setEditForm] = useState({
    row: '',
    data: []
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://priceofjuice.com/api/admin/products');
      setProducts(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://priceofjuice.com/api/admin/products', newProduct);
      setShowAddForm(false);
      setNewProduct({
        row: '',
        insides: [
          {
            product: '',
            activeSubstance: '',
            dosage: '',
            availability: true,
            price: '',
            id: 1
          }
        ]
      });
      fetchProducts();
    } catch (err) {
      setError('Failed to add product');
      console.error('Error adding product:', err);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.patch('https://priceofjuice.com/api/admin/products/insides', editForm);
      setShowEditForm(false);
      setEditingProduct(null);
      setEditForm({ row: '', data: [] });
      fetchProducts();
    } catch (err) {
      setError('Failed to update product');
      console.error('Error updating product:', err);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`https://priceofjuice.com/api/admin/products/${id}`);
        fetchProducts();
      } catch (err) {
        setError('Failed to delete product');
        console.error('Error deleting product:', err);
      }
    }
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setEditForm({
      row: product.row,
      data: [...product.insides]
    });
    setShowEditForm(true);
  };

  const addInsideItem = () => {
    const newId = Math.max(...editForm.data.map(item => item.id), 0) + 1;
    setEditForm({
      ...editForm,
      data: [...editForm.data, {
        product: '',
        activeSubstance: '',
        dosage: '',
        availability: true,
        price: '',
        id: newId
      }]
    });
  };

  const removeInsideItem = (index) => {
    setEditForm({
      ...editForm,
      data: editForm.data.filter((_, i) => i !== index)
    });
  };

  const updateInsideItem = (index, field, value) => {
    const updatedData = [...editForm.data];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setEditForm({ ...editForm, data: updatedData });
  };

  if (loading) return <div className="loading">Loading products...</div>;
  console.log(products)
  return (
    <div className="products-container">
      <header className="products-header">
        <Link to="/" className="back-button">← Back to Dashboard</Link>
        <h1>Products Management</h1>
        <button 
          onClick={() => setShowAddForm(true)} 
          className="add-button"
        >
          + Add New Product
        </button>
      </header>

      {error && <div className="error-message">{error}</div>}

      {/* Add Product Form */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Product</h2>
            <form onSubmit={handleAddProduct}>
              <div className="form-group">
                <label>Row Number:</label>
                <input
                  type="number"
                  value={newProduct.row}
                  onChange={(e) => setNewProduct({...newProduct, row: parseInt(e.target.value)})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Product Name:</label>
                <input
                  type="text"
                  value={newProduct.insides[0].product}
                  onChange={(e) => setNewProduct({
                    ...newProduct,
                    insides: [{...newProduct.insides[0], product: e.target.value}]
                  })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Active Substance:</label>
                <input
                  type="text"
                  value={newProduct.insides[0].activeSubstance}
                  onChange={(e) => setNewProduct({
                    ...newProduct,
                    insides: [{...newProduct.insides[0], activeSubstance: e.target.value}]
                  })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Dosage:</label>
                <input
                  type="text"
                  value={newProduct.insides[0].dosage}
                  onChange={(e) => setNewProduct({
                    ...newProduct,
                    insides: [{...newProduct.insides[0], dosage: e.target.value}]
                  })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Price:</label>
                <input
                  type="number"
                  step="0.01"
                  value={newProduct.insides[0].price}
                  onChange={(e) => setNewProduct({
                    ...newProduct,
                    insides: [{...newProduct.insides[0], price: parseFloat(e.target.value)}]
                  })}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={newProduct.insides[0].availability}
                    onChange={(e) => setNewProduct({
                      ...newProduct,
                      insides: [{...newProduct.insides[0], availability: e.target.checked}]
                    })}
                  />
                  Available
                </label>
              </div>

              <div className="form-actions">
                <button type="submit">Add Product</button>
                <button type="button" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Form */}
      {showEditForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Product Row {editingProduct?.row}</h2>
            <form onSubmit={handleEditProduct}>
              <div className="form-group">
                <label>Row Number:</label>
                <input
                  type="number"
                  value={editForm.row}
                  onChange={(e) => setEditForm({...editForm, row: parseInt(e.target.value)})}
                  required
                />
              </div>

              <div className="insides-section">
                <h3>Product Items</h3>
                {editForm.data.map((item, index) => (
                  <div key={index} className="inside-item">
                    <div className="item-header">
                      <h4>Item {index + 1}</h4>
                      <button 
                        type="button" 
                        onClick={() => removeInsideItem(index)}
                        className="remove-item"
                      >
                        Remove
                      </button>
                    </div>
                    
                    <div className="item-fields">
                      <input
                        type="text"
                        placeholder="Product Name"
                        value={item.product}
                        onChange={(e) => updateInsideItem(index, 'product', e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Active Substance"
                        value={item.activeSubstance}
                        onChange={(e) => updateInsideItem(index, 'activeSubstance', e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Dosage"
                        value={item.dosage}
                        onChange={(e) => updateInsideItem(index, 'dosage', e.target.value)}
                        required
                      />
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        value={item.price}
                        onChange={(e) => updateInsideItem(index, 'price', parseFloat(e.target.value))}
                        required
                      />
                      <label>
                        <input
                          type="checkbox"
                          checked={item.availability}
                          onChange={(e) => updateInsideItem(index, 'availability', e.target.checked)}
                        />
                        Available
                      </label>
                    </div>
                  </div>
                ))}
                
                <button type="button" onClick={addInsideItem} className="add-item-button">
                  + Add Item
                </button>
              </div>

              <div className="form-actions">
                <button type="submit">Update Product</button>
                <button type="button" onClick={() => setShowEditForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products List */}
      <div className="products-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-header">
              <h3>Row {product.row}</h3>
              <div className="product-actions">
                <button onClick={() => startEdit(product)} className="edit-button">
                  Edit
                </button>

              </div>
            </div>
            
            <div className="product-insides">
              {product.insides.map((item, index) => (
                <div key={index} className="inside-item-display">
                  <div className="item-info">
                    <strong>{item.product}</strong>
                    <span>{item.activeSubstance}</span>
                    <span>{item.dosage}</span>
                    <span className={`availability ${item.availability ? 'available' : 'unavailable'}`}>
                      {item.availability ? 'Available' : 'Unavailable'}
                    </span>
                    <span className="price">${item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
