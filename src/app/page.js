'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 0,
    price: 0,
  });

  // Fetch data from the backend API
  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/api/items')
      .then((response) => {
        setItems(response.data.items);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  }, []);

  // Add new item
  const handleAddItem = () => {
    axios
      .post('http://127.0.0.1:5000/api/items', newItem)
      .then((response) => {
        setItems([...items, response.data]);
        setNewItem({
          name: '',
          quantity: 0,
          price: 0,
        });
      })
      .catch((error) => {
        console.error('Error adding item:', error);
      });
  };

  // Delete an item
  const handleDeleteItem = (id) => {
    axios
      .delete(`http://127.0.0.1:5000/api/items/${id}`)
      .then((response) => {
        setItems(items.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
      <div className="mb-4">
        <input
          type="text"
          className="border p-2 mb-2 mr-2"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) =>
            setNewItem({ ...newItem, name: e.target.value })
          }
        />
        <input
          type="number"
          className="border p-2 mb-2 mr-2"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) =>
            setNewItem({ ...newItem, quantity: parseInt(e.target.value) })
          }
        />
        <input
          type="number"
          className="border p-2 mb-2"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) =>
            setNewItem({ ...newItem, price: parseFloat(e.target.value) })
          }
        />
        <button
          onClick={handleAddItem}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>
      </div>
      <div>
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.id}</td>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">${item.price.toFixed(2)}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
